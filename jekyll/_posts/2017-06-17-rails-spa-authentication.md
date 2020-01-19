---
layout: post
title: RailsにおけるSPAの認証方法について
date: 2017-06-17
tags: Rails React
ogp: 2017-06-17-ogp.png
---

Rails×SPAでの認証方法は何がベストなんだろうと思って、調べたことをまとめておきます。

## **SPAでの認証方法**

SPAでの認証方法はざっと調べたところ以下の3種類に集約できそうです。

1. JWT
2. トークン
3. セッション×クッキー

それぞれのPros/Consを以下で考えてみます。

## **1. JWT**

Json Web Tokenを使って認証する方法です。
JWTの改ざんできない性質を使って本人かどうかを認証します。

**Pros**

- JWTのpayload部分にユーザ情報などを含められるので、セッション不要→スケーラビリティ高
- シングルサインオンとかに使える模様→[JWTを使った簡易SSOで徐々にシステムをリニューアルしている話](https://www.slideshare.net/TsuchiKazu/jwt-ssopepabotech)
- [knock](https://github.com/nsarno/knock)というRailsでJWT認証を扱うgemがある

**Cons**

- 署名のための鍵の管理をしないといけない
- [devise](https://github.com/plataformatec/devise)的な、認証周りの面倒をまるっと見てくれるgemがなくてめんどそう

## **2. トークン**

トークン認証は推測されにくい適当な文字列をユーザ毎に生成して、
それをHTTPヘッダーなどに含めて一致不一致で認証するものです。

**Pros**

- セッション非依存なので、アプリケーションサーバを増やすのは簡単
- [devise_token_auth](https://github.com/lynndylanhurley/devise_token_auth)というdeviseのトークン認証版gemがあってさっと使える

**Cons**

- DBアクセスが増える（トークンをDBに保存する場合）
- devise_token_authのカスタマイズがめんどう

## **3. セッション×クッキー**

セッションとクッキーを使ったプリミティブな認証方法です。

**Pros**

- deviseとか古くからある認証のためのgemが使える（試してないのであれですが）

**Cons**

- アプリケーションサーバに紐づくのでスケールさせづらい。セッションストレージを外に持たすのもできるがそれはそれでめんどう
- CSRF Tokenの付与をどうするか考えないといけない（JWT・トークン認証も実装によっては考える必要があります）

## **まとめ**

以上、SPA on Railsの認証方法について調べたことを書いてみました。

個人的には、JWT認証が融通が効きそうで良いかなと思いましたが、認証機能の周辺（確認メールとかパスワードリセットとか）を作るのがめんどうですかね。

その点、devise_token_authはその辺は用意されているので、要件によってはこっちでも良いなと思います。
