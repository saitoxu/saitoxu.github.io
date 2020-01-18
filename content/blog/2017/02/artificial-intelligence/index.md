---
title: 人工知能系スタートアップ約200社まとめてみた
date: "2017-02-28T00:00:00.000Z"
tags:
  - Book
  - AI
  - Startup
ogp: ./2017-02-28-ogp.jpg
---

松尾豊先生の「[人工知能は人間を超えるか](https://www.amazon.co.jp/%E4%BA%BA%E5%B7%A5%E7%9F%A5%E8%83%BD%E3%81%AF%E4%BA%BA%E9%96%93%E3%82%92%E8%B6%85%E3%81%88%E3%82%8B%E3%81%8B-%E3%83%87%E3%82%A3%E3%83%BC%E3%83%97%E3%83%A9%E3%83%BC%E3%83%8B%E3%83%B3%E3%82%B0%E3%81%AE%E5%85%88%E3%81%AB%E3%81%82%E3%82%8B%E3%82%82%E3%81%AE-%E8%A7%92%E5%B7%9DEPUB%E9%81%B8%E6%9B%B8-%E6%9D%BE%E5%B0%BE-%E8%B1%8A/dp/4040800206)」を読みました。
この本は 2 年くらい前に出版された本なのですが、
今読むと人工知能研究を取り巻く当時と現在の状況を比較しながら読み進められるので一段と面白かったです。

人工知能や深層学習について俯瞰的な立場で分かりやすく書かれており、
人工知能の入門書として最適な本だと思いました。

その中で、米国のブルームバーグ社による世界中の人工知能ベンチャーをまとめた図（下記参照、出典は [The Current State of Machine Intelligence \| Bloomberg L.P.](https://www.bloomberg.com/company/announcements/current-state-machine-intelligence/) ）があり、
人工知能技術の広がりを改めて確認しました。

![Machine Intelligence LANDSCAPE](./2017-02-28-machine-learning.jpg)

ただ、この図だけだと各社の事業内容までは分からないので、
勉強がてらそれぞれの事業内容を調べてみました。

# 人工知能ベンチャーの事業内容

## **CORE TECHNOLOGIES**

### ARTIFICIAL INTELLIGENCE

|   # | 会社名                                                           | 事業内容                                                 | 備考                            |
| --: | :--------------------------------------------------------------- | :------------------------------------------------------- | :------------------------------ |
|   1 | [IBM Watson](https://www.ibm.com/smarterplanet/jp/ja/ibmwatson/) | コグニティブ・コンピューティング・システム Watson の開発 |                                 |
|   2 | [MetaMind](http://metamind.io/)                                  | 人工知能アインシュタインの開発                           | Salesforce が買収               |
|   3 | [Numenta](http://numenta.com/)                                   | HTM(Hierarchical Temporal Memory)の研究開発              |                                 |
|   4 | [ai-one](http://www.ai-one.com/)                                 | 人工知能技術の API や SDK の開発                         |                                 |
|   5 | [Cycorp](http://www.cyc.com/)                                    | 人工知能の研究開発                                       | Cyc（サイク）プロジェクトが発端 |
|   6 | [Microsoft Research](https://www.microsoft.com/en-us/research/)  | 計算機科学に関する様々な研究                             |                                 |
|   7 | [Nara](https://naralogics.com/)                                  | パーソナライズ・リコメンデーションの SaaS                |                                 |
|   8 | [Reactor](http://reactorlabs.com/)                               | 人工知能の研究開発                                       |                                 |
|   9 | [Scaled Inference](https://scaledinference.com/)                 | 機械学習のプラットフォーム開発                           |                                 |

### DEEP LEARNING

|   # | 会社名                                     | 事業内容                                                 | 備考          |
| --: | :----------------------------------------- | :------------------------------------------------------- | :------------ |
|  10 | [Vicarious](http://www.vicarious.com/)     | 次世代の人工知能プラットフォーム開発                     |               |
|  11 | [DeepMind](https://deepmind.com/)          | ディープラーニングの研究開発                             | Google が買収 |
|  12 | Vision Factory                             |                                                          | Google が買収 |
|  13 | [Facebook](https://www.facebook.com/)      | Facebook の開発・運営                                    |               |
|  14 | [Baidu IDL](http://research.baidu.com/)    | バイドゥの研究機関                                       |               |
|  15 | [Google](https://www.google.com)           | 検索エンジンの研究開発など                               |               |
|  16 | [ersatz labs](http://www.ersatzlabs.com/)  | 深層学習を利用した各種サービス提供                       |               |
|  17 | [Skymind](https://skymind.ai/)             | オープンソースの深層学習ライブラリ Deeplearning4j の開発 |               |
|  18 | [SignalSense](http://www.signalsense.com/) | セキュリティ関連                                         |               |

### MACHINE LEARNING

|   # | 会社名                                                                   | 事業内容                                     | 備考 |
| --: | :----------------------------------------------------------------------- | :------------------------------------------- | :--- |
|  19 | [rapid miner](https://rapidminer.com)                                    | データ分析ソフトの開発                       |      |
|  20 | [context relevant](https://www.contextrelevant.com/)                     | ビッグデータ解析                             |      |
|  21 | [Oxdata H2O](http://www.h2o.ai/)                                         | オープンソースの AI プラットフォーム開発など |      |
|  22 | [DATARPM](http://www.datarpm.com/)                                       | 機械学習によるビッグデータ分析               |      |
|  23 | [LiftIgniter](http://www.liftigniter.com/)                               | パーソナライズエンジンの提供                 |      |
|  24 | [SPARKBEYOND](http://www.sparkbeyond.com/)                               | 人工知能プラットフォームの開発               |      |
|  25 | [Azure ML](https://azure.microsoft.com/ja-jp/services/machine-learning/) | 機械学習の API                               |      |
|  26 | [yhat](https://www.yhat.com/)                                            | データ分析プラットフォームの提供             |      |
|  27 | [Wise.io](http://www.wise.io/)                                           | 機械学習エンジンのサービス提供               |      |
|  28 | [Sense](https://sense.com/)                                              | 音声認識                                     |      |
|  29 | [GraphLab](https://turi.com/)                                            | グラフベースの機械学習ツール                 |      |
|  30 | [Alpine](http://alpinedata.com/)                                         |                                              |      |
|  31 | [nutonian](http://www.nutonian.com/)                                     | 人工知能を活用したモデリングエンジンの開発   |      |

### NLP PLATFORM

|   # | 会社名                                 | 事業内容                                 | 備考 |
| --: | :------------------------------------- | :--------------------------------------- | :--- |
|  32 | [cortical.io](http://www.cortical.io/) | NLP を使ったソリューション・サービス提供 |      |
|  33 | [idibon](http://idibon.com/)           | 自然言語処理の技術提供                   |      |
|  34 | [LUMINOSO](http://www.luminoso.com/)   | 非構造化テキストデータの解析ツール       |      |
|  35 | [wit.ai](https://wit.ai/)              | 自然言語を扱う API 開発                  |      |
|  36 | [Maluuba](http://www.maluuba.com/)     | パーソナルアシスタントの開発             |      |

### PREDICTIVE APIS

|   # | 会社名                                                    | 事業内容                         | 備考                           |
| --: | :-------------------------------------------------------- | :------------------------------- | :----------------------------- |
|  37 | [Alchemy API](http://www.alchemyapi.com/)                 | 非構造化データ処理               | IBM が買収                     |
|  38 | [MINDOPS](http://mindops.com/)                            | OCR 技術                         |                                |
|  39 | [bigml](https://bigml.com/)                               | 機械学習のクラウドサービス       |                                |
|  40 | [indico](https://indico.io/)                              | 同上                             |                                |
|  41 | [ALGORITHMIA](https://algorithmia.com/)                   | アルゴリズムのマーケットプレイス |                                |
|  42 | [Expect Labs](https://www.mindmeld.com/)                  | 音声検索エンジンなどの開発       | 社名が MindMeld に変わった模様 |
|  43 | [PredictionIO](http://predictionio.incubator.apache.org/) | 機械学習ライブラリの開発         | Salesforce が買収              |

### IMAGE RECOGNITION

|   # | 会社名                                | 事業内容                                         | 備考           |
| --: | :------------------------------------ | :----------------------------------------------- | :------------- |
|  44 | [clarifai](https://www.clarifai.com/) | 画像・動画認識の API 提供                        |                |
|  45 | MADBITS                               | 深層学習を使った画像検索など                     | Twitter が買収 |
|  46 | DNNresearch                           | ニューラルネットワークを使った画像・音声認識技術 | Google が買収  |
|  47 | [DEXTRO](https://www.dextro.co/)      | 動画認識技術                                     |                |
|  48 | [ViSENZE](https://www.visenze.com/)   | E コマースにおける画像検索                       | @シンガポール  |
|  49 | [lookflow](http://lookflow.com/)      | 画像認識技術                                     | Yahoo!が買収   |

### SPEECH RECOGNITION

|   # | 会社名                                         | 事業内容                                       | 備考 |
| --: | :--------------------------------------------- | :--------------------------------------------- | :--- |
|  50 | [GRIDSPACE](https://www.gridspace.com/)        | 会話内容を記録するアプリの開発など             |      |
|  51 | [popup archive](https://www.popuparchive.com/) | 音声をクラウド上に保存し検索可能にするサービス |      |
|  52 | [NUANCE](http://www.nuance.com/index.htm)      | 音声の利活用                                   |      |

## **RETHINKING ENTERPRISE**

### SALES

|   # | 会社名                                     | 事業内容                                        | 備考                   |
| --: | :----------------------------------------- | :---------------------------------------------- | :--------------------- |
|  53 | [Preact](http://www.preact.com/)           | 顧客の行動分析                                  |                        |
|  54 | [AVISO](http://www.aviso.com/)             | 売上改善のための分析・予測サービス              |                        |
|  55 | RelateIQ Help                              | データ分析を活用したセールス支援                | Salesforce が買収      |
|  56 | [NG DATA](https://www.ngdata.com/)         | 顧客データの分析ツール開発                      |                        |
|  57 | [CLARABRIDGE](http://www.clarabridge.com/) | インテリジェンスな顧客管理ツール                |                        |
|  58 | FRAMED Data                                | 機械学習を用いたユーザ行動の予測ツール          | Square が買収          |
|  59 | [infer](https://www.infer.com/)            | マーケティングプラットフォーム                  |                        |
|  60 | ATTENSITY                                  | ソーシャルネットワークの分析                    | Web サイトが見当たらず |
|  61 | causata                                    | CEM(Customer Experience Management)ツールの開発 | NICE 社が買収          |

### SECURITY / AUTHENTICATION

|   # | 会社名                                            | 事業内容                               | 備考 |
| --: | :------------------------------------------------ | :------------------------------------- | :--- |
|  62 | [CROSSMATCH](http://www.crossmatch.com/)          | 認証技術のソリューション提供           |      |
|  63 | [conjur](https://www.conjur.com/)                 | クラウドベースのアクセス権限管理ツール |      |
|  64 | [EYEVERIFY](http://www.eyeverify.com/)            | 眼球による認証技術                     |      |
|  65 | [AREA 1 SECURITY](https://www.area1security.com/) | サイバー攻撃対策                       |      |
|  66 | [BITSIGHT](https://www.bitsighttech.com/)         | セキュリティ調査                       |      |
|  67 | [CYLANCE](https://www.cylance.com/jp)             | サイバー攻撃対策ツール                 |      |
|  68 | [bionym](https://nymi.com/)                       | 心拍認証                               |      |

### FRAUD DETECTION

|   # | 会社名                                         | 事業内容                                       | 備考 |
| --: | :--------------------------------------------- | :--------------------------------------------- | :--- |
|  69 | [sift science](https://siftscience.com/)       | 機械学習を使った詐欺検知・防止                 |      |
|  70 | [SOCURE](http://www.socure.com/)               | データ分析を使った身元確認・詐欺防止           |      |
|  71 | [Threat Metrix](https://www.threatmetrix.com/) | 詐欺防止・認証                                 |      |
|  72 | [feedzai](https://feedzai.com/)                | 機械学習を用いた詐欺防止                       |      |
|  73 | [Brighterion](http://brighterion.com/)         | 機械学習・人工知能を使ったセキュリティ関連製品 |      |
|  74 | [VERAFIN](https://verafin.com/)                | 詐欺・マネーロンダリング防止のクラウドサービス |      |

### HR / RECRUITING

|   # | 会社名                                  | 事業内容                                   | 備考                   |
| --: | :-------------------------------------- | :----------------------------------------- | :--------------------- |
|  75 | [TalentBin](https://www.talentbin.com/) | ソーシャルリクルーティングサービス         |                        |
|  76 | [entelo](https://www.entelo.com/)       | 採用支援ツール                             |                        |
|  77 | predikt                                 |                                            | 見当たらず             |
|  78 | Connectifier                            | AI を使った人材検索・マッチング            | LinkedIn が買収        |
|  79 | gild                                    | 機械学習などを応用した採用プラットフォーム | Web サイトが見当たらず |
|  80 | [hiQ](https://www.hiqlabs.com/)         | データ指向のタレント管理ツール             |                        |
|  81 | CONCEPT NODE                            |                                            | 見当たらず             |

### MARKETING

|   # | 会社名                                           | 事業内容                                 | 備考              |
| --: | :----------------------------------------------- | :--------------------------------------- | :---------------- |
|  82 | [bright funnel](http://www.brightfunnel.com/)    | B2B のマーケティング支援ツール           |                   |
|  83 | [bloomreach](http://bloomreach.com/)             | データ分析で Web ページを個別最適化      |                   |
|  84 | CommandIQ                                        | CRM システム                             | Liquid が買収     |
|  85 | [AIRPR](https://www.airpr.com/)                  | PR の効果を測定サービス                  |                   |
|  86 | [RADIUS](https://radius.com/)                    | B2B 向けのマーケティングソフトウェア     |                   |
|  87 | [Tell Apart](https://www.tellapart.com/)         | 予測マーケティングツールやソリューション |                   |
|  88 | [people pattern](https://www.peoplepattern.com/) | データ解析を使った顧客分析               |                   |
|  89 | Freshplum                                        |                                          | Tell Apart が買収 |

### PERSONAL ASSISTANT

|   # | 会社名                                                                 | 事業内容                                       | 備考              |
| --: | :--------------------------------------------------------------------- | :--------------------------------------------- | :---------------- |
|  90 | [Siri](http://www.apple.com/jp/ios/siri/)                              | iOS に搭載されているパーソナルアシスタント     |                   |
|  91 | [Google now](https://www.google.com/intl/ja/landing/now/)              | Android に搭載されているパーソナルアシスタント |                   |
|  92 | [Cortana](https://www.microsoft.com/en-us/mobile/experiences/cortana/) | MS のパーソナルアシスタント                    |                   |
|  93 | cleversense                                                            | 機械学習を使ったレコメンデーションアプリの開発 | Google が買収     |
|  94 | tempo                                                                  |                                                | Salesforce が買収 |
|  95 | [Robinlabs](http://www.robinlabs.com/)                                 | 音声アシスタントアプリの開発など               |                   |
|  96 | [KASIST](http://kasisto.com/)                                          | 会話 AI プラットフォームの開発                 |                   |
|  97 | [fuse machines](https://www.fusemachines.com/)                         | セールス向けの AI アシスタントの開発           |                   |
|  98 | [VIV](http://viv.ai/)                                                  | 音声アシスタントの開発                         |                   |
|  99 | Incredible                                                             |                                                | Yahoo が買収      |
| 100 | [CLARA LABS](https://claralabs.com/)                                   | AI 秘書サービス                                |                   |

### INTELLIGENCE TOOLS

|   # | 会社名                                                | 事業内容                             | 備考                     |
| --: | :---------------------------------------------------- | :----------------------------------- | :----------------------- |
| 101 | [ADATAO](https://arimo.com/)                          | ビッグデータ検索                     | ARIMO に社名変更した模様 |
| 102 | [Palantir](https://www.palantir.com/)                 | 政府機関のビッグデータ分析代行       |                          |
| 103 | [Quid](https://quid.com/)                             | ビッグデータ分析・視覚化             |                          |
| 104 | [Digital Reasoning](http://www.digitalreasoning.com/) | 会話分析のソリューション提供         |                          |
| 105 | [FirstRain](http://www.firstrain.com/)                | セールスやマーケティングのデータ分析 |                          |

## **RETHINKING INDUSTRIES**

### ADTECH

|   # | 会社名                                  | 事業内容                                       | 備考 |
| --: | :-------------------------------------- | :--------------------------------------------- | :--- |
| 106 | [METAMARKETS](https://metamarkets.com/) | プログラム上の市場（広告など）における分析     |      |
| 107 | [Dstillery](http://dstillery.com/)      | データ分析を活用したマーケティング支援         |      |
| 108 | [rocketfuel](https://rocketfuel.com/)   | DSP プラットフォーム                           |      |
| 109 | [YieldMo](https://yieldmo.com/)         | モバイル広告用のプライベートマーケットプレイス |      |
| 110 | [ADBRAIN](http://www.adbrain.com/)      | 人工知能を使ったターゲティング広告             |      |

### AGRICULTURE

|   # | 会社名                                              | 事業内容                         | 備考 |
| --: | :-------------------------------------------------- | :------------------------------- | :--- |
| 111 | [BLUE RIVER](http://www.bluerivert.com/)            | 農業用ロボット                   |      |
| 112 | [TerrAvion](http://www.terravion.com/)              | 農業用の航空画像サービス         |      |
| 113 | [ceres imaging](http://www.ceresimaging.net/)       | ドローンを使った農地の観測・分析 |      |
| 114 | [HONEYCOMB](http://www.honeycombcorp.com/)          | ドローンを使った農業支援         |      |
| 115 | [THE CLIMATE CORPORATION](https://www.climate.com/) | ビッグデータによる気候予測       |      |
| 116 | [tule](https://www.tuletechnologies.com/)           | センサーを使った農場の水管理     |      |
| 117 | [mavrx](https://www.mavrx.co/)                      | アプリ・ドローンを使った土壌管理 |      |

### EDUCATION

|   # | 会社名                                | 事業内容                                                   | 備考 |
| --: | :------------------------------------ | :--------------------------------------------------------- | :--- |
| 118 | [declara](https://declara.com/)       | データ解析をベースにしたパーソナライズ教育プラットフォーム |      |
| 119 | [coursera](https://www.coursera.org/) | オンライン講座                                             |      |
| 120 | [KNEWTON](https://japan.knewton.com/) | パーソナライズ教育プラットフォーム                         |      |
| 121 | [kidaptive](http://kidaptive.com/)    | 子供向けアダプティブ教育プラットフォーム                   |      |

### FINANCE

|   # | 会社名                                         | 事業内容                                                                         | 備考 |
| --: | :--------------------------------------------- | :------------------------------------------------------------------------------- | :--- |
| 122 | [Bloomberg](https://www.bloomberg.co.jp/)      | 世界の経済情報/金融ニュース                                                      |      |
| 123 | FenGenius                                      | 見当たらず                                                                       |      |
| 124 | [alphasense](https://www.alpha-sense.com/)     | ファイナンスの検索エンジン                                                       |      |
| 125 | [KENSHO](https://www.kensho.com/#/)            | 株式市場分析サービス                                                             |      |
| 126 | [Dataminr](https://www.dataminr.com/)          | ソーシャルメディアから信頼できる情報をリアルタイムに報道関係者に通知するサービス |      |
| 127 | minetta brook                                  | 見当たらず                                                                       |      |
| 128 | [Orbital Insight](https://orbitalinsight.com/) | 映像画像分析                                                                     |      |
| 129 | [BINATIX](http://www.binatix.com/)             | データ分析アルゴリズムの提供                                                     |      |

### LEGAL

|   # | 会社名                                       | 事業内容                                         | 備考 |
| --: | :------------------------------------------- | :----------------------------------------------- | :--- |
| 130 | [Lex Machina](https://lexmachina.com/)       | 訴訟情報解析ツール                               |      |
| 131 | [brightleaf](http://www.brightleaf.com/)     | 自然言語解析を使った契約書からの情報抽出サービス |      |
| 132 | [COUNSELYTICS](http://counselytics.com/)     | 契約書を構造化されたデータに変換                 |      |
| 133 | [RAVEL](http://ravellaw.com/)                | 弁護士業務を支援するサービス                     |      |
| 134 | [JUDICATA](https://www.judicata.com/)        | 法律の検索エンジン                               |      |
| 135 | [eBrevia](https://ebrevia.com/#overview)     | 人工知能を使った法的書類の検索サービス           |      |
| 136 | [Diligence Engine](https://kirasystems.com/) | デューデリジェンスの支援ツール                   |      |

### MANUFACTURING

|   # | 会社名                                            | 事業内容                                       | 備考 |
| --: | :------------------------------------------------ | :--------------------------------------------- | :--- |
| 137 | [SIGHT MACHINE](http://sightmachine.com/)         | ビッグデータを活用した製造分析プラットフォーム |      |
| 138 | [MICROSCAN](http://www.microscan.com/en-us)       | バーコードリーダなどの製造                     |      |
| 139 | [BOULDER IMAGING](http://www.boulderimaging.com/) | 品質保証のためのマシンビジョンソリューション   |      |
| 140 | [IVISYS](http://ivisys.com/)                      | 検証・欠陥検出のための製品開発                 |      |

### MEDICAL

|   # | 会社名                                               | 事業内容                                   | 備考             |
| --: | :--------------------------------------------------- | :----------------------------------------- | :--------------- |
| 141 | Parzival                                             | 医療コンテンツの検索エンジン               | HP 見つからず    |
| 142 | [transcriptic](https://www.transcriptic.com/)        | ロボットでバイオ試験を代行する             |                  |
| 143 | [Genescient](http://www.genescient.com/)             | ゲノム解析による新薬開発など               |                  |
| 144 | [ZEPHYR HEALTH](https://zephyrhealth.com/)           | ヘルスケアデータのクラウドプラットフォーム |                  |
| 145 | [grand round table](http://www.grandroundtable.com/) | 臨床判断を支援するソフトウェアの提供       |                  |
| 146 | bind TECHNOLOGIES                                    | 見当たらず                                 |                  |
| 147 | [TUTE GENOMICS](http://pieriandx.com/)               | 遺伝子分析を使った医療支援                 | 社名が変わった？ |

### OIL AND GAS

|   # | 会社名                                   | 事業内容                                   | 備考 |
| --: | :--------------------------------------- | :----------------------------------------- | :--- |
| 148 | [kaggle](https://www.kaggle.com)         | データ解析のコンペティション               |      |
| 149 | [AYASDI](https://www.ayasdi.com)         | TDA を使ったデータ解析                     |      |
| 150 | [TACHYUS](http://www.tachyus.com)        | 油田のデータアナリティクスプラットフォーム |      |
| 151 | [biota TECHNOLOGY](http://www.biota.com) | エネルギー業界での DNA データ解析の応用    |      |
| 152 | [Flutura](https://www.flutura.com)       | 工学・エネルギー業界で用いる IoT の開発    |      |

### MEDIA / CONTENT

|   # | 会社名                                                 | 事業内容                                                     | 備考            |
| --: | :----------------------------------------------------- | :----------------------------------------------------------- | :-------------- |
| 153 | [Outbrain](http://www.outbrain.com/jp)                 | 潜在顧客にアプローチするためのマーケティングプラットフォーム |                 |
| 154 | [newsle](https://newsle.com)                           |                                                              | LinkedIn が買収 |
| 155 | [ARRIA](https://www.arria.com)                         | 情報を自然言語で伝達する AI の開発                           |                 |
| 156 | [SAILTHRU](http://www.sailthru.com/)                   | EC サイトのパーソナライズ                                    |                 |
| 157 | [wavii](http://www.wavii.com/)                         | Web 上のニュース取得・まとめる                               | Google が買収   |
| 158 | [Owlin](https://owlin.com/)                            | ニュースのリアルタイム分析                                   |                 |
| 159 | [Narrative Science](https://www.narrativescience.com/) | データを文章化する                                           |                 |
| 160 | [yseop](https://yseop.com/)                            | データのサマライズ                                           |                 |
| 161 | [Summly](http://summly.com/)                           | メールやブログを要約                                         | 米 Yahoo!が買収 |
| 162 | Prismatic                                              | ニュースアプリ                                               |                 |
| 163 | [AUTOMATED INSIGHTS](https://automatedinsights.com/)   | データから文章を自動生成                                     | VEP が買収      |

### CONSUMER FINANCE

|   # | 会社名                                               | 事業内容                                     | 備考             |
| --: | :--------------------------------------------------- | :------------------------------------------- | :--------------- |
| 164 | [Affirm](https://www.affirm.com/)                    | 消費者向けのローン                           |                  |
| 165 | inVenture                                            | スマホを使った信用測定                       |                  |
| 166 | [zest finance](https://www.zestfinance.com/)         | ビッグデータを使った信用査定                 |                  |
| 167 | [BILL GUARD](https://www.billguard.com/)             | 不正送金や怪しい手数料を自動検知するサービス | Prosper 社が買収 |
| 168 | [LendUp](https://www.lendup.com/)                    | 低所得者向けローン提供                       |                  |
| 169 | [LendingClub](https://www.lendingclub.com/site/home) | 貸付型クラウドファンディング                 |                  |
| 170 | [Kabbage](https://www.kabbage.com/)                  | 中小企業向けのレンディングサービス           |                  |

### PHILANTHROPIES

|   # | 会社名                                 | 事業内容                   | 備考 |
| --: | :------------------------------------- | :------------------------- | :--- |
| 171 | [DataKind](http://www.datakind.org/)   | 非営利団体のデータ分析支援 |      |
| 172 | [thorn](https://www.wearethorn.org/)   | 子供の性的搾取からの保護   |      |
| 173 | [DATA GUILD](http://thedataguild.com/) |                            |      |

### AUTOMOTIVE

|   # | 会社名                                                                    | 事業内容               | 備考 |
| --: | :------------------------------------------------------------------------ | :--------------------- | :--- |
| 174 | Google                                                                    |                        |      |
| 175 | [Continental](http://www.continental-automotive.jp/www/automotive_jp_jp/) | 自動車部品サプライヤー |      |
| 176 | [TESLA](https://www.tesla.com/jp/)                                        | 自動車開発・販売       |      |
| 177 | [MOBILEYE](http://www.mobileye.com/)                                      | 衝突防止補助システム   |      |
| 178 | [CRUISE](https://www.getcruise.com/)                                      | 自動運転               |      |

### DIAGNOSTICS

|   # | 会社名                              | 事業内容                                         | 備考 |
| --: | :---------------------------------- | :----------------------------------------------- | :--- |
| 179 | [enlitic](http://www.enlitic.com/)  | ディープラーニングを使ったがんなど悪性腫瘍の検出 |      |
| 180 | [3SCAN](http://www.3scan.com/)      | 体の組織や細胞などをスキャンして 3D データにする |      |
| 181 | [lumiata](https://www.lumiata.com/) | 医療上のリスクとケアマネジメントの予測分析       |      |
| 182 | [ENTOPSIS](http://entopsis.com/)    | AI を活用した診断技術                            |      |

### RETAIL

|   # | 会社名                                   | 事業内容                                                               | 備考     |
| --: | :--------------------------------------- | :--------------------------------------------------------------------- | :------- |
| 183 | [BAY SENSORS](http://www.percolata.com/) | 店舗人員の最適化支援                                                   | 社名変更 |
| 184 | [PRISM SKYLABS](https://prism.com/)      | 既存の IP 監視カメラに設置可能な店舗顧客動向可視化・分析ソリューション |          |
| 185 | [celect](https://www.celect.com/)        | 機械学習を用いた製品陳列の最適化                                       |          |
| 186 | [euclid](http://euclidanalytics.com/)    | データ分析を活用した店舗改善                                           |          |

## **RETHINKING HUMANS / HCI**

### AUGMENTED REALITY

|   # | 会社名                                             | 事業内容                                   | 備考                                    |
| --: | :------------------------------------------------- | :----------------------------------------- | :-------------------------------------- |
| 187 | [wearable intelligence](https://www.parsable.com/) | 工事現場等のコラボレーションツール         | PARSABLE に社名変更、事業も変更した模様 |
| 188 | [AUGMATE](http://www.augmate.com/)                 | ウェアラブルデバイスの管理ソリューション   |                                         |
| 189 | [APX LABS](https://upskill.io/skylight/)           | スマートグラスのための開発プラットフォーム |                                         |
| 190 | [blippAR](https://blippar.com/ja/)                 | AR 広告プラットフォーム                    |                                         |
| 191 | [META](https://www.metavision.com/)                | AR ヘッドセット開発                        |                                         |
| 192 | [lay ar](https://www.layar.com/)                   | AR 作成 SDK の開発                         | blippAR が買収                          |

### GESTURAL COMPUTING

|   # | 会社名                                         | 事業内容                                           | 備考          |
| --: | :--------------------------------------------- | :------------------------------------------------- | :------------ |
| 193 | [THALMIC LABS](https://www.thalmic.com/)       | マルチジェスチャー操作を行うデバイス開発           |               |
| 194 | omek                                           | ジェスチャー認識技術                               | Intel が買収  |
| 195 | [FLUTTER](https://flutterapp.com/)             | ジェスチャー認識                                   | Google が買収 |
| 196 | [LEAP MOTION](https://www.leapmotion.com/#112) | HMD の開発                                         |               |
| 197 | [eye Sight](http://www.eyesight-tech.com/)     | 組み込みのセンサーソリューション                   |               |
| 198 | [3Gear systems](http://nimblevr.com/)          | 手のトラッキングシステム開発                       | Oculus が買収 |
| 199 | [GestureTek](http://www.gesturetek.com/)       | ジェスチャーを使ったインタラクティブシステムの開発 |               |
| 200 | [nod](https://nod.com/)                        | 指輪型デバイスの開発                               |               |

### ROBOTICS

|   # | 会社名                                                          | 事業内容                             | 備考          |
| --: | :-------------------------------------------------------------- | :----------------------------------- | :------------ |
| 201 | [intel](http://www.intel.co.jp/content/www/jp/ja/homepage.html) | 半導体素子の開発など                 |               |
| 202 | [LIQUID ROBOTICS](https://www.liquid-robotics.com/)             | 海上用ロボットの開発                 |               |
| 203 | [iRobot](https://www.irobot-jp.com/)                            | 軍事用・業務用・家庭用ロボットの開発 |               |
| 204 | [Boston Dynamics](http://www.bostondynamics.com/)               | ロボットの研究開発                   |               |
| 205 | [jibo](https://www.jibo.com/)                                   | 家庭用 AI ロボ開発                   |               |
| 206 | [SoftBank](http://www.softbank.jp/)                             | 携帯キャリア・ロボット開発           |               |
| 207 | [anki](https://anki.com/en-us)                                  | 子供用ロボットの開発                 |               |
| 208 | evolution robotics                                              | 掃除ロボットの開発                   | iRobot が買収 |

### EMOTIONAL RECOGNITION

|   # | 会社名                                        | 事業内容                               | 備考                 |
| --: | :-------------------------------------------- | :------------------------------------- | :------------------- |
| 209 | [affectiva](http://www.affectiva.com/)        | 感情認識 AI の開発                     |                      |
| 210 | [BEYOND VERBAL](http://www.beyondverbal.com/) | 話者の感情分析                         |                      |
| 211 | EMOTIENT                                      | 表情から感情を分析                     | Apple が買収         |
| 212 | [BRSLABS](http://www.giantgray.com/)          | 機械学習ソフトウェアのプラットフォーム | GIANTGRAY に社名変更 |
| 213 | [cogito](http://www.cogitocorp.com/)          | 電話の会話解析                         |                      |

## **SUPPORTING TECHNOLOGIES**

### HARDWARE

|   # | 会社名                                                    | 事業内容                                                     | 備考         |
| --: | :-------------------------------------------------------- | :----------------------------------------------------------- | :----------- |
| 214 | [nVIDIA](http://www.nvidia.co.jp/page/home.html)          | GPU の開発                                                   |              |
| 215 | [XILINX](https://japan.xilinx.com/)                       | FPGA を中心とした半導体開発                                  |              |
| 216 | [QUALCOMM](https://www.qualcomm.co.jp/)                   | 通信技術および半導体開発                                     |              |
| 217 | [NERVANA SYSTEMS](https://www.nervanasys.com/)            | 半導体レベルで最適化したディープラーニングソフトウェアの開発 | Intel が買収 |
| 218 | [TERADEEP](https://www.teradeep.com/)                     | FPGA ベースの画像認識システム                                |              |
| 219 | [Artificial Learning](http://www.artificiallearning.com/) | 機械学習のための効率的な集積回路の開発                       |              |
| 220 | [rigetti](http://rigetti.com/)                            | 量子コンピューティングの研究開発                             |              |

### DATA PREP

|   # | 会社名                                | 事業内容                                                                 | 備考 |
| --: | :------------------------------------ | :----------------------------------------------------------------------- | :--- |
| 221 | [TRIFACTA](https://www.trifacta.com/) | データ解析サービスプラットフォーム                                       |      |
| 222 | [Paxata](https://www.paxata.com/)     | データ準備・前処理                                                       |      |
| 223 | [tamr](http://www.tamr.com/)          | データ分析のための高度なデータウェアハウスを半自動で作成するソフトウェア |      |
| 224 | [Alation](https://alation.com/)       | 自動化されたコラボ型データカタログ                                       |      |

### DATA COLLECTION

|   # | 会社名                                      | 事業内容                                     | 備考            |
| --: | :------------------------------------------ | :------------------------------------------- | :-------------- |
| 225 | [diffbot](https://www.diffbot.com/)         | AI を使ったデータ抽出                        |                 |
| 226 | [kimono](https://www.kimonolabs.com/)       | データ抽出                                   | Palantir が買収 |
| 227 | [CrowdFlower](https://www.crowdflower.com/) | マイクロタスク型のクラウドソーシングサービス |                 |
| 228 | [Connotate](http://www.connotate.com/)      | Web からのデータ抽出                         |                 |
| 229 | [WorkFusion](https://www.workfusion.com/)   | ロボット工学を応用したクラウドソーシング     |                 |
| 230 | [import io](https://www.import.io/)         | Web ページのスクレイピング                   |                 |

# おわりに

以上、人工知能系のスタートアップ約 200 社紹介しました。

大手の買収の傾向や、このドメインだったら
AI をこういう風に使うというような特徴が見れて、
調べてみて勉強になりました。

数が多く一社一社深く調べることはできなかったので、
また時間ができたときに調べようと思います。
