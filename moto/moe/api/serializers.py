from rest_framework import serializers
from moto.moe import  models
from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse
from django.conf import settings
from six.moves.urllib.parse import urlparse
import os
from django_comments_threaded.api.serializers import CommentSerializer as BaseCommentSerializer
from django_comments_threaded.utils import get_model
from rest_auth.serializers import TokenSerializer as BaseTokenSerializer
from django.utils import formats
from django.utils import timezone
from django.contrib.contenttypes.models import ContentType

IMAGE_SIZE = getattr(settings,  'IMAGE_SIZE', None)

class UserBaseSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField()
    avatar = serializers.SerializerMethodField()
    _is_authenticated  = serializers.SerializerMethodField()
    class Meta:
        model = get_user_model()
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = get_user_model()(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    def get_avatar(self, obj):
        try:
            return obj.avatar.url
        except:
            return ''
    def get_name(self, obj):
        # is_anonymous
        if obj.is_authenticated() :
            if obj.last_name and obj.first_name:
                return obj.last_name + obj.first_name
        return ''
    def get__is_authenticated(self,obj):
        return obj.is_authenticated()

class UserDetailSerializer(UserBaseSerializer):
    class Meta(UserBaseSerializer.Meta):
        model = get_user_model()
        allowed_methods = ('get', 'post', 'put')
        fields = ['username', 'name','avatar','email','_is_authenticated','signature']
        excludes = [ 'password', 'is_active', 'is_staff', 'is_superuser']

class UserSerializer(UserBaseSerializer):


    class Meta(UserBaseSerializer.Meta):
        model = get_user_model()
        fields = ('username', 'avatar', 'name')

class TokenSerializer(BaseTokenSerializer):
    def to_representation(self, obj):
        ret= {
             'key':obj.key,
        }
        ret.update(UserSerializer(obj.user).data)
        return ret
class PostBaseSerializer(serializers.ModelSerializer):
    date_posted = serializers.SerializerMethodField()
    image_url  = serializers.SerializerMethodField()
    liked  = serializers.SerializerMethodField()
    likes_count  = serializers.SerializerMethodField()
    date_posted2 = serializers.SerializerMethodField()
    def get_liked(self, obj):
        liked = getattr(obj,'liked',None)
        return len(liked) if liked else 0

    def get_likes_count(self,obj):
        return getattr(obj,'likes_count',0)

    def get_date_posted(self,obj):
        user_local_time = timezone.template_localtime(obj.date_posted,use_tz=timezone.get_current_timezone())
        return user_local_time.isoformat()

    def get_id(self,obj):
        return str(obj.id)

    def get_image_url(self, obj):
        return obj.get_image_url()

    def get_date_posted2(self,obj):
        return formats.localize(obj.date_posted,use_l10n=True)


class PostListSerializer(PostBaseSerializer):
    author = UserSerializer()
    class Meta:
        model = models.Post
        fields =['key','description','image_url','author','date_posted','date_posted2','liked','likes_count']
        depth = 2


class CurrentPostDefault:
    def set_context(self, serializer_field):
        post_key = serializer_field.context['view'].kwargs['post_key']
        self.post = models.Post.objects.get(key=post_key)

    def __call__(self):
        return self.post

class LikeSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    post = serializers.PrimaryKeyRelatedField(read_only=True, default=CurrentPostDefault())
    class Meta:
        model = models.Like


class CurrentUserDefault:
    def set_context(self, serializer_field):
        self.author = serializer_field.context['request'].user

    def __call__(self):
        return self.author

class PostSerializer(PostBaseSerializer):
    author = UserSerializer(read_only=True,default=CurrentUserDefault())
    image_large_url = serializers.SerializerMethodField()
    source = serializers.CharField(required=False,default='')

    source_host = serializers.SerializerMethodField()
    file_name = serializers.SerializerMethodField()
    comment_url  = serializers.SerializerMethodField()
    class Meta:
        model = models.Post
        fields =['id','description','key','image','image_url','file_name','image_large_url','author','date_posted',\
                 'date_posted2','source','source_host','liked','likes_count','comment_url']
        depth = 2

    def get_image_large_url(self, obj):
        if obj.image.startswith('http'):
            return obj.image
        return settings.MEDIA_URL+obj.image

    def get_source_host(self, obj):
        parsed_uri = urlparse( obj.source )
        host = '{uri.netloc}'.format(uri=parsed_uri)
        return host

    def get_file_name(self,obj):
        return os.path.basename(obj.image)

    def get_comment_url(self,obj):
        return reverse('api_list_create',kwargs={
                    'content_type':'post',
                    'object_pk':obj.id
                })


class CommentSerializer(BaseCommentSerializer):

    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())
    def get_date_created(self,obj):
        return obj.date_created.strftime("%Y-%m-%dT%H:%M:%SZ")

    def to_representation(self, obj):
            return {
                'id':obj.id,
                'parent':obj.parent_id,
                'date_created': self.get_date_created(obj),
                'message': obj.message,
                'author':UserSerializer(obj.user).data
            }

    def create(self, validated_data):
        validated_data.update(
            content_type=ContentType.objects.get(model = self.get_context_kwargs('content_type'),app_label='moe'),
            object_pk=self.get_context_kwargs('object_pk'),
        )
        return get_model().objects.create(**validated_data)

class CommentReplySerializer(CommentSerializer):

    def create(self, validated_data):
        parent = get_model().objects.get(pk=self.get_context_kwargs('pk'))
        validated_data.update(
            content_type=parent.content_type,
            object_pk=parent.object_pk,
            parent = parent
        )
        return get_model().objects.create(**validated_data)

    class Meta(CommentSerializer.Meta):
        pass

