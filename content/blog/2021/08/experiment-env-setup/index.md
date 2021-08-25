---
title: 研究室のGPUサーバに実験環境を整える
date: "2021-08-29T00:00:00.000Z"
tags:
  - Poetry
  - pyenv
  - Python
  - GPU
  - VSCode
  - Research
---

研究室のGPUサーバ(Ubuntu 18.04 LTS)に実験用の環境を構築したので、手順をメモしておきます。
これからPyTorchなど深層学習ライブラリを使ってML/AI系の実験やってくぞという方の役に立つと幸いです。
sudo権限なしの一般ユーザーという前提で進めます。目次↓

1. 公開鍵認証の設定
1. pyenv/poetryインストール
1. pytorch等のインストール
1. cudaのインストール

## 1. 公開鍵認証の設定

最初はパスワード認証の設定になっていたので、公開鍵認証の設定をします。
パスワードは最初にもらったものから適当に変更しておきます。
公開鍵認証の方法は検索すれば見つかるので割愛。
sudo権限がないのでパスワード認証をOFFにはできませんでした。

## 2. pyenv/poetryインストール

[Python環境構築(pyenv+poetry+pipx) - Qiita](https://qiita.com/yano404/items/85f21897e417f03236c9)を参考に、pyenvとpoetryをインストールします。
pythonの依存管理ツールは最近はpoetryが来ているらしいので流れに乗っかっておきます。
上記の記事はbrewでpyenvを入れていますが、brewコマンドはないので[pyenv-installer](https://github.com/pyenv/pyenv-installer)を使ってインストールします。

## 3. pytorch等のインストール

poetryでプロジェクトを作成して、pytorchやtensorflowなど必要であろうライブラリを追加していきます。
だいたい`poetry add numpy`などで問題なくインストールできますが、pytorchは`poetry add pytorch`で入らないので、
[こちら](https://github.com/python-poetry/poetry/issues/1391#issuecomment-568253792)のコメントのようにurlを指定してインストールします。

<!-- リンクのtips https://download.pytorch.org/whl/cu111/ -->

```sh
$ poetry add https://download.pytorch.org/whl/cu111/torch-1.9.0%2Bcu111-cp39-cp39-linux_x86_64.whl
```

## 4. cudaのインストール

<!-- tensorflowはcudaが必要、pytorchは組み込まれてるが、最後に確認 -->

TODO

---

<!-- おわりに -->

TODO
