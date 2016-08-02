# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import moto.moe.models
import django.core.validators
import django.utils.timezone
from django.conf import settings
import django.contrib.auth.models
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
        ('taggit', '0002_auto_20150616_2121'),
        ('moe', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('password', models.CharField(verbose_name='password', max_length=128)),
                ('last_login', models.DateTimeField(blank=True, verbose_name='last login', null=True)),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(unique=True, validators=[django.core.validators.RegexValidator('^[\\w.@+-]+$', 'Enter a valid username. This value may contain only letters, numbers and @/./+/-/_ characters.', 'invalid')], verbose_name='username', max_length=30, help_text='Required. 30 characters or fewer. Letters, digits and @/./+/-/_ only.', error_messages={'unique': 'A user with that username already exists.'})),
                ('first_name', models.CharField(blank=True, verbose_name='first name', max_length=30)),
                ('last_name', models.CharField(blank=True, verbose_name='last name', max_length=30)),
                ('email', models.EmailField(blank=True, verbose_name='email address', max_length=254)),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(verbose_name='date joined', default=django.utils.timezone.now)),
                ('avatar', models.ImageField(upload_to='avatars')),
                ('groups', models.ManyToManyField(blank=True, related_name='user_set', verbose_name='groups', related_query_name='user', help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', to='auth.Group')),
                ('user_permissions', models.ManyToManyField(blank=True, related_name='user_set', verbose_name='user permissions', related_query_name='user', help_text='Specific permissions for this user.', to='auth.Permission')),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Board',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('date_posted', models.DateTimeField(verbose_name='date posted', auto_now_add=True)),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Like',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('date_posted', models.DateTimeField(verbose_name='date posted', auto_now_add=True)),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-date_posted'],
            },
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(primary_key=True, verbose_name='ID', auto_created=True, serialize=False)),
                ('description', models.CharField(max_length=240, default='')),
                ('image', models.CharField(max_length=2000)),
                ('source', models.CharField(blank=True, max_length=2000, null=True)),
                ('key', models.CharField(db_index=True, max_length=255, default=moto.moe.models.uuid)),
                ('date_posted', models.DateTimeField(verbose_name='date posted', auto_now_add=True)),
                ('author', models.ForeignKey(to=settings.AUTH_USER_MODEL)),
                ('tags', taggit.managers.TaggableManager(verbose_name='Tags', through='taggit.TaggedItem', help_text='A comma-separated list of tags.', to='taggit.Tag')),
            ],
            options={
                'ordering': ['-date_posted'],
            },
        ),
        migrations.AddField(
            model_name='like',
            name='post',
            field=models.ForeignKey(related_name='likes', to='moe.Post'),
        ),
        migrations.AddField(
            model_name='board',
            name='posts',
            field=models.ForeignKey(to='moe.Post'),
        ),
        migrations.AlterUniqueTogether(
            name='like',
            unique_together=set([('author', 'post')]),
        ),
    ]
