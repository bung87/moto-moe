from django.conf.urls import url,patterns,include
from moto.moe.api import views,views2
from moto.moe.api import search
from rest_framework.authentication import SessionAuthentication
# urls
urlpatterns = patterns('',
    url(r'^post/$', views.Post.as_view() ,name='post'),
    url(r'^posts/$', views.PostList.as_view() ,name='posts'),
    url(r'^post/(?P<key>[0-9a-zA-Z]+)/$', views.PostDetail.as_view(),name='post_detail'),
    url(r'^user/$', views.UserList.as_view()),
    url('^search',search.SearchView.as_view(),name="search"),
    url('^avatar/$',views.Avatar.as_view(authentication_classes=[SessionAuthentication]),name='avatar'),
    url('^catch/$',views2.Catch_url.as_view(authentication_classes=[SessionAuthentication]),name='catch'),
    url('^download/$',views2.Download.as_view(),name='download'),
    url(r'^user/(?P<id>[0-9a-z]+)/$', views.UserDetail.as_view()),
     url(r'^likeit/(?P<post_key>[0-9a-zA-Z]+)/$', views.LikeView.as_view(authentication_classes=[SessionAuthentication]),
        name='likeit'),
      url(r'',include('rest_auth.urls')),
)

urlpatterns += patterns('',
    url(r'^registration/$', include('rest_auth.registration.urls'),name='registration'),

)



