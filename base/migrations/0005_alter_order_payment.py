# Generated by Django 3.2.9 on 2021-12-02 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0004_alter_order_order_paid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='payment',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]
