#!/usr/bin/env python3
#-*- coding: utf-8 -*-

from bs4 import BeautifulSoup
from six.moves.urllib.request import urlopen,Request,build_opener,HTTPCookieProcessor
from six.moves.urllib.parse import urlparse,urljoin,urlencode
# from six.moves.urllib.error import HTTPError
from six.moves import http_cookiejar
import logging
try:
    from moto.moe.utils.tools import filesizeformat
except:
    from tools import filesizeformat
import inspect
import signal
import sys
import asyncio

import requests
import aiohttp
import socket
#Bitmap
# Bitmap = ['image/bmp','image/gif','image/png']
Bitmap = ['image/bmp','image/png']
#JPEG
JPEG = ['image/jpeg']
#TIFF
TIFF =['image/tiff','image/x-tiff']

allowed_mime_types = Bitmap+JPEG+TIFF

class BaseCrawler(object):
    name = "base"
    allowed_domains = ["*"]
    home_page = ''
    uid = ''
    netloc = None
    password = ''
    login_page = ''
    uid_field = ''
    password_field = ''
    need_login = False
    ua = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.152 Safari/537.36"
    def __init__(self,rooturl,loop, maxtasks=100):
        self.rooturl = rooturl
        self.todo = set()
        self.busy = set()
        self.done = {}
        self.tasks = set()
        self.opener = self.init_opener()
        self.results = []
        self.sem = asyncio.Semaphore(maxtasks)
        self.loop = loop
        # connector stores cookies between requests and uses connection pool
        self.connector = aiohttp.TCPConnector(share_cookies=True, loop=loop)
    def get_results(self):
        return self.results
    def init_opener(self):
        self.cj = http_cookiejar.CookieJar()
        return  build_opener(HTTPCookieProcessor(self.cj))
    def login(self):
        headers = {
          'Referer':self.home_page,
          'User-Agent':self.ua,
            }
        req = Request(url=self.login_page,data=self.gen_auth_data(),headers=headers)
        res = self.opener.open(req)
        print(res)

    def get_auth_pairs(self):
        return {self.uid_field:self.uid,self.password_field:self.password}
    def get_auth_extro(self):
        return {"mode":"login"}
    def gen_auth_data(self):
        data = self.get_auth_pairs()
        data.update(self.get_auth_extro())
        return self.post_data(data)
    def post_data(self,data):
        reqdata = urlencode(data)
        binary_data = reqdata.encode('utf8')
        return binary_data
    def get_content(self):
        try:
            resp = self.opener.open(self.rooturl)
        except socket.gaierror:
            return None
        content =resp.read()
        return content
    @asyncio.coroutine
    def find_images(self):
        content = self.get_content()
        if not content:
            return
        soup = BeautifulSoup(content,"lxml")
        imgs = soup.find_all('img')
        url ,base_url = '',''
        try :
            base_url = soup.head.base['href']
        except Exception as e:
            pass
        for img in imgs:
            try:
                src = img['src']
            except KeyError as e:
                attrs = img.attrs
                img_urls =set()
                for k in attrs:
                    v = attrs[k]
                    if type(v) == str:
                        has_uri = any(map(lambda x: v.startswith(x),['//','http'])) and  -1 ==  v.find('.gif')
                        if k.startswith('data-') and has_uri:
                            src =  attrs[k]
                            break
                        elif has_uri:
                            img_urls.add(v)
                        else:
                            pass
                if img_urls:
                    src = img_urls[0]

            if src:
                is_abs = any(map(lambda x: src.startswith(x),['//','http']))
                if is_abs:
                    url = src
                else :
                    url = urljoin((url or base_url),src)
                if (
                    url not in self.busy and
                    url not in self.done and
                    url not in self.todo):
                    self.todo.add(url)
                    yield from self.sem.acquire()
                    task = asyncio.Task(self.process(url))
                    task.add_done_callback(lambda t: self.sem.release())
                    task.add_done_callback(self.tasks.remove)
                    self.tasks.add(task)

    @asyncio.coroutine
    def run(self):
        asyncio.Task(self.find_images())  # Set initial work.
        yield from asyncio.sleep(1)
        while self.busy:
            yield from asyncio.sleep(1)

        self.connector.close()
        self.loop.stop()

    @asyncio.coroutine
    def download(self,author,images):
        asyncio.Task(self.download_queue(author,images))  # Set initial work.
        yield from asyncio.sleep(1)
        while self.busy:
            yield from asyncio.sleep(1)

        self.connector.close()
        self.loop.stop()
    @asyncio.coroutine
    def download_queue(self,author,images):
        from collections import namedtuple
        for image in images:
            print(image)
            image  = namedtuple('Struct', image.keys())(*image.values())
            self.todo.add(image.url)
            yield from self.sem.acquire()
            task = asyncio.Task(self.downloading(author,image))
            task.add_done_callback(lambda t: self.sem.release())
            task.add_done_callback(self.tasks.remove)
            self.tasks.add(task)
    @asyncio.coroutine
    def downloading(self,author,image):
        from django.core.files.temp import NamedTemporaryFile
        from moto.moe.image import ImagePost
        from moto.moe.api.serializers import UserSerializer
        import os
        # file_temp = NamedTemporaryFile(delete=True)
        chunk_size = 1024
        print('downloading:', image.url)
        headers = {
              'Referer':self.rooturl,
              'User-Agent':self.ua
                }
        self.todo.remove(image.url)
        self.busy.add(image.url)
        try:
            r = yield from aiohttp.request(
                'get', image.url, connector=self.connector,headers=headers,cookies=requests.utils.dict_from_cookiejar(self.cj))
        except Exception as exc:
            print('...', image.url, 'has error', repr(str(exc)))
            self.done[image.url] = False
        else:
            with NamedTemporaryFile(delete=True) as fd:
                 while True:
                    chunk = yield from r.content.read(chunk_size)
                    if not chunk:
                        break
                    fd.write(chunk)
                 # fd
                 # a = urlparse(image.url)
                 # filename = os.path.basename(a.path)
                 image_post = ImagePost(author)
                 image_post.save(fd)
                 data = {'author':UserSerializer(author).data, 'image':image_post.image,'source':self.rooturl}
                 self.results.append(data)
                 print('image file name:', image_post.image)

            r.close()
            self.done[image.url] = True

        self.busy.remove(image.url)
        print(len(self.done), 'completed tasks,', len(self.tasks),
              'still pending, todo', len(self.todo))

    @asyncio.coroutine
    def process(self, url):
        print('processing:', url)
        headers = {
              'Referer':self.rooturl,
              'User-Agent':self.ua
                }
        self.todo.remove(url)
        self.busy.add(url)

        try:
            r = yield from aiohttp.request(
                'head', url, connector=self.connector,headers=headers,cookies=requests.utils.dict_from_cookiejar(self.cj))
        except Exception as exc:
            print('...', url, 'has error', repr(str(exc)))
            self.done[url] = False
        else:
            info = r.headers

            length = int(info.get('Content-Length',0))
            ctype = info.get('Content-Type')
            allowed_type = ctype in allowed_mime_types
            allowed_length = int(length)>100000
            data = {'type':ctype,'url':url,'len':filesizeformat(length)}
            if length and ctype:
                if allowed_length and allowed_type:
                  self.results.append(data)
            elif length and allowed_length:
                self.results.append(data)
            elif ctype and allowed_type:
                self.results.append(data)
            else:
                self.results.append(data)
            r.close()
            self.done[url] = True

        self.busy.remove(url)
        print(len(self.done), 'completed tasks,', len(self.tasks),
              'still pending, todo', len(self.todo))

