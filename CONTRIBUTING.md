# 协作指南

## 开始开发

1. 从最新的 `main` 创建分支。
2. 修改 `index.html`、`styles.css` 或 `app.js`。
3. 运行 `npm run build`，同步生成 `out/index.html` 和 `team-management-demo.html`。
4. 在本地确认交互和响应式布局。
5. 提交 Pull Request，并关联对应 Issue。

## 提交与分支

- 分支：`feature/*`、`fix/*`、`docs/*`。
- 提交信息使用动词开头，清楚描述结果，例如 `Improve credit allocation summary`。
- 一个 Pull Request 聚焦一个目标，避免混入无关调整。

## Pull Request 检查

- 构建成功，且提交包含生成后的在线与离线版本。
- 视觉修改附对比截图，并说明测试视口。
- 交互修改覆盖正常、取消、余额不足等相关状态。
- 不提交密钥、账号信息、临时截图或本地日志。

## 项目管理

Issue 进入 Project 后依次经过 `Backlog`、`Ready`、`In progress`、`In review`、`Done`。负责人开始处理时更新状态，合并 Pull Request 后关闭 Issue。
