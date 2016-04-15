# CSS3 transition可视化编辑器-设计文档

标签（空格分隔）： 文档

---

## 需求分析

> **基本要求：**
> 拖动控制点或填入参数，点击生成按钮，自动生成CSS3 transition代码和演示滑块。
> **加分项：**
> 编辑器界面好看，操作流畅，生成的代码兼容性好，有API可以扩展功能

制作一个类似[参考示例](http://cubic-bezier.com/)的页面，实现CSS3动画中`transition`属性的可视化编辑器。

分析示例页面后，列出如下需求：

1. bezier函数控制点可拖动
2. cubic-bezier参数实时展示
3. 输出CSS3 transition完整代码
2. 演示功能
4. Library功能，即记录功能

## 设计思路

### bezier函数控制点

首先使用canvas的`bezierCurveTo`函数画出bezier函数曲线，再使用`lineTo`函数画出连线，使用div画出圆形的控制点，通过监听其mousedown、mousemove即mouseup事件实现对其的拖动控制，再根据控制点的位置计算出bezier曲线的参数来更新曲线

### bezier参数实时展示

通过控制点的坐标及画布参数，计算出bezier参数，并在页面上展示出来

### 输出CSS3 transition完整代码

通过显示fixed的方框来显示代码，代码是由字符串及参数拼接组成

### 演示功能

通过页面的不同组件获取transition动画的各个属性的value，具体包括：`transition-timing-function`，`transition-duration`，`transition-property`，`tranform`属性的value，然后使用JavaScript将其添加到演示用的div上，通过类名的改变实现动画效果

###Library功能

使用`window.localStorage`来保存用户想要记录的参数及当前曲线的参数，在页面特定位置使用canvas画出该曲线，在点击储存曲线后更新当前曲线

## 技术选型

我最近刚学习Vue.js的基础知识，还没用其进行过开发，所以第一时间想到使用Vue.js来进行练习并完成任务，虽然题目要求有提到：

> 2.主体用原生JavaScript实现，尽量不使用现成的脚本库API。。

但考虑到Vue.js是MVVM的框架，而不是题目要求中提到的“脚本库API”，所以个人认为其不与要求冲突

## 模块划分

考虑到模块的复用及减小组件间的耦合，模块划分如下：

### bezier.js

该文件是使用原生JavaScript实现的库文件，用来进行画图，包括边框、bezier曲线、控制点连线等，使用ES2015中的class实现，初始化后使用`draw`函数即可画图

### eventUtil.js

该文件是使用原生JavaScript实现的库文件，用来处理事件绑定、拆除等工作，有较好兼容性

### storage.js

该文件是使用原生JavaScript实现的库文件，用来处理localStorage存取数据等工作，有较好兼容性

### Tile.vue

绘制bezier曲线的模块，该模块需要传入canvas的各种参数及bezier曲线的参数

### MoveButton.vue

绘制控制点的模块，可以绘制可拖拽及不可拖拽两种控制点

### BezierDrawPlane.vue

负责绘制可调节bezier曲线的模块，包含Tile及MoveButton两个子模块，用Tile模块画出bezier曲线，用MoveButton设置控制点，当控制点变动时，计算新的bezier曲线的参数，传入Tile，绘制实时曲线

### ShowParams.vue

实时展示Bezier曲线参数的模块，传入曲线参数即可展示美化的参数，包含Save及Export按钮，点击Save即可保存当前曲线，点击Export即可弹出弹窗显示当前transitoin属性

### PreviewCompare.vue

展示和比较模块，包含Tile子模块，可以选择何种动画效果（移动、旋转、扩张）以及动画持续时间，包含Run按钮及两个展示用模块，点击Run按钮后，展示模块执行指定动画

### Library.vue

展示所有记录的曲线，包含Tile子模块，将所有记录的曲线绘制出来，并横向排列

### Modal.vue

可定制弹窗模块，可指定弹窗里的具体内容

### APP.vue

页面程序主模块，包含BezierDrawPlane、ShowParams、PreviewCompare、Library及Modal子模块，负责将页面上所有元素组织起来

## UI设计

题目要求有提到：

> 4.UI界面允许参考其他的网站，素材允许使用其他网站的素材。

所以，我直接仿照[参考示例](http://cubic-bezier.com/)的界面进行开发