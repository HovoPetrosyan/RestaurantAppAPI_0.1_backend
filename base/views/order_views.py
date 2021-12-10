from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from base.serializers import  ProductSerializer, OrderSerializer, TableSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.contrib.auth.models import User
from rest_framework.authentication import  SessionAuthentication, BasicAuthentication

from rest_framework import status

from base.models import Product, Order, ProductInOrder, Setting, Table
from datetime import datetime
from .table_views import IsAuthenticatedUser


@api_view(['POST'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticatedUser])
def addOrderItems(request):
    user = request.user
    data = request.data
    productInOrder = data['productInOrder']
    if productInOrder and len(productInOrder) == 0:
        return Response({'detail': 'No product in order'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # (1) Create Order
        print(data)
        _id = User.objects.get(username=data['user']).id
        order_obj = Order.objects.create(
            user=User.objects.get(id=_id),
            payment=data['payment'],
            total=data['total_price'],
            status='Paid',
            order_paid = datetime.now(),
            active=True,
        )
        # table = Table.objects.get(pk=order_obj.id)
        # table.free = True
        # table.order.clear()
        # table.save()
        
        # (2) Create order items and set order to orderitem relationship
        for i in productInOrder:
            print(i)
            product = Product.objects.get(id=i['id'])

            item = ProductInOrder.objects.create(
                product=product,
                order=order_obj,
                quantity=i['count'],
                price_per_unit = i['price'],
                total_price = i['result'],
                )
    serializer = OrderSerializer(order_obj, many=False)
    return Response(serializer.data)


# @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# def getOrderById(request, pk):
    
#     user = request.user
#     try:
#         order = Order.objects.get(id=pk)
#         if user.is_staff or order.user == user:
#             serializer = OrderSerializer(order, many=True)
#             return Response(serializer.data)
#         else:
#             return Response({'detail': 'Not authorized to view this order'}, status=status.HTTP_400_BAD_REQUEST)
#     except:
#         return Response({'detail':'Order does not exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def updateOrderTopaid(request, pk):
    # when clicks paid, then order`s paid field becomes TRUE
    # and current table order field cleares
    order = Order.objects.get(id=pk)
    
    order.status = 'Paid'
    order.order_paid = datetime.now()
    order.save()
    table = Table.objects.get(pk=order.id)
    table.free = True
    table.order.clear()
    table.save()
    return Response('Order was paid')


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)