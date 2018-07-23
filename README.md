# Use Nodejs backup your files

> 必备环境：Nodejs

## 和Mackup的区别
### mackup 
- mackup 是非常有效率的，使用 link 把配置文件链接到某个路径，以达到实时备份项目配置的目的
- 但是有一些应用不支持读取 link 内的文件，例如 Affinity Designer、vscode 的插件文件夹等等

### npmbackup 
npmbackup使用的是最原始的拷贝，以适应所有状况

## Api

### **初始化配置文件**

```shell
$ npmbackup init sample
```
或者使用作者预先配置好的配置文件
```shell
$ npmbackup init all
```
### **编辑需要备份的文件**
打开 `~/nombackup.json` ，添加自己需要的文件，和指定备份的路径(默认路径设置在 `iCloud/npmbackup` )

### **备份**
```shell
$ npmbackup save
```

### **读取**

> 注意，这个操作会使用之前备份的文件覆盖现有的文件

```shell
$ npmbackup load
```

### **tag**
有时候我们需要多个版本的配置：

```shell
  $ npmbackup --tag my-loves save
  $ npmbackup --tag my-loves load
```

如果没有设置`--tag`,默认的tag是`defalut`




  