# Svelte Kit & Gel Auth template for Webapp

本项目的目标是为搭建 Webapp 提供一个开箱即用的基础脚手架, 且直接集成了基于 [Gel Auth](https://zaizhao.github.io/core/gel/auth.html) 的权限认证方案, 以及一个极简的起步 UI 界面来快速搭建应用.

模板包含技术栈:
- Svelte Kit for Svelte framework.
- Gel for database
- Gel Auth for authentication
- Tailwind CSS + daisyUI for utility-first CSS framework
- ESLint for linting

项目目录说明:
- dbschema - Gel schema and migrations
- gel.toml - Gel configuration
- **src/lib/auth.ts** - Gel ClientAuth Helper
- `src/lib/server/gel.ts` - Gel Client
- `package.json` - npm dependencies
- `pnpm-lock.yaml` - pnpm lockfile
- `postcss.config.js` - PostCSS configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- tsconfig.json - TypeScript configuration

## 🚀 快速开始

1. Clone repo & install dependencies
```bash
git clone https://github.com/lonexw/svelte-gel-auth-teamplate.git
cd svelte-gel-auth-teamplate && pnpm i
```
2. Install Gel CLI

在本地安装 Gel 数据库的[命令行工具](https://zaizhao.github.io/core/gel/cli.html), 方便本地开发数据库的管理.

本项目提供了已启用 auth 扩展的数据库模型示例文件 **dbschema/**, 你可以以此为基础来扩展开发, 初始化本地数据库实例:

```bash
npx gel project init
```

也可以使用完全独立的项目来管理数据层知识, 在环境变量中配置项目关联实例即可:

```bash
```

你可以查看 `.env.example` 的环境变量设置, 根据项目实际情况修改;

3. Initialize Gel Database

```bash
./deploy/maybe-initialize-database.sh
```

4. Set up Gel Auth

可以快速初始化 auth 相关配置, 默认会启用 **email+password** 的验证方式:

```bash
pnpm run auth:setup
```

也可以通过 web 可视化界面来配置:

```bash
# docs: https://zaizhao.github.io/core/gel/auth.html
gel ui  # {host}:{port}/ui/{branch}/auth
```

- 比如增加 Magic Link 验证方法: https://docs.geldata.com/reference/auth/magic_link 

5. Generate types ***pnpm generate:all***
6. Start development server.

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
