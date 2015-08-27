export DJANGO_SETTINGS_MODULE='settings.dev'
${VIRTUAL_ENV}/bin/django-admin runserver
gunicorn moe.wsgi:application -c settings/gunicorn_conf.py