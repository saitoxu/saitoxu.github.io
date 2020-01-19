---
layout: post
title: CarrierWaveでアップロードした画像を後から変更する
date: 2017-11-23
tags:
  - Ruby
  - Rails
---

CarrierWaveを使ってアップロードしたファイルを後から変更したいことがたまにあります。
たとえば次のような状況です:

* 最初はアップロードしたファイルのファイル名をそのまま使ってたけど後からファイル名をUUIDに変更したい
* 画像ファイルのサイズが大きすぎると困るので、上限以上だったら適当にリサイズするようにしたい

こういったときuploaderのソースコードを修正してもこれからアップロードするファイルは修正したとおりになりますが、
アップロード済みのファイルは修正されません。

このように、すでにアップロード済みのファイルを修正したいときにどうするか調べました。

## **方法**

次のように公開されているファイルのURLからファイルを読み込んで保存すると、
変更が反映されたファイルを保存できます。

```rb
user = User.first
user.photo = open(user.photo.url)
user.save!
```

ただし上記だと問題が発生する場合があるので、実際は次のようにすると良いです。

```rb
user = User.first
user.photo = MiniMagick::Image.read(open(URI.encode(user.photo.url), &:read))
user.save!
```

`URI.encode()`は元のファイルのURLにマルチバイト文字が含まれている場合にURIエンコードするためです。

`MiniMagick::Image.read()`ですが、`open()`は元のファイルのサイズが小さいときに`Tempfile`クラスではなく`StringIO`クラスのオブジェクトを返すため、
CarrierWave内部でエラーが発生してしまいます。
そこで`MiniMagick::Image.read()`を挟むと両者の違いを吸収しCarrierWaveで処理できるようになります。
