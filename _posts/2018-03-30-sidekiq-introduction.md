---
layout: post
title: RailsにSidekiqを導入するにあたって考慮したポイント
date: 2018-03-30
tags:
  - Rails
ogp: 2018/03-30-ogp.png
---

最近Railsアプリケーションに[Sidekiq](https://github.com/mperham/sidekiq)を導入したので、
そのときに考慮したポイントと参考になった記事をまとめておく。

#### **考慮したポイント**

* ログ
* リトライ
* ActiveJob/ActionMailerとの連携
* concurrencyの設定
* Redis/ElastiCache
* テスト
* デプロイ
* shoryuken
* その他知見

## **ログ**

[Sidekiq のロギングに Rails logger を利用する - Qiita](https://qiita.com/dany1468/items/94050916d40f803bd3b7)

通常だと`config/sidekiq.yml`に設定したログファイルにSidekiqのログは出力される。
別の出力先にしたいときは`Sidekiq::Logging.logger`を置き換えると良いとのこと。

[Sidekiq で最大回数リトライ後に失敗した場合出すログに例外のバックトレースを含める - Qiita](https://qiita.com/dany1468/items/f3fcbfbee615074ced45)

Sidekiqはデフォルトで失敗したジョブのリトライをやってくれるが、
最後まで成功しなかったときにエラーログの出力など任意の処理を実行できる。

## **リトライ**

上で書いたようにSidekiqはデフォルトでジョブのリトライ処理をやってくれて、初期設定だと25回リトライしてくれる。
worker毎にリトライ間隔や回数などを細かく指定できる、詳しくは公式のwikiを見ると良い。

[ActiveJobでリトライ制御 - Qiita](https://qiita.com/necojackarc/items/b4a8ac682efeb1f62e74)

SidekiqとActiveJobを連携させたときにリトライ処理をカスタマイズする方法について。
ちなみにActiveJobだとSidekiqの一部機能が使えなかったりしたので自分はSidekiqをそのまま使うことにした。

## **ActiveJob/ActionMailerとの連携**

[Rails 5.2 allows mailers to use custom Active Job class \| BigBinary Blog](https://blog.bigbinary.com/2018/01/15/rails-5-2-allows-mailers-to-use-custom-active-job-class.html)

Rails 5.2からActionMailerに独自のActiveJobクラスを指定できる。
今は設定できないので、リトライ処理などのカスタマイズがやりづらそう（ということもあり素のSidekiqを使うことにした）。

## **concurrencyの設定**

[ActiveJobでsidekiqを使う場合、connection_poolの値はconcurrency + 1以上にしよう \| repl.info](https://repl.info/archives/659)

concurrencyはSidekiqの同時実行数を表す。
Sidekiq自身で1つ、ジョブ実行のスレッド毎にコネクションを使う可能性があるので
`concurrency + 1`以上のコネクションプールが必要だよという話。
これは盲点だったので参考になった。

## **Redis/ElastiCache**

[ElastiCache がフェイルオーバーした際に気をつけるべき redis-rb の利用方法について - Qiita](https://qiita.com/dany1468/items/8946cd5e4c853b48bffd)

SidekiqはジョブキューとしてRedisを使うんだが、RedisとしてElastiCacheを使ってフェイルオーバーしたときにどうなるの？という話。
フェイルオーバーしてもSidekiqは自動で繋ぎ直してくれるらしい、便利。

## **テスト**

[Sidekiqを使った非同期処理のテストについて \| けんちゃんくんさんのWeb日記](https://diary.shu-cream.net/2013/05/06/sidekiq-testing-strategy.html)

Sidekiqのテストの指針。
ちょっと古いけど参考になった。

## **デプロイ**

[sidekiq を安全に止める - Qiita](https://qiita.com/pekepek/items/8eb302c997335fbce854)

ワーカーのコードを変更したときにどう停止してデプロイするかという話。
実行中のジョブがなくなってから停止/起動しましょう。

## **shoryuken**

Sidekiqを調べてるうちにジョブキューならAmazon SQSでもいいのでは、と思って[shoryuken](https://github.com/phstc/shoryuken)というgemに行き着いた。
SQSならメンテナンスフリーだし比較的安価なのでアリだと思ったが、ジョブの遅延実行に制限があって今回はやはりSidekiq × Redisで行くことにした。

[shoryuken gemで簡単にSQSを使ったJob Queue WorkerをRailsに作成する ｜ Developers.IO](https://dev.classmethod.jp/server-side/ruby-on-rails/shoryuken-gem/)

[Shoryuken を導入しようとして諦めた話 - Qiita](https://qiita.com/ryosuke_sato/items/09ba3fe824c0b62c0d1e)

[Shoryukenでつくるバッチ処理基盤 - トレタ開発者ブログ](http://tech.toreta.in/entry/2016/06/09/120610)

トレタでは実績があるとのことなので、別の機会でぜひ使ってみたい。

## **その他知見**

Redisのメモリを節約するには・Sidekiqの中身についてなど、どれも参考になった。

[Sidekiq について基本と1年半運用してのあれこれ - まっしろけっけ](http://shiro-16.hatenablog.com/entry/2015/10/12/192412)

[sidekiqを使用する際に注意したい覚え書き - アトラシエの開発ブログ](http://attracie.hatenablog.com/entry/2015/10/18/200407)

[Sidekiqが動く仕組みについて - UUUM攻殻機動隊(エンジニアブログ)](http://system.blog.uuum.jp/entry/2017/10/17/110000)

## **おわりに**

色々上げたが、Sidekiqは公式の[wiki](https://github.com/mperham/sidekiq/wiki)が最高に良く書かれているのでまずはこれをしっかり読むべし。
