from django.urls import path
from base.views import table_views as views


urlpatterns = [
    path('all/', views.TableListView.as_view(), name='tables'),
    path('gettable/', views.TableUpdateView, name='table_by_id'),
    path('unmarktable/', views.unmarkTableReserve, name='unmark_table_by_id'),
]