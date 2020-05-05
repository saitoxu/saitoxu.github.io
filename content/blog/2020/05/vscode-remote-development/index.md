---
title: VSCodeのRemote SSHを使ってDocker for Macとオサラバする
date: "2020-05-05T00:00:00.000Z"
tags:
  - VSCode
---

長らくDocker for Macを使って開発していましたが、
[VSCodeのRemote SSH機能](https://code.visualstudio.com/docs/remote/ssh)を使って
リモートのLinux環境に開発環境を移行しました。
結果、めちゃくちゃ開発体験良くなったので、移行方法とともに紹介したいと思います。
なお、VSCodeのRemote SSH機能の使い方自体はいくつも記事があるため割愛します。

## 移行前の課題

普段はDocker for Macを使って、コンテナを立ち上げてサーバーサイドの開発をしたり、
あとはWebフロントやアプリの開発時にもコンテナを立ち上げて、ローカルにAPIサーバを用意して開発しています。
まぁごく一般的な開発環境と思ってもらえれば良いです。

### ①Docker for Macが遅い

よく言われていることですが、Docker for Macが遅いです。
Railsの開発サーバを立ち上げたり、単体テストを流すのに数十秒くらい待つこともしばしばあります。

### ②使用されていないコンテナやイメージの削除が面倒

ローカルのSSD容量が逼迫しているため、しばしばディスク容量不足でDockerコンテナのビルドに失敗したりDBの書き込みに失敗したりしてました。
そのたびに不要なコンテナやイメージを削除したり、ファイル等削除するのが手間でした。
10TBくらいほしい。

---

というわけで、[ほげ](https://qiita.com/yuki_ycino/items/cb21cf91a39ddd61f484)の記事を読んだりして
VirtualBoxに移したいが容量ないしなーとか思ってたのですが
Remote SSH使ってAWSのEC2上などで開発すれば

* (料金との兼ね合いはあるものの)メモリ・容量実質無制限
* バックアップ簡単に取れる
* PC買い替えてもVSCode入れれば終わりなので移行が楽

と思い立ち移行してみました。

## やったこと

社内のRuby on RailsのプロジェクトをEC2のAmazon Linuxに移行してみました。
VSCode Remote - SSHの設定等は[ふが](http://blog.serverworks.co.jp/tech/2020/02/20/vscode-remote-ssh/)の記事などを参考にしていただき、
その他やったことを書きます。

* yumでgit, dockerのインストール
* dockerのインストール後処理
* docker-composeインストール
* gitの初期設定とか.bashrc

あとは`docker-compose build`して`docker-compose up -d`とかすれば普段どおりです。
Dockerすごい。

また、Remote SSHにForwaded Portというタブがあって、
ここでローカルのポートへの通信をリモートサーバへのポートに転送できます。
これでさもlocalhostでサーバが起動しているようにできるため、
フロントエンドやアプリ側の開発にAPIサーバが必要なときも問題ないです。

あとリモートサーバに`code`コマンドが追加されるため、
`code hoge.txt`などでリモートサーバ上にあるファイルをローカルのVSCodeで簡単に編集できます。
これが地味に便利。

試験的にt2.microというかなり小さめのサイズの開発用インスタンスを立ち上げてやってみたのですが、
Docker for Macより全然キビキビ動きます。
仮にm5.large(メモリ8GB)のオンデマンドインスタンスを使うとしても、
0.124USD/hで160h/month使うと月々2000円くらいなので、
けっこう経済的だなーと思います。

## おわりに

思いの外すんなり移行できて、今のところ全然デメリットを感じないのでRemote SSHすごいなと思いました。
これでしばらく開発してみたいと思います。
とは言え[新しい13インチ Macbook Pro](https://www.apple.com/jp/macbook-pro-13/)はほしい。
