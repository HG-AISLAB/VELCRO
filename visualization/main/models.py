"""
high level support for doing this and that.
"""
from django.db import models
from django.contrib.postgres.fields import ArrayField

class Node(models.Model):
    # pylint: disable=too-few-public-methods, missing-class-docstring
    objects = models.Manager()
    order = models.IntegerField(primary_key=True)
    layer = models.CharField(max_length=200)
    parameters = models.TextField()
    group_id = models.IntegerField(primary_key=False, null=False, default=0)


class Edge(models.Model):
    # pylint: disable=too-few-public-methods, missing-class-docstring
    objects = models.Manager()
    id = models.IntegerField(primary_key=True)
    prior = models.IntegerField()
    next = models.IntegerField()


class Group(models.Model):
    objects = models.Manager()
    group_id = models.IntegerField(primary_key=True)
    layer_type = ArrayField(models.CharField(max_length=100), blank=True)


class UnGroupId(models.Model):
    objects = models.Manager()
    id = models.IntegerField(primary_key=True)
    ungroup_id = models.IntegerField()



class UnGroup(models.Model):
    objects = models.Manager()
    id = models.IntegerField(primary_key=True)
    ungroup_id = models.IntegerField()


class Pth(models.Model):
    # pylint: disable=too-few-public-methods, missing-class-docstring
    objects = models.Manager()
    model_output = models.CharField(max_length=200)


class Architecture(models.Model):
    # pylint: disable=too-few-public-methods, missing-class-docstring
    objects = models.Manager()
    architecture = models.FileField()


class Sort(models.Model):
    # pylint: disable=too-few-public-methods, missing-class-docstring
    objects = models.Manager()
    id = models.IntegerField(primary_key=True)
    sorted_ids = models.TextField()


class SortGroup(models.Model):
    objects = models.Manager()
    group_id = models.IntegerField(primary_key=True)
    sorted_group_ids = models.TextField()


class Start(models.Model):
    # pylint: disable=too-few-public-methods, missing-class-docstring
    msg = models.CharField(max_length=200, null=True, default='')
    user_id = models.CharField(max_length=200, null=True, default='')
    project_id = models.CharField(max_length=200, null=True, default='')


class Status(models.Model):
    # pylint: disable=too-few-public-methods, missing-class-docstring
    msg = models.CharField(max_length=200, null=True, default='')
    user_id = models.CharField(max_length=200, null=True, default='')
    project_id = models.CharField(max_length=200, null=True, default='')


class Running(models.Model):
    # pylint: disable=too-few-public-methods, missing-class-docstring
    objects = models.Manager()
    msg = models.CharField(max_length=200, null=True, default='')
    timestamp = models.CharField(max_length=200, null=True, default='')


class Stop(models.Model):
    # pylint: disable=too-few-public-methods, missing-class-docstring
    msg = models.CharField(max_length=200, null=True, default='')
    user_id = models.CharField(max_length=200, null=True, default='')
    project_id = models.CharField(max_length=200, null=True, default='')
