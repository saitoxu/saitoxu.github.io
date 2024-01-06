---
title: ElasticsearchとAlgoliaの比較検討
date: "2020-03-28T00:00:00.000Z"
tags:
  - Elasticsearch
  - Algolia
---

仕事でプロダクトに全文検索機能を導入するにあたり、[Elasticsearch](https://github.com/elastic/elasticsearch)と[Algolia](https://www.algolia.com/)で比較検討しました。

ElasticsearchはOSSとして開発されている分散処理可能な検索エンジンです。
OSSですがオランダのElastic社が主に開発しており、[Elastic cloud](https://www.elastic.co/jp/cloud/)というElasticsearchのSaaSサービスも提供されています。

Algoliaはドキュメント検索のためのAPIサービスです。
検索対象のドキュメント数や操作回数によっては有料プランに入る必要がありますが、小規模だと無料で使えます。
ECサイトや個人ブログなどで使われているのをよく見かけます。

両者の比較については以下の記事が大変参考になるのですが、

[ElasticSearch vs Algolia - Mariano Matayoshi - Medium](https://medium.com/@matayoshi.mariano/elasticsearch-vs-algolia-96364f5567a3)

本記事では次の観点について、もう少し踏み込んだ比較を行いたいと思います。

* 日本語への対応
* 検索結果のPersonalization
* Query Suggestion

### 日本語への対応

どちらも日本語の全文検索に対応しています。
Elasticsearchはanalyzerの指定によって、インデックスの際形態素解析を使うかN-gramを使うか等自由にカスタマイズできます。
Algoliaの方は手元で確認したところ、転置インデックスの作成方法はN-gramのようです。
詳しいインデックス・検索のロジックはAlogliaのブログに書かれています。

[Inside the Algolia Engine Part 3 — Query Processing | Algolia Blog](https://blog.algolia.com/inside-the-algolia-engine-part-3-query-processing/)

同義語(Synonyms)の登録もどちらもできます。
[Synonyms | Managing Results | Guide | Algolia Documentation](https://www.algolia.com/doc/guides/managing-results/optimize-search-results/adding-synonyms/)
Elasticsearchはユーザー辞書の登録も可能です(AWSのマネージドElasticsearch Serviceは除く)。

### 検索結果のPersonalization

検索結果をユーザーによって個別化できるかという観点です。

Alogliaでは最近Personalizationに力を入れているようで、追加で費用はかかりそうですが使えます: [What Is Personalization? | Getting Insights and Analytics | Guide | Algolia Documentation](https://www.algolia.com/doc/guides/getting-insights-and-analytics/personalization/what-is-personalization/)

viewやclickなどconversionに関するイベントデータをAlgoliaに送付して、それをもとに学習するようです。
まだ開始したばかりなのか、ドキュメントはそれほど充実していません。

Elasticsearchでは検索結果の個別化、という観点だとランキング学習を行うプラグインがあります。

[o19s/elasticsearch-learning-to-rank: Plugin to integrate Learning to Rank (aka machine learning for better relevance) with Elasticsearch](https://github.com/o19s/elasticsearch-learning-to-rank)

使い方はこちらの記事が参考になります: [Elasticsearchのランキング学習を試した - Qiita](https://qiita.com/setor/items/ace9906929d63b93c8f0)

### Query Suggestion

入力された検索クエリに対し、類似の検索クエリを提案する機能です。
Aloglia, Elasticsearchともにサポートされています。

* [Query Suggestions | Getting Insights and Analytics | Guide | Algolia Documentation](https://www.algolia.com/doc/guides/getting-insights-and-analytics/leveraging-analytics-data/query-suggestions/)
* [Suggesters | Elasticsearch Reference [7.6] | Elastic](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html)

AlogliaにはQuery Suggestionの[デモサイト](https://preview.algolia.com/delayed-hits-demo/)があるため、参考にすると良さそうです。
ElasticsearchのSuggesterはこちらの使ってみた記事が参考になりました: [ElasticsearchのSuggesterで、サジェストを試してみる - CLOVER🍀](https://kazuhira-r.hatenablog.com/entry/20160213/1455372283)

## おわりに

以上、ElasticsearchとAlgoliaを比較検討しました。

Algoliaは運用コストが低く、日本語の検索や各種高度な機能にもかなり対応しているなと思いました。
検索対象数がそれほど多くない場合や、検索はあくまで補足的な機能ということであればAlgoliaで十分だなと思いました(若干値段は高いと思いますが)。

一方で、より検索の質を重視したい・幅広い要件に対応したい・検索機能の優劣がサービスの競合優位性になりうるということであれば自由度の高いElasticsearchを使うのが良さそうと思いました。
