This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

### Next13 のセットアップ

next13 のセットアップ
https://nextjs.org/

```
$ node -v

$ npx create-next-app@latest

✔ What is your project named? … cyclist-podium
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias? … No / Yes


$ mv cyclist-podium front
# front/.gitignore の内容を .gitignore に移動する
$ rm front/.gitignore
```

```ts
# front/package.json

{
  "name": "cyclist-podium",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --port 8000",
    ...
  },
  ...
}
```

```
$ cd front
$ npm run dev

http://localhost:8000/
```

### urql のセットアップ

ライトな graphql クライアント、urql のインストール
https://formidable.com/open-source/urql/docs/basics/react-preact/

```
$ npm install urql

$ mkdir src/graphql
$ touch src/graphql/client.ts
```

```ts
// front/src/graphql/client.ts
// @see https://formidable.com/open-source/urql/docs/basics/react-preact/
import { Client, cacheExchange, fetchExchange } from "urql";

const client = new Client({
  url: "http://localhost:3000/graphql",
  exchanges: [cacheExchange, fetchExchange],
});

export default client;
```

layout.tsx へ Provider を追加

```ts
// front/app/layout.tsx
"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Provider } from "urql";
import client from "@/src/graphql/client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider value={client}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
  );
}
```

### サンプルページとクエリの追加

http://localhost:8000/riders で自転車選手一覧が表示されるようにする

```
$ mkdir app/riders
$ touch app/riders/page.tsx
```

```ts
// front/app/riders/page.tsx
"use client";

import { gql, useQuery } from "urql";

const getRidersQueryDocument = gql(`
  query getRiders {
    riders {
      id
      fullName
      age
    }
  }
`);

const useGetRidersQuery = () => {
  const [{ data, fetching, error }] = useQuery({
    query: getRidersQueryDocument,
  });
  const riders = data ? data.riders : [];
  return { riders, fetching, error };
};

const Riders = () => {
  const { riders, fetching, error } = useGetRidersQuery();

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <ul>
      {riders.map((rider) => (
        <li key={rider.id}>
          {rider.fullName}: {rider.age}
        </li>
      ))}
    </ul>
  );
};

export default function Page() {
  const riders = Riders();
  return <div>{riders}</div>;
}
```

### graphql code generator のセットアップ

新しいロードマップで推奨されている preset-client を使う
https://the-guild.dev/graphql/codegen/plugins/presets/preset-client

より実践的な設定は別途確認する
https://zenn.dev/mh4gf/articles/graphql-codegen-client-preset
https://zenn.dev/layerx/articles/028cb518cffd61

```
$ npm install -D @graphql-codegen/cli @graphql-codegen/client-preset
$ npx graphql-codegen init

? What type of application are you building? Application built with React
? Where is your schema?: (path or url) http://localhost:3000/graphql
? Where are your operations and fragments?: app/**/*.tsx
? Where to write the output: src/gql/
? Do you want to generate an introspection file? No
? How to name the config file? codegen.ts
? What script in package.json should run the codegen? codegen

$ npm run codegen
```

### サンプルページのクエリに型を効かせる

npm run codegen で生成された型定義を利用するよう gql を graphql に差し替える

```ts
"use client";

import { useQuery } from "urql";
import { graphql } from "@/src/gql";

// npm run codegen した graphql を使うことで、responseデータ等に型を聞かせることができる
const getRidersQueryDocument = graphql(`
  query getRiders {
    riders {
      id
      fullName
      age
    }
  }
`);
...
```

### storybook のセットアップ

https://storybook.js.org/recipes/next

```
$ npx storybook@latest init

# 不要なサンプルコードを削除する
$ rm -rf src/stories/*
```

front/.storybook/main.ts を編集して app 以下のディレクトリを対象として、@エイリアスを有効にする

```ts
// .storybook/main.ts
import path from "path";
import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  // ../app 以下のファイルを対象にする
  stories: ["../app/**/*.mdx", "../app/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  // @エイリアスを有効にする
  // @see https://storybook.js.org/docs/react/builders/webpack
  async webpackFinal(config) {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../"),
      };
    }
    return config;
  },
};
export default config;
```

