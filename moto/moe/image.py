import os
from datetime import timedelta,datetime

try:
    from PIL import Image, ImageOps
except ImportError:
    Image = None
    ImageOps = None
from django.conf import settings
from moto.moe.files import ResumableFile
from django.core.files.temp import NamedTemporaryFile
IMAGE_SIZE = getattr(settings,  'IMAGE_SIZE', None)

class ImagePost(object):
    def __init__(self, author):
        self.author = author
        self.generated_filename = self._gen_file_name()

    def _gen_file_name(self,ext='.jpg'):
        return (datetime.now()+timedelta(hours=8)).strftime('%Y_%m_%d_%H_%M_%s_%f')+ext
    @property
    def part_path(self):
        the_now = datetime.now()+timedelta(hours=8)
        return os.path.join('posts',self.author.username,the_now.strftime('%Y'),the_now.strftime('%m'))
    @property
    def large_path(self):
        return os.path.join(settings.MEDIA_ROOT,self.part_path,self.generated_filename)
    @property
    def thumbnail_path(self):
        name, ext = os.path.splitext(self.generated_filename)
        size = IMAGE_SIZE.thumbnail
        return os.path.join(settings.MEDIA_ROOT,self.part_path,'%s_%s_%s%s' % (name,size['width'],size['height'],ext))
    @property
    def image(self):
        return '/'.join([self.part_path,self.generated_filename])

    def save(self, r):
        if isinstance(r,ResumableFile):
            file_obj =  NamedTemporaryFile(delete=True)
            for data in r.chunks():
                file_obj.write(data)
        else: #temp file
            file_obj = r
        try:
            img = Image.open(file_obj)
        except Exception as e:
            pass
        if (IMAGE_SIZE.size and (img.size[0] > IMAGE_SIZE.size['width'] or
                            img.size[1] > IMAGE_SIZE.size['height'])):
            size = IMAGE_SIZE.size

            if size['force']:
                img = ImageOps.fit(img,
                                   (size['width'],
                                    size['height']),
                                   Image.ANTIALIAS)
            else:
                img.thumbnail((size['width'],
                               size['height']),
                              Image.ANTIALIAS)
            try:
                img.save(self.large_path)
            except FileNotFoundError:
                os.makedirs(os.path.dirname(self.large_path),755)
                img.save(self.large_path)
        else:
             try:
                img.save(self.large_path)
             except FileNotFoundError:
                os.makedirs(os.path.dirname(self.large_path),755)
                img.save(self.large_path)
        if IMAGE_SIZE.thumbnail:
            size = IMAGE_SIZE.thumbnail

            if size['force']:
                thumbnail = ImageOps.fit(img, (size['width'], size['height']), Image.ANTIALIAS)
            else:
                thumbnail = img.copy()
                thumbnail.thumbnail((size['width'],
                                     size['height']),
                                    Image.ANTIALIAS)
            try:
                thumbnail.save(self.thumbnail_path)
            except FileNotFoundError:
                os.makedirs(os.path.dirname(self.thumbnail_path))
                thumbnail.save(self.thumbnail_path)
        file_obj.close()