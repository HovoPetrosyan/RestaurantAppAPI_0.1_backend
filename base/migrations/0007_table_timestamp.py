# Generated by Django 3.2.9 on 2021-12-09 06:47

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_auto_20211206_1211'),
    ]

    operations = [
        migrations.AddField(
            model_name='table',
            name='timestamp',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
