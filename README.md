# Svelte Kit & Gel Auth template for Webapp

本项目的目标是为搭建 Webapp 提供一个开箱即用的基础脚手架, 且直接集成了基于 [Gel Auth](https://zaizhao.github.io/core/gel/auth.html) 的用户认证方案.

模板包含技术栈:
- [Svelte Kit](https://svelte.dev/docs/kit/introduction) for Svelte framework.
- [Gel](https://www.geldata.com/) for database
- [Gel Auth](https://docs.geldata.com/reference/auth) for authentication
- [Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite) + [daisyUI](https://daisyui.com/docs/intro/) for utility-first CSS framework
- ESLint for linting
- pnpm & [vite](https://vite.dev/) for build

项目目录说明:
- `dbschema/` - Gel schema and migrations, queries and query builder API.(Auto Generated)
- `deploy/` - Deploy scripts.
- `gel.toml` - Gel configuration.
- `src/lib/components` - UI Components.
- `src/lib/gel/client.ts` -  Gel query client.
- `src/lib/gel/clientAuth.ts` - A ClientAuth object to get OAuth, BuiltinUI and signout URLs.
- `src/lib/utils/` - Common utils functions.
- `src/routes/` - All route defines.
- `package.json` - npm dependencies.
- `pnpm-lock.yaml` - pnpm lockfile
- `postcss.config.js` - PostCSS configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration

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

    也可以使用独立的项目来管理数据层逻辑, 在环境变量中配置项目关联实例即可:

    ```bash
    VITE_GEN_DSN=gel://USERNAME:PASSWORD@HOSTNAME:PORT/BRANCH

    # 也可以使用 VITE_GEL_CREDENTIALS_FILE 配置, 推荐使用该种链接参数配置
    gel instance credentials --json > deploy/credentials.json
    VITE_GEL_CREDENTIALS_FILE=./deploy/credentials.json
    ```

    或者你打算使用 [Gel Cloud](https://docs.geldata.com/cloud) 提供的实例:

    ```bash
    VITE_GEL_INSTANCE=
    GEL_SECRET_KEY=
    ```
    优先级顺序为, 如果有配置 `Gel Cloud`, 优先使用, 然后检查 `VITE_GEN_DSN 和 VITE_GEL_CREDENTIALS_FILE` 是否有配置(DSN优先级较低), 最后检查本地数据库配置;
    
3. Initialize Gel Database

    该脚本会自动检查数据库状态, 运行迁移文件并初始化 Auth 配置信息, 运行之前查看 `.env.example` 的环境变量示例, 根据项目实际情况修改;

    ```bash
    bash ./deploy/maybe-initialize-database.sh
    ```

4. Set up Gel Auth Config

    可以快速初始化 auth 相关配置, 默认会启用 **email+password** 的验证方式:

    ```bash
    pnpm run auth:setup
    ```

    也可以通过 web 可视化界面来配置:

    ```bash
    npx gel ui  # {host}:{port}/ui/{branch}/auth
    ```

    > 比如增加 Magic Link 验证方法: https://docs.geldata.com/reference/auth/magic_link 

5. Generate types for Client Query

    ```bash
    // 等同于 pnpm generate:all
    pnpm generate:edgeql && pnpm generate:interfaces
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

    更多查询方式阅读文档: [fully-typed EdgeQL queries with TypeScript](https://docs.geldata.com/reference/clients/js/querybuilder)

6. Start development server.

    ```bash
    pnpm run dev
    ```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
