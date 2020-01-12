---
title: RubyからRustを呼び出す
date: "2017-05-24T00:00:00.000Z"
tags: Rust Ruby
ogp: ./2017-05-24-ogp.png
---

最近趣味でRustを勉強しています。

まだ公式サイトを読んだり写経してる程度ですが、並列処理の性能は期待できますね。

今回は他言語(Ruby)からRustを呼び出して、並列性能の恩恵に与るというのをやってみます。

Rustの公式サイトの3.3節の内容になります。

[Rust Inside Other Languages](https://rust-lang-ja.github.io/the-rust-programming-language-ja/1.6/book/rust-inside-other-languages.html)

## **1. 問題**

次のようなプログラムを書いてみます。

```
10スレッドでそれぞれ1から5,000,000までの数字をカウントして、
全部のスレッドでカウントが終了したら'done!'と表示する。
```

## **2. Rubyで書く**

Rubyで書くと次のようになります。

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

これを実行すると、自分の手元のPCでは **2.286s** かかりました。

## **3. Rustで書く**

同じプログラムをRustで書いてみます。

RustとRustのパッケージマネージャであるCargoはインストール済みとします。

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

この関数をRubyから呼び出してみましょう。

## **4. RubyからRustを呼び出す**

Rubyから他言語のプログラムを呼ぶには、
FFI(Foreign Function Interface)というインターフェースにのっとります。

日本語だと以下の記事が詳しいです。

[Ruby FFIを使ったエクステンションの作り方 - Boost Your Programming!](http://kazegusuri.hateblo.jp/entry/2014/03/02/192729)

FFIの実装はgemで提供されているので、`gem install ffi`でインストールして使います。

次にRustのプログラムを外から呼び出せるようライブラリ化しましょう。

そのためには、上記のプログラムの次の部分を

```rust
fn process() {
```

このように変更します。

```rust
#[no_mangle]
pub extern fn process() {
```

もう一つ、プロジェクトトップにある`Cargo.toml`に次の3行を追加して、

```toml
[lib]
name = "embed"
crate-type = ["dylib"]
```

`cargo build --release`でビルドすれば完了です。

`target/release`以下に`libembed.so`という共有ライブラリができていると思うので、
これをFFIを使ってRubyから呼び出します。

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

Rust速いですね。

## **5. おわりに**

以上、RubyからRustを呼び出してみました。

まだちょっとしか触ってませんが、この速さと安全性は良いなと思います。

今後も継続して試していこうと思います。
