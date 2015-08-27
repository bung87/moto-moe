# encoding: utf-8

from __future__ import absolute_import, division, print_function, unicode_literals

from django.conf import settings
from django.core.paginator import InvalidPage, Paginator
from django.db.models import Prefetch,Count
from haystack.forms import ModelSearchForm
from rest_framework.generics import (
                                                 GenericAPIView)

from moto.moe.api.serializers import (
                                 PostListSerializer
)
from django.http import Http404
from rest_framework.response import Response
from moto.moe import models
RESULTS_PER_PAGE = getattr(settings, 'HAYSTACK_SEARCH_RESULTS_PER_PAGE', 20)

class SearchView(GenericAPIView):
    form_class = ModelSearchForm
    serializer_class = PostListSerializer
    searchqueryset = None
    results_per_page = RESULTS_PER_PAGE

    def build_form(self, form_kwargs=None):

        kwargs = {
            'load_all': False
        }
        if form_kwargs:
            kwargs.update(form_kwargs)

        data = self.request.REQUEST

        if self.searchqueryset is not None:
            kwargs['searchqueryset'] = self.searchqueryset

        return self.form_class(data, **kwargs)

    def get_query(self):

        if self.form.is_valid():
            return self.form.cleaned_data['q']

        return ''

    def get_results(self):

        return self.form.search()
    def get_queryset(self):
        return self.get_results()
    def build_page(self):
        try:
            page_no = int(self.request.GET.get('page', 1))
        except (TypeError, ValueError):
            raise Http404("Not a valid number for page.")

        if page_no < 1:
            raise Http404("Pages should be 1 or greater.")

        start_offset = (page_no - 1) * self.results_per_page
        self.results[start_offset:start_offset + self.results_per_page]

        paginator = Paginator(self.results, self.results_per_page)

        try:
            page = paginator.page(page_no)
        except InvalidPage:
            raise Http404("No such page!")

        return (paginator, page)
    def list(self, request, *args, **kwargs):
        ret = {}
        self.form = self.build_form()
        self.query = self.get_query()
        self.results = self.get_results()
        paginator, page = self.build_page()
        ids = [o.pk for o in page.object_list]
        model = self.get_serializer_class().Meta.model
        queryset = model.objects.filter(pk__in = ids).select_related('author')
        prefetches = []
        if request.user.is_authenticated():
            q1 = models.Like.objects.filter(author = request.user)
            p2 = Prefetch('likes',queryset=q1,to_attr='liked')
            prefetches.append(p2)
        queryset=queryset.annotate(likes_count=Count('likes')).prefetch_related(*prefetches)
        page.object_list = queryset
        serializer = self.get_pagination_serializer(page)
        if self.results and hasattr(self.results, 'query') and self.results.query.backend.include_spelling:
            ret['suggestion'] = self.form.get_suggestion()
        ret.update(serializer.data)
        return Response(ret)
    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)