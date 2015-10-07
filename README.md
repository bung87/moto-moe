# 元萌 [![Build Status](https://travis-ci.org/bung87/moto-moe.svg?branch=master)](https://travis-ci.org/bung87/moto-moe)
![brower preview](artwork.png)  

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
### gettext
`sudo apt-get install gettext` # Debian / Ubuntu  
`sudo yum install gettext` # Red Hat / CentOS  

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
    PYTHONPATH=./ python moto/manage.py runserver
    npm install && bower install
    grunt #build static files

```
## Deployment
    # use grunt building static files 
    export DJANGO_SETTINGS_MODULE='your_package.settings_module'
    #follow Data migration 
    ${VIRTUAL_ENV}/bin/django-admin collectstatic #collect static files to assets directory  
    ${VIRTUAL_ENV}/bin/django-admin compilemessages # complie i18n file,currently support English,Chinese,Japanese  
    gunicorn moto.moe.wsgi:application -c `<your_gunicorn_configuration_directory>`gunicorn_conf.py --pythonpath ./

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