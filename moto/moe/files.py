# -*- coding: utf-8 -*-
import fnmatch
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from django.core.exceptions import ImproperlyConfigured

class ResumableFile(object):
    '''https://raw.githubusercontent.com/jeanphix/django-resumable/dev/resumable/files.py'''
    def __init__(self,  kwargs):
        self.kwargs = kwargs
        self.chunk_suffix = "_part_"

    @property
    def chunk_exists(self):
        """Checks if the requested chunk exists."""
        name = "%s%s%s" % (self.filename,
                           self.chunk_suffix,
                           self.kwargs.get('resumableChunkNumber').zfill(4))

         #101706_8503e389gw1ejtv88yh6xj20c90up0wb.jpg_part_0001
        if not self.storage.exists(name):
            return False
        chunk_size = int(self.kwargs.get('resumableCurrentChunkSize'))
        return self.storage.size(name) == chunk_size

    def chunk_names(self):
        """Iterates over all stored chunks and yields their names."""
        file_names = sorted(self.storage.listdir('')[1])
        pattern = '%s%s*' % (self.filename, self.chunk_suffix) #101706_8503e389gw1ejtv88yh6xj20c90up0wb.jpg_part_
        for name in file_names:
            if fnmatch.fnmatch(name, pattern):
                yield name
    @property
    def chunks_dir(self):
        chunks_dir = getattr(settings, 'FILE_UPLOAD_TEMP_DIR', None)
        if not chunks_dir:
            raise ImproperlyConfigured(
                'You must set settings.FILE_UPLOAD_TEMP_DIR')
        return chunks_dir

    @property
    def storage(self):
        return FileSystemStorage(location=self.chunks_dir)
    def chunks(self):
        """Yield the contents of every chunk, FileSystemStorage.save compatible
        """
        for name in self.chunk_names():
            yield self.storage.open(name).read()

    def delete_chunks(self):
        [self.storage.delete(chunk) for chunk in self.chunk_names()]

    @property
    def filename(self):
        """Gets the filename. 101706_8503e389gw1ejtv88yh6xj20c90up0wb.jpg"""
        filename = self.kwargs.get('resumableFilename')
        if '/' in filename:
            raise Exception('Invalid filename')
        return "%s_%s" % (
            self.kwargs.get('resumableTotalSize'),
            filename
        )

    @property
    def is_complete(self):
        """Checks if all chunks are allready stored."""
        if self.storage.exists(self.filename):
            return True
        return int(self.kwargs.get('resumableTotalSize')) == self.size

    def process_chunk(self, file):
        if not self.chunk_exists:
            self.storage.save('%s%s%s' % (
                self.filename,
                self.chunk_suffix,
                self.kwargs.get('resumableChunkNumber').zfill(4)
            ), file)

    @property
    def size(self):
        """Gets chunks size."""
        size = 0
        for chunk in self.chunk_names():
            size += self.storage.size(chunk)
        return size