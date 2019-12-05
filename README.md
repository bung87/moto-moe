# 元萌 [![Build Status](https://travis-ci.org/bung87/moto-moe.svg?branch=master)](https://travis-ci.org/bung87/moto-moe)
![brower preview](artwork.png)  

## features  
 * Single page application, but also server side render as same as frontend's url routes
 * Single version templates support both frontend and backend.
 * i18n support, single version i18n file support both frontend and backend.
 * with Whoosh support fullTextSearch
 * Implemented async crawer  `moe.utils.crawer.py` support Pixiv and Seiga

## Technology stack
* [Django](https://www.djangoproject.com/)
* [Backbone.js](http://backbonejs.org/) ([lodash](https://lodash.com/) as dependency)
* [requirejs](http://requirejs.org/)
* see [requirements.txt](./requirements.txt) [dependency_links.txt](./dependency_links.txt) [bower.json](./bower.json) for full list  

## System Requirements
* Python version >= 3
* [lxml](http://lxml.de/installation.html)
* Redis-server
* Mysql  
* gettext

## Prerequisites  
### mysqlclient  
`sudo apt-get install python-dev libmysqlclient-dev` # Debian / Ubuntu  
`sudo yum install python-devel mysql-devel` # Red Hat / CentOS  
### lxml  
`sudo apt-get install libxml2-dev libxslt-dev python3-dev python3-lxml` # Debian / Ubuntu  
`sudo yum install libxml2-devel libxslt-devel python3-devel python3-lxml` # Red Hat / CentOS  
`STATIC_DEPS=true sudo easy_install lxml` # MacOS-X
### gettext
`sudo apt-get install gettext` # Debian / Ubuntu  
`sudo yum install gettext` # Red Hat / CentOS  
### libjpeg (Pillow depends on)
install libjpeg-dev with apt  
`sudo apt-get install libjpeg-dev` # Debian / Ubuntu  
if you're on Ubuntu 14.04, also install this  
`sudo apt-get install libjpeg8-dev` # Debian / Ubuntu  
`sudo yum install --assumeyes libjpeg-devel` # Red Hat / CentOS  
## Installation
```
    pip install https://github.com/bung87/moto-moe/archive/<latest_release>.zip
    pip install -r https://raw.githubusercontent.com/bung87/moto-moe/master/dependency_links.txt
    cd `<installation_location>` && npm install && bower install

```
## Data migration 
```
    ${VIRTUAL_ENV}/bin/django-admin syncdb
    ${VIRTUAL_ENV}/bin/django-admin migrate
```
## Development
```
    git clone git@github.com:bung87/moto-moe.git
    pip install -r requirements.txt && pip install -r dependency_links.txt
    #follow Data migration 
    npm install && bower install
    grunt #build static files
    ./manage.py runserver

```
## Deployment
    # use grunt building static files
    export PYTHONPATH=./
    cp moto/moe/settings.py ./
    export DJANGO_SETTINGS_MODULE='settings'
    #follow Data migration 
    ${VIRTUAL_ENV}/bin/django-admin collectstatic #collect static files to assets directory  
    ${VIRTUAL_ENV}/bin/django-admin compilemessages # complie i18n file,currently support English,Chinese,Japanese  
    gunicorn moto.moe.wsgi:application -c `<your_gunicorn_configuration_directory>`gunicorn_conf.py

## Packaging
    python setup.py sdist

## Search Index

```
    ${VIRTUAL_ENV}/bin/django-admin rqworker
```

## License
The MIT License (MIT)

Copyright (c) 2015 Bung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.