from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponseRedirect

def redirect_to_api(request):
    return HttpResponseRedirect('/api/')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('core.urls')),
    path('', redirect_to_api),
]