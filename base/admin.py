from django.contrib import admin
from .models import *

admin.site.register(ServiceFee)
admin.site.register(HourlyRate)



class ProductInOrderInline(admin.TabularInline):
    model = ProductInOrder
    extra = 0

class ProductAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Product._meta.fields]

    class Meta:
        model = Product


admin.site.register(Product, ProductAdmin)
admin.site.register(Category)


from django.contrib import admin

# Register your models here.
from .models import *

admin.site.register(Setting)
admin.site.register(PaymentSystem)

# admin.site.register(Hall)


class TableAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Table._meta.fields]

admin.site.register(Table, TableAdmin)



class OrderAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Order._meta.fields]
    inlines = [ProductInOrderInline]


    class Meta:
        model = Order


admin.site.register(Order, OrderAdmin)


# class ProductInOrderResource(resources.ModelResource):
#     product = Field(
#         column_name='product',
#         attribute='product',
#         widget=ForeignKeyWidget(Product, 'title')
#     )
#     class Meta:
#         model = ProductInOrder


#     def dehydrate_full_title(self, productinorder):
#         return '%s by %s' % (productinorder.product.title, productinorder.product.price)


class ProductInOrderAdmin(admin.ModelAdmin):

    list_display = [field.name for field in ProductInOrder._meta.fields]
    # resource_class =  ProductInOrderResource
    # class Meta:
    #     model = ProductInOrder


admin.site.register(ProductInOrder, ProductInOrderAdmin)
