from django.shortcuts import render
from django.http import JsonResponse
import json
from .models import LogsDB

from django.views.decorators.csrf import csrf_exempt


# Create your views here.
@csrf_exempt
def log_add(request):
    if request.method == 'POST':
        json_result = json.loads(request.body)
        print(json_result)
        try:
            LogsDB.objects.create(
                deploy_version=json_result['deploy_version'],
                app_name=json_result['app_name'],
                ip_address=json_result['ip_address'],
                env_name=json_result['env_name'],
                user_name=json_result['user_name'],
                operation_type=json_result['operation_type'],
                operation_no=json_result['operation_no'],
                log_content=json_result['log_content']
            )
            return JsonResponse({'msg': 'ok'})
        except Exception as e:
            print("write manabe log error: " + str(e))
            return JsonResponse({'msg': 'failed'})
    else:
        print('only POST method is valid')
        return JsonResponse({'msg': 'failed'})


def log_show(request):
    app_name = request.GET.get('app_name')
    env_name = request.GET.get('env_name')
    deploy_version = request.GET.get('deploy_version')
    operation_no = request.GET.get('operation_no')

    context = {
        'app_name': app_name,
        'env_name': env_name,
        'deploy_version': deploy_version,
        'operation_no': operation_no
    }
    return render(request, 'wslog/websocket.html', context)
