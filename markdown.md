# Markdown 语法记录

### 一、段落和换行

markdown支持”硬换行“

在一行末尾进行换行并留出一行以上的空行。


### 二、标题

支持 Setext 和 Axt

Setext:

一级标题
==

二级标题
-

Axt

# 一级
## 一共有六级

### 三、块引用

> 1. 一行说明哦
> 2. 两行说明哦哦
> > 嵌套的那种

### 四、无序序列和有序序列

+ 测试
+ 一个
+ 加号
+ 序列

等价于

* 测试
* 星号
* 序列

1. 测试
2. 有序
4. 序列
1. 测试
1. 有序
1. 序列

*    测试
     已给

     什么的一段

### 五、水平线

* - _ 三个以上就是水平线

***

---

___

### 六、链接

内联：

[链接一](http://www.github.com)

[内部链接](/about)

[链接一](http://www.github.com 'title')

引用：

[链接一][linkOne]

[linkTwo][]

以下定义在转出的预览中并不显示

[linkOne]: http://www.github.com 'title'

[linkTwo]: http://www.github.com


大小写不敏感

[link text][a]

[link text][A]

[a]: http://www.github.com 'title'

以上这种单独定义的方法可以使一篇 md 文章中的链接单独定义，不用一遍又一遍地去写，而且使得文档结构更清晰。


### 七、强调

*斜体*

_斜体_

**加重**

__加重__


### 八、代码

一行里的`代码`这样子

```这样就可以在一行代码中打出`这个字符```

### 九、图片

内联：

![hahatu](https://octocat-generator-assets.githubusercontent.com/my-octocat-1567082592615.png 'me')

引用：

![hahatu][src]

[src]: https://octocat-generator-assets.githubusercontent.com/my-octocat-1567082592615.png 'me'


### 自动链接

<http://www.github.com>


### 反斜杠转义


### 十、表格

name | 价格 |  数量  
-|-|-
香蕉 | $1 | 5 |
苹果 | $1 | 6 |
草莓 | $1 | 7 |


name | 价格 |  数量  
-|:-:|-:
香蕉 | $1 | 5 |
苹果 | $1 | 6 |
草莓 | $1 | 7 |














