---
title: Yarn + webpack + BabelでES6入門
date: "2017-03-20T00:00:00.000Z"
tags:
  - Yarn
  - webpack
  - Babel
  - JavaScript
ogp: ./2017-03-20-ogp.png
---

Yarn や webpack を使ったことがなかったので、
以下の記事をトレースする形で勉強がてら ES6 の環境を作ってみました。

[webpack+babel 環境でフロントエンドも ES6 開発](http://qiita.com/HayneRyo/items/74892d3a37ee96a5df60)

## **環境**

- macOS Sierra 10.12.3
- Node.js v6.10.0
- Yarn v0.21.3

## **1. Yarn インストール**

Yarn が入ってない人はインストールしてください。

<code class="gist-code" data-gist-id="70b7d3522332f55afbbad275c62abc6b" data-gist-file="yarn.sh" data-gist-enable-cache="true"></code>

## **2. webpack + babel インストール**

最初に Yarn を使って webpack と babel をインストールします。

<code class="gist-code" data-gist-id="70b7d3522332f55afbbad275c62abc6b" data-gist-file="init.sh" data-gist-enable-cache="true"></code>

## **3. Yarn と webpack の設定**

ディレクトリ構成は以下のようにします。

<code class="gist-code" data-gist-id="70b7d3522332f55afbbad275c62abc6b" data-gist-file="tree.sh" data-gist-enable-cache="true"></code>

それに合わせて`webpack.config.js`を以下のように書きます。

<code class="gist-code" data-gist-id="70b7d3522332f55afbbad275c62abc6b" data-gist-file="webpack.config.js" data-gist-enable-cache="true"></code>

webpack で ES6 をコンパイルするときのコマンドを`package.json`の scripts に書いておきます。

<code class="gist-code" data-gist-id="70b7d3522332f55afbbad275c62abc6b" data-gist-file="package.json" data-gist-enable-cache="true"></code>

## **4. ES6 でコードを書く**

ES6 でコードを書きます。
この辺は元記事とだいたいいっしょです。

<code class="gist-code" data-gist-id="70b7d3522332f55afbbad275c62abc6b" data-gist-file="person.js" data-gist-enable-cache="true"></code>

<code class="gist-code" data-gist-id="70b7d3522332f55afbbad275c62abc6b" data-gist-file="friend.js" data-gist-enable-cache="true"></code>

<code class="gist-code" data-gist-id="70b7d3522332f55afbbad275c62abc6b" data-gist-file="application.js" data-gist-enable-cache="true"></code>

<code class="gist-code" data-gist-id="70b7d3522332f55afbbad275c62abc6b" data-gist-file="index.html" data-gist-enable-cache="true"></code>

## **5. コンパイル＆確認**

webpack でコンパイルして、ブラウザで確認してみましょう。
alert が出れば OK です。

<code class="gist-code" data-gist-id="70b7d3522332f55afbbad275c62abc6b" data-gist-file="compile.sh" data-gist-enable-cache="true"></code>

ちなみに最後の`hs`は[http-server](https://www.npmjs.com/package/http-server)という npm モジュールで、
さくっと web サーバを立てるのに便利です。
