---
title: ATSで許可されていないhttpなURLへの対処方法
date: "2017-08-06T00:00:00.000Z"
tags:
  - React Native
---

## **前置き**

iOS では ATS(App Transport Security)で許可されていない
http リソースにはアクセスできない仕組みになっており、
React Native でもそれは変わりません。

自身が管理しているドメインであれば https にする、または
特定の限られた http リソース（かつ信頼できる）であれば ATS を許可する、
などやり方はありますが、
今回不特定の http リソースにアクセスする方法を実現したかったのでちょっと調べました。

環境は React Native 0.44、iOS での利用を想定してます。

## **方法**

`WebView`に`onError`という props を渡すことで、
ネットワークに繋がっていないなどのエラー時に任意の関数を呼べます。

関数の引数としてエラー情報が入った`Proxy`オブジェクトが返ってくるので、
それを使って外部ブラウザで開いたりすると良さそうです。

`gist:saitoxu/19f31c67c7aff98fc56f9bd24c070cb9?file=WebViewSample.js`

## **おわりに**

外部ブラウザで開きたくないという場合は、
今回試してはいないですが
[naoufal/react-native-safari-view](https://github.com/naoufal/react-native-safari-view)
も使えそうです（しばらく更新されていないのは気がかりですが）。
