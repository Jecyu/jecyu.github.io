###
 # @Author: Jecyu
 # @Date: 2021-03-09 13:27:46
 # @LastEditors: Jecyu
 # @LastEditTime: 2021-03-09 13:59:24
 # @FilePath: /jecyu.github.io/deploy.sh
 # @Description: 
### 
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
yarn build

# 进入生成的文件夹
cd dist

echo "Generating a CNAME file..."
echo "naluduo.vip" > CNAME

git init
git add -A
git commit -m '🎉deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:naluduo233/naluduo233.github.io.git master:master

cd -
