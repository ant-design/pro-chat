---
hero:
  title: @arvinxu/npm-template
  description: a npm develop template
  actions:
    - text: 快速上手
      link: /guide
    - text: Github
      link: /usage
---

<embed src="../README.md"></embed>

工程框架选型如下：

- 构建： father4
- 文档： dumi2
- CI: Github Action
- CD:
  - 文档发布: 使用 vercel 自动化触发文档站构建;
  - npm 发布: 使用 `semantic-release` 实现 npm 包的自动化发布;
