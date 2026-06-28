# ABK ecosystem overview

> Public-facing summary for the personal site, based on the current public profile and repository layout.

## What ABK appears to be

从公开 README 和仓库命名可以看出，`ABK` 不是一个孤立仓库，而是一个会向外扩展的底层 Android 工作基座。
它更像一条主干线，很多模块、补丁、控制面和实验仓库都在围绕它展开。

这个站点不尝试替代每个仓库自己的 README，而是先给出一个可读的认知框架：

- `ABK` 负责承载核心方向
- 外围模块负责把具体策略拆开
- 站内文档负责解释这些仓库为什么会一起出现

## Why the ecosystem framing matters

如果只看公开仓库列表，很容易得到一个“项目很多，但关系不明”的印象。
把它们按生态来理解会更清楚：

1. 有一层基础仓库负责核心能力。
2. 有一层模块负责按主题扩展能力。
3. 还有一层研究/验证仓库，负责把想法拉到真实设备或真实工作流里验证。

这种结构的价值在于，它天然适合低层 Android 开发：

- 核心能力可以集中演进
- 主题模块可以独立试错
- 某个研究方向成熟后，可以再回流到更稳定的主线

## Public repo signals inside the ecosystem

当前公开仓库里，至少能看见这些信号：

- `ABK` 本身作为核心仓库存在
- `DroidSpaces-OSS-module` 体现了模块化扩展与部署方向
- `ABK_control_module` 指向控制面或操作面的需要
- `ABK_NO_ANYTHING_CAN_CHECK`、`ABK_FIDO_KEY_MODULE` 这类命名说明生态不是单功能，而是在围绕多个具体问题展开

从站点角度看，这些仓库不需要在首页全部展开。
更合理的方式是：

- 首页只显示最能代表方向的少量仓库
- 项目页按主题归档
- 文档页补足“为什么是这样组织”的解释

## What belongs on this site

个人站更适合承载这些内容：

- 生态结构总览
- 当前关注的问题域
- 代表性仓库入口
- 面向陌生访客的简明说明

而不适合放这里的内容包括：

- 每个模块的完整实现细节
- 高频变化的实验日志
- 需要紧跟仓库提交演进的内部说明

这些内容仍然更适合留在各自仓库里。

## Practical reading order

第一次来到站点时，推荐顺序是：

1. 先看首页，建立整体方向感。
2. 再看项目页，理解仓库按什么问题分组。
3. 最后回到这篇文档，把 `ABK` 视为一个生态入口，而不是单个仓库名称。

这样会比直接打开一个大型仓库更快进入状态。
