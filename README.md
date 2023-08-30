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

## セットアップ手順

- [バックエンドセットアップ手順](./api/README.md)
- [フロントセットアップ手順](./front/README.md)
