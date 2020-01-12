---
title: RailsのセッションをRedisに保存する (2)
date: "2017-11-13T00:00:00.000Z"
tags:
  - Rails
  - Redis
ogp: ./2017-11-10-ogp.png
---

前回の記事ではRailsのセッションを
[redis-store/redis-rails](https://github.com/redis-store/redis-rails)
を使ってRedisに保存するところまでを試しました。

[RailsのセッションをRedisに保存する (1) \| yosuke.saito](https://saitoxu.io/2017/11/10/redis-rails.html)

今回はRailsの認証ライブラリで有名な
[plataformatec/devise](https://github.com/plataformatec/devise)
と組み合わせたときの挙動を確認してみます。

Railsのプロジェクトは前回作成したものを引き続き使用します。

## **Deviseのインストール**

まずはDeviseをインストールします。Gemfileに`gem 'devise'`を書いて`bundle install`を実行します。
次にDeviseのREADMEに従い`rails g devise:install`を実行し、
`config/environments/development.rb`を次のように編集します。

```rb
Rails.application.configure do
  # ...

  # 以下を追記
  config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }
end
```

最後にDeviseで認証するモデルを作成します。今回は`User`モデルとします。

```sh
$ rails g devise User
```

これでDeviseの準備が完了しました。

## **ログイン機能を足す**

次に、これまで作成してきたTodo管理アプリケーションに変更を加え、
ログインしなければタスク一覧などを確認できないようにします。

まずはルートとなるcontrollerを作成し、

```sh
$ rails g controller home index
```

`config/routes.rb`に`root to: 'home#index'`を追加します。

次に、ナビゲーションしやすいように以下のような部分テンプレートを作成し、

```erb
<!-- app/views/layouts/_navigation.html.erb -->
<ul class="nav navbar-nav">
  <li><%= link_to 'Home', root_path %></li>
  <% if current_user %>
    <li><%= link_to 'Task list', tasks_path %></li>
    <li><%= link_to 'Settings', edit_user_registration_path %></li>
    <li><%= link_to 'Log out', destroy_user_session_path, method: 'delete' %></li>
  <% else %>
    <li><%= link_to 'Login', new_user_session_path %></li>
    <li><%= link_to 'Register', new_user_registration_path %></li>
  <% end %>
</ul>
```

`app/views/layouts/application.html.erb`に追加します。

```erb
<!DOCTYPE html>
<html>

  <body>
    <!-- 以下を追記 -->
    <%= render 'layouts/navigation' %>
    <p class="notice"><%= notice %></p>
    <p class="alert"><%= alert %></p>

    <%= yield %>
  </body>
</html>
```

最後に`app/controllers/tasks_controller.rb`に1行加えてタスクのCRUDにログインを要求するようにします。

```rb
class TasksController < ApplicationController
  # 以下を追記
  before_action :authenticate_user!

  # ...
end
```

さて、ここまでで見た目は微妙ですが、一応ログインが必要なWebアプリになりました。

## **挙動の確認**

ではサーバを起動して、`http://localhost:3000/users/sign_up`からユーザ登録してみましょう。
デフォルトであればユーザ名とパスワードを入力するとそのままログインできるはずです。

ログインに成功したらRedisを確認してみましょう。
セッションが保存されているのを確認できます。

```sh
127.0.0.1:6379> keys *
1) "session:1a502b40f8166de679d543a9684d8b17"
```

試しにこのセッションを削除してみましょう。キーの削除は`del`コマンドを使います。

```sh
127.0.0.1:6379> del session:1a502b40f8166de679d543a9684d8b17
(integer) 1
```

その後ログインが必要なページ、
たとえば`http://localhost:3000/tasks/new`などを開こうとすると、
`http://localhost:3000/users/sign_in`にリダイレクトされると思います。

## **おわりに**

以上、[redis-store/redis-rails](https://github.com/redis-store/redis-rails)と
[plataformatec/devise](https://github.com/plataformatec/devise)を組み合わせてみました。
特段引っかかるところもなく簡単に導入できましたね。

ただ、実環境ではRedisの冗長化が必要となることが多いでしょう。
そこで次回はRedisの死活監視や自動フェイルオーバーを行ってくれる **Redis Sentinel** を使ってみます。
