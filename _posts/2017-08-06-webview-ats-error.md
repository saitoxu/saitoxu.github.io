---
layout: post
title: ATSで許可されていないhttpなURLへの対処方法
date: 2017-08-06
tags:
  - React Native
---

## **前置き**

iOSではATS(App Transport Security)で許可されていない
httpリソースにはアクセスできない仕組みになっており、
React Nativeでもそれは変わりません。

自身が管理しているドメインであればhttpsにする、または
特定の限られたhttpリソース（かつ信頼できる）であればATSを許可する、
などやり方はありますが、
今回不特定のhttpリソースにアクセスする方法を実現したかったのでちょっと調べました。

環境はReact Native 0.44、iOSでの利用を想定してます。

## **方法**

`WebView`に`onError`というpropsを渡すことで、
ネットワークに繋がっていないなどのエラー時に任意の関数を呼べます。

関数の引数としてエラー情報が入った`Proxy`オブジェクトが返ってくるので、
それを使って外部ブラウザで開いたりすると良さそうです。

<code class="gist-code" data-gist-id="19f31c67c7aff98fc56f9bd24c070cb9" data-gist-file="WebViewSample.js" data-gist-enable-cache="true"></code>

## **おわりに**

外部ブラウザで開きたくないという場合は、
今回試してはいないですが
[naoufal/react-native-safari-view](https://github.com/naoufal/react-native-safari-view)
も使えそうです（しばらく更新されていないのは気がかりですが）。
