---
title: "Original Google Translate API"
date: "2016-11-21T00:00:00.000Z"
tags:
  - JavaScript
  - PhantomJS
  - Google Translate
---

Recently, Google Translate has evolved using a neural network.

So I created an original API server that uses Google Translate without using the API.

[Original Google Translate API](https://github.com/saitoxu/honyaku-konnyaku-server)

I slack off this now and so handle only from Japanese to English,
but it can also correspond easily to other languages.

#### **Usage**

It's very easy to use.

```bash
$ git clone https://github.com/saitoxu/honyaku-konnyaku-server.git
$ cd honyaku-konnyaku-server
$ npm install
$ npm run server

# another shell
$ curl http://localhost:1337?text=%E3%81%93%E3%82%93%E3%81%AB%E3%82%83%E3%81%8F
Konjac
```

#### **Mechanism**

Mechanism is as below.

1. When receiving a request, access to the Google Translate page by PhantomJS
2. Retrieve translation result with HTML parser, Cheerio
3. Return the result to the client

Because we get the full source of the Google Translate page, the response is not fast.

So we can't use this in production environment, but please try using it as a joke.
