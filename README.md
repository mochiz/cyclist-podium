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

docker-compose で db, api, front を起動できるようにしています。

```sh
$ docker-compose up
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
