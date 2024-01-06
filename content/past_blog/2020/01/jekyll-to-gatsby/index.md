---
title: ブログをJekyllからGatsbyに移行しました
date: "2020-01-24T00:00:00.000Z"
tags:
  - Jekyll
  - Gatsby
ogp: ./ogp.png
---

このブログはJekyllとGitHub Pagesを利用して公開していたのですが、
最近Gatsbyに移行したのでそのときの手順をまとめておきます。

## Jekyllのソースを退避

まず`jekyll`のようなディレクトリを作成し、Jekyllのソースを退避させます。

## Gatsbyのプロジェクト作成

Gatsbyのプロジェクトを作成します。
Gatsbyは空のディレクトリでないと実行できないため、`gatsby`のようなディレクトリを作成し、その下で以下を実行します。

```sh
$ npx gatsby new . https://github.com/gatsbyjs/gatsby-starter-blog
```

その後`gatsby`に生成されたソースを元のディレクトリに移行します。

## `gh-pages`をインストール

GitHub Pagesを使ってホストする場合は、Gatsbyのプラグインである[gh-pages](https://github.com/tschaub/gh-pages)をインストールします。

```sh
$ npm install gh-pages --save-dev
```

`package.json`にデプロイコマンドを追記します。

```diff
  "scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "format": "prettier --write \"**/*.{js,jsx,json}\"",
    "start": "npm run develop",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\" && exit 1",
+   "deploy": "gatsby build && gh-pages -d public -b master",
    "dev": "npm run develop"
  }
}
```

## Jekyllの記事を移行

`jekyll/_posts`以下にあるマークダウンを、`content/blog`などの`gatsby-source-filesystem`が読み込むディレクトリに移行します。
自分はそれなりにファイル数が多かったので、スクリプトを書いて移行しました。

### 移行前

移行前は次のような構成になってると思いますが

```sh
jekyll/_posts
├── 2017-01-01-hoge.md
├── 2018-01-01-fuga.md
└── 2019-01-01-piyo.md
```

### 移行後

移行後は次のようになります。

```sh
content/blog
├── 2017
│   └── 01
│       └── hoge
│           └── index.md
├── 2018
│   └── 01
│       └── fuga
│           └── index.md
└── 2019
    └── 01
        └── piyo
            └── index.md
```

記事に紐づく画像も、`content/assets`などに移行します。
最後にJekyllのソースを退避させた`jekyll`ディレクトリを削除します。

`npm run deploy`を実行すると`master`ブランチにビルドされたファイルがコミットされ、ページが公開されます。
これにて移行完了です。
