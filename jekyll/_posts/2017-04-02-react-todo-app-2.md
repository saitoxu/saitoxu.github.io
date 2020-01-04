---
layout: post
title: TODOアプリでReact Routerを使ってみる
date: 2017-04-02
tags: React JavaScript
ogp: 2017-04-02-ogp.png
---

前回作った
[TODOアプリ](/playground/todo-app/)に、
[react-router](https://github.com/ReactTraining/react-router)
を使ってルーティングを組み込んでみます。

できたものはこちら↓

[todo-app-2](/playground/todo-app-2/)

## **1. コンポーネントの構成**

コンポーネントの構成は次のような形にします。

![Components](/images/2017-04-02-components.png)

また、ルーティングは次のとおりとします。

- `/` トップページ
- `/:id` 各TODOの詳細ページ

各TODOのリンクをクリックすると、その詳細が表示されるという簡単なものです。

## **2. 実装**

前回はちょっとややこしい作りにしてましたが、今回は`App`コンポーネントだけでstate管理をし、他のコンポーネントは基本レンダリングするだけにしました。

<code class="gist-code" data-gist-id="ea1f9838f288975bbbfe3722fe13d8ad" data-gist-file="App.js" data-gist-enable-cache="true"></code>

※一応、残りの主要なコンポーネントも[Gist](https://gist.github.com/saitoxu/ea1f9838f288975bbbfe3722fe13d8ad)にあげてます。

## **3. おわりに**

TODOアプリにreact-routerを使ってルーティングを組み込んでみました。

次はReduxを触ってみる予定です。
