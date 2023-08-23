"""
high level support for doing this and that.
"""
import os
import random
import string
from time import sleep
from datetime import datetime
import torch
import requests

from rest_framework.decorators import api_view
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import render
from django.http import HttpResponse

from .serializers import NodeSerializer
from .serializers import PthSerializer
from .serializers import EdgeSerializer
from .serializers import GroupSerializer
from .serializers import ArchitectureSerializer
from .serializers import StartSerializer
from .serializers import StatusSerializer
from .serializers import RunningSerializer
from .serializers import StopSerializer
from .serializers import SortSerializer

from .models import Node
from .models import Edge
from .models import Group
from .models import Pth
from .models import Architecture
from .models import Start
from .models import Running
from .models import Sort

from .graph import CGraph, CEdge, CNode, CShow2
from .binder import CPyBinder

import json
from collections import OrderedDict

# Create your views here.


@api_view(['GET', 'POST', 'DELETE', 'UPDATE'])
# pylint: disable = invalid-name, inconsistent-return-statements
def mainList(request):
    '''
        main List
    '''
    # pylint: disable = no-else-return, no-member
    if request.method == 'GET':
        return render(request, 'index.html')
    return render(request, 'index.html')


@api_view(['GET', 'POST'])
def nodelist():
    '''
    node list
    '''
    nodes = Node.objects.all()
    serializer = NodeSerializer(nodes, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def edgelist():
    '''
    edge list
    '''
    edges = Edge.objects.all()
    serializer = EdgeSerializer(edges, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST'])
def grouplist():
    '''
    node list
    '''
    groups = Group.objects.all()
    serializer = GroupSerializer(groups, many=True)
    return Response(serializer.data)

@api_view(['GET', 'POST', 'DELETE', 'UPDATE'])
def pthlist(request):
    '''
    pth list
    '''
    print("pth")
    if request.method == 'GET':
        pth = Pth.objects.all()
        serializer = PthSerializer(pth, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        print("post")
        #CShow2()
        host_ip = str(request.get_host())[:-5]
        print(host_ip)
        edges = Edge.objects.all()
        nodes = Node.objects.all()
        if nodes and edges:
            created_model = make_branches(nodes, edges)
            file_path = (os.getcwd() + '/model_' +
                         random_char(8) + '.pt').replace("\\", '/')

            torch.save(created_model, file_path)
            serializer = PthSerializer(data={'model_output': file_path})
            if serializer.is_valid():
                print("valid")
                serializer.save()
                # pylint: disable = invalid-name, missing-timeout, unused-variable
                r = requests.get(
                    'http://' + host_ip + ':8085/status_report?container_id="vis2code"'+'&user_id=""&project_id=""&status="success"',verify=False)
                return Response(serializer.data,
                                status=status.HTTP_201_CREATED)

            if not serializer.is_valid():
                print("invalid")
                print(serializer.errors)
                serializer.save()
                return Response("invalid pth",
                                status=status.HTTP_400_BAD_REQUEST)
        return Response("invalid node or edge",
                        status=status.HTTP_400_BAD_REQUEST)


    return None

@api_view(['GET', 'POST', 'DELETE', 'UPDATE'])
def sortlist(request):
    '''
    pth list
    '''
    print("sort")
    if request.method == 'GET':
        sort = Sort.objects.all()
        serializer = SortSerializer(sort, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        print("post")
        # CShow2()
        host_ip = str(request.get_host())[:-5]
        print(host_ip)
        edges = Edge.objects.all()
        nodes = Node.objects.all()
        if nodes and edges:
            sorted_ids = post_sorted_id(nodes, edges)
            sorted_ids_str = ''
            for id in sorted_ids:
                sorted_ids_str = sorted_ids_str+id+','
            #print('3435453254', sorted_ids_str)

            serializer = SortSerializer(data={'id': 1, 'sorted_ids': sorted_ids_str[:-1]})
            if serializer.is_valid():
                print("valid")
                serializer.save()
                # pylint: disable = invalid-name, missing-timeout, unused-variable
                return Response(serializer.data,
                                status=status.HTTP_201_CREATED)
            if not serializer.is_valid():
                print("invalid")
                print(serializer.errors)
                serializer.save()
                return Response("invalid pth",
                                status=status.HTTP_400_BAD_REQUEST)
        return Response("invalid node or edge",
                        status=status.HTTP_400_BAD_REQUEST)

    return None


@api_view(['GET', 'POST', 'DELETE', 'UPDATE'])
def sort_group_list(request):
    '''
    pth list
    '''
    print("sort")
    if request.method == 'GET':
        sort = Sort.objects.all()
        serializer = SortSerializer(sort, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        print("post")
        # CShow2()
        host_ip = str(request.get_host())[:-5]
        print(host_ip)
        edges = Edge.objects.all()
        nodes = Node.objects.all()
        if nodes and edges:
            sorted_ids = post_sorted_id(nodes, edges)
            sorted_ids_str = []
            for id in sorted_ids:
                sorted_ids_str.append(id)
            print(sorted_ids_str)
            ###type list
            sorted_type_str = []
            sorted_parms_str = []

            for node_id in sorted_ids:
                d1 = Node.objects.get(order=node_id)
                sorted_type_str.append(d1.layer)
                sorted_parms_str.append(d1.parameters)

            groups = Group.objects.all()
            for group in groups:
                for i in range(len(sorted_ids_str)):
                    is_group = 0
                    node = Node.objects.get(order=sorted_ids_str[i])
                    if node.group_id != 0:
                        continue

                    for j in range(len(group.layer_type)):
                        if sorted_type_str[i+j] == group.layer_type[j]:
                            is_group = 1
                        else:
                            is_group = 0
                            break

                    if is_group == 1:
                        for k in range(len(group.layer_type)):
                            change_node = Node.objects.get(order=sorted_ids_str[i+k])
                            change_node.group_id = group.group_id
                            change_node.save()
                print('group.group_id: ', group.group_id)
                print('group.layer_type: ', group.layer_type)

            sorted_ids_grouped = sorted_ids_str.copy()
            sorted_types_grouped = sorted_type_str.copy()
            sorted_params_grouped = sorted_parms_str.copy()

            for group in groups:
                m = group.group_id
                n = group.layer_type

                tmp = 0
                for i in range(len(sorted_ids_str)):
                    x = Node.objects.get(order = sorted_ids_str[i])
                    if x.group_id == m:
                        if i < tmp:
                            continue
                        tmp_id = []
                        tmp_type = []
                        tmp_params = []
                        for j in range(len(n)):
                            tmp_id.append(sorted_ids_str[i+j])
                            tmp_type.append(sorted_type_str[i+j])
                            tmp_params.append(sorted_parms_str[i+j])
                        sorted_ids_grouped[i] = tmp_id
                        sorted_types_grouped[i] = tmp_type
                        sorted_params_grouped[i] = tmp_params
                        for k in range(len(n)-1):
                            sorted_ids_grouped[i+k+1] = '0'
                            sorted_types_grouped[i + k + 1] = '0'
                            sorted_params_grouped[i + k + 1] = '0'
                        tmp = i + len(n)

            remove_set=['0']
            sorted_ids_grouped = [g for g in sorted_ids_grouped if g not in remove_set]
            sorted_types_grouped = [g for g in sorted_types_grouped if g not in remove_set]
            sorted_params_grouped = [g for g in sorted_params_grouped if g not in remove_set]
            sorted_group_id_grouped = [0 for i in range(len(sorted_types_grouped))]

            for a in range (len(sorted_types_grouped)):
                for group in groups:
                    if(sorted_types_grouped[a]==group.layer_type):
                        sorted_group_id_grouped[a] = group.group_id
                    elif sorted_types_grouped[a]!=group.layer_type and sorted_types_grouped[a]!=0:
                        continue
                    else:
                        sorted_group_id_grouped[a] = 0

            # print('removed_sorted_ids_grouped: ', sorted_ids_grouped)
            # print('removed_sorted_types_grouped: ', sorted_types_grouped)
            # print('sorted_group_id_grouped: ', sorted_group_id_grouped)

            file_data = OrderedDict()
            file_data['output'] = []

            for c in range(len(sorted_group_id_grouped)):

                #print('sorted_group_id_grouped[c]: ', type(sorted_group_id_grouped[c]))
                if sorted_group_id_grouped[c] != 0:
                    #print('heelo')
                    file_data['output'].append({
                        "groupId": sorted_group_id_grouped[c],
                        "layer": sorted_types_grouped[c],
                        "nodeId": sorted_ids_grouped[c],
                        "parameters": None
                    })
                else:
                    file_data['output'].append({
                        "groupId": sorted_group_id_grouped[c],
                        "layer": sorted_types_grouped[c],
                        "nodeId": sorted_ids_grouped[c],
                        "parameters": sorted_params_grouped[c]
                    })

            #print(file_data)

            # print(json.dumps(file_data, ensure_ascii=False, indent="\t"))

            #return Response(status=status.HTTP_201_CREATED)
            return Response(file_data, status=status.HTTP_201_CREATED)

        return Response("invalid node or edge",
                        status=status.HTTP_400_BAD_REQUEST)

    return None


@api_view(['GET', 'POST', 'DELETE', 'UPDATE'])
def sortlist_detail(request, pk):
    '''
    pth list
    '''
    try:
        pev_sorted_ids = Sort.objects.get(pk=pk)
    except Sort.DoesNotExist:
        print('sort detail 안 됨 ~~~')
        return Response(status=status.HTTP_404_NOT_FOUND)
    print("sort")
    if request.method == 'GET':
        serializer = SortSerializer(pev_sorted_ids)
        return Response(serializer.data)
    if request.method == 'DELETE':
        pev_sorted_ids.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET', 'POST', 'DELETE', 'UPDATE'])
# pylint: disable = invalid-name, inconsistent-return-statements
def startList(request):
    '''
        start List
    '''
    # pylint: disable = no-else-return, no-member
    if request.method == 'GET':
        try:
            user_id = request.GET['user_id']
            project_id = request.GET['project_id']
            serializer = StartSerializer(data={'msg': 'started',
                                               'user_id': user_id,
                                               'project_id': project_id})
            if serializer.is_valid():
                serializer.save()
            else:
                sleep(3)
                host_ip = str(request.get_host())[:-5]
                # pylint: disable =invalid-name,missing-timeout,unused-variable
                r = requests.get('http://'+host_ip+':8085/status_report?'
                                                   'container_id="vis2code"&'
                                                   'user_id=""&project_id=""'
                                                   '&status="success"',
                                 verify=False)
            return HttpResponse('started',
                                content_type="text/plain")
            # return Response(serializer.data)
        # pylint: disable = broad-except
        except Exception as e:
            return HttpResponse(e, HttpResponse)
    else:
        print('no request')


@api_view(['GET', 'POST', 'DELETE', 'UPDATE'])
# pylint: disable = invalid-name, inconsistent-return-statements
def stopList(request):
    '''
        stop List
    '''
    # pylint: disable = no-else-return, no-member
    if request.method == 'GET':
        try:
            user_id = request.GET['user_id']
            project_id = request.GET['project_id']
            serializer = StopSerializer(data={'msg': 'stopped',
                                              'user_id': user_id,
                                              'project_id': project_id})
            if serializer.is_valid():
                serializer.save()
            return HttpResponse(serializer.data['msg'],
                                content_type="text/plain")
            # return Response(serializer.data)
        # pylint: disable = broad-except
        except Exception as e:
            return HttpResponse(e, HttpResponse)
    else:
        print('no request')


@api_view(['GET', 'POST', 'DELETE', 'UPDATE'])
# pylint: disable = invalid-name, inconsistent-return-statements
def statusList(request):
    '''
        status List
    '''
    # pylint: disable = no-else-return, no-member
    if request.method == 'GET':
        try:
            user_id = request.GET['user_id']
            project_id = request.GET['project_id']

            serializer = StatusSerializer(data={'msg': 'status',
                                                'user_id': user_id,
                                                'project_id': project_id
                                                })

            # timestamp 값 가져오기
            host_ip = str(request.get_host())[:-5]
            # pylint: disable=missing-timeout
            get_time = requests.get('http://' +
                                    host_ip +
                                    ':8091/api/running/', verify=False)
            time = get_time.text[-16:-3]
            # 현재 시점의 timestamp와 비교하기
            saved_time = datetime.fromtimestamp(int(time)/1000)
            now = datetime.now()
            diff = now - saved_time
            diff_sec = diff.seconds
            print("diff_sec: ", diff_sec)

            if diff_sec > 60:  # 1분 이상이면
                # started를 running으로 변경
                if serializer.is_valid():
                    serializer.save()
                    return HttpResponse('running',
                                        content_type="text/plain")
                else:
                    print(serializer.errors)
                    return HttpResponse('is_not_valid',
                                        content_type="text/plain")
            else:
                return HttpResponse('started',
                                    content_type="text/plain")

        # pylint: disable=broad-except
        except Exception:
            return HttpResponse('failed',
                                content_type="text/plain")
    else:
        print('no request')


@api_view(['GET', 'POST', 'DELETE', 'UPDATE'])
# pylint: disable = invalid-name, inconsistent-return-statements
def runningList(request):
    '''
        running List
    '''
    # pylint: disable = no-else-return, no-member
    if request.method == 'GET':
        running = Running.objects.all()
        serializer = RunningSerializer(running, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        running = Running.objects.all()
        serializer = RunningSerializer(data=running)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    else:
        print('no request')
    # running = Running.objects.all()
    # print(running.values()[len(running.values()) - 1])


@api_view(['GET', 'POST', 'DELETE', 'UPDATE'])
def architecturelist():
    '''
    architecture list
    '''
    architecture = Architecture.objects.all()
    serializer = ArchitectureSerializer(architecture, many=True)
    return Response(serializer.data)


class NodeView(viewsets.ModelViewSet):
    # pylint: disable=too-many-ancestors
    '''
    Node View
    '''
    serializer_class = NodeSerializer
    queryset = Node.objects.all()

    def print_serializer(self):
        '''
        print serializer class
        '''
        print("Node serializer")

    def print_objects(self):
        '''
        print objects
        '''
        print("Node objects")


class EdgeView(viewsets.ModelViewSet):
    # pylint: disable=too-many-ancestors
    '''
    Edge View
    '''
    serializer_class = EdgeSerializer
    queryset = Edge.objects.all()

    def print_serializer(self):
        '''
        print serializer class
        '''
        print("Edge serializer")

    def print_objects(self):
        '''
        print objects
        '''
        print("Edge objects")

class GroupView(viewsets.ModelViewSet):
    # pylint: disable=too-many-ancestors
    '''
    Edge View
    '''
    serializer_class = GroupSerializer
    queryset = Group.objects.all()

    def print_serializer(self):
        '''
        print serializer class
        '''
        print("Group serializer")

    def print_objects(self):
        '''
        print objects
        '''
        print("Group objects")


class PthView(viewsets.ModelViewSet):
    # pylint: disable=too-many-ancestors
    '''
    Pth View
    '''
    serializer_class = PthSerializer
    queryset = Pth.objects.all()

    def print_serializer(self):
        '''
        print serializer class
        '''
        print("Pth serializer")

    def print_objects(self):
        '''
        print objects
        '''
        print("Pth objects")


class SortView(viewsets.ModelViewSet):
    # pylint: disable=too-many-ancestors
    '''
    Pth View
    '''
    serializer_class = SortSerializer
    queryset = Sort.objects.all()

    def print_serializer(self):
        '''
        print serializer class
        '''
        print("Sort serializer")

    def print_objects(self):
        '''
        print objects
        '''
        print("Sort objects")


class ArchitectureView(viewsets.ModelViewSet):
    # pylint: disable=too-many-ancestors
    '''
    Architecture View
    '''
    serializer_class = ArchitectureSerializer
    queryset = Architecture.objects.all()

    def print_serializer(self):
        '''
        print serializer class
        '''
        print("Architecture serializer")

    def print_objects(self):
        '''
        print objects
        '''
        print("Architecture queryset")


# pylint: disable = too-many-ancestors
class StartView(viewsets.ModelViewSet):
    '''
        Start View
    '''
    # pylint: disable = no-member
    serializer_class = StartSerializer
    queryset = Start.objects.all()

    def print_serializer(self):
        '''
        print serializer class
        '''
        print("Start serializer")

    def print_objects(self):
        '''
        print objects
        '''
        print("Start queryset")


# pylint: disable = too-many-ancestors


class RunningView(viewsets.ModelViewSet):
    '''
        Running View
    '''
    # pylint: disable = no-member
    serializer_class = RunningSerializer
    queryset = Running.objects.all()

    def print_serializer(self):
        '''
        print serializer class
        '''
        print("Running serializer")

    def print_objects(self):
        '''
        print objects
        '''
        print("Running queryset")


# pylint: disable = too-many-ancestors


# class StopView(viewsets.ModelViewSet):
#     '''
#         Stop View
#     '''
#     # pylint: disable = no-member
#     serializer_class = StopSerializer
#     queryset = Stop.objects.all()

#     def print_serializer(self):
#         '''
#         print serializer class
#         '''
#         print("Stop serializer")

#     def print_objects(self):
#         '''
#         print objects
#         '''
#         print("Stop queryset")


def make_branches(get_node, get_edge):
    '''
    test branches
    '''
    graph = CGraph()
    self_binder = CPyBinder()
    for node in get_node:
        # pylint: disable-msg=bad-option-value, consider-using-f-string
        params_string = "{parameters}". \
            format(**node.__dict__).replace("\n", ',')
        # pylint: disable-msg=bad-option-value, eval-used
        graph.addnode(CNode("{order}".format(**node.__dict__),
                            type_="{layer}".format(**node.__dict__),
                            params=eval("{" + params_string + "}")))
    for edge in get_edge:
        # pylint: disable-msg=bad-option-value, consider-using-f-string
        graph.addedge(CEdge("{prior}".format(**edge.__dict__),
                            "{next}".format(**edge.__dict__)))
    net = CPyBinder.exportmodel(self_binder, graph)
    print(net)
    return net

def post_sorted_id(get_node, get_edge):
    '''
    test branches
    '''
    graph = CGraph()
    self_binder = CPyBinder()
    for node in get_node:
        # pylint: disable-msg=bad-option-value, consider-using-f-string
        params_string = "{parameters}". \
            format(**node.__dict__).replace("\n", ',')
        # pylint: disable-msg=bad-option-value, eval-used
        graph.addnode(CNode("{order}".format(**node.__dict__),
                            type_="{layer}".format(**node.__dict__),
                            params=eval("{" + params_string + "}")))
    for edge in get_edge:
        # pylint: disable-msg=bad-option-value, consider-using-f-string
        graph.addedge(CEdge("{prior}".format(**edge.__dict__),
                            "{next}".format(**edge.__dict__)))
    sorted_ids = CPyBinder.sort_id(self_binder, graph)
    return sorted_ids


def random_char(number):
    '''
    return random strings
    '''
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for x in range(number))
