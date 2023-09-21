## Cyclist Podium

Rails7+Next13 のサンプルアプリ

## アーキテクチャ

### バックエンド

- フレームワーク
  - Rails7
- GraphQL ライブラリ
  - GraphQL Ruby
  - GraphQL Batch

### フロントエンド

- 言語
  - TypeScript
- フレームワーク
  - Next13(App Router)
- GraphQL クライアント
  - Urql(graphql client)
- UI フレームワーク
  - Chakra UI
- フォームライブラリ
  - ReactHookForm
- バリデーションライブラリ
  - Zod
- テスト
  - Jest
- E2E テスト
  - Playwright(or Cypress)
- 開発支援
  - デザインシステム、UI テスト
    - Storybook7
  - モックサーバ
    - MockServiceWorker
  - 型定義自動生成
    - GraphQL Code Generator
  - コードジェネレーター
    - Scaffdog

## 作成手順手順

- [バックエンド作成手順](./api/README.md)
- [フロント作成手順](./front/README.md)

## アプリの起動

開発環境では docker-compose で db, api, front を起動できるようにしています。

```sh
$ docker-compose up

# db, api, front コンテナが起動していることを確認する
[+] Running 3/0
 ✔ Container cyclist-podium-db-1     Created
 ✔ Container cyclist-podium-front-1  Created
 ✔ Container cyclist-podium-api-1    Created

Attaching to cyclist-podium-api-1, cyclist-podium-db-1, cyclist-podium-front-1
cyclist-podium-db-1     |
cyclist-podium-db-1     | PostgreSQL Database directory appears to contain a database; Skipping initialization
cyclist-podium-db-1     |
cyclist-podium-db-1     | 2023-09-21 17:00:26.322 JST [1] LOG:  starting PostgreSQL 16.0 (Debian 16.0-1.pgdg120+1) on aarch64-unknown-linux-gnu, compiled by gcc (Debian 12.2.0-14) 12.2.0, 64-bit
cyclist-podium-db-1     | 2023-09-21 17:00:26.322 JST [1] LOG:  listening on IPv4 address "0.0.0.0", port 5432
cyclist-podium-db-1     | 2023-09-21 17:00:26.322 JST [1] LOG:  listening on IPv6 address "::", port 5432
cyclist-podium-db-1     | 2023-09-21 17:00:26.324 JST [1] LOG:  listening on Unix socket "/var/run/postgresql/.s.PGSQL.5432"
cyclist-podium-db-1     | 2023-09-21 17:00:26.334 JST [29] LOG:  database system was shut down at 2023-09-21 17:00:12 JST
cyclist-podium-db-1     | 2023-09-21 17:00:26.343 JST [1] LOG:  database system is ready to accept connections
cyclist-podium-front-1  |
cyclist-podium-front-1  | > cyclist-podium@0.1.0 dev
cyclist-podium-front-1  | > next dev --port 8000
cyclist-podium-front-1  |
cyclist-podium-front-1  | - ready started server on [::]:8000, url: http://localhost:8000
cyclist-podium-api-1    | => Booting Puma
cyclist-podium-api-1    | => Rails 7.1.0.beta1 application starting in development
cyclist-podium-api-1    | => Run `bin/rails server --help` for more startup options
cyclist-podium-api-1    | Puma starting in single mode...
cyclist-podium-api-1    | * Puma version: 5.6.7 (ruby 3.2.0-p0) ("Birdie's Version")
cyclist-podium-api-1    | *  Min threads: 5
cyclist-podium-api-1    | *  Max threads: 5
cyclist-podium-api-1    | *  Environment: development
cyclist-podium-api-1    | *          PID: 1
cyclist-podium-api-1    | * Listening on http://0.0.0.0:3000
cyclist-podium-api-1    | Use Ctrl-C to stop
cyclist-podium-front-1  | - event compiled client and server successfully in 311 ms (20 modules)
cyclist-podium-front-1  | - wait compiling...
cyclist-podium-front-1  | - event compiled client and server successfully in 184 ms (20 modules)

```

初回は Rails の DB セットアップを実行してください。

```sh
# DBのセットアップとシードデータの投入
$ docker-compose exec api bin/rails db:prepare
$ docker-compose exec api bin/rails db:seed_fu
```

### 動作確認

#### API が起動していることを確認する

graphiql が表示できることを確認する
http://localhost:3000/graphiql

#### フロントが起動していることを確認する

選手一覧が表示できることを確認する
http://localhost:8000/riders
