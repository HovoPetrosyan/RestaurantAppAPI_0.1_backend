from django.db import models
from django.db.models.signals import pre_save, post_save
from django.urls import reverse
from .utils import unique_order_id_generator
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _

# Create your models here.


class HourlyRate(models.Model):
    hourly_rate = models.DecimalField(
        max_digits=15, decimal_places=2, blank=True, null=True, default=0.0, unique=True
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Hourly rate")
        verbose_name_plural = _("Hourly rates")

    def __str__(self):
        return str(self.hourly_rate)


class ServiceFee(models.Model):
    service_fee = models.DecimalField(
        max_digits=15, decimal_places=2, blank=True, null=True, default=0.0, unique=True
    )
    is_active = models.BooleanField(default=True)

    class Meta:
        verbose_name = _("Service Fee")
        verbose_name_plural = _("Service Fees")

    def __str__(self):
        return str(self.service_fee)


class Setting(models.Model):
    title = models.CharField(max_length=255)
    icon = models.ImageField(upload_to="icon/", blank=True, null=True)

    class Meta:
        verbose_name = _("Setting")
        verbose_name_plural = _("Settings")

    def __str__(self):
        return self.title


class Category(models.Model):
    kod_1c = models.CharField(max_length=30, unique=True, blank=True, null=True)
    title = models.CharField(max_length=50)
    thumbnail = models.ImageField(upload_to="category/", blank=True, null=True)

    class Meta:
        verbose_name = _("Category")
        verbose_name_plural = _("Categories")

    def __str__(self):
        return self.title


class Product(models.Model):
    kod_1c = models.CharField(max_length=30, unique=True, blank=True, null=True)
    category = models.ForeignKey(
        Category, blank=True, null=True, on_delete=models.CASCADE
    )
    title = models.CharField(max_length=155)
    price = models.DecimalField(decimal_places=2, max_digits=15, default=0.00)
    image = models.ImageField(upload_to="product_images/", null=True, blank=True)

    class Meta:
        verbose_name = _("Product")
        verbose_name_plural = _("Products")

    def __str__(self):
        return f"{self.title}, {self.price}"


class Table(models.Model):
    title = models.CharField(max_length=50)
    order = models.ManyToManyField("Order", blank=True)
    reserved = models.BooleanField(default=False)
    ordering = models.BooleanField(default=False)
    free = models.BooleanField(default=True)
    timestamp = models.DateTimeField(auto_now_add=False)
    is_active = models.BooleanField(default=True)


    class Meta:
        verbose_name = _("Table")
        verbose_name_plural = _("Tables")

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse("restaurantapp:table_detail", kwargs={"pk": self.pk})
                    
        

class OrderManager(models.Manager):
    def new_or_get(self, request):
        order_id = request["order_id"]
        print(order_id)
        qs = self.get_queryset().filter(id=order_id)
        if qs.count() == 1:
            new_obj = False
            order_obj = qs.first()
            if request.user.is_authenticated and order_obj.user is None:
                order_obj.user = request.user
                order_obj.save()
        else:
            order_obj = Order.objects.new(user=request.user)
            new_obj = True
            request.session["order_id"] = order_obj.id
        return order_obj, new_obj

    def new(self, user=None):
        user_obj = None
        if user is not None:
            if user.is_authenticated:
                user_obj = user
        return self.model.objects.create(user=user_obj)


STATUS_CHOICES = (
    ("New", "new"),
    ("Paid", "paid"),
)


class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    order_id = models.CharField(max_length=120, blank=True)
    total = models.DecimalField(default=0.0, max_digits=15, decimal_places=2)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="New")
    active = models.BooleanField(default=True)
    payment = models.CharField(max_length=255, blank=True, null=True)
    order_hourly_rate = models.OneToOneField(
        HourlyRate, on_delete=models.SET_NULL, null=True
    )
    order_service_fee = models.OneToOneField(
        ServiceFee, on_delete=models.SET_NULL, null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    order_paid = models.DateTimeField(auto_now_add=False, null=True, blank=True)
    # objects = OrderManager()

    class Meta:
        verbose_name = _("Order")
        verbose_name_plural = _("Orders")

    def __str__(self):
        return str(self.order_id)

    # def save(self, force_insert=False, force_update=False, using=None,
    #          update_fields=None):
    #     # order_products = self.products.
    #     for product in productinorder_set.all():
    #         self.products.add(product)


def pre_save_create_order_id(sender, instance, *args, **kwargs):
    if not instance.order_id:
        instance.order_id = unique_order_id_generator(instance)
    # qs = Order.objects.filter(chek=instance.chek)
    # if qs.exists():
    #     qs.update(active=True)


pre_save.connect(pre_save_create_order_id, sender=Order)


class ProductInOrder(models.Model):
    order = models.ForeignKey(Order, blank=True, null=True, on_delete=models.CASCADE)
    product = models.ForeignKey(
        Product, blank=True, null=True, on_delete=models.CASCADE
    )
    quantity = models.IntegerField(default=0)
    price_per_unit = models.DecimalField(decimal_places=2, max_digits=15, default=0.00)
    total_price = models.DecimalField(decimal_places=2, max_digits=15, default=0.00)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _("Product In Order")
        verbose_name_plural = _("Products In Order")

    def __str__(self):
        return self.product.title

    def save(self, *args, **kwargs):
        price_per_unit = self.product.price
        self.price_per_unit = price_per_unit
        self.total_price = self.quantity * self.price_per_unit

        super(ProductInOrder, self).save(*args, **kwargs)


# pagelem testi hamar appic stanalu hamar {start}


def product_in_order_post_save(sender, instance, created, **kwargs):
    order = instance.order
    all_products_in_order = ProductInOrder.objects.filter(order=order)

    hour_rate = HourlyRate.objects.all().filter(is_active=True).first()
    service_fee = ServiceFee.objects.all().filter(is_active=True).first()
    # ordered_hours = Table.objects.()
    final_rate = 0
    # if ordered_hours > 0:
    #     ordered_hour = ordered_hours * 10000
        # final_rate = ordered_hour * hour_rate + service_fee


    order_total_price = 0
    for item in all_products_in_order:
        # product = Product.objects.get(pk=item.pk)
        order_total_price += item.total_price
        # order.products.add(product)

    instance.order.total = order_total_price #+ final_rate
    instance.order.save(force_update=True)


post_save.connect(product_in_order_post_save, sender=ProductInOrder)

# pagelem testi hamar appic stanalu hamar {end}


class PaymentSystem(models.Model):
    title = models.CharField(max_length=30)

    class Meta:
        verbose_name = _("Payment System")
        verbose_name_plural = _("Payment Systems")

    def __str__(self):
        return self.title
