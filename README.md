# Website
## 本地修改指南  
下載當前檔案
下載Node.js
https://nodejs.org/en/download/
```shell
docker pull node:22-alpine
# 若沒有Docker請參考
# https://docker.com/get-started/
# https://stackoverflow.com/questions/52946810/error-during-connect-get-http-2f2f-2fpipe2fdocker-engine-v1-38-info
# 可能遇到的問題
docker run -it --rm --entrypoint sh node:22-alpine
# 檢查Node.js版本(也確定node是否能執行):
node -v
# 檢查npm版本(也確定npm是否能執行):
npm -v
cd 下載網站檔案位址
```
^window版

成功!!!  
### 執行
在terminal打
```
npx docusaurus start
```
之後打開 http://localhost:3000/homepage 就可以看到網站了  
在期間對檔案變更都可以在http://localhost:3000/homepage上顯示  
在terminal打 ctrl-C 中止

### 提交變更
```
git request-pull
```
當屆幹部應該會看完之後幫你merge回main
