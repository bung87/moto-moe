from rest_framework.generics import (ListCreateAPIView,
                                                 RetrieveUpdateDestroyAPIView,
                                                 GenericAPIView,DestroyAPIView)
from django.contrib.auth import get_user_model
from moto.moe import models
from moto.moe.api.serializers import (PostSerializer,
                                 UserDetailSerializer,
                                 PostListSerializer,UserSerializer,
                                CommentSerializer,CommentReplySerializer,LikeSerializer
)

from rest_framework.response import Response
from rest_framework.settings import api_settings

try:
    from PIL import Image, ImageOps
except ImportError:
    Image = None
    ImageOps = None

USER_MODEL = get_user_model()

from moto.moe.files import ResumableFile
from django.db.models import Prefetch,Count
from django_comments_threaded.utils import get_model
from django_comments_threaded.api.permissions import CanDeleteOwnComment
from rest_framework import  status
from django_comments_threaded.api.utils import to_tree
from moto.moe.image import ImagePost
from django.core.files.base import ContentFile


class Avatar(GenericAPIView):
    def post(self, request, *args, **kwargs):

        image = request.FILES.get('avatar')
        image_content = ContentFile(image.read())
        instance = USER_MODEL.objects.get(username = request.user.username)
        name = '%s.%s' % (
                request.user.username,
                'png')
        instance.avatar.save(name,image_content)
        instance.save()
        return Response({'avatar':instance.avatar.url},status=status.HTTP_200_OK)


class Post(GenericAPIView):
    model = models.Post
    queryset = models.Post.objects.all()
    serializer_class = PostSerializer

    def get(self, request, *args, **kwargs):
        r = ResumableFile(request.GET)
        if not (r.chunk_exists or r.is_complete):
            return Response('chunk not found', status=404)
        return Response('chunk already exists')

    def create(self,request,*args,**kwargs):
        chunk = request.FILES.get('file')
        r = ResumableFile( request.POST)
        if r.chunk_exists:
            r.delete_chunks()
            return Response('chunk already exists')
        r.process_chunk(chunk)
        if r.is_complete:
            image_post = ImagePost(request.user)
            image_post.save(r)
            r.delete_chunks()
            data={'author':UserSerializer(request.user).data, 'image':image_post.image}
            serializer = self.get_serializer(data=data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            request.session['post_id'] = serializer.data['id']
            return Response(serializer.data,  headers=headers)
        else:
            return Response()


    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': data[api_settings.URL_FIELD_NAME]}
        except (TypeError, KeyError):
            return {}

    def post(self, request, *args, **kwargs):
        chunk = request.FILES.get('file')
        if chunk:
            return self.create(request, *args, **kwargs)
        else:
            id = request.session['post_id']
            tags = request.POST.get('tags')
            description = request.POST.get('description')
            post = self.model.objects.get(pk=id)
            post.description = description
            if tags:
                post.tags.add(*tags.split(','))
            serializer = self.get_serializer(post)
            post.save()
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, headers=headers )

import django_mobile
class PostList(GenericAPIView):

    model = models.Post
    queryset = models.Post.objects.select_related('author').order_by('-date_posted')
    serializer_class = PostListSerializer

    def list(self):
        queryset = self.get_queryset()
        prefetches = []
        if self.request.user.is_authenticated():
            q1 = models.Like.objects.filter(author = self.request.user)
            p2 = Prefetch('likes',queryset=q1,to_attr='liked')
            prefetches.append(p2)
        queryset = queryset.annotate(likes_count=Count('likes')).prefetch_related(*prefetches)
        instance = self.filter_queryset(queryset)
        page_size = 12 if self.flavour == 'mobile' else 24
        paginator = self.paginator_class(queryset, page_size)
        page_kwarg = self.kwargs.get(self.page_kwarg)
        page_query_param = self.request.query_params.get(self.page_kwarg)
        page_number = page_kwarg or page_query_param or 1

        page = paginator.page(page_number)

        if page is not None:
            serializer = self.get_pagination_serializer(page)
        else:
            serializer = self.get_serializer(instance, many=True)
        return serializer.data
    def get(self, request, *args, **kwargs):
        self.flavour = django_mobile.get_flavour(request)
        return Response(self.list())

class PostDetail(RetrieveUpdateDestroyAPIView):
    model = models.Post
    queryset = models.Post.objects.select_related('author')
    serializer_class = PostSerializer
    lookup_field = 'key'
    lookup_url_kwarg = 'key'

    def get(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        prefetches = []
        if request.user.is_authenticated():
            q1 = models.Like.objects.filter(author = request.user)
            p2 = Prefetch('likes',queryset=q1,to_attr='liked')
            prefetches.append(p2)
        self.queryset=queryset.annotate(likes_count=Count('likes')).prefetch_related(*prefetches)
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

class UserList(ListCreateAPIView):

    model = USER_MODEL
    queryset = USER_MODEL.objects.all()
    serializer_class = UserDetailSerializer

class UserDetail(RetrieveUpdateDestroyAPIView):
    model = USER_MODEL
    queryset = USER_MODEL.objects.all()
    serializer_class = UserDetailSerializer


from django.contrib.contenttypes.models import ContentType

class CommentMixin(object):
    serializer_class = CommentSerializer
    def content_object_filter(self):
        return {
            'content_type':ContentType.objects.get(model = self.kwargs['content_type'],app_label='moe') ,
            'object_pk': self.kwargs['object_pk'],
        }

    def get_queryset(self):
        return get_model().objects.select_related('user').filter(**self.content_object_filter())

class CommentListCreateView(CommentMixin, ListCreateAPIView):
    def list(self, request, *args, **kwargs):
        instance = self.filter_queryset(self.get_queryset())
        page = self.paginate_queryset(instance)
        if page is not None:
            serializer = self.get_pagination_serializer(page)
        else:
            serializer = self.get_serializer(instance, many=True)
        return Response(serializer.data)



class ReplyView(CommentMixin, ListCreateAPIView,
        DestroyAPIView):
    serializer_class = CommentReplySerializer
    permission_classes = [CanDeleteOwnComment]

    def get_queryset(self):
        return get_model().objects.all()

    def list(self, request, *args, **kwargs):
        subtree = self.get_object().get_descendants(include_self=True)
        return Response(to_tree(subtree)[0])

    def delete(self, request, *args, **kwargs):
        self.get_object().soft_delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class LikeView(ListCreateAPIView,DestroyAPIView):
     serializer_class = LikeSerializer
     lookup_field = 'post__key'
     lookup_url_kwarg = 'post_key'
     def get_queryset(self):
        return models.Like.objects.filter(post__key = self.kwargs['post_key'])