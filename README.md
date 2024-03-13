# Node.js图片处理封装命令行

该命令行基于NPM Package [sharp](https://github.com/lovell/sharp)

sharp是一款快速高效的Node.js图片处理库，支持图片格式转换、尺寸调整、压缩、裁剪、旋转、水印等功能。

## 使用
``` bash
imagesharp png './test.jpg'
```
**指定图片输出格式**
``` bash
imagesharp jpg './test.png'
```
**支持glob匹配**
``` bash
imagesharp png './test*.jpg'
```