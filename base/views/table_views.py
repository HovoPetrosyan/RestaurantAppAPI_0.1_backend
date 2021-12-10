from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.serializers import TableSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import generics, permissions
from base.models import Table
from datetime import datetime
from rest_framework.views import APIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
import datetime

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def getTables(request):
#     tables = Table.objects.all().filter(is_active=True)
#     serializer = TableSerializer(tables, many=True)
#     return Response(serializer.data)

class IsAuthenticatedUser(permissions.BasePermission):
    
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user



class TableListView(APIView):
    """
    View all active tables.
    * requires token authentication.
    """
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = (IsAuthenticatedUser,)
    
    def get(self, request):
        """
            Returns a list of "is_active" tables.
        """
        tables = Table.objects.all().filter(is_active=True)
        serializer = TableSerializer(tables, many=True)
        return Response(serializer.data)
        

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def TableUpdateView(request):
    print(request.data)
    _id = request.data['id']
    table = Table.objects.get(id=_id)
    if request.data['type'] == 'order':
        table.ordering = True    
        table.free = False
        table.timestamp = datetime.datetime.now()
    elif request.data['type'] == 'reserve':
        table.reserved = True
        table.free = False
    table.save()
    serializer = TableSerializer(table, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def unmarkTableReserve(request):
    _id = request.data['id']
    table = Table.objects.get(id=_id)
    table.reserved = False
    table.save()
    serializer = TableSerializer(table, many=False)
    return Response(serializer.data)