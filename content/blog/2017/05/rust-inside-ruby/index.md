---
title: RubyからRustを呼び出す
date: "2017-05-24T00:00:00.000Z"
tags:
  - Rust
  - Ruby
ogp: ./2017-05-24-ogp.png
---

最近趣味で Rust を勉強しています。

まだ公式サイトを読んだり写経してる程度ですが、並列処理の性能は期待できますね。

今回は他言語(Ruby)から Rust を呼び出して、並列性能の恩恵に与るというのをやってみます。

Rust の公式サイトの 3.3 節の内容になります。

[Rust Inside Other Languages](https://rust-lang-ja.github.io/the-rust-programming-language-ja/1.6/book/rust-inside-other-languages.html)

## **1. 問題**

次のようなプログラムを書いてみます。

```
10スレッドでそれぞれ1から5,000,000までの数字をカウントして、
全部のスレッドでカウントが終了したら'done!'と表示する。
```

## **2. Ruby で書く**

Ruby で書くと次のようになります。

```rb
threads = []

10.times do
  threads << Thread.new do
    count = 0

    5_000_000.times do
      count += 1
    end

    count
  end
end

threads.each do |t|
  puts "Thread finished with count=#{t.value}"
end
puts "done!"
```

これを実行すると、自分の手元の PC では **2.286s** かかりました。

## **3. Rust で書く**

同じプログラムを Rust で書いてみます。

Rust と Rust のパッケージマネージャである Cargo はインストール済みとします。

```sh
$ cargo new embed # プロジェクト作成
$ cd embed
$ ls src/
lib.rs # これを編集する
```

`lib.rs`は次のようになります。

```rust
use std::thread;

fn process() {
    let handles: Vec<_> = (0..10).map(|_| {
        thread::spawn(|| {
            let mut x = 0;
            for _ in 0..5_000_000 {
                x += 1
            }
            x
        })
    }).collect();

    for h in handles {
        println!("Thread finished with count={}",
            h.join().map_err(|_| "Could not join a thread!").unwrap());
    }
}
```

この関数を Ruby から呼び出してみましょう。

## **4. Ruby から Rust を呼び出す**

Ruby から他言語のプログラムを呼ぶには、
FFI(Foreign Function Interface)というインターフェースにのっとります。

日本語だと以下の記事が詳しいです。

[Ruby FFI を使ったエクステンションの作り方 - Boost Your Programming!](http://kazegusuri.hateblo.jp/entry/2014/03/02/192729)

FFI の実装は gem で提供されているので、`gem install ffi`でインストールして使います。

次に Rust のプログラムを外から呼び出せるようライブラリ化しましょう。

そのためには、上記のプログラムの次の部分を

```rust
fn process() {
```

このように変更します。

```rust
#[no_mangle]
pub extern fn process() {
```

もう一つ、プロジェクトトップにある`Cargo.toml`に次の 3 行を追加して、

```toml
[lib]
name = "embed"
crate-type = ["dylib"]
```

`cargo build --release`でビルドすれば完了です。

`target/release`以下に`libembed.so`という共有ライブラリができていると思うので、
これを FFI を使って Ruby から呼び出します。

```rb
require 'ffi'

module Hello
  extend FFI::Library
  ffi_lib 'target/release/libembed.so'
  attach_function :process, [], :void
end

Hello.process

puts 'done!'
```

これを実行すると、同じ環境で **0.109s** で完了しました。

Rust 速いですね。

## **5. おわりに**

以上、Ruby から Rust を呼び出してみました。

まだちょっとしか触ってませんが、この速さと安全性は良いなと思います。

今後も継続して試していこうと思います。
