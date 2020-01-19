---
title: ReactでRailsのassets内のリソースを使う
date: "2017-07-31T00:00:00.000Z"
tags:
  - Rails
  - React
---

React × Rails の環境で、React から Rails の assets 内のリソースを使う方法について調べました。
Rails 5.1 から導入された[rails/webpacker](https://github.com/rails/webpacker)を使っている前提とします。

## **環境**

- Rails 5.1.1
- React 15.5.4

## **方法**

webpacker の README に書いてますが、
assets のリソースを使いたい JS ファイルの拡張子を`.erb`にしておくと、
erb の記法が使えるようになります（デフォルトで組み込まれている`rails-erb-loader`のおかげです）。

```js
<%# app/javascript/my_pack/example.js.erb %>

<% helpers = ActionController::Base.helpers %>
var railsImagePath = "<%= helpers.image_path('rails.png') %>"
```

というわけで、これを使って次のように assets のリソースを使えます。

```js
// assets.js.erb

<% helpers = ActionController::Base.helpers %>

export const iconPath = "<%= helpers.image_path('icon.png') %>"
```

```js
// SomeComponent.js

import React from "react"
import { iconPath } from "./assets.js.erb"

export default class SomeComponent extends React.Component {
  // ...

  render() {
    return <img src={iconPath} />
  }
}
```

プロダクション環境だと各リソースにダイジェストが付与されますが、
それもきちんと対応してくれます。

ただ`xxx.js.erb`を直接あちこちで呼ぶのは気持ち悪いので、次のようにラップして使ってます。

```js
// assets.js

import { iconPath } from "assets.js.erb"
export { iconPath }
```

これで他のコンポーネントからは`import { iconPath } from './assets'`で呼べます。

以上、小ネタでした。
