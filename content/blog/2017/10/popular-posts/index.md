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

で、エントリーを取得したら以前（[preact を使ってブログのアーカイブメニューを作る \| yosuke.saito](/2017/07/jekyll-archive-preact)）やったように React のサブセット実装である[preact](https://preactjs.com/)を使って表示すればいいかと思ったんですがいくつか問題があります。

**問題**

1. **CORS で直接 JS から API を叩けない** このブログのドメインが許可されていないので直接 JavaScript から API は呼べないと。
2. **JSONP で呼び出そうとしても API が HTTP しか対応していない** で、そのときにどうするかということで
   JSONP での呼び出しに対応しているみたいなんですが、そもそも HTTP しかないみたいで HTTPS なサイトでは使えない。

でどうしようかと思いまして、今回は API Gateway と Lambda を使って解決することにしました。

## **Lambda の関数を作る**

まず Lambda で、はてブのエントリーを取得してそれを返すだけの関数を作ります。
ランタイム環境は Node.js 6.10 を選んだので JavaScript で書いてます。
次の記事が参考になりました。

[Node.js で HTTP GET して JSON パースするメモ - Qiita](https://qiita.com/n0bisuke/items/788dc4379fd57e8453a3)

```js
exports.handler = (event, context, callback) => {
  const options = {
    hostname: "b.hatena.ne.jp",
    port: 80,
    path: "/entrylist/json?url=saitoxu.io&threshold=1&sort=count",
    headers: {
      "user-agent": "hogehoge",
    },
  }
  require("http").get(options, res => {
    let body = ""
    res.setEncoding("utf8")

    res.on("data", chunk => {
      body += chunk
    })

    res.on("end", res => {
      ret = JSON.parse(body.slice(1, -2))
      callback(null, ret.slice(0, 5))
    })
  })
}
```

注意点としては、はてブの API は User Agent を指定しないと`500`エラーが返ってくるので適当に指定する必要があります。
あと、JSONP のためにレスポンスボディが`([body]);`のように丸括弧で囲われており、
そのまま json にパースするとエラーになるので括弧を削除してます。

## **API Gateway で Lambda を呼ぶ API を作る**

API Gateway を使って先ほど作った Lambda を呼ぶ API を作ります。
特に詰まるところはないと思いますが、強いてあげるなら CORS の設定をちゃんとしましょうということくらいでしょうか。

あと API Gateway は若干料金が発生するので、一応 API キーを設定して、
一定期間当たりの使用回数に上限を設けて不当に呼び出されていないか監視するようにはしています。
あんまりお金がかかるようなら別の方法を検討します笑

以上、はてブの人気エントリーの表示方法でした。
思ったより時間かけてしまったんですが汗、久々に Lambda など触る機会を持てたのは良かったです。
