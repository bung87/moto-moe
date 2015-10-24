from django.conf.urls import include, url,patterns
from django.contrib import admin
from django.views.generic import TemplateView
from django.conf import settings
from django_comments_threaded.api import views as comment_views
from moto.moe.api import views
from rest_framework.authentication import SessionAuthentication
from django.conf.urls.i18n import i18n_patterns

urlpatterns = patterns('',
    url(r'^$', 'moto.moe.views.home', name='home'),
    url(r'^urls/$', 'django_js_reverse.views.urls_js', name='js_reverse'),
    url(r'^api/', include('moto.moe.api.urls',namespace='api')),
    url(r'^search/', 'moto.moe.views.search',name='search'),
    url(r'^post/(?P<key>[0-9a-zA-Z]+)/$','moto.moe.views.post',name='post_detail'),

    url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += patterns('',

    (r'^accounts/', include('allauth.urls')),
)

RE_CONTENT_OBJECT = r'comments/(?P<content_type>\w+)/(?P<object_pk>\d+)/'

urlpatterns += patterns('',
    url(r'^comment/(?P<pk>\d+)/$', views.ReplyView.as_view(authentication_classes=[SessionAuthentication]),
        name='api_reply'),

    url(r'^' + RE_CONTENT_OBJECT + '$', views.CommentListCreateView.as_view(authentication_classes=[SessionAuthentication]),
        name='api_list_create'),
    url(r'^' + RE_CONTENT_OBJECT + 'tree/$', comment_views.TreeView.as_view(),
        name='api_list_tree'),
    )
js_info_dict = { 'domain': 'djangojs', 'packages': ('moto'), }

urlpatterns += i18n_patterns('', (r'^jsi18n/$', 'django.views.i18n.javascript_catalog', js_info_dict), )

if settings.DEBUG:
    from django.conf.urls.static import static
    urlpatterns += url(r'^test', TemplateView.as_view(template_name='templates/test/home.html'), name='test'),
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
