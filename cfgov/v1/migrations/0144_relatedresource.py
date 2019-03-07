# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2019-02-26 21:15
from __future__ import unicode_literals

from django.db import migrations, models
import wagtail.wagtailcore.fields
import wagtail.wagtailsearch.index


class Migration(migrations.Migration):

    dependencies = [
        ('v1', '0143_rm_formfieldwithbutton'),
    ]

    operations = [
        migrations.CreateModel(
            name='RelatedResource',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('text', wagtail.wagtailcore.fields.RichTextField()),
            ],
            bases=(wagtail.wagtailsearch.index.Indexed, models.Model),
        ),
    ]