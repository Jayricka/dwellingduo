# Generated by Django 5.1.1 on 2024-11-17 13:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0003_property_owner_alter_property_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='property',
            name='available',
            field=models.CharField(choices=[('on_rent', 'On Rent'), ('for_sale', 'For Sale')], default='on_rent', max_length=10),
        ),
    ]
