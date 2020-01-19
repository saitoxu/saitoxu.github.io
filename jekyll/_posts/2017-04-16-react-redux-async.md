---
layout: post
title: React+ReduxでAJAXを使ったアプリを作ってみる
date: 2017-04-16
tags: React Redux JavaScript
ogp: 2017-04-16-ogp.png
---

Redux公式のページで紹介されているAJAXを使ったアプリをベースに、
GitHubの公開リポジトリを取得するアプリを作ってみました。

[React Redux Async Sample](/playground/react-redux-async-sample/)

動作イメージ↓

![Anime](/images/2017-04-16-anime.gif)

## **環境**

- react 15.5.4
- redux 3.6.0
- react-redux 5.0.4
- redux-thunk 2.2.0

## **手順**

大まかなステップだけ説明します。

**1. Stateを決める**

最初にアプリケーション全体のStateを決めます。
今回は以下のように単純な形でいきます。

```js
{
  username: "saitoxu",
  isFetching: false,
  repos: [
    { name: "repo1" },
    { name: "repo2" },
    { name: "repo3" }
  ]
}
```

**2. Actionの定義**

Actionはリクエストを送るときの`REQUEST_REPOS`と、
レスポンスを受け取ったときの`RECEIVE_REPOS`の2種類定義します。

GitHubの公開リポジトリを取得するのはFetch APIを使いました。

<code class="gist-code" data-gist-id="705e41267e50dee76d28eb98849edd90" data-gist-file="actions.js" data-gist-enable-cache="true"></code>

**3. Reducerを作る**

次に、Reducerを作ります。
今回はStateが単純なので、Reducerは1つだけでOKです。

<code class="gist-code" data-gist-id="705e41267e50dee76d28eb98849edd90" data-gist-file="reducers.js" data-gist-enable-cache="true"></code>

**4. Storeを作る**

ReducerからStoreを作るのは簡単です。
非同期リクエストを扱うので、redux-thunkで提供されている`thunkMiddleware`をかませます。

<code class="gist-code" data-gist-id="705e41267e50dee76d28eb98849edd90" data-gist-file="configureStore.js" data-gist-enable-cache="true"></code>

残りは[Gist](https://gist.github.com/saitoxu/705e41267e50dee76d28eb98849edd90)にあげているので確認してみてください。
