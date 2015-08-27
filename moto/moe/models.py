from django.utils.translation import ugettext_lazy as _
from django.db import models
from django.conf import settings
from taggit.managers import TaggableManager
import os
from django.utils.safestring import mark_safe
from django.contrib.auth.models import AbstractUser
IMAGE_SIZE = getattr(settings,  'IMAGE_SIZE', None)
from shortuuid import ShortUUID

def uuid():
    return ShortUUID().uuid()

class Post(models.Model):

    description = models.CharField(max_length=240,default='')
    image = models.CharField(max_length=2000)
    author = models.ForeignKey(settings.AUTH_USER_MODEL )
    tags = TaggableManager()
    source = models.CharField(max_length=2000,null=True,blank=True)
    key = models.CharField(max_length=255,default= uuid,db_index=True)
    date_posted = models.DateTimeField(auto_now_add=True,
                                verbose_name=_('date posted'))
    class Meta:
        
        ordering = ['-date_posted']
    def __unicode__(self):
        return self.description
    def get_image_url(self ):
        if self.image.startswith('http'):
            return self.image
        name, ext = os.path.splitext(self.image)
        size = IMAGE_SIZE.thumbnail
        path = '%s%s_%s_%s%s' % (settings.MEDIA_URL,name,size['width'],size['height'],ext)
        return path
    def posted_datetime(self):
        return self.date_posted.strftime('%Y-%m-%d %H:%M:%S')
    def admin_thumbnail(self):
        return mark_safe(u'<img src="%s"  height="100" />' % (self.get_image_url()))
    admin_thumbnail.short_description = 'Thumbnail'
    admin_thumbnail.allow_tags = True

class Like(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL )
    post = models.ForeignKey(Post,related_name='likes')
    date_posted = models.DateTimeField(auto_now_add=True,
                                verbose_name=_('date posted'))
    class Meta:
        unique_together = ['author','post']
        ordering = ['-date_posted']
    def admin_thumbnail(self):
        return self.post.admin_thumbnail()

class Board(models.Model):
    author = models.ForeignKey(settings.AUTH_USER_MODEL )
    posts = models.ForeignKey(Post)
    date_posted = models.DateTimeField(auto_now_add=True,
                                verbose_name=_('date posted'))
class User(AbstractUser):
    avatar = models.ImageField(upload_to='avatars')