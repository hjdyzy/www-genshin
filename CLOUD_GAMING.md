# 云原神集成配置说明

## 配置跳转目标

本项目支持通过环境变量配置游戏启动后的跳转目标。

### 快速配置

1. 复制 `.env.example` 为 `.env`
   ```bash
   cp .env.example .env
   ```

2. 编辑 `.env` 文件,修改 `VITE_RESTART_URL` 的值:

   ```env
   # 米哈游官方云原神 (推荐)
   VITE_RESTART_URL=https://ys.mihoyo.com/cloud/#/

   # 或者网易云游戏版本
   # VITE_RESTART_URL=https://cg.163.com/ys/

   # 或者自定义地址
   # VITE_RESTART_URL=https://your-custom-url.com
   ```

3. 重启开发服务器
   ```bash
   npm start
   ```

## 可选平台

### 1. 米哈游官方云原神 ⭐推荐
- URL: `https://ys.mihoyo.com/cloud/#/`
- 优点: 官方支持,稳定可靠
- 需要: 米哈游账号登录

### 2. 网易云游戏版本
- URL: `https://cg.163.com/ys/`
- 优点: 网易云游戏平台
- 需要: 网易账号

### 3. 自定义地址
- 可以配置任意 URL
- 适合有自己云游戏服务器的用户

## 注意事项

⚠️ **法律声明**:
- 只能跳转到官方授权的云游戏平台
- 不要使用未经授权的私服或破解版本
- 本项目仅作技术展示,不提供游戏本体

## 默认配置

如果没有配置 `.env` 文件,系统会使用以下默认值:
- 默认跳转: `https://ys.mihoyo.com/cloud/#/` (米哈游官方云原神)
