# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('moe', '0002_auto_20160801_0747'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='signature',
            field=models.CharField(max_length=240, default=''),
        ),
    ]
