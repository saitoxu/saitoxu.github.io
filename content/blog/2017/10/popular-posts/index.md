---
title: はてなブックマークの人気エントリーをAPI GatewayとLambdaを使って取得する
date: "2017-10-12T00:00:00.000Z"
tags:
  - Amazon API Gateway
  - AWS Lambda
  - React
---

このブログの人気エントリーを表示しようと、
はてなブックマークの人気エントリーを[Amazon API Gateway](http://docs.aws.amazon.com/ja_jp/apigateway/latest/developerguide/welcome.html)と[AWS Lambda](http://docs.aws.amazon.com/ja_jp/lambda/latest/dg/welcome.html)を使って取得しました。

フッター部分にこのブログの人気エントリーを表示しています。

## **はてなブックマークの人気エントリーを取得する**

まず最初にはてなブックマークの人気エントリーを取得します。
人気エントリーの検索は以下のようなエンドポイントを叩くと取得できます。

```sh
$ curl 'http://b.hatena.ne.jp/entrylist/json?url=saitoxu.io&threshold=1&sort=count'
([{"link":"https://saitoxu.io/hoge","count":"1","title":"hoge"}, ... ]);
```

で、エントリーを取得したら以前（[preactを使ってブログのアーカイブメニューを作る \| yosuke.saito](https://saitoxu.io/2017/07/01/jekyll-archive-preact.html)）やったようにReactのサブセット実装である[preact](https://preactjs.com/)を使って表示すればいいかと思ったんですがいくつか問題があります。

**問題**

1. **CORSで直接JSからAPIを叩けない** このブログのドメインが許可されていないので直接JavaScriptからAPIは呼べないと。
2. **JSONPで呼び出そうとしてもAPIがHTTPしか対応していない** で、そのときにどうするかということで
JSONPでの呼び出しに対応しているみたいなんですが、そもそもHTTPしかないみたいでHTTPSなサイトでは使えない。

でどうしようかと思いまして、今回はAPI GatewayとLambdaを使って解決することにしました。

## **Lambdaの関数を作る**

まずLambdaで、はてブのエントリーを取得してそれを返すだけの関数を作ります。
ランタイム環境はNode.js 6.10を選んだのでJavaScriptで書いてます。
次の記事が参考になりました。

[Node.jsでHTTP GETしてJSONパースするメモ - Qiita](https://qiita.com/n0bisuke/items/788dc4379fd57e8453a3)

```js
exports.handler = (event, context, callback) => {
  const options = {
    hostname: 'b.hatena.ne.jp',
    port: 80,
    path: '/entrylist/json?url=saitoxu.io&threshold=1&sort=count',
    headers: {
      'user-agent': 'hogehoge'
    }
  }
  require('http').get(options, (res) => {
    let body = ''
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      body += chunk;
    });

    res.on('end', (res) => {
      ret = JSON.parse(body.slice(1, -2))
      callback(null, ret.slice(0, 5))
    });
  });
};
```

注意点としては、はてブのAPIはUser Agentを指定しないと`500`エラーが返ってくるので適当に指定する必要があります。
あと、JSONPのためにレスポンスボディが`([body]);`のように丸括弧で囲われており、
そのままjsonにパースするとエラーになるので括弧を削除してます。

## **API GatewayでLambdaを呼ぶAPIを作る**

API Gatewayを使って先ほど作ったLambdaを呼ぶAPIを作ります。
特に詰まるところはないと思いますが、強いてあげるならCORSの設定をちゃんとしましょうということくらいでしょうか。

あとAPI Gatewayは若干料金が発生するので、一応APIキーを設定して、
一定期間当たりの使用回数に上限を設けて不当に呼び出されていないか監視するようにはしています。
あんまりお金がかかるようなら別の方法を検討します笑

以上、はてブの人気エントリーの表示方法でした。
思ったより時間かけてしまったんですが汗、久々にLambdaなど触る機会を持てたのは良かったです。
