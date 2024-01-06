---
title: React on Railsの環境構築手順
date: "2017-04-13T00:00:00.000Z"
tags:
  - Rails
  - React
ogp: ./2017-04-13-ogp.png
---

Rails5.1 からサポートされる JavaScript 周りのツールを使って、
Rails 上に React の環境を構築する手順をまとめました。

## **環境**

```sh
$ ruby -v
ruby 2.4.0p0 (2016-12-24 revision 57164) [x86_64-darwin16]
$ rails -v
Rails 5.1.0.rc1
```

## **手順**

**1. プロジェクト作成**

`rails new`でプロジェクトを作成します。
React のプロジェクトを作る場合は、`--webpack=react`を指定します。
もう turbolink も要らないだろうということで、`--skip-turbolinks`も指定しています。

```sh
$ rails new react-on-rails --webpack=react --skip-turbolinks
```

グローバル環境に gem をインストールするのを嫌う場合は、以下の手順で作成します。

```sh
$ rails new react-on-rails --skip-bundle --skip-turbolinks
$ cd react-on-rails
$ bundle install --path vendor/bundle
$ rails webpacker:install
$ rails webpacker:install:react
```

ここまでで React のサンプルが以下のように作られます。

```sh
$ tree app/javascript
app/javascript
└── packs
    ├── application.js
    └── hello_react.jsx
```

**2. foreman インストール**

開発中は Web サーバと Webpack のサーバ両方を起動しないといけないので、
プロセス管理ツールの foreman をインストールして手間を省きます。

Gemfile に`gem 'foreman'`と追記し、`bundle install`を実行します。

その後、以下のような Procfile をディレクトリトップに置きます。

```sh
web: bundle exec rails s
webpack-dev-server: ./bin/webpack-dev-server
```

これで開発中は、`bundle exec foreman start`でサーバを起動できるようになります。

**3. controller 作成**

適当に controller を作成して、

```sh
$ rails g controller home index
```

`hello_react.jsx`を読むようにします。

```rb
# application.html.erb
<!DOCTYPE html>
<html>
  <head>
    <title>ReactOnRails</title>
    <%= csrf_meta_tags %>

    <%= stylesheet_link_tag    'application', media: 'all' %>
    <%= javascript_include_tag 'application' %>
    <%= javascript_pack_tag    'hello_react' %>
  </head>

  <body>
    <%= yield %>
  </body>
</html>
```

これでサーバを立ち上げて、`http://localhost:5000/home/index`にアクセスすると、
React のコンポーネントが描画されてるのが確認できると思います（ポートとかパスは適当に読み替えてください）。

## **おわりに**

以上、Rails5.1 での React の環境構築手順でした。
