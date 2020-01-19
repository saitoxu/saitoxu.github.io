---
title: RailsにSidekiqを導入するにあたって考慮したポイント
date: "2018-03-30T00:00:00.000Z"
tags:
  - Rails
ogp: ./03-30-ogp.png
---

最近 Rails アプリケーションに[Sidekiq](https://github.com/mperham/sidekiq)を導入したので、
そのときに考慮したポイントと参考になった記事をまとめておく。

#### **考慮したポイント**

- ログ
- リトライ
- ActiveJob/ActionMailer との連携
- concurrency の設定
- Redis/ElastiCache
- テスト
- デプロイ
- shoryuken
- その他知見

## **ログ**

[Sidekiq のロギングに Rails logger を利用する - Qiita](https://qiita.com/dany1468/items/94050916d40f803bd3b7)

通常だと`config/sidekiq.yml`に設定したログファイルに Sidekiq のログは出力される。
別の出力先にしたいときは`Sidekiq::Logging.logger`を置き換えると良いとのこと。

[Sidekiq で最大回数リトライ後に失敗した場合出すログに例外のバックトレースを含める - Qiita](https://qiita.com/dany1468/items/f3fcbfbee615074ced45)

Sidekiq はデフォルトで失敗したジョブのリトライをやってくれるが、
最後まで成功しなかったときにエラーログの出力など任意の処理を実行できる。

## **リトライ**

上で書いたように Sidekiq はデフォルトでジョブのリトライ処理をやってくれて、初期設定だと 25 回リトライしてくれる。
worker 毎にリトライ間隔や回数などを細かく指定できる、詳しくは公式の wiki を見ると良い。

[ActiveJob でリトライ制御 - Qiita](https://qiita.com/necojackarc/items/b4a8ac682efeb1f62e74)

Sidekiq と ActiveJob を連携させたときにリトライ処理をカスタマイズする方法について。
ちなみに ActiveJob だと Sidekiq の一部機能が使えなかったりしたので自分は Sidekiq をそのまま使うことにした。

## **ActiveJob/ActionMailer との連携**

[Rails 5.2 allows mailers to use custom Active Job class \| BigBinary Blog](https://blog.bigbinary.com/2018/01/15/rails-5-2-allows-mailers-to-use-custom-active-job-class.html)

Rails 5.2 から ActionMailer に独自の ActiveJob クラスを指定できる。
今は設定できないので、リトライ処理などのカスタマイズがやりづらそう（ということもあり素の Sidekiq を使うことにした）。

## **concurrency の設定**

[ActiveJob で sidekiq を使う場合、connection_pool の値は concurrency + 1 以上にしよう \| repl.info](https://repl.info/archives/659)

concurrency は Sidekiq の同時実行数を表す。
Sidekiq 自身で 1 つ、ジョブ実行のスレッド毎にコネクションを使う可能性があるので
`concurrency + 1`以上のコネクションプールが必要だよという話。
これは盲点だったので参考になった。

## **Redis/ElastiCache**

[ElastiCache がフェイルオーバーした際に気をつけるべき redis-rb の利用方法について - Qiita](https://qiita.com/dany1468/items/8946cd5e4c853b48bffd)

Sidekiq はジョブキューとして Redis を使うんだが、Redis として ElastiCache を使ってフェイルオーバーしたときにどうなるの？という話。
フェイルオーバーしても Sidekiq は自動で繋ぎ直してくれるらしい、便利。

## **テスト**

[Sidekiq を使った非同期処理のテストについて \| けんちゃんくんさんの Web 日記](https://diary.shu-cream.net/2013/05/06/sidekiq-testing-strategy.html)

Sidekiq のテストの指針。
ちょっと古いけど参考になった。

## **デプロイ**

[sidekiq を安全に止める - Qiita](https://qiita.com/pekepek/items/8eb302c997335fbce854)

ワーカーのコードを変更したときにどう停止してデプロイするかという話。
実行中のジョブがなくなってから停止/起動しましょう。

## **shoryuken**

Sidekiq を調べてるうちにジョブキューなら Amazon SQS でもいいのでは、と思って[shoryuken](https://github.com/phstc/shoryuken)という gem に行き着いた。
SQS ならメンテナンスフリーだし比較的安価なのでアリだと思ったが、ジョブの遅延実行に制限があって今回はやはり Sidekiq × Redis で行くことにした。

[shoryuken gem で簡単に SQS を使った Job Queue Worker を Rails に作成する ｜ Developers.IO](https://dev.classmethod.jp/server-side/ruby-on-rails/shoryuken-gem/)

[Shoryuken を導入しようとして諦めた話 - Qiita](https://qiita.com/ryosuke_sato/items/09ba3fe824c0b62c0d1e)

[Shoryuken でつくるバッチ処理基盤 - トレタ開発者ブログ](http://tech.toreta.in/entry/2016/06/09/120610)

トレタでは実績があるとのことなので、別の機会でぜひ使ってみたい。

## **その他知見**

Redis のメモリを節約するには・Sidekiq の中身についてなど、どれも参考になった。

[Sidekiq について基本と 1 年半運用してのあれこれ - まっしろけっけ](http://shiro-16.hatenablog.com/entry/2015/10/12/192412)

[sidekiq を使用する際に注意したい覚え書き - アトラシエの開発ブログ](http://attracie.hatenablog.com/entry/2015/10/18/200407)

[Sidekiq が動く仕組みについて - UUUM 攻殻機動隊(エンジニアブログ)](http://system.blog.uuum.jp/entry/2017/10/17/110000)

## **おわりに**

色々上げたが、Sidekiq は公式の[wiki](https://github.com/mperham/sidekiq/wiki)が最高に良く書かれているのでまずはこれをしっかり読むべし。
