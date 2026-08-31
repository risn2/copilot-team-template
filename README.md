# copilot-team-template

チームで共有する **GitHub Copilot Instructions / Agents / Skills** のテンプレートリポジトリです。

## 目的
- 開発前に `docs/` に要求仕様書・詳細設計書を残す
- その内容に基づいて実装計画を作成する
- 実装・レビュー・運用を一貫したルールで進める

## 標準フロー（Docs-First）
1. 要求仕様書を作成（`docs/requirements/`）
2. 詳細設計書を作成（`docs/design/`）
3. 実装計画を作成（`docs/implementation-plans/`）
4. 実装・テスト・PR

## Copilot 設定
- 共通指示: `.github/copilot-instructions.md`
- エージェント定義: `.github/agents/`
- スキル定義: `.github/skills/`

## 言語想定
- C
- C++
- C#
- Python
- Node.js / JavaScript / TypeScript

## 使い方
1. このテンプレートをベースに各プロジェクトへ適用
2. `docs/` のテンプレートをコピーして仕様・設計・実装計画を記述
3. Copilot Chat / Coding Agent で実装を進行
