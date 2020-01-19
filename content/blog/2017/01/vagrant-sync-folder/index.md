---
title: "Vagrantの共有フォルダ上でファイル変更が検知されない問題に対応する"
date: "2017-01-12T00:00:00.000Z"
tags:
  - Vagrant
  - Shell
  - Jekyll
ogp: ./2017-01-12-vagrant.jpg
---

![Vagrant](./2017-01-12-vagrant.jpg)

Vagrant の共有フォルダを使っているとき、
ホストからのファイルの変更が検知されない問題があり、
簡単なシェルスクリプトを書いて対応しました。

# ファイル変更が検知されない

このブログは Jekyll を使って書いていて、
Vagrant の共有フォルダを使ってホスト側の Mac で記事を書いて
ゲスト側の Linux で Jekyll を立ち上げています。

```sh
$ bundle exec jekyll serve --host=0.0.0.0 # 変更があれば自動でビルドしてくれるはず
```

同じ OS 上で編集している場合は上記で問題ないのですが、
Vagrant の共有フォルダ上ではファイル変更が検知されず、自動でビルドしてくれません。
これだと自分でビルドしなければならず、かなり効率が落ちてしまいます。

# よくある回避方法

一応回避方法があって、Jekyll を立ち上げるときに`--force_polling`というオプションを
つけてあげれば自動でビルドされるようになります。

そもそも共有フォルダ（NFS）上でファイルの変更を監視する inotify が効かないのが問題なのですが、
`--force_polling`は inotify を使わず適当な間隔で自動ビルドしてくれるようになります。

自分の環境では体感 30 秒くらいで変更が検知されます。
ただ一回編集するごとに 30 秒も待てないので、どうしようか考えました。

# touch コマンドでファイル変更検知

ファイル自体は変更されてるようなので、
touch コマンドを使えば変更検知されるんじゃないかと試したところ、
うまいこと inotify が変更検知し、Jekyll の自動ビルドが走りました。

以下のようなスクリプトを作って走らせておくと
ローカルで開発しているかのように自動ビルドが走ります。

```sh
#!/bin/sh

BASE_DIR=/home/vagrant/yoursite
LAYOUTS=${BASE_DIR}/_layouts
POSTS=${BASE_DIR}/_posts
CSS=${BASE_DIR}/css
IMAGES=${BASE_DIR}/images

echo "Watching..."
while :
do
  touch ${BASE_DIR} ${LAYOUTS} ${POSTS} ${CSS} ${IMAGES}
  usleep 200000 # 0.2秒間隔
done
```

# おわりに

Vagrant で共有フォルダ上のファイル変更が検知されない問題について書きました。

今回は Jekyll を例に説明しましたが、Jekyll に限らずホスト側で編集・ゲスト側で
変更検知 → タスクを走らせるという場面は多いと思うので、良ければ試してみてください。
