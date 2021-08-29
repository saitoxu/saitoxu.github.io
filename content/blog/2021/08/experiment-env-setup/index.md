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
大概のライブラリは`poetry add numpy`などで問題なくインストールできますが、pytorchは`poetry add pytorch`で入らないので、
[こちら](https://github.com/python-poetry/poetry/issues/1391#issuecomment-568253792)のコメントのようにURLを指定してインストールします。

```sh
$ poetry add https://download.pytorch.org/whl/cu111/torch-1.9.0%2Bcu111-cp39-cp39-linux_x86_64.whl
```

URLは環境毎に異なるので[こちら](https://download.pytorch.org/whl/cu111/)で探すと良さそうです。

## 4. cudaのインストール

自分の研究室のサーバにはcudaがインストールされていなかったので、ローカルにインストールします。
以下の記事あたりを参考にインストールします。

- [CUDAをローカルにインストールして好きなCUDAを呼び出す - Qiita](https://qiita.com/syoamakase/items/8b9570d79effbb458b10)
- [Installation of cuda10.1 and cudnn for non root users of ubuntu](https://www.fatalerrors.org/a/installation-of-cuda10.1-and-cudnn-for-non-root-users-of-ubuntu.html)

インストールが完了したら、`nvcc -V`と打ってバージョン番号が表示されれば問題ないと思います。
最後にこんな感じのpythonファイルを作成して、GPUが使えているか確認すると良いと思います。

```py
import torch
import tensorflow as tf


if __name__ == "__main__":
    print(torch.cuda.is_available())
    print(tf.config.list_physical_devices('GPU'))
```

以下のように表示されれば成功です。

```sh
$ poetry run python check.py
True
[PhysicalDevice(name='/physical_device:GPU:0', device_type='GPU'), PhysicalDevice(name='/physical_device:GPU:1', device_type='GPU')]
```

---

以上、実験環境の初期構築手順でした。
Pythonは最初の環境構築のハードルが高いと言われていますが、GPUも絡んでくると余計そうだなと思いました。
まぁとにかくこれで環境ができたので、これからガシガシ実験進めていきたいと思います。
