from django.urls import path
from .views import log_add, log_show
from django.views.decorators.clickjacking import xframe_options_exempt

urlpatterns = [
    path('log_add/', log_add, name='log_add'),
    # 使用该装饰器，表示该网页的response head将不再设置X-Frame-Options，
    # 也就是说允许该网页在任何站点的frame中显示
    path('log_show/', xframe_options_exempt(log_show), name='log_show'),
]
