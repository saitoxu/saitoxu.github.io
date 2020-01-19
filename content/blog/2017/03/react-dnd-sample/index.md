---
title: React DnDを使ってみた
date: "2017-03-22T00:00:00.000Z"
tags:
  - React
  - JavaScript
---

React でドラッグ＆ドロップを簡単に実装できる[React DnD](http://react-dnd.github.io/react-dnd/)を使ってみました。

[前回](/2017/03/21/react-tic-tac-toe.html)同様、公式の[チュートリアル](http://react-dnd.github.io/react-dnd/docs-tutorial.html)に従ってます。

一応、成果物はこちら ↓

[react-dnd-sample](/playground/react-dnd-sample/)

## **環境**

- MacOS Sierra 10.12.3
- Node.js v6.10.0
- React 15.4.2
- React DnD 2.2.4

## **1. プロジェクト作成と React DnD インストール**

`create-react-app`を使って React のプロジェクトを作り、`yarn`で React DnD を入れます。

```sh
$ create-react-app react-dnd-sample
$ cd react-dnd-sample
$ yarn add react-dnd react-dnd-html5-backend
$ yarn start
```

## **2. 実装**

今回は次のコンポーネントを作ります。

- `Knight` : ナイトのコマ
- `Square` : チェス盤のマス
- `Board` : チェス盤
- `BoardSquare` : チェス盤と各マスのつなぎ。`Square`は表示だけ担当

コンポーネント以外には以下を用意します。

- `Game` : ドラッグ＆ドロップを監視してレンダリングの指示を出す Observer
- `Constants` : 定数

まあまあ長くなってしまったので、コードは[Gist](https://gist.github.com/saitoxu/70aa7204b3b3fb4e82b749fa55115a1b)を確認してみてください。

## **3. 所感**

既存のコンポーネントに対し、
ドラッグ対象なら`DragSource`、ドロップ対象なら`DropTarget`でラップして、
後は少しメソッドを足してあげるだけで使えるので、けっこう使いやすいなと思いました。

例えば`Knight`クラスはドラッグされる対象なので、`DragSource`でラップしています。

`gist:saitoxu/70aa7204b3b3fb4e82b749fa55115a1b?file=Knight.js`

今回使っている`react-dnd-html5-backend`だとタッチデバイスのときに動作しないのですが、
[react-dnd-touch-backend](https://github.com/yahoo/react-dnd-touch-backend)というのもあるみたいなので次使ってみたいです。
