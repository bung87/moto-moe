# 元萌 [![Build Status](https://travis-ci.org/bung87/moto-moe.svg?branch=master)](https://travis-ci.org/bung87/moto-moe)
![brower preview](moto.moe_brower_preview_2015-08-29.png)  
## System Requirements
* Python version >= 3
* [lxml](http://lxml.de/installation.html)
* Redis-server
* Mysql

## Installation
```
    sudo apt-get install python3-lxml
    pip install git+https://github.com/bung87/moto-moe 
    pip install -r https://raw.githubusercontent.com/bung87/moto-moe/master/dependency_links.txt
    npm install

```
## Data migration 
```
    ${VIRTUAL_ENV}/bin/django-admin syncdb
    ${VIRTUAL_ENV}/bin/django-admin migrate
```
## Development
```
    mysql.server start
    redis-server /usr/local/etc/redis.conf
    export DJANGO_SETTINGS_MODULE='your_package.settings'
    ${VIRTUAL_ENV}/bin/django-admin runserver
    grunt #build static files

```

## Search Index

```
    ${VIRTUAL_ENV}/bin/django-admin rqworker
```
