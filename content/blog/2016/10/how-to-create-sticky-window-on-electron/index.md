---
title: "How to create sticky window on Electron"
date: "2016-10-22T00:00:00.000Z"
tags:
  - Electron
  - JavaScript
---

Today, I will introduce how to create sticky window on top by Electron.

I use the following tutorial for explanation.

[Quick Start - Electron](http://electron.atom.io/docs/tutorial/quick-start/)

To create sticky window on top,
we call `setAlwaysOnTop` method of `BrowserWindow` class.

```js
// main.js
const electron = require("electron")
const app = electron.app
const BrowserWindow = electron.BrowserWindow
let win

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadURL(`file://${__dirname}/index.html`)
  win.setAlwaysOnTop(true)
  win.on("closed", () => {
    win = null
  })
}

app.on("ready", createWindow)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
```

Or, It's also ok to give `alwaysOnTop` as an argument when creating `BrowserWindow` object.

```js
win = new BrowserWindow({ width: 800, height: 600, alwaysOnTop: true })
```
