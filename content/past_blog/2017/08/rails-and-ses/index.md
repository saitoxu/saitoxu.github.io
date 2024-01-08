---
title: RailsとAmazon SESを使ってメールを確実に届けるには
date: "2017-08-14T00:00:00.000Z"
tags:
  - Rails
  - Amazon SES
---

Rails と Amazon SES を使ったシステムで、
メールをなるべく確実に届ける方法について調べました。

## **メールを確実に届けるには？**

メールの到達率を上げるには次のことに気をつけなければなりません。

1. レピュテーション
2. インフラ
3. 認証

これらについて、Rails と SES を使う場合にどこに気をつけるべきか見ていきたいと思います。

## **1. レピュテーション**

レピュテーションを落とさないためにはバウンス率と苦情の数に気をつける必要があります。

> バウンスとはメールアドレスが間違っていた場合や、配信先のメールサーバがダウンしていたなどの理由によりメールが配信されないこと。
> 苦情はメールがスパムとして報告されること

SES ではバウンスや苦情があった場合、Amazon SNS を介して通知してくれます。
これを使ってバウンスや苦情のあったメールアドレスを管理し、
そういったメールアドレスには送らないようにすることでバウンス率・苦情の数を低く抑えることができます。

実装は、一例ですが次の記事が参考になります。

[Rails×SES バウンスメール（不達メール）対策](http://kinosuke.hatenablog.jp/entry/2016/03/03/200846)

また、バウンス率や苦情の割合は API 経由でも取得できるので、
観測しておいて上昇してきたら対策を講じるのも手です。

## **2. インフラ**

メール配信のインフラで気をつける点は、

- メールサーバをセキュアな構成にする
- 固定 IP を使って配信する

などがありますが、この辺は SES が面倒を見てくれます。

ユーザとしてできることとして、配信するメールアドレスは
postmaster や abuse などのアカウントで **受信もできるようにしておく** と良いでしょう。

自分は Amazon Lambda と以下のスクリプトを使って、
postmaster 宛てのメールを自分のメールアドレスに転送するようにしました。

[arithmetric/aws-lambda-ses-forwarder](https://github.com/arithmetric/aws-lambda-ses-forwarder)

## **3. 認証**

送信者認証(SPF)やドメイン電子署名(DKIM)を利用するようにしましょう。

こちらの記事などが参考になります。

[Amazon SES で SPF と DKIM を用いて高信頼なメールを送る](http://dev.classmethod.jp/cloud/amazon-ses-production/)

## **おわりに**

以上、Rails と SES を使うときにメールの到達率を向上させる方法についてまとめました（終わってみたらあまり Rails とは関係ない内容になりました笑）。

調査中、以下のページがたいへん参考になりました。

[Email Deliverability Guide ～メールを確実に届けるために～](https://sendgrid.kke.co.jp/guide/email-deliverability-guide-%EF%BD%9E%E3%83%A1%E3%83%BC%E3%83%AB%E3%82%92%E7%A2%BA%E5%AE%9F%E3%81%AB%E5%B1%8A%E3%81%91%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AB%EF%BD%9E/)