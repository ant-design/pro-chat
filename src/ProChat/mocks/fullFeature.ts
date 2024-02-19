export const example = {
  chats: [
    {
      content: '请展示完整的会话高亮效果？',
      createAt: 1697862242452,
      id: 'ZGxiX2p4',
      role: 'user',
      updateAt: 1697862243540,
    },
    {
      content: `
# This is an H1
## This is an H2
### This is an H3
#### This is an H4
##### This is an H5

The point of reference-style links is not that they’re easier to write. The point is that with reference-style links, your document source is vastly more readable. Compare the above examples: using reference-style links, the paragraph itself is only 81 characters long; with inline-style links, it’s 176 characters; and as raw \`HTML\`, it’s 234 characters. In the raw \`HTML\`, there’s more markup than there is text.

---

> This is a blockquote with two paragraphs. Lorem ipsum dolor sit amet.

---

an example | *an example* | **an example**

---

1. Bird
1. McHale
1. Parish
    1. Bird
    1. McHale
        1. Parish

---

- Red
- Green
- Blue
    - Red
    - Green
        - Blue

---

This is [an example](http://example.com/ "Title") inline link.

<http://example.com/>


| title | title | title |
| --- | --- | --- |
| content | content | content |


\`\`\`bash
$ pnpm install
\`\`\`


\`\`\`javascript
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import { useDropNodeOnCanvas } from './useDropNodeOnCanvas';
\`\`\`

---

以下是一段Markdown格式的LaTeX数学公式：

我是一个行内公式：$E=mc^2$

我是一个独立公式：
$$
\\sum_{i=1}^{n} x_i = x_1 + x_2 + \\ldots + x_n
$$

我是一个带有分式的公式：
$$
\\frac{{n!}}{{k!(n-k)!}} = \\binom{n}{k}
$$

我是一个带有上下标的公式：
$$
x^{2} + y^{2} = r^{2}
$$

我是一个带有积分符号的公式：
$$
\\int_{a}^{b} f(x) \\, dx
$$
`,
      createAt: 1697862247302,
      id: 'Sb5pAzLL',
      parentId: 'ZGxiX2p4',
      role: 'assistant',
      updateAt: 1697862249387,
      model: 'gpt-3.5-turbo',
    },
  ],
  config: {
    model: 'gpt-3.5-turbo',
    params: {
      frequency_penalty: 0,
      presence_penalty: 0,
      temperature: 0.6,
      top_p: 1,
    },
    systemRole: '',
  },
};
