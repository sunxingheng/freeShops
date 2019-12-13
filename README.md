# freeShops
node+express+ejs+mysql

======




## 项目开发部署

```
npm install //安装依赖
```



* 根目录执行"npm install supervisor -g"，全局安装supervisor监控node文件

* 执行"node app"，启动服务

* 或者执行 supervisor appp.js 守护进程

## 文档部署

```
//全局安装文档依赖

npm i apidoc -g   
```


 ```
//更新接口文档

 apidoc -i routes/ -o public/apidoc/

 ```


```
//访问路径

http://localhost:8888/apidoc/index.html
```









