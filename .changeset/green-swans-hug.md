---
'create-wagmi': patch
---

**Added ability to select frameworks.**

Each directory in `templates/` now mirrors a "framework", where its child directories mirror a "template" for that framework.

Example:

```
templates/
  next/
    connectkit/
    plain/
    rainbowkit/
    web3modal
  vite-react/
    connectkit/
    plain/
    rainbowkit/
    web3modal/
```
