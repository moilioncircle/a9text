Windows 右键菜单中增加 a9text
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
在Windows右键菜单中添加a9text选项,可以方便的查看a9text语法文本.
这里提供了2种添加注册表的方法.
其中, $A9TEXT_HOME 为a9text的跟目录

1. a9text.reg 方式
   需要编辑 a9text.reg 把其中 "file://D:/workspace/a9text/impl_javascript/"
   替换为$A9TEXT_HOME的绝对路径(最好不要带有中文)

2. a9text.bat 方式
   只有运行它就可以了,他会根据自身在a9text工程中的位置
   自动配置好注册表中的路径信息.
   
   一定不要移动a9text.bat的位置,否则将会发生错误.
   (reg.exe: 为window/system32/reg.exe, XP以下版本不存在)
   