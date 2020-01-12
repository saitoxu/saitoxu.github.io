---
title: Reactで三目並べ
date: "2017-03-21T00:00:00.000Z"
tags: React JavaScript
ogp: ./2017-03-21-ogp.png
---

Reactの[公式チュートリアル](https://facebook.github.io/react/tutorial/tutorial.html)にある三目並べを作ってみました。

成果物はここにおいたので確認してみてください。

[react-tic-tac-toe](/playground/react-tic-tac-toe/)

## **環境**

- MacOS Sierra 10.12.3
- Node.js v6.10.0
- React 15.4.2
- Create React App 1.3.0

## **1. プロジェクト作成**

[Create React App](https://github.com/facebookincubator/create-react-app)を使ってReactのプロジェクトを作ります。

`create-react-app`が入ってない場合は`yarn`か`npm`でインストールすると便利です。

<code class="gist-code" data-gist-id="7ca9e498ef04e1c65be01751631a1eae" data-gist-file="create-react-app.sh" data-gist-enable-cache="true"></code>

## **2. マスの作成**

三目並べの各マスを表す`Square`クラスを作ります。

`Square`クラスは状態を持たないので`React.Component`を継承するのではなく`stateless functional components`という関数でよいみたいです。

<code class="gist-code" data-gist-id="7ca9e498ef04e1c65be01751631a1eae" data-gist-file="Square.js" data-gist-enable-cache="true"></code>

## **3. ボードの作成**

次にボードを表す`Board`クラスを作ります。

<code class="gist-code" data-gist-id="7ca9e498ef04e1c65be01751631a1eae" data-gist-file="Board.js" data-gist-enable-cache="true"></code>

## **4. ゲームの作成**

次にゲーム全体を表す`Game`クラスを作ります。

ここでは盤面の状態や手番、履歴の管理をします。

勝敗の判定は`calculateWinner`というヘルパーメソッドで行っています。

<code class="gist-code" data-gist-id="7ca9e498ef04e1c65be01751631a1eae" data-gist-file="Game.js" data-gist-enable-cache="true"></code>

## **5. 最後に**

エントリーポイントとなる`index.js`でゲーム盤のコンポーネントをレンダリングして、
あとはCSSなどを修正して終わりです。

<code class="gist-code" data-gist-id="7ca9e498ef04e1c65be01751631a1eae" data-gist-file="index.js" data-gist-enable-cache="true"></code>

<code class="gist-code" data-gist-id="7ca9e498ef04e1c65be01751631a1eae" data-gist-file="index.html" data-gist-enable-cache="true"></code>

<code class="gist-code" data-gist-id="7ca9e498ef04e1c65be01751631a1eae" data-gist-file="index.css" data-gist-enable-cache="true"></code>
