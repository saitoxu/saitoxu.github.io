---
title: iOS版でのみ提供していたReact NativeアプリのAndroid版をリリースした
date: "2020-09-22T00:00:00.000Z"
tags:
  - React Native
  - Android
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

*※詳しくは調べられていないですが、react-native-gesture-handlerはJSスレッドではなくUIスレッド上で実行されるためパフォーマンスに優れているようです。*

## 2. 3rdパーティライブラリが動かない

iOSでは問題なく動いても、Androidでは正しく動かないライブラリがあります。
その場合は[ds300/patch-package](https://github.com/ds300/patch-package)を使って、
`postinstall`のタイミングで問題のソースコードにパッチを当てると良いです。
patch-packageの使い方は以下の記事に詳しく書かれていたので参考にどうぞ。

[かゆいところに手が届く！patch-packageでnpmパッケージを乗りこなそう - bagelee（ベーグリー）](https://bagelee.com/programming/javascript-2/patch-package/)

余力ができたら修正PRを送りましょう。

## 3. React Nativeにバグがある

そもそもReact Native自体に問題があるケースがあります。
弊社の場合[こちら](https://github.com/facebook/react-native/pull/28881)のPRで述べられているバグに当たって、修正する他ない状況でした。

JSレイヤーやiOSの問題の場合は、問題の箇所を特定して前述のpatch-packageを使ってパッチを当てれば良いですが、
Androidのネイティブ層はビルド済みのjarファイル等を参照しているため
ソースコードを修正しても反映されません。

そこで、以下の手順を踏む必要があります。

```
1. React Nativeのリポジトリのフォークを作成
2. フォークしたリポジトリでソースコードを修正
3. Androidのソースコードをビルドしてコミット
4. アプリケーションからフォークしたReact Nativeのリポジトリを参照
```

こうして書くと大変そうですが、公式の手順↓に詳しく書かれており
思ってたより簡単にフォーク版React Nativeを公開できました。

[Building from source · facebook/react-native Wiki](https://github.com/facebook/react-native/wiki/Building-from-source)

## おわりに

クロスプラットフォーム対応できるのがReact Nativeの1つの魅力ですが、
諸事情あって長らくiOS版でのみ提供していました。
今回無事にAndroid版をリリースできて良かったです。

[DiscordのようにiOS版のみでReact Nativeを採用するケース](https://gigazine.net/news/20180807-discord-react-native/)もあるように、
Androidでのパフォーマンスに若干心配もしてましたが杞憂でした。
開発も力技なところはありましたが思っていたよりすんなりでき、今更ながらクロスプラットフォーム開発のありがたみを感じました。

