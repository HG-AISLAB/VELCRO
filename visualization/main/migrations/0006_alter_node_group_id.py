# Generated by Django 3.2 on 2023-08-02 05:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_alter_node_group_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='node',
            name='group_id',
            field=models.IntegerField(),
        ),
    ]
