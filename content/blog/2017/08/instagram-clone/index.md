---
title: React NativeでInstagramのクローンを作ってみた
date: "2017-08-20T00:00:00.000Z"
tags:
  - React Native
ogp: ./2017-08-20-ogp.png
---

React Nativeで動画ってどう扱うんだろうと思い、
[react-native-community/react-native-video](https://github.com/react-native-community/react-native-video)
を触りだしたんですが、いっそもう少し形にしようと思いInstagramのクローンを作りました（ホーム画面だけ）。

<img src="/images/2017-08-20-screenshot.gif" alt="screenshot" style="margin: 0 auto; display: block;" />

## **機能**

とりあえず動画の取り扱いを知りたかったので、
本家Instagramのホーム画面の一部の機能だけを実装してます。

* 動画の再生/停止
* 画像の表示

他の画面は遷移はできますが空のビューを表示しています。

## **使用した主なライブラリ**

主に使用したライブラリは次の2つです。

* [react-native-community/react-native-video](https://github.com/react-native-community/react-native-video)
* [wix/react-native-navigation](https://github.com/wix/react-native-navigation)

**react-native-video**

React Nativeで動画を扱うライブラリです。
React Nativeコミュニティで開発されており、
動画を扱うならデファクトスタンダードと言ってよいでしょう。

**react-native-navigation**

ホームページ作成のwixのチームが作っているナビゲーションライブラリです。
React Nativeのナビゲーションライブラリは[react-community/react-navigation](https://github.com/react-community/react-navigation)をはじめ
けっこう乱立している印象がありますが、
このwixのreact-native-navigationは順調にスター数(GitHub)を伸ばしているようです。

自分はこれまで使ったことがなかったので、今回勉強がてら使ってみることにしました。

## **雑感**

作っている最中に思ったことをつらつらと書きます。

**react-native-videoは使いやすい**

`Video`コンポーネントだけを提供しているので当然かもしれませんが、
シンプルで使いやすかったです。

ローカルの動画だけでなくリモートの動画もロードして再生できますし、
バッファリングの状態も取得できたりするので細かく制御できそうだなと思いました。

**react-native-navigationは斬新**

react-native-navigationはReact Native標準のエントリーポイントを書き換える必要があり、
これは新しいなと思いました。

```js
// index.ios.js
import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

registerScreens(); // Navigationに画面を登録する

Navigation.startTabBasedApp({
  tabs: [
    {
      label: 'One',
      screen: 'example.FirstTabScreen', // 各画面に付与されたキーを渡す
      icon: require('../img/one.png'),
      selectedIcon: require('../img/one_selected.png'),
      title: 'Screen One'
    },
    {
      label: 'Two',
      screen: 'example.SecondTabScreen',
      icon: require('../img/two.png'),
      selectedIcon: require('../img/two_selected.png'),
      title: 'Screen Two'
    }
  ]
});

// 通常は次のようにRootのコンポーネントをAppRegistryに渡す形になる
// AppRegistry.registerComponent('AwesomeApp', () => AwesomeApp)
```

ただ上記を見てもらうと分かるように、
使い方自体は分かりやすくドキュメントも整備されているので
初めてでしたがすんなり使えました。

現在次のメジャーバージョンの開発が行われているみたいなので、
期待して待ちたいと思います。

## **おわりに**

以上、Instagramクローンを作ってみての雑感でした。
どちらのライブラリも使いやすかったので、ぜひプロダクトで使ってみたいなと思いました。

Instagramクローンのソースは以下においてますので参考にしてください。

[saitoxu/InstaClone](https://github.com/saitoxu/InstaClone)