storybook 用の Urql クライアントを用意する

```
$ touch .storybook/client.ts
```

```ts
// .storybook/client.ts
import { Client, cacheExchange, fetchExchange } from "urql";

export const client = new Client({
  url: "http://localhost:3000/graphql",
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      Accept: "*/*",
    },
  },
});
```

ストーリーのサンプルを追加

```
$ touch front/app/riders/page.stories.tsx
```

```ts
// .storybook/main.ts
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "urql";
import { client } from "@/.storybook/client";

import Page from "./page";

const Template = () => (
  <div>
    <Provider value={client}>
      <Page />
    </Provider>
  </div>
);

const meta = {
  title: "App/Riders",
  component: Template,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
```

http://localhost:6006/?path=/story/app-riders--default
で選手一覧ページのストーリーが確認できること

### MSW(MockServiceWorker)のセットアップ

https://mswjs.io/
https://storybook.js.org/addons/msw-storybook-addon

```
$ npm install msw msw-storybook-addon --save-dev
$ npx msw init public/
```

storybook で MSW を有効にする
https://storybook.js.org/addons/msw-storybook-addon

```ts
// .storybook/main.ts
const config: StorybookConfig = {
  ...
  staticDirs: ["../public"],
};
...
```

```ts
// .storybook/preview.ts
import type { Preview } from "@storybook/react";
// @see https://storybook.js.org/addons/msw-storybook-addon
import { initialize, mswLoader } from "msw-storybook-addon";

// Initialize MSW
initialize();

const preview: Preview = {
  ...
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
};
...
```

getRiders クエリ用のハンドラーとモック JSON を追加する

```
$ mkdir src/mocks
$ touch src/mocks/handlers.ts

$ mkdir src/mocks/getRiders
$ touch src/mocks/getRiders/success.json
```

```ts
import { graphql } from "msw";
import json from "./getRiders/success.json";

export const handlers = [
  graphql.query("getRiders", (req, res, ctx) => {
    return res(ctx.data(json.data));
  }),
];
```

```json
{
  "data": {
    "riders": [
      {
        "id": "1",
        "fullName": "Tadej Pogacar",
        "nationality": "Slovenia",
        "birthday": "1998-09-21",
        "age": 24,
        "__typename": "Rider"
      }
    ]
  }
}
```

選手一覧ページのストーリーを追加する

```ts
// app/riders/page.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Provider } from "urql";
import { client } from "@/.storybook/client";
import { handlers } from "@/src/mocks/handlers";

import Page from "./page";

const Template = () => (
  <div>
    <Provider value={client}>
      <Page />
    </Provider>
  </div>
);

const meta = {
  title: "App/Riders",
  component: Template,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers,
    },
  },
};
```

### Chakra UI のセットアップ

https://chakra-ui.com/
https://chakra-ui.com/getting-started/nextjs-guide

```
$ npm i @chakra-ui/react @chakra-ui/next-js @emotion/react @emotion/styled framer-motion

$ touch app/chakra-providers.tsx
```

```ts
// app/chakra-providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

export function ChakraProviders({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider>{children}</ChakraProvider>
    </CacheProvider>
  );
}
```

app/layout.tsx に反映する

```ts
"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { ChakraProviders } from "./chakra-providers";
import { Provider } from "urql";
import client from "@/src/gql/client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider value={client}>
      <html lang="en">
        <body className={inter.className}>
          <ChakraProviders>{children}</ChakraProviders>
        </body>
      </html>
    </Provider>
  );
}
```

### ReactHookForm のセットアップ

https://www.react-hook-form.com/
https://chakra-ui.com/getting-started/with-hook-form

```
$ npm install react-hook-form
```

```
$ mkdir -p "app/riders/[id]"
$ touch "app/riders/[id]/page.tsx" "app/riders/[id]/page.stories.tsx"
$ touch "app/riders/[id]/detail.tsx" "app/riders/[id]/detail.stories.tsx"
$ touch "app/riders/[id]/form.tsx" "app/riders/[id]/form.stories.tsx"
```

