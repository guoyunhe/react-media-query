# @guoyunhe/react-media-query

![Version](https://img.shields.io/npm/v/@guoyunhe/react-media-query)
![Downloads](https://img.shields.io/npm/dw/@guoyunhe/react-media-query)
![Bundle size](https://img.shields.io/bundlephobia/minzip/@guoyunhe/react-media-query)

React hooks to get state from media query and listen to media query changes.

## Install

```bash
npm i -S @guoyunhe/react-media-query
```

## Example

```js
import { useMediaQuery } from '@guoyunhe/react-media-query';

const isMobile = useMediaQuery('(max-width: 767px)');
const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
```