class PixivCrawer(BaseCrawler):
    name = "pixiv"
    netloc ='www.pixiv.net'
    allowed_domains = ["pixiv.net"]
    home_page = 'http://www.pixiv.net/'
    uid = 'put_your_id_here'
    password ='put_your_password_here'
    login_page = 'https://www.secure.pixiv.net/login.php'
    uid_field = 'pixiv_id'
    password_field = 'pass'
    need_login = True

class SeigaCrawer(BaseCrawler):
    name = "seiga"
    netloc ='seiga.nicovideo.jp'
    allowed_domains = ["nicovideo.jp"]
    home_page = 'http://seiga.nicovideo.jp/'
    uid = 'put_your_id_here'
    password ='put_your_password_here'
    login_page = 'https://secure.nicovideo.jp/secure/login'
    uid_field = 'mail_tel'
    password_field = 'password'
    need_login = True

def get_crawer(url):
    parsed = urlparse(url)
    netloc = parsed.netloc
    mem = inspect.getmembers(sys.modules[__name__])
    for name, obj in mem:
        if inspect.isclass(obj) and issubclass(obj,BaseCrawler):
            if obj.netloc == netloc:
                return obj
    return BaseCrawler

def main():
    loop = asyncio.get_event_loop()

    c = get_crawer(sys.argv[1])(sys.argv[1], loop)
    print(c.__class__.__name__)
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


if __name__ == '__main__':
    if '--iocp' in sys.argv:
        from asyncio import events, windows_events
        sys.argv.remove('--iocp')
        logging.info('using iocp')
        el = windows_events.ProactorEventLoop()
        events.set_event_loop(el)

    main()