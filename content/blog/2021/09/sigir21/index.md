---
title: SIGIR'21の面白そうな論文まとめ
date: "2021-09-30T00:00:00.000Z"
tags:
  - Information Retrieval
  - Recommendation
  - Research
---

7月に行われた[SIGIR'21](https://sigir.org/sigir2021/)で発表された論文の中で、アブストを読んで興味を持った論文をリストアップしました。
この中から適当に何本か読んでみて、来月末にある[IR Reading 2021秋](https://sigir.jp/post/2021-10-30-irreading_2021fall/)のネタにしたい。

## Learning Recommender Systems with Implicit Feedback via Soft Target Enhancement ([Link](https://dl.acm.org/doi/10.1145/3404835.3462863))

*Cheng, Mingyue and Yuan, Fajie and Liu, Qi and Ge, Shenyang and Li, Zhi and Yu, Runlong and Lian, Defu and Yuan, Senchao and Chen, Enhong*

Implicit Feedbackにおける一般的な推薦タスクでは、ユーザーに評価されたアイテムの評価値を1、そうでないアイテムを0とするが、
これだと「実はpositiveな評価だがunobservedなだけのアイテム」も評価値0として扱ってしまい、これが機械学習モデルのパフォーマンスを毀損する。
そこで、0,1のhard targetの代わりにsoft target(0-1の実数値ぽい)を用いることで、推薦性能を上げようという趣旨の研究。

## Fairness among New Items in Cold Start Recommender Systems ([Link](https://dl.acm.org/doi/10.1145/3404835.3462948))

*Zhu, Ziwei and Kim, Jingu and Nguyen, Trung and Fenton, Aish and Caverlee, James*

推薦のfairness(公平性)について、多くの既存手法ではユーザーのフィードバック履歴に基づくバイアスによって発生したunfairnessを扱っているが、
新規のアイテムについてのfairnessについてはあまりリサーチされていない。
この研究では新規アイテムのfairnessを公式化し、fairnessを高める具体的なモデルを提案している。

## Neural Graph Matching based Collaborative Filtering ([Link](https://dl.acm.org/doi/10.1145/3404835.3462833))

*Su, Yixin and Zhang, Rui and M. Erfani, Sarah and Gan, Junhao*

ユーザーとアイテムそれぞれにはside informationがあり、推薦の性能向上には欠かせないが、side informationには2種類ある:
ユーザー間、アイテム間それぞれのみで存在するinner interactionsとユーザーとアイテム間で存在するcross interactions。
これらを区別して用いることで推薦性能の向上を実現したという研究。

## TFROM: A Two-sided Fairness-Aware Recommendation Model for Both Customers and Providers ([Link](https://dl.acm.org/doi/10.1145/3404835.3462882))

*Wu, Yao and Cao, Jian and Xu, Guandong and Tan, Yudong*

既存研究ではfairnessについて考える時、カスタマーサイドかサービスサイドどちらかのみ考えることが多い。
しかし、片側サイドだけについてfairnessを保証しようとすると、もう片側のfairnessが損なわれてしまう可能性がある。
そこで、この研究では両方のfairnessを担保するような推薦手法を提案している。

## Should Graph Convolution Trust Neighbors? A Simple Causal Inference Method ([Link](https://dl.acm.org/doi/10.1145/3404835.3462971))

*Feng, Fuli and Huang, Weiran and He, Xiangnan and Xin, Xin and Wang, Qifan and Chua, Tat-Seng*

Graph Convolutional Network(GCN)が情報検索のアプリケーションで広く使われるようになってきたが、
現実のグラフが完全であることはない。GCNはノードの情報をエッジで繋がれた周りのノードに伝播することで学習を進めるが、
グラフの不完全性を考えると隣接したノードを完全には信用すべきではない。
予測時にノードのローカルな構造による因果効果を推定し、因果グラフを使ってGCNのメカニズムを分析したという研究。

---

ザッと眺めたところ、推薦精度向上を目指した研究ももちろん多かったですが、fairnessとかdiversityとかそういう精度以外のテーマの研究も多いなあという印象でした。
自分の今の研究では基本的には精度を追っているので、次の論文ではもうちょっと視野を拡げてみたいところ。
