在windows使用python3.8启动该项目时，会报add_reader()...501..的错误，解决方法为：
在D:\Program Files (x86)\Python38\Lib\site-packages\twisted\internet\asyncioreactor.py开头加入如下内容：

import platform

if platform.system() == "Windows":
    import asyncio
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())
