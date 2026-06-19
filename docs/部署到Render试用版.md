# 部署到 Render 生成试用网址

## 适用场景

Cloudflare 临时链接被拦截，或者你希望给对方一个更稳定的网址。

Render 可以运行 Python Flask 项目。部署成功后，对方只需要浏览器打开网址。

## 一、准备

你需要：

- 一个 GitHub 账号
- 一个 Render 账号
- 当前这个项目文件夹

## 二、把项目上传到 GitHub

新建一个 GitHub 仓库，例如：

```text
purchase-warehouse-sales-demo
```

把当前项目文件夹上传到这个仓库。

建议上传这些内容：

```text
app.py
requirements.txt
Procfile
templates/
static/
导入示例Excel/
管理系统.xlsx
管理系统_五行示例数据.xlsx
data/app.db
uploads/
```

可以不上传：

```text
backups/
tools/cloudflared
.git/
```

## 三、在 Render 创建 Web Service

1. 打开 Render。
2. New → Web Service。
3. 连接刚才的 GitHub 仓库。
4. 环境选择 Python。
5. Build Command 填：

```text
pip install -r requirements.txt
```

6. Start Command 填：

```text
gunicorn app:app --bind 0.0.0.0:$PORT
```

7. 点击 Deploy。

## 四、部署成功后

Render 会给你一个网址，例如：

```text
https://purchase-warehouse-sales-demo.onrender.com
```

把这个网址发给对方即可。

## 五、默认账号

管理员：

```text
admin / admin123
```

普通用户：

```text
user / user123
```

## 六、重要说明

这个方式适合演示和收集修改意见。

如果使用免费或临时云环境，数据库可能不适合长期正式保存数据。

正式使用前，建议再做：

- 改默认密码
- 使用正式服务器
- 配置稳定数据库
- 配置 HTTPS 域名
- 做定期备份
