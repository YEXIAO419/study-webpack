# webpack
简单描述一下自己搭建一个webpack静态服务器：		

### 安装webpack
```
npm install webpack webpack-cli -g 
// 4.x版本后webpack不再作为webpack-cli依赖，需要单独安装
```

### 配置package.js
```
npm init    
// 如果项目没有，使用上面命令创建
// npm init --y (快速创建，跳过一些选择项，装逼神器)
```

### 配置webpack
```
在根目录下面新建vue.config.js，具体配置看代码
```

### 注意 babel-loader
```
babel-loader的核心是babel-core
babel-loader8.x对应bable-core7.x，安装方式 npm install @babel/core -D
babel-loader7.x对应bable-core6.x，安装方式 npm install bable-core -D
```

### 具体webpack配置可参考代码