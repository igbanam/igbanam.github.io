---
layout: single
title: Scrollable Box
date: 2021-10-10 20:55 +0100
author: yaasky
category: blog
tag:
  - css
---

CSS has come a long way!

I recently was trying to make a box scrollable within the view. This box should take the height of the viewport, but could have content which exceed that height. Now, back in the day, I would have done this with Javascript. I had gotten ready to bite the bullet and get this written in Javascript, but something asked me to google "Maths in CSS". I found [this post][1].

### CSS Tricks

```
+-----------------------------------------+  * {
|                   1                     |    --banner-height: 20px;
+-----------+-----------------------------+  }
|           |                             |
|           |                             |  #1 {
|           |                             |    height: var(--banner-height);
|           |                             |  }
|           |                             |
|           |                             |  #2 {
|     2     |              3              |    height: calc(100vh - var(--banner-height));
|           |                             |    overflow-x: hidden;
|           |                             |    overflow-y: auto;
|           |                             |  }
|           |                             |
|           |                             |  #4 {
+-----------+-----------------------------+    height: var(--banner-height);
|                   4                     |  }
+-----------------------------------------+
```

  [1]: https://css-tricks.com/keep-math-in-the-css/
