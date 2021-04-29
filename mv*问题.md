# mv\*问题

## mvc

model view controller

model 层处理数据、业务相关逻辑

view 层处理页面视图

controller 是 modal 和 view 层关联处理。

view => controller => model => view

## mvp

model view presenter

presenter 作为中间连接，使 view 和 model 互相并不通信
view 层不做数据逻辑处理，只是简单的被动视图，或提供接口，让 presenter 处理好逻辑之后使用

## mvvm

model view view-model

view 与 view-model 双向绑定。一方的改变，会影响另一方。
