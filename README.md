## 项目简要介绍

使用websocket技术对部署或服务重启实时进度进行展示及日志显示。

### 该项目启动前需要注意的事情

在windows使用python3.8启动该项目时，会报add_reader()...501..的错误，解决方法为：
在D:\Program Files (x86)\Python38\Lib\site-packages\twisted\internet\asyncioreactor.py开头加入如下内容：

```
import platform

if platform.system() == "Windows":
    import asyncio
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
```

