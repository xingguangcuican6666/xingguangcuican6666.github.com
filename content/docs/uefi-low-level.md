# UEFI and low-level experiment map

> Public map of the boot-chain and firmware-adjacent repositories referenced by this site.

## Why this line matters

如果一个个人站同时出现 Android 安全、root、kernel、UEFI、boot 这些关键词，
最容易让人误解的地方，是不知道这些内容之间的距离有多远。

这篇笔记的目的，就是把那条“更靠近设备底层”的线单独拎出来。

## Public repo signals

从公开仓库命名上，可以看到至少几类低层兴趣：

- `edk2-unlock-uefi-sm8650`
- `UEFIReader`
- `UEFIFirmwareBackup`
- `mu_aloha_platforms_sm8650`
- `eBPF_Hook`

这些名字本身就足够说明，工作范围已经不只是在 Android 应用层或普通脚本层。

## What the site should say about them

站点最好的表达方式不是装作已经覆盖完整 firmware 栈，
而是坦率地把它们表述成“持续进行中的低层实验方向”。

这样更准确，也更专业。

推荐的 framing 是：

- **UEFI / Boot**: 关注启动链、固件、平台级实验
- **Kernel-adjacent work**: 靠近内核与系统边界的研究
- **Device-side validation**: 在真实设备约束下验证想法是否成立

## Why this belongs next to Android work

表面看，UEFI 与 Android root 像是两条不同路线。
但从系统工程角度，它们共享几个核心特征：

- 都需要处理真实设备约束
- 都依赖对底层边界的理解
- 都很难只靠抽象讨论解决
- 都需要把实验、验证和工具化结合起来

因此，把它们放在一个个人站里并不冲突。
相反，这会让“关注系统底层”的主线更完整。

## What not to over-claim

公共站点里最需要避免的是过度包装：

- 不要把实验仓库写成已经稳定交付的产品
- 不要假装单个仓库就代表完整技术栈
- 不要把命名里的研究方向直接等同于最终成果

更合适的说法是：

这些仓库展示了持续的研究兴趣和技术触点，
也是理解整个站点为何不只停留在 app / script 层面的最好证据。

## Suggested reading path

如果你是第一次看这些方向，建议顺序是：

1. 先看首页建立整体背景。
2. 再到项目页看 UEFI / boot 分组。
3. 最后打开相关仓库，按自己关心的设备或平台继续深入。

个人站负责的是“给出地图”，不是替代仓库里的全部细节。
