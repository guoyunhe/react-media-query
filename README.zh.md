# @guoyunhe/react-media-query

![Version](https://img.shields.io/npm/v/@guoyunhe/react-media-query)
![Downloads](https://img.shields.io/npm/dw/@guoyunhe/react-media-query)
![Bundle size](https://img.shields.io/bundlephobia/minzip/@guoyunhe/react-media-query)

用于获取媒体查询状态并监听媒体查询变化的 React Hook。

## 安装

```bash
npm i -S @guoyunhe/react-media-query
```

## 示例

```js
import { useMediaQuery } from '@guoyunhe/react-media-query';

const isMobile = useMediaQuery('(max-width: 767px)');
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
```
