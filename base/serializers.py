from rest_framework import serializers
from django.contrib.auth.models import  User
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Product, ProductInOrder, Order, Table, HourlyRate, ServiceFee
        
        
class UserSerializer(serializers.ModelSerializer):
    
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True) 
    isAdmin = serializers.SerializerMethodField(read_only=True) 
    
    class Meta:
        model = User
        fields = ['id', '_id', 'username', 'email', 'name', 'isAdmin']
        
        
    def get__id(self, obj):
        return obj.id  
    
    
    def get_isAdmin(self, obj):
        return obj.is_staff     
        
    def get_name(self, obj):
        name = obj.first_name
        if name == '':
            name = obj.username 
            
        return name   
        
        
class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'name', 'token']
        
    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
        
class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(read_only=True, source='category.title')
    
    class Meta:
        model = Product
        fields = ['kod_1c', 'id', 'title', 'price','category_name']
        
        
class ProductInOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductInOrder
        fields = '__all__'
    
    
class HourlyRateSerializer(serializers.ModelSerializer):
    class Meta:
        model = HourlyRate
        fields = ['hourly_rate']  
        
class ServiceFeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceFee
        fields = ['service_fee']          
          
class OrderSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True, many=False)
    hourly_rate = serializers.SerializerMethodField(read_only=True)
    service_fee = serializers.SerializerMethodField(read_only=True)
    order_id = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Order
        fields = ['user', 'order_id', 'total', 'status', 'payment', 'hourly_rate', 'service_fee']
        
    # def get_orders(self, obj):
    #     items = obj.productinorder_set.all()
    #     serializer =ProductInOrderSerializer(items, many=True)
    #     return serializer.data
    
    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many=False)
        return serializer.data
    
    def get_hourly_rate(self, obj):
        hourly_rate = obj.order_hourly_rate
        serializer = HourlyRateSerializer(hourly_rate, many=False)
        return serializer.data
    
    def get_service_fee(self, obj):
        service_fee = obj.order_service_fee
        serializer = ServiceFeeSerializer(service_fee, many=False)
        return serializer.data
    
    def get_order_id(self, obj):
        return obj.order_id

class TableSerializer(serializers.ModelSerializer):
    
    order = OrderSerializer(read_only=True, many=True)
    class Meta:
        model = Table
        fields = ['title', 'reserved', 'ordering', 'free', 'order']    