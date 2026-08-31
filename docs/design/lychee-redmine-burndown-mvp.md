# Lychee Redmine バーンダウン MVP 詳細設計

## 1. 概要
一般ユーザー向けダッシュボード埋め込みを見据え、静的ファイルで動作するユーザー別バーンダウン UI を提供する。表示期間は常にスプリント設定を基準にし、画面・データともにスプリントを第一級の単位として扱う。

## 2. アーキテクチャ
- `mvp/index.html`: 埋め込みを想定した単一画面の UI。
- `mvp/styles.css`: 依存ライブラリなしの最小スタイル。
- `mvp/app.js`: サンプルデータ読込、クエリパラメータ解決、集計表示、SVG チャート描画。
- `mvp/data/sample-burndown.json`: スプリント中心のサンプルデータ契約。

代替案:
- Redmine プラグイン: 一般ユーザー追加の要件に合わず採用しない。
- 外部 JS ライブラリ: MVP では依存追加を避けるため採用しない。

## 3. コンポーネント設計
- Data Loader
  - `sample-burndown.json` を取得する。
  - 読込失敗時はエラーメッセージを表示する。
- State Resolver
  - 利用可能な `sprintId` と `userId` を収集する。
  - クエリパラメータ `sprint` / `user` があれば優先し、不正値なら先頭データへフォールバックする。
- Summary Renderer
  - 対象スプリント名、期間、計画 / 完了 / 残ポイントを描画する。
- Chart Renderer
  - スプリント系列から残ポイント線と理想線を SVG で描画する。
  - X 軸ラベルは系列の日付を利用し、Y 軸は最大残ポイントからスケールする。
- Daily Table Renderer
  - 日次の残ポイント、理想線、完了累計を表形式で補助表示する。

## 4. データ設計
トップレベル JSON 構造:

```json
{
  "meta": {
    "generatedAt": "2026-08-31T00:00:00Z",
    "sprintSource": "Lychee sprint configuration"
  },
  "sprints": [
    {
      "id": "sprint-2026-09",
      "name": "Sprint 2026-09",
      "projectId": 10,
      "projectName": "Product Alpha",
      "startDate": "2026-09-01",
      "endDate": "2026-09-14",
      "timezone": "Asia/Tokyo",
      "pointField": "lychee_backlog_point"
    }
  ],
  "users": [
    { "id": "u-1", "name": "Aki Tanaka" }
  ],
  "burndowns": [
    {
      "sprintId": "sprint-2026-09",
      "userId": "u-1",
      "plannedPoints": 21,
      "completedPoints": 8,
      "remainingPoints": 13,
      "series": [
        {
          "date": "2026-09-01",
          "remainingPoints": 21,
          "idealRemainingPoints": 21,
          "completedPoints": 0
        }
      ]
    }
  ]
}
```

前提:
- スプリント境界は Lychee Redmine 側の設定値を正として保持する。
- 系列の日付はスプリント開始日から終了日までの営業・非営業日を区別せず日次で持つ。
- MVP の完了判定説明は `completedPoints` として系列に反映済みのデータを表示するのみで、算出ロジックは実装しない。

## 5. API/インターフェース設計
- 入力:
  - `GET mvp/index.html?sprint=<sprintId>&user=<userId>`
- 出力:
  - DOM 上のサマリー、SVG チャート、日次表
- 将来拡張用インターフェース:
  - `sample-burndown.json` と同形の API 応答へ差し替え可能
  - 例: `GET /api/burndowns?sprintId=<id>&userId=<id>`

## 6. エラーハンドリング
- JSON の取得失敗時: エラーバナーと説明文を表示する。
- スプリントまたはユーザーに対応するデータが存在しない場合: 近いフォールバック候補へ切り替え、表示不能ならエラー表示する。
- 系列が空の場合: チャートを描画せず、空状態メッセージを表示する。

## 7. ログ/監視
- MVP では外部送信ログは持たない。
- 開発時の確認はブラウザ表示と CLI の構文確認に留める。

## 8. テスト設計
- 正常系:
  - 初期表示で最初のスプリントとユーザーのバーンダウンが表示される。
  - スプリント切替で期間表示と系列が変わる。
  - ユーザー切替でサマリーと系列が変わる。
- 異常系:
  - データ取得失敗時にエラーメッセージが表示される。
  - 不正なクエリパラメータでフォールバック表示される。
- 回帰:
  - JS 構文エラーがない。
  - サンプル JSON がパース可能である。

## 9. 移行・リリース計画
- まず静的 MVP を追加する。
- 次段階で実データ取得層のみを差し替えられるよう、UI とデータ契約を分離して保つ。
- ダッシュボード埋め込み時は `mvp/index.html` を iframe 配信できる静的ホスティングへ配置する。
