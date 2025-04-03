# SvelteKit & Gel Auth template for Webapp

本项目的目标是为搭建 Webapp 提供一个开箱即用的基础脚手架, 且直接集成了基于 [Gel Auth](https://zaizhao.github.io/core/gel/auth.html) 的用户认证方案.

模板包含技术栈:
- [Svelte Kit](https://svelte.dev/docs/kit/introduction) for Svelte framework.
- [Gel](https://www.geldata.com/) for database
- [Gel Auth](https://docs.geldata.com/reference/auth) for authentication
- [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) + [daisyUI](https://daisyui.com/docs/intro/) for utility-first CSS framework
- [ESLint](http://eslint.org/) for linting
- [bun](https://bun.sh/) & [vite](https://vite.dev/) for build

项目目录说明:
- `dbschema/` - Gel schema and migrations, queries and query builder API.(Auto Generated)
- `deploy/` - Deploy scripts.
- `gel.toml` - Gel configuration.
- `src/lib/components` - UI Components.
- `src/lib/gel/auth-sveltekit` -  @gel/auth-sveltekit local version
- `src/lib/gel/client.ts` -  Gel query client.
- `src/lib/gel/clientAuth.ts` - A ClientAuth object to get OAuth, BuiltinUI and signout URLs.
- `src/lib/utils/` - Common utils functions.
- `src/routes/` - All route defines.
- `src/routes/identity` - Custom auth identity route defines.
- `package.json` - npm dependencies.
- `bun.lock` - bun lockfile
- `postcss.config.js` - PostCSS configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

## 🚀 快速开始

1. Clone repo & install dependencies

    ```bash
    git clone https://github.com/lonexw/svelte-gel-auth-teamplate.git
    cd svelte-gel-auth-teamplate && bun i # 需要安装 bun 包管理工具 🔧
    ```

2. Install Gel CLI

    在本地安装 Gel 数据库的[命令行工具](https://zaizhao.github.io/core/gel/cli.html), 方便本地开发数据库的管理(可选).

    本项目提供已启用 auth 扩展的数据库模型示例文件 **dbschema/**, 你可以以此为基础来扩展开发, 初始化本地数据库实例:

    ```bash
    bunx gel project init
    ```

    也可以使用独立的项目来管理数据层逻辑, 在环境变量中配置项目关联远程实例即可:

    ```bash
    GEN_DSN=gel://USERNAME:PASSWORD@HOSTNAME:PORT/BRANCH

    # 也可以使用 VITE_GEL_CREDENTIALS_FILE 配置, 推荐使用该种链接参数配置
    GEL_CREDENTIALS_FILE=./deploy/credentials.json
    # 如何获取数据库实例的认证信息 
    gel instance credentials --json > deploy/credentials.json
    ```

    或者你打算使用 [Gel Cloud](https://docs.geldata.com/cloud) 提供的实例:

    ```bash
    GEL_INSTANCE=
    GEL_SECRET_KEY=
    ```

    优先级顺序为:
    - 如果有配置 `Gel Cloud`, 优先使用 cloud 提供的实例
    - 然后检查 `GEN_DSN 和 GEL_CREDENTIALS_FILE` 是否有配置(DSN优先级较低)
    - 最后使用本地数据库配置;
    
3. Initialize Gel Database

    该脚本会自动检查数据库状态, 运行迁移文件并初始化 Auth 配置信息, 运行之前查看 `.env.example` 的环境变量示例, 根据项目实际情况修改;

    ```bash
    bash ./deploy/maybe-initialize-database.sh
    ```

4. Set up Gel Auth Config

    可以快速初始化重置 auth 相关配置, 默认会启用 **email+password** 的验证方式:

    ```bash
    bun auth:setup
    ```

    也可以通过 web 可视化界面来配置:

    ```bash
    bunx gel ui  # {host}:{port}/ui/{branch}/auth
    ```

    > 比如手动配置 SMTP, 增加 OAuth 或 [Magic Link 验证方法](https://docs.geldata.com/reference/auth/magic_link) 

5. Generate types for Client Query

    ```bash
    // 等同于 bun generate:edgeql && bun generate:interfaces
    bun generate:all
    ```
    How to use the TypeScript query builder API.
    ```typescript
    // dbschema/queries/item.ts
    import { createClient } from "gel";
    import e from "@/dbschema/edgeql-js";

    const client = createClient();
    await e.insert(e.Deck, { name: "Deck name" }).run(client);

    const decks = await e
        .select(e.Deck, () => ({
            id: true,
            name: true,
        }))
        .run(client);
    await e.delete(e.Deck).run(client);
    ```

    更多查询示例阅读文档: [fully-typed EdgeQL queries with TypeScript](https://docs.geldata.com/reference/clients/js/querybuilder)

6. Start development server.

    ```bash
    bun dev
    ```

## Building

### 生产数据库准备

无论何种部署方式, 首先需要你准备好一个远程可以访问的数据库实例, 手动或者通过命令行创建数据库分支及运行迁移文件.

.env 必须的数据库配置
```bash
# Gel Cloud 或者是 GEN_DSN、GEL_CREDENTIALS_FILE 配置信息
GEL_INSTANCE=
GEL_SECRET_KEY=

GEL_BRANCH=     # 默认为 main
VITE_GEL_BASE_URL= # 部署站点访问地址

# 参照 .env.example 的说明完成其它基本 auth 信息的配置, 也可以在部署完成后通过 gel ui 在浏览器页面中配置;
```

在本地关联远程实例, 创建好新分支(如需要)及运行迁移:
```bash
# 该脚本会自动检查是否需要运行迁移以及初始化 auth 配置
# 默认读取 .env 文件的配置信息
bash ./deploy/maybe-initialize-database.sh
# 重置 auth 配置信息(如需要)
bun run auth:setup
```

在 **.env.development** 文件中配置本地开发数据库, 在 **.env** 文件中配置生产环境数据库辅助配置远程数据库是不错的解决方案, 当然你可以在独立的数据库管理项目完成这些配置;

### 本地预览生产版本

To create a production version of your app:
```bash
bun run build
```

You can preview the production build with `bun run preview`.

```bash
bun --env-file=.env run preview
```

### 使用 Node Server 部署

使用 node 部署需要首先更换一下 [svelte adapter 的配置](https://svelte.dev/docs/kit/adapter-node):

```javascript
// install dependency
bun i -D @sveltejs/adapter-node
// svelte.config.js
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: ''
		})
	}
};
```
在本地尝试编译, 启动运行一下:
```bash
bun run build # generate to build/ directory

# MY_CUSTOM_ORIGIN 网络有代理时需要设置, 避免跨域问题
HOST=127.0.0.1 \
PORT=3000 \
ORIGIN=http://127.0.0.1:3000 \
node --env-file=.env build/index.js
```

私有化或 docker 部署的时候可能想通过 [systemd-service](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html) 服务运行网站服务:

```
# /etc/systemd/system/app.service
[Service]
Environment=NODE_ENV=production IDLE_TIMEOUT=60
ExecStart=/usr/bin/node /usr/bin/app/build

# /etc/systemd/system/app.socket
[Socket]
ListenStream=3000
[Install]
WantedBy=sockets.target

# bash
sudo systemctl daemon-reload
sudo systemctl enable --now app.socket
```

你也可以使用高度定制的 web server 服务, 比如使用 Express:
```javascript
import { handler } from './build/handler.js';
import express from 'express';

const app = express();

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(handler);

app.listen(3000, () => {
	console.log('listening on port 3000');
});
```

### 部署到 Vercel、render 等云服务

To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

- https://svelte.dev/docs/kit/adapter-vercel
- https://render.com/

在平台部署界面配置相关的环境变量即可, 根据实际情况调整部署命令:

```
# Build Command
bun run build

# Install Command
bun install && bun generate:all
```

## 实际的项目案例

- 企业官网
- Sports Match
- AI Chatbot
- 招聘开源运营平台
- Shop Member App