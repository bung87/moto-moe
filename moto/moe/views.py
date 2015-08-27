from django.shortcuts import render
from moto.moe.api.serializers import UserDetailSerializer
from rest_framework.renderers import JSONRenderer
from django.conf import settings
from moto.moe.api.views import PostList
from moto.moe.api.search import SearchView
from copy import copy
import django_mobile
REST_FRAMEWORK = getattr(settings,'REST_FRAMEWORK')


def api_retrieve(request,api_class,*args,**kwargs):
    flavour = django_mobile.get_flavour(request)
    print('flavour:',flavour)
    page_size = 12 if flavour == 'mobile' else 24
    print(page_size)
    pager ={}
    page = request.GET.get('page',1)
    page_size = request.GET.get(REST_FRAMEWORK['PAGINATE_BY_PARAM'],page_size)
    if page:
        pager['page'] = int(page)
    if page_size:
        pager['page_size'] = int(page_size)
    params = copy(pager)
    if kwargs:
        params.update(kwargs)
    view = api_class.as_view()
    params['format']='json'
    response = view(request,**params)
    response.render()
    return response.content,pager

def home(request):
    flavour = django_mobile.get_flavour(request)
    print('flavour:',flavour)
    user_serializer = UserDetailSerializer(request.user)
    user_json = JSONRenderer().render(user_serializer.data)
    content,pager = api_retrieve(request,PostList)
    return render(request,'templates/home.html',{
        'user_json':user_json,
         'flavour':flavour,
        'pager_json':JSONRenderer().render(pager),
        'initial_data':content
    })

def post(request,key):
    return home(request)

def search(request):
    user_serializer = UserDetailSerializer(request.user)
    user_json = JSONRenderer().render(user_serializer.data)
    content,pager = api_retrieve(request,SearchView,q=request.GET.get('q'))
    return render(request,'templates/home.html',{
        'user_json':user_json,
        'pager_json':JSONRenderer().render(pager),
        'initial_data':content
    })

