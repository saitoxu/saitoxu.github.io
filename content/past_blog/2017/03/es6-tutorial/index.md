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

`gist:saitoxu/70b7d3522332f55afbbad275c62abc6b?file=yarn.sh`

## **2. webpack + babel インストール**

最初に Yarn を使って webpack と babel をインストールします。

`gist:saitoxu/70b7d3522332f55afbbad275c62abc6b?file=init.sh`

## **3. Yarn と webpack の設定**

ディレクトリ構成は以下のようにします。

`gist:saitoxu/70b7d3522332f55afbbad275c62abc6b?file=tree.sh`

それに合わせて`webpack.config.js`を以下のように書きます。

`gist:saitoxu/70b7d3522332f55afbbad275c62abc6b?file=webpack.config.js`

webpack で ES6 をコンパイルするときのコマンドを`package.json`の scripts に書いておきます。

`gist:saitoxu/70b7d3522332f55afbbad275c62abc6b?file=package.json`

## **4. ES6 でコードを書く**

ES6 でコードを書きます。
この辺は元記事とだいたいいっしょです。

`gist:saitoxu/70b7d3522332f55afbbad275c62abc6b?file=person.js`

`gist:saitoxu/70b7d3522332f55afbbad275c62abc6b?file=friend.js`

`gist:saitoxu/70b7d3522332f55afbbad275c62abc6b?file=application.js`

`gist:saitoxu/70b7d3522332f55afbbad275c62abc6b?file=index.html`

## **5. コンパイル＆確認**

webpack でコンパイルして、ブラウザで確認してみましょう。
alert が出れば OK です。

`gist:saitoxu/70b7d3522332f55afbbad275c62abc6b?file=compile.sh`

ちなみに最後の`hs`は[http-server](https://www.npmjs.com/package/http-server)という npm モジュールで、
さくっと web サーバを立てるのに便利です。
