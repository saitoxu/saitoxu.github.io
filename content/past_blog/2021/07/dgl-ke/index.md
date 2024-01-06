---
title: Knowledge Graph Embeddingを簡単に作れるDGL-KEを使ってみた
date: "2021-07-31T00:00:00.000Z"
tags:
  - Knowledge Graph
  - Python
---

Knowledge Graphのembeddingsを簡単に作れる[DGL-KE](https://github.com/awslabs/dgl-ke)を使ってみました。<br>
実行環境はGoogle Colabです。

## インストール

pipでdglとdglkeをインストールします。dglはバージョン0.4.3で固定しないと以降のコマンド実行中にエラーが発生しました。

```py
!pip install dgl==0.4.3
!pip install dglke
```

## 組み込みのKnowledge Graphの学習

ライブラリに組み込まれているFB15kというKnowledge Graphのデータセットを学習させてみます。

```py
!DGLBACKEND=pytorch dglke_train --model_name TransE_l2 --dataset FB15k --batch_size 1000 \
--neg_sample_size 200 --hidden_dim 400 --gamma 19.9 --lr 0.25 --max_step 500 --log_interval 100 \
--batch_size_eval 16 -adv --regularization_coef 1.00E-09 --test --num_thread 1 --num_proc 8
```

上記の実行例だとCPU実行でも5分くらいで完了します。実行が完了すると`ckpts/TransE_l2_FB15k_2`のようなディレクトリにnpy形式で埋め込みベクトルが格納されます。<br>
numpyで読み込むと、それぞれのentity/relation毎に学習時に指定した次元数のベクトルが得られているのが分かります。

```py
import numpy as np
entities = np.load('ckpts/TransE_l2_FB15k_2/FB15k_TransE_l2_entity.npy')
relations = np.load('ckpts/TransE_l2_FB15k_2/FB15k_TransE_l2_relation.npy')
print(entities.shape) # -> (14951, 400)
print(relations.shape) # -> (1345, 400)
```

## 自分で用意したKnowledge Graphの学習

今度は自分でKnowledge Graphを用意して学習させてみます。<br>
DGL-KEのドキュメントにあった以下のようなテキストファイルを用意しました。

```txt
"Beijing","is_capital_of","China"
"Paris","is_capital_of","France"
"London","is_capital_of","UK"
"UK","located_at","Europe"
"China","located_at","Asia"
"Tokyo","is_capital_of","Japan"
```

これを`my_data/train.txt`というファイル名で保存し、下記コマンドで学習を実行します。<br>
学習用ファイル以外にバリデーション用・テスト用も指定できますが今回は省略しました。

```py
!DGLBACKEND=pytorch dglke_train --model_name TransE_l2 --data_path my_data --dataset mykg --format raw_udd_hrt --delimiter "," --data_files train.txt \
--batch_size 2 --neg_sample_size 2 --hidden_dim 4 --gamma 19.9 --lr 0.25 --max_step 10 --log_interval 2 \
-adv --regularization_coef 1.00E-09
```

組み込みのときと同じようにentityとrelationのベクトルを得られました。

```py
entities2 = np.load('ckpts/TransE_l2_mykg_14/mykg_TransE_l2_entity.npy')
relations2 = np.load('ckpts/TransE_l2_mykg_14/mykg_TransE_l2_relation.npy')
print(entities2.shape) # -> (10, 4)
print(relations2.shape) # -> (2, 4)
```

## 推論を試してみる

DGL-KEには学習したembeddingsを使ってトリプレット中の欠損したentity/relationを予測する`dglke_predict`コマンドと類似のentityを探索する`dglke_emb_sim`コマンドがあります。<br>
これらも試してみたのですが、Colabだと以下のようなエラーが発生して残念ながら結果は得られませんでした。

```
Traceback (most recent call last):
  File "/usr/local/bin/dglke_emb_sim", line 33, in <module>
    sys.exit(load_entry_point('dglke==0.1.0.dev0', 'console_scripts', 'dglke_emb_sim')())
  File "/usr/local/lib/python3.7/dist-packages/dglke/infer_emb_sim.py", line 120, in main
    result = model.topK(head, tail, bcast=bcast, pair_ws=pair_wise, k=args.topK)
  File "/usr/local/lib/python3.7/dist-packages/dglke/models/infer.py", line 329, in topK
    result.append((F.asnumpy(head[head_idx]),
IndexError: tensors used as indices must be long, byte or bool tensors
```

---

プログラミングを一切することなくデータを用意してコマンドを実行するだけで出来たので、TransEやDistMultなどの既存のモデルでいいからとりあえず学習させたいというケースには有用だなと思いました。
