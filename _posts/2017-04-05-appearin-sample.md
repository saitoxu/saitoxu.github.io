---
layout: post
title: appear.inのAPIを使って簡単ビデオチャット
date: 2017-04-05
tags: React JavaScript
ogp: 2017-04-05-ogp.png
---

[appear.in](https://appear.in/)という手軽にビデオチャットができるサービスがあります。

最近、自分のサイトに簡単に埋め込めるAPIがあるのを知ったので、ちょっと使ってみました。

ドキュメントは[こちら](https://developer.appear.in/)

## **1. サンプルアプリ**

チャットルームを生成して、そのルーム参加者とビデオチャットできるものを作りました。

[appearin-sample](/playground/appearin-sample)

使い方のイメージはこんな感じです。

![Image](/images/2017-04-05-image.jpg)

## **2. 実装**

SDKはscriptタグで直接読み込むか、
npmモジュールとして公開されているのでそれを読み込むことで使えるようになります。

基本的な使い方は、

1. `AppearIn`クラスのインスタンスを生成
2. ブラウザがビデオチャットに対応しているか確認
3. 空いているビデオチャットルーム名を生成
4. iframeにappear.inのビデオチャットを埋め込み

となります。
実際のコードだとこんな感じです↓

<code class="gist-code" data-gist-id="0e87c9824f1c5962fab800951d1b0e7e" data-gist-file="sample.js" data-gist-enable-cache="true"></code>

また、サンプルアプリのコードは[こちら](https://gist.github.com/saitoxu/0e87c9824f1c5962fab800951d1b0e7e)に載せています。

## **3. おわりに**

かなり簡単に使えたので、プライベートのサービスやプロトタイプを作るときなどに役立ちそうです。
