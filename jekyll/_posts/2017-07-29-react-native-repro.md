---
layout: post
title: React Nativeにアプリ解析ツールのReproを導入してみる
date: 2017-07-29
tags:
  - React Native
ogp: 2017-07-29-ogp.png
---

React NativeのiOSプロジェクトにアプリ解析・マーケティングツールの
[Repro](https://repro.io/jp/)を導入する手順を調べたのでまとめます。

## **環境**

* React Native 0.46.4
* Repro SDK 2.1.12

## **手順**

#### **1. Reproのアプリを作成**

Reproにユーザ登録して、アプリを作成。

発行されるトークンは後で使うのでメモっておきます。

#### **2. React Nativeのプロジェクト作成〜SDKインストール**

React Nativeのプロジェクトを作ってReproのSDKを入れていきます。

```sh
$ react-native init ReproTest
$ cd ReproTest/ios
$ pod init
```

Podfileに`pod 'Repro'`を記述します。

あと、僕の環境では`The target ``ReproTest-tvOSTests`` is declared twice`というエラーが出たので、
`ReproTest-tvOSTests`のターゲットを一つ削除する必要がありました。

で最後に`pod install`を実行するとSDKがインストールされます。

#### **3. SDKを呼び出す**

`open ReproTest.xcworkspace`でXcodeを開いて、`AppDelegate.m`を編集します。
トークンを書き換えるのを忘れないようにしてください。

<code class="gist-code" data-gist-id="e50a259af55a8e87f3aa0413762ef027" data-gist-file="AppDelegate.m" data-gist-enable-cache="true"></code>

#### **4. アプリ実行**

プロジェクトトップで以下を実行し、アプリをシミュレータで起動します。

```sh
$ react-native run-ios
```

シミュレータが立ち上がるので、しばらく動かしてホームボタンを押します(Command + Shift + h)。
少しするとReproに動画が上がってるはずです！

## **おわりに**

以上、React NativeのプロジェクトにReproを入れて動画撮影までを行いました。

ざっと調べたところ動画は取得できますが、
イベントトラッキングなどその他機能はReact Nativeでは使えなさそうでした。

[【Xamarin/React Native】グロースハックツール「Repro」のSDKを担当するエンジニア募集！](https://jobs.forkwell.com/repro/jobs/1941)

という求人があるので、React NativeのSDKは現在開発中 or これから開発されるのかなと笑

SDK出る以前に何とかするなら、今のところ自分でBridgeを書く必要があるみたいです。

その場合はこちらの記事などが参考になると思います。

[Cocoapodsで入れたライブラリをReact Nativeとbridgeして使う](http://qiita.com/kouchi67/items/37f6804c925517664436)
