---
title: React Nativeにアプリ解析ツールのReproを導入してみる
date: "2017-07-29T00:00:00.000Z"
tags:
  - React Native
ogp: ./2017-07-29-ogp.png
---

React Native の iOS プロジェクトにアプリ解析・マーケティングツールの
[Repro](https://repro.io/jp/)を導入する手順を調べたのでまとめます。

## **環境**

- React Native 0.46.4
- Repro SDK 2.1.12

## **手順**

#### **1. Repro のアプリを作成**

Repro にユーザ登録して、アプリを作成。

発行されるトークンは後で使うのでメモっておきます。

#### **2. React Native のプロジェクト作成〜SDK インストール**

React Native のプロジェクトを作って Repro の SDK を入れていきます。

```sh
$ react-native init ReproTest
$ cd ReproTest/ios
$ pod init
```

Podfile に`pod 'Repro'`を記述します。

あと、僕の環境では` The target ``ReproTest-tvOSTests`` is declared twice `というエラーが出たので、
`ReproTest-tvOSTests`のターゲットを一つ削除する必要がありました。

で最後に`pod install`を実行すると SDK がインストールされます。

#### **3. SDK を呼び出す**

`open ReproTest.xcworkspace`で Xcode を開いて、`AppDelegate.m`を編集します。
トークンを書き換えるのを忘れないようにしてください。

<code class="gist-code" data-gist-id="e50a259af55a8e87f3aa0413762ef027" data-gist-file="AppDelegate.m" data-gist-enable-cache="true"></code>

#### **4. アプリ実行**

プロジェクトトップで以下を実行し、アプリをシミュレータで起動します。

```sh
$ react-native run-ios
```

シミュレータが立ち上がるので、しばらく動かしてホームボタンを押します(Command + Shift + h)。
少しすると Repro に動画が上がってるはずです！

## **おわりに**

以上、React Native のプロジェクトに Repro を入れて動画撮影までを行いました。

ざっと調べたところ動画は取得できますが、
イベントトラッキングなどその他機能は React Native では使えなさそうでした。

[【Xamarin/React Native】グロースハックツール「Repro」の SDK を担当するエンジニア募集！](https://jobs.forkwell.com/repro/jobs/1941)

という求人があるので、React Native の SDK は現在開発中 or これから開発されるのかなと笑

SDK 出る以前に何とかするなら、今のところ自分で Bridge を書く必要があるみたいです。

その場合はこちらの記事などが参考になると思います。

[Cocoapods で入れたライブラリを React Native と bridge して使う](http://qiita.com/kouchi67/items/37f6804c925517664436)
