# Generated by Django 3.2.12 on 2023-09-11 15:19

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Architecture',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('architecture', models.FileField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Edge',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('prior', models.IntegerField()),
                ('next', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Group',
            fields=[
                ('group_id', models.IntegerField(primary_key=True, serialize=False)),
                ('layer_type', django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=100), blank=True, size=None)),
            ],
        ),
        migrations.CreateModel(
            name='Node',
            fields=[
                ('order', models.IntegerField(primary_key=True, serialize=False)),
                ('layer', models.CharField(max_length=200)),
                ('parameters', models.TextField()),
                ('group_id', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Pth',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('model_output', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Running',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('msg', models.CharField(default='', max_length=200, null=True)),
                ('timestamp', models.CharField(default='', max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Sort',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('sorted_ids', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='SortGroup',
            fields=[
                ('group_id', models.IntegerField(primary_key=True, serialize=False)),
                ('sorted_group_ids', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Start',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('msg', models.CharField(default='', max_length=200, null=True)),
                ('user_id', models.CharField(default='', max_length=200, null=True)),
                ('project_id', models.CharField(default='', max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Status',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('msg', models.CharField(default='', max_length=200, null=True)),
                ('user_id', models.CharField(default='', max_length=200, null=True)),
                ('project_id', models.CharField(default='', max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Stop',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('msg', models.CharField(default='', max_length=200, null=True)),
                ('user_id', models.CharField(default='', max_length=200, null=True)),
                ('project_id', models.CharField(default='', max_length=200, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='UnGroup',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('ungroup_id', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='UnGroupId',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('ungroup_id', models.IntegerField()),
            ],
        ),
    ]
