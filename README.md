# 元萌

## System Requirements
* Python version >= 3
* [lxml](http://lxml.de/installation.html)
* Redis-server
* mysql

## Installation
```
    pip install git+https://github.com/bung87/moto-moe
    pip install -r dependency_links.txt
    ${VIRTUAL_ENV}/bin/django-admin syncdb
    ${VIRTUAL_ENV}/bin/django-admin migrate
    npm install

```

## Development
```
    mysql.server start
    redis-server /usr/local/etc/redis.conf
    export DJANGO_SETTINGS_MODULE='settings.dev'
    ${VIRTUAL_ENV}/bin/django-admin runserver
    grunt

```

## Search Index

```
    ${VIRTUAL_ENV}/bin/django-admin rqworker
```
