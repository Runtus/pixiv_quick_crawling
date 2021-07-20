# 一个简单的小玩具 - 快速批量下载指定画师的原画
* 在运行之前你需要:
    1. Nodejs
    2. 梯子
* Nodejs根据官网安装教程安装了即可。
* 关于梯子，需要在本机梯子上设置对应的http代理端口，并在config.js文件里进行配置。
* 关于config里的说明：
    1. ConfigAuthorId -> 画师的Id
    2. ConfigProxy -> 代理ip
    3. ConfigPort -> 代理端口
    4. ConfigAccount -> 账号
    5. ConfigPassword -> 密码
    6. ConfigisR18 -> 是否开启R18
    7. ConfigFolder -> 文件夹名(缺省为画师名字)
*  输入``` npm install``` 下载依赖包
*  输入``` npm start``` 开始运行
* 目前只是一个小demo，后续会加入更多功能。

> 2020.11.09

## 0.0.2 更新 增加了R18功能
* 在config.json中设置是否开启R18.
    * 如果开启R18，则需要填写账号和密码（并且账号已经开启了R18模式）


## 0.0.3 更新 增加了token失效处理，修复了画师图片不能分页爬取的bug 增加了下载进度显示
* 只需要在json文件里添加time字段并赋值为0即可（值为整形）。

> 2021.04.15

## 0.0.3 更新 修改鉴权模式
* 由于之前采用的鉴权是采用的移动端健全，貌似p站那边发现了此种鉴权的弊端，于是乎在一次大改后，移动端的鉴权也变成了和web端相同的方式，只不过最后会重定向回移动端。
* Web端鉴权比较复杂，本人参照大佬代码（代码请参照[如何获得pixiv access_token && refresh_token](https://gist.github.com/ZipFile/c9ebedb224406f4f11845ab700124362))去模拟加密过程，但却卡在最后一步，所以暂时需要从上述链接中拿到refresh_token。
🌟🌟 **将得到的refresh_token注入到const/client.js的对应变量即可，其他用法不变.**