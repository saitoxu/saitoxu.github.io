---
title: React NativeのiOS13対応
date: "2020-05-18T00:00:00.000Z"
tags:
  - React Native
  - iOS
---

少し前ですがReact NativeのアプリでiOS13対応を行ったので、そのときやったことをメモしておきます。
ちなみにExpoではなく素のReact Native(v0.61)です。

主にやったことは以下の3点です。

* ダークモード対応
* Sign in with Appleの実装
* LaunchImageからLaunchScreenへの移行

それでは1つずつ見ていきます。

## ダークモード対応

[codemotionapps/react-native-dark-mode](https://github.com/codemotionapps/react-native-dark-mode)のライブラリを使用しました。
対応方針として大きく3つあると思うのですが、

1. デバイスの外観モードを反映する
1. アプリ内で独自にモードの設定を持つ
1. 上2つの案をmixする(ex. ライト・ダーク・アプリのモードを反映の3択から選べるようにする)

今回は1番簡単な「1. デバイスの外観モードを反映する」で進めました。
ライブラリの使い方は簡単で、以下のようにアプリ起動時のモードを取得できるため

```ts
import { initialMode } from 'react-native-dark-mode'

console.log('App started in', initialMode, 'mode') // 'light' or 'dark'
```

こんな感じのカラー定義ファイルを作ってコンポーネントで使うようにすると良いです。

```ts
import { initialMode, Mode } from 'react-native-dark-mode'

type ColorSchema = {
  background: string
}

type Colors = { [mode in Mode]: ColorSchema }

const colors: Colors = {
  light: {
    background: 'white'
  },
  dark: {
    background: 'black'
  }
}

export default colors[initialMode]
```

ちなみにここまでの話だとアプリ起動中にiOSの設定から外観モードを変えてもリアルタイムでモードが反映されないので(再起動が必要)、
即時反映が必要な場合はreact-native-dark-modeで提供されている`useDarkMode`などのAPIを利用すると良いです。

あと、そもそもダークモード対応する前にそれぞれのモードのカラースキーマを作成する必要がありますが、
これはデザイナーの方に頑張っていただきました(感謝..🙇‍♂️

## Sign in with Appleの実装

[invertase/react-native-apple-authentication](https://github.com/invertase/react-native-apple-authentication)のライブラリを使用しました。
実装自体は特に難しいところはなく、ライブラリのREADMEにあるように実装して、credentialを取得したらAPIに送って認証など、その後の手続きを作れば良いです。

デフォルトの「Sign in with Apple」ボタンではなく、カスタムのボタンを使う場合は以下のようにOSが対応しているか判定すると良いです。

```ts
import React from 'react'
import appleAuth from '@invertase/react-native-apple-authentication'

type Props = {}

export default function SignInWithAppleButton(props: Props) {
  // Sign in with Appleをサポートしていなければボタン非表示
  if (!appleAuth.isSupported || !appleAuth.isSignUpButtonSupported) {
    return null
  }

  // ...
}
```

## LaunchImageからLaunchScreenへの移行

React Nativeで書いてると普段意識することはないのですが、スプラッシュ画面の実装をLaunchImageからLaunchScreenに移行する必要があります。
こちらの記事を参考に移行しました。

[React Native iOS Splash Screen with Storyboard - Echobind](https://blog.echobind.com/react-native-ios-splash-screen-with-storyboard-f6f9d847994e)

ちなみに今回移行したアプリでは、[crazycodeboy/react-native-splash-screen](https://github.com/crazycodeboy/react-native-splash-screen)を使って
JS層でスプラッシュ画面の制御を行っていたのですが、LaunchScreenに移行しても問題なく使用できました。

## おわりに

今年の5月以降からダークモード等対応されてないものは申請リジェクトするよーという噂だったので、先月対応しました(対応がギリギリ😅)。
何かしら参考になると幸いです。
