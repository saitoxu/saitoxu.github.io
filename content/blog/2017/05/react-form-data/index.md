---
title: JavaScriptでフォームデータを送信する
date: "2017-05-09T00:00:00.000Z"
tags:
  - JavaScript
---

JavaScriptでフォームデータを送信する方法のメモです。

## **FormDataオブジェクトを使う**

`FormData`オブジェクトを使ってデータを送信します。
ファイルの送信などに重宝します。

使い方は簡単で、key-value形式で送信するデータを詰め込むだけです。

<code class="gist-code" data-gist-id="7bb93564d4345ed95f61274e9b792b46" data-gist-file="FormData.js" data-gist-enable-cache="true"></code>

詳しくはこちら↓

- [FormData - Web API インターフェイス \| MDN](https://developer.mozilla.org/ja/docs/Web/API/FormData)
- [FormData オブジェクトの利用 - ウェブデベロッパーガイド \| MDN](https://developer.mozilla.org/ja/docs/Web/Guide/Using_FormData_Objects)

## **サンプル**

React/Railsで使った場合のサンプルを載せておきます。

クライアントは以下のようになります。
`FormData.append()`のキーをサンプルのようにすると、
通常のRailsのフォームデータ受信と同じようにデータを受け取れます。

<code class="gist-code" data-gist-id="7bb93564d4345ed95f61274e9b792b46" data-gist-file="Client.js" data-gist-enable-cache="true"></code>

サーバサイドはこんな感じです。
通常のRailsと変わったところはないですね。

<code class="gist-code" data-gist-id="7bb93564d4345ed95f61274e9b792b46" data-gist-file="users_controller.rb" data-gist-enable-cache="true"></code>
