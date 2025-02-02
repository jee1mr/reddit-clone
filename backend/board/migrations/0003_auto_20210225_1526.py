# Generated by Django 3.1.6 on 2021-02-25 15:26

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('board', '0002_auto_20210225_1525'),
    ]

    operations = [
        migrations.AlterField(
            model_name='board',
            name='banned',
            field=models.ManyToManyField(blank=True, related_name='banned', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='board',
            name='members',
            field=models.ManyToManyField(blank=True, related_name='members', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='board',
            name='moderators',
            field=models.ManyToManyField(blank=True, related_name='moderators', to=settings.AUTH_USER_MODEL),
        ),
    ]
