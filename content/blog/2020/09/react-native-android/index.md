---
title: iOS版でのみ提供していたReact NativeアプリのAndroid版をリリースした
date: "2020-09-22T00:00:00.000Z"
tags:
  - React Native
---

React Native製の弊社アプリのAndroid版を先日リリースしました。
今回はReact NativeのAndroid版開発にあたって躓いたポイントと、その解決策を紹介します。
目次はこちら↓

```
1. PanResponderを使ったアニメーションがカクつく
2. 3rdパーティライブラリが動かない
3. React Nativeにバグがある
```

前提としてExpoではないピュアなReact Nativeプロジェクトを想定しています。

## 1. `PanResponder`を使ったアニメーションがカクつく

React Nativeにはドラッグやピンチなどのジェスチャーを扱う
[PanResponder](https://reactnative.dev/docs/panresponder)というAPIがあります。
弊社のアプリでは`PanResponder`を使ってTinderのようなカードを左右にスワイプする動きを実現しており、
iOSでは問題なく動いていたのですがAndroid上ではアニメーションがカクついたり、素早くカードを動かすと止まったりすることが発生していました。

そこで、`PanResponder`の代わりに[software-mansion/react-native-gesture-handler](https://github.com/software-mansion/react-native-gesture-handler)を使ってジェスチャーを制御することで解決しました。
詳しくは調べられていないですが、react-native-gesture-handlerはJSスレッドではなくUIスレッド上で実行されるためパフォーマンスに優れているようです。

## 2. 3rdパーティライブラリが動かない

https://github.com/ds300/patch-package
を使う

## 3. React Nativeにバグがある

https://github.com/facebook/react-native/wiki/Building-from-source
ソースから直す

## おわりに

クロスプラットフォーム対応できるのがReact Nativeの1つの魅力ですが、
諸事情あって長らくiOS版でのみ提供していました。
