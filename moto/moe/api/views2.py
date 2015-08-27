from rest_framework.generics import (GenericAPIView)

from rest_framework import  status
import signal
import asyncio
from moto.moe.utils.crawer import get_crawer
from rest_framework.response import Response
import json
from six.moves.urllib.parse import urlparse,urljoin,urlencode
from moto.moe import models
from moto.moe.api.serializers import PostSerializer



class Catch_url(GenericAPIView):
    def post(self, request, *args, **kwargs):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        url = request.POST.get('url')
        c = get_crawer(url)(url,loop)
        if c.need_login:
            c.login()
        asyncio.Task(c.run())

        try:
            loop.add_signal_handler(signal.SIGINT, loop.stop)
        except RuntimeError:
            pass
        loop.run_forever()
        print('todo:', len(c.todo))
        print('busy:', len(c.busy))
        print('done:', len(c.done), '; ok:', sum(c.done.values()))
        print('tasks:', len(c.tasks))
        return Response({'urls':c.get_results()},status=status.HTTP_200_OK)

class Download(GenericAPIView):
    model = models.Post
    queryset = models.Post.objects.all()
    serializer_class = PostSerializer
    def post(self, request, *args, **kwargs):
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        url = request.POST.get('url')
        images = json.loads(request.POST.get('images'))
        c = get_crawer(url)(url,loop)
        if c.need_login:
            c.login()
        asyncio.Task(c.download(request.user,images))

        loop.run_forever()
        print('todo:', len(c.todo))
        print('busy:', len(c.busy))
        print('done:', len(c.done), '; ok:', sum(c.done.values()))
        print('tasks:', len(c.tasks))
        # data={'author':UserSerializer(request.user).data, 'image':image_post.generated_filename}
        datas = c.get_results()
        serializer = self.get_serializer(data=datas,many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data,status=status.HTTP_200_OK)