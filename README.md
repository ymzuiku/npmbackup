# Use Nodejs backup your files

> 必备环境：Nodejs

## 和Mackup的区别
### mackup 
- mackup 是非常有效率的，使用 link 把配置文件链接到某个路径，以达到实时备份项目配置的目的
- 但是有一些应用不支持读取 link 内的文件，例如 Affinity Designer、vscode 的插件文件夹等等
- 使用link无法忽略一些文件夹，例如node_modules等不需要被上传至网盘的文件

### Feature 
- npmbackup使用的是最原始的拷贝，会比对文件变化，只拷贝差异的文件，以适应所有状况
- 可以使用ignore列表，忽略一些子文件
- 可以使用zips列表，把一些碎文件进行压缩，使用时自动解压缩
- 支持使用Tag管理多份备份

## Api

### **初始化配置文件**

使用作者预先配置好的配置文件
```shell
$ npmbackup init
```
或者使用空白的配置
```shell
$ npmbackup init clear
```
### **编辑需要备份的文件**
打开 `~/nombackup.js` ，添加自己需要的文件，和指定备份的路径(默认路径设置在 `iCloud/npmbackup` )

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

如果没有设置`--tag`,默认的tag是`default`




  