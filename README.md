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
- スキル定義: `.github/skills/<skill-name>/SKILL.md`

### モデル選択方針
- カスタムエージェントの `model` は原則省略し、Copilot の Auto モデル選択を利用します。
- モデルを固定する場合は、必要な能力、対象タスク、見直し条件を定義内に記載します。
- 品質はモデルの固定ではなく、明確な受け入れ基準、変更範囲に応じたテスト、差分レビューで担保します。
- セキュリティ、破壊的変更、複雑な障害解析、広範な設計判断では、高性能モデルへの切り替えと独立レビューを検討します。

> Auto の利用可否と料金はプランや組織ポリシーに依存します。導入先の Copilot 設定を確認してください。

### カスタムエージェントの確認項目
- 役割と起動条件が `description` から判断できる。
- 必要最小限のツールだけを許可している。
- 他のエージェントや Skill と責務が重複していない。
- 入力、成果物、停止条件、完了条件が明確である。
- `model` を固定する場合の理由と見直し条件がある。

### Agent Skills
各 Skill は必要な場面でのみ読み込まれる工程別手順です。

- `requirements-authoring`: 要求仕様と受け入れ基準の作成
- `design-authoring`: 詳細設計と影響分析
- `implementation-planning`: 検証可能な実装計画の作成
- `safe-implementation`: 実装、検証、レビュー、PR準備

## 言語想定
- C
- C++
- C#
- Python
- Node.js / JavaScript / TypeScript

## 使い方（Visual Studio Code）

### 前提
- Visual Studio Code がインストールされている
- Visual Studio Code に GitHub Copilot 拡張機能がインストールされ、GitHub にサインインしている
- Git が利用できる

### 手順
1. GitHub の **Use this template** からリポジトリを作成し、ローカルへクローンします。
2. Visual Studio Code でクローンしたフォルダーを開きます。
3. 導入先の言語、ビルド、テスト、セキュリティ要件に合わせて `.github/copilot-instructions.md` と必要な Agent Skills を更新します。
4. `docs/requirements/template.md`、`docs/design/template.md`、`docs/implementation-plans/template.md` をコピーし、対象機能の要求仕様、詳細設計、実装計画を順に作成します。
5. Visual Studio Code の Copilot Chat を開き、作成した文書をコンテキストとして実装を依頼します。利用可能な場合は、チャットのエージェント選択から作業に適したカスタムエージェントを選びます。
6. 実装後にプロジェクト固有の lint、ビルド、テストを実行し、結果を確認してから Pull Request を作成します。

## メンテナンス
- GitHub Copilot の設定仕様変更時に、エージェントの frontmatter と Skill の構造を確認します。
- 固定モデルは定期的に見直し、不要になった指定を削除します。
- 指示が長くなった場合は、常時必要な規則だけを共通指示に残し、工程固有の手順を Skill へ分離します。
