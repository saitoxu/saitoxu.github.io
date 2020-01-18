---
title: JavaScriptでフォームデータを送信する
date: "2017-05-09T00:00:00.000Z"
tags:
  - JavaScript
---

JavaScript でフォームデータを送信する方法のメモです。

## **FormData オブジェクトを使う**

`FormData`オブジェクトを使ってデータを送信します。
ファイルの送信などに重宝します。

使い方は簡単で、key-value 形式で送信するデータを詰め込むだけです。

`gist:saitoxu/7bb93564d4345ed95f61274e9b792b46?file=FormData.js`

詳しくはこちら ↓

- [FormData - Web API インターフェイス \| MDN](https://developer.mozilla.org/ja/docs/Web/API/FormData)
- [FormData オブジェクトの利用 - ウェブデベロッパーガイド \| MDN](https://developer.mozilla.org/ja/docs/Web/Guide/Using_FormData_Objects)

## **サンプル**

React/Rails で使った場合のサンプルを載せておきます。

クライアントは以下のようになります。
`FormData.append()`のキーをサンプルのようにすると、
通常の Rails のフォームデータ受信と同じようにデータを受け取れます。

`gist:saitoxu/7bb93564d4345ed95f61274e9b792b46?file=Client.js`

サーバサイドはこんな感じです。
通常の Rails と変わったところはないですね。

`gist:saitoxu/7bb93564d4345ed95f61274e9b792b46?file=users_controller.rb`
