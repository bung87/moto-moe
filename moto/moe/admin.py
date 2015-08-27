from django.contrib import admin
from moto.moe import models

class PostAdmin(admin.ModelAdmin):
    list_select_related = ('author',)
    search_fields = ['description','author__username']
    list_display = ('id','key','admin_thumbnail','author','posted_datetime')
    list_display_links = ('id','key','admin_thumbnail',)

class LikeAdmin(admin.ModelAdmin):
     list_select_related = ('author', 'post')
     list_display = ('id','admin_thumbnail','author')
     list_display_links = ('admin_thumbnail',)

class BoardAdmin(admin.ModelAdmin):
    pass

admin.site.register(models.Post, PostAdmin)
admin.site.register(models.Like, LikeAdmin)
admin.site.register(models.Board, BoardAdmin)
admin.site.register(models.User)