# GitHub Templates

このディレクトリには、docs-first 開発フローを強制するテンプレートを配置しています。

- Common Instructions: `.github/copilot-instructions.md`
- Language Instructions: `.github/instructions/*.instructions.md`
- Custom Agents: `.github/agents/*.agent.md`
- Agent Skills: `.github/skills/<skill-name>/SKILL.md`
- Pull Request Template: `.github/pull_request_template.md`
- Issue Templates: `.github/ISSUE_TEMPLATE/*.yml`

カスタムエージェントでは原則としてモデル指定を省略し、Auto 選択を利用します。固定する場合は理由、対象タスク、見直し条件を定義に残してください。
