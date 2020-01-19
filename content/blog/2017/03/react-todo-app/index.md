---
title: ReactでTODOアプリ
date: "2017-03-30T00:00:00.000Z"
tags:
  - React
  - JavaScript
ogp: ./2017-03-30-ogp.jpg
---

これまで何度か React を触ってきましたが、
今回はこれまでの復習がてら、ありがちですが TODO アプリを作ってみます。

今回の完成形はこんな感じ ↓

[todo-app](/playground/todo-app/)

## **1. 設計図を描く**

最初にコンポーネントの構成を考えます。

今回はこんな感じでいってみます。

![Components](./2017-03-30-components.png)

TODO リスト全体の状態管理は`App`コンポーネントでやって、
各 TODO のそれは`Todo`コンポーネントでやることにします。

## **2. 実装**

実装は次のようになります。

※これ以外にエントリーポイントの JS や CSS が必要になります。

`gist:saitoxu/84fcb8f20c23d26fd1cc22b39de13398?file=App.js`

`gist:saitoxu/84fcb8f20c23d26fd1cc22b39de13398?file=Form.js`

`gist:saitoxu/84fcb8f20c23d26fd1cc22b39de13398?file=TodoList.js`

`gist:saitoxu/84fcb8f20c23d26fd1cc22b39de13398?file=Todo.js`

## **3. おわりに**

以上、簡単な TODO アプリを作ってみました。

今回、せっかく用意した TODO の description フィールドを使っていないのですが、
これは次回[react-router](https://github.com/ReactTraining/react-router)の練習を兼ねて使う予定です。
