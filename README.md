# autoprettier
自动化格式化当前目录下面的js和less

关于代码格式化和代码规范，写了一个工具。
考虑到每个项目的设置不一定相同，不同的页面由不同的开发人员负责，所以只格式化当前目录下的所有文件js和less。
全局安装： yarn global add autoppp 或者 npm i autoppp -g
cd到你负责的文件所在目录，在vscode中可以直接右键在终端中打开
然后执行autoppp
```sh
mac001:PreSubsidy xiaohuoni$ autoppp
./Confirm.js is prettier
./Detail.js is prettier
./Info.js is prettier
./Result.js is prettier
./ResultComponent/index.js is prettier
./StepLayout.jsx is prettier
./TableForm.js is prettier
./ResultComponent/index.less is prettier
./style.less is prettier
prettier success!
```
