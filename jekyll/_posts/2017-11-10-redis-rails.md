---
layout: post
title: RailsのセッションをRedisに保存する (1)
date: 2017-11-10
tags:
  - Rails
  - Redis
ogp: 2017-11-10-ogp.png
---

デプロイ中にセッションを飛ばさないために、
セッションをアプリケーション外に保存するケースがあります。
今回はそういったケースのために、
RailsのセッションをRedisに保存できる
[redis-store/redis-rails](https://github.com/redis-store/redis-rails)
を使ってみました。

## **まずは素のRailsプロジェクトを作成**

まずは素のRailsプロジェクトを作成します。
最初のウェルカムページだけだとセッションが生成されないので、
今回はTodo管理システムを作るということにして、
Scaffoldを使っていきます。
ちなみにRailsのバージョンは5.1.4を使っていきます。

```sh
$ rails new redis-rails-sample --skip-bundle --skip-turbolinks
$ cd redis-rails-sample
$ bundle install --path vendor/bundle
$ rails g scaffold Task title:string status:integer
```

## **redis-railsをインストール**

次に[redis-store/redis-rails](https://github.com/redis-store/redis-rails)を
インストールして設定を書いていきます。
Gemfileに`gem 'redis-rails'`と書いて、`bundle install`を実行します。

次に`config/application.rb`を以下のように編集します。

```rb
module RedisRailsSample
  class Application < Rails::Application
    # ...

    # これを追記
    config.cache_store = :redis_store, "redis://localhost:6379/0/cache", { expires_in: 90.minutes }
  end
end
```

最後に`config/initializers/session_store.rb`というファイルを作成し、
以下の内容にします。

```rb
RedisRailsSample::Application.config.session_store :redis_store, {
  servers: [
    {
      host: "localhost",
      port: 6379,
      db: 0,
      namespace: "session"
    },
  ],
  key: "_#{Rails.application.class.parent_name.downcase}_session"
}
```

## **Redisにセッションが保存されるか確認**

ローカルでRedisとRailsを立ち上げて、ブラウザで
`http://localhost:3000/tasks`にアクセスしてみましょう。

ちなみにここで`(error) DENIED Redis is running in protected mode because protected mode is enabled ~`
というエラーが発生する場合は、下記を参考にしてください。

[redis で because protected mode is enabled が出た場合の対処 - Qiita](https://qiita.com/port9/items/94ececff95adaa27b950)

`redis-cli`を使ってRedisの中身を確認すると、セッションが保存されているのが確認できます。

```sh
$ redis-cli
127.0.0.1:6379> keys *
1) "session:d473262d9ea737183cfea7327c7abb2e"
127.0.0.1:6379> get session:d473262d9ea737183cfea7327c7abb2e
"\x04\b{\x06I\"\x10_csrf_token\x06:\x06EFI\"1OVi9+6AQ8dkLwHvPbYSacBuAgtnkPKp9A+cHUBrYwEQ=\x06;\x00F"
```

## **セッションの有効期限を設定する**

上記の設定だとRedisに溜まったデータが削除されず、メモリが不足してしまいます。

> 確認したい場合はブラウザの開発ツールでcookieを削除してページにアクセスするのを繰り返してみてください。
前のセッションが破棄されずRedisに溜まっていくのが確認できます。

先ほど作成した`config/initializers/session_store.rb`に1行追加して、
セッションの有効期限を設定しましょう。

```rb
RedisRailsSample::Application.config.session_store :redis_store, {
  servers: [
    {
      host: "localhost",
      port: 6379,
      db: 0,
      namespace: "session"
    },
  ],
  # 以下の行を追記
  expire_after: 1.minute, # 本番では1.weekなどにすると良いでしょう
  key: "_#{Rails.application.class.parent_name.downcase}_session"
}
```

ここでもう一度RedisとRailsを立ち上げ
`http://localhost:3000/tasks`にアクセスしてみると、
同じようにセッションが保存されていますが、
今度は有効期限が設定されているのが分かります。

```sh
127.0.0.1:6379> keys *
1) "session:244f74bbe23995aedc7624eeafe2131d"
127.0.0.1:6379> ttl session:244f74bbe23995aedc7624eeafe2131d
(integer) 51
```

## **おわりに**

以上、簡単でしたが[redis-store/redis-rails](https://github.com/redis-store/redis-rails)
を使ってみました。
次回は有名な認証機能のライブラリである[plataformatec/devise](https://github.com/plataformatec/devise)
と組み合わせた挙動を確認していきたいと思います。
