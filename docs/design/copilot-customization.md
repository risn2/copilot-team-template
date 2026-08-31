# Copilot カスタマイズ詳細設計

## 1. 概要
常時適用する共通指示を小さく保ち、工程固有の手順を Agent Skills に分離する。モデルは原則 Auto に委ね、品質は明示的な検証ゲートで担保する。

## 2. アーキテクチャ
- `.github/copilot-instructions.md`: 全作業に適用する不変ルール。
- `.github/instructions/*.instructions.md`: `applyTo` で対象を限定した言語別規則。
- `.github/agents/`: 役割、利用ツール、委譲範囲を定義する。モデル指定は原則省略する。
- `.github/skills/<name>/SKILL.md`: 必要な場面だけ読み込む工程別チェックリスト。
- `docs/`: 要求、設計、実装計画の記録。

## 3. コンポーネント設計
- Requirements Skill: 要求と受け入れ基準を整理する。
- Design Skill: 影響範囲、代替案、インターフェース、テストを設計する。
- Planning Skill: 要求・設計を小さな検証可能タスクに分解する。
- Safe Implementation Skill: 実装、検証、レビュー、PR準備を管理する。
- Language Instructions: C、C++、C#、Python、JavaScript、TypeScript の拡張子を重複なく担当し、公式または言語提供元の規約へのリンクと実務上の要点を提供する。

## 4. データ設計
永続データの変更はない。Markdown と YAML frontmatter を設定データとして扱う。

## 5. API/インターフェース設計
- Skill の必須メタデータは `name` と `description`。
- Skill 名は小文字英数字とハイフンを使用し、ディレクトリ名と一致させる。
- エージェントで `model` を省略し、Copilot の既定または Auto 選択を利用する。
- 言語別ファイルは `.github/instructions/<language>.instructions.md` とし、YAML frontmatter の `applyTo` にカンマ区切りの glob を指定する。
- 拡張子の割り当ては、C が `*.c` と `*.h`、C++ が `*.cc`、`*.cpp`、`*.cxx`、`*.hh`、`*.hpp`、`*.hxx`、C# が `*.cs`、Python が `*.py` と `*.pyi`、JavaScript が `*.js`、`*.jsx`、`*.mjs`、`*.cjs`、TypeScript が `*.ts`、`*.tsx`、`*.mts`、`*.cts` とする。
- リポジトリの formatter、linter、コンパイラ設定と既存規約を言語別指示より優先する。

## 6. エラーハンドリング
- 仕様不明、必要権限不足、検証不能の場合は推測で完了扱いにせず停止して論点を提示する。
- 検証失敗は隠さず、実行コマンド、失敗内容、未検証範囲を報告する。
- 公式規約に一般向けスタイルの定義がない言語では、その旨を明記し、権威ある提供元のガイドラインを参照する。

## 7. ログ/監視
PR 本文に変更理由、影響範囲、検証結果、未解決リスクを残す。

## 8. テスト設計
- Skill の配置、ファイル名、frontmatter を確認する。
- 言語別ファイルの配置、命名、`applyTo` の構文、拡張子の重複と不足を確認する。
- 各ファイルの規約名と参照 URL を確認する。
- 代表的な対象パスと非対象パスを glob に照合する。
- Markdown と Issue Form YAML の構文、相対リンク、文字コードを確認する。
- Auto 選択の方針と例外条件が README、共通指示、PR テンプレートで矛盾しないことを確認する。

## 9. 移行・リリース計画
既存の `.github/skills/*.md` を同名ディレクトリの `SKILL.md` へ移行する。参照パスを更新し、旧ファイルは重複読み込みを避けるため削除する。

言語別指示は追加のみで導入でき、既存の共通指示との後方互換性を保つ。問題がある場合は該当する `.instructions.md` を削除して切り戻す。