```ts
"use client";

import { useQuery } from "urql";
import { graphql } from "@/src/gql";
import Detail from "./detail";
import UpdateRiderForm from "./form";
import { Container } from "@chakra-ui/react";

const getRiderQueryDocument = graphql(`
  query getRider($id: ID!) {
    rider(id: $id) {
      id
      fullName
      familyName
      givenName
      nationality
      birthday
      age
    }
  }
`);

const useGetRiderQuery = (id: string) => {
  const [{ data, fetching, error }] = useQuery({
    query: getRiderQueryDocument,
    variables: { id },
  });
  const rider = data ? data.rider : { id: "" };
  return { rider, fetching, error };
};

export default function Page({ params }: { params: { id: string } }) {
  const { rider, fetching, error } = useGetRiderQuery(params.id);

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <Container maxW="container.sm" p={10} bg="white">
      <Detail rider={rider} />
      <UpdateRiderForm rider={rider} />
    </Container>
  );
}
```

### Zod のセットアップ

https://zod.dev/

```
$ npm install zod @hookform/resolvers
```

### jest のセットアップ

https://nextjs.org/docs/pages/building-your-application/optimizing/testing#jest-and-react-testing-library

Urql のモックについてはこちら
https://formidable.com/open-source/urql/docs/advanced/testing/

```
$ npm install --save-dev jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
$ npm install --save-dev @types/jest

$ touch jest.config.mjs
```

```js
// jest.config.mjs
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  testEnvironment: "jest-environment-jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
```

```ts
import Page from "./page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "urql";
import { fromValue } from "wonka";
import getRidersJson from "@/src/mocks/getRiders/success.json";

const mockClient = {
  executeQuery: jest.fn(() => {
    getRidersJson;
  }),
};

const responseState = {
  executeQuery: () => fromValue(getRidersJson),
};

describe("Page", () => {
  it("renders a heading", async () => {
    render(
      <Provider value={responseState}>
        <Page />
      </Provider>
    );

    const heading: HTMLElement = await screen.getByRole("heading", {
      name: /Tadej Pogacar/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
```

storybook に play 関数を追加してインタラクションテストを実行できるようにする

```ts
// app/riders/[id]/form.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { Provider } from "urql";
import { ChakraProviders } from "@/app/chakra-providers";
import { Container } from "@chakra-ui/react";
import { client } from "@/.storybook/client";
import { handlers } from "@/src/mocks/handlers";

import Component from "./form";

const Template = (args) => (
  <>
    <Provider value={client}>
      <ChakraProviders>
        <Container maxW="container.lg">
          <Component {...args} />
        </Container>
      </ChakraProviders>
    </Provider>
  </>
);

const meta = {
  title: "App/Riders/[id]/form",
  component: Template,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Component>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  parameters: {
    msw: {
      handlers,
    },
  },
  args: {
    rider: {
      id: "1",
      fullName: "Tadej Pogacar",
      familyName: "Pogacar",
      givenName: "Tadej",
      nationality: "Slovenia",
      birthday: "1998-09-23",
      age: "24",
    },
  },
};

Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.clear(canvas.getByLabelText("姓"));
  await userEvent.clear(canvas.getByLabelText("名"));
  await userEvent.type(canvas.getByLabelText("姓"), "Poga");
  await userEvent.type(canvas.getByLabelText("名"), "Tade");
  await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
};
```

jest から storybook をテスト実行できるようにする

```ts
// app/riders/[id]/form.test.tsx
import { composeStories } from "@storybook/react";
import { waitFor, within } from "@storybook/testing-library";
import { render } from "@testing-library/react";
import * as stories from "./form.stories";

describe("Form", () => {
  const { Default } = composeStories(stories);

  it("フォームに入力できること", async () => {
    const { container } = render(<Default />);
    Default.play({ canvasElement: container });
  });
});
```

### playwright のセットアップ

https://nextjs.org/docs/pages/building-your-application/optimizing/testing#playwright

```
$ npx create-next-app@latest --example with-playwright with-playwright-app
```
