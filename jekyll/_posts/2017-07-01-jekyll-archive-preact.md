---
layout: post
title: preactを使ってブログのアーカイブメニューを作る
date: 2017-07-01
tags: React JavaScript Jekyll
ogp: 2017-07-01-ogp.png
---

[developit/preact](https://github.com/developit/preact/)という
Reactから一部機能を除いてサイズを軽くしたライブラリがあります。

このpreactを使って、Jekyllで書いてるブログのアーカイブメニューを作ってみた（フッター参照）ので、
作り方をメモしておきます。

## **1. アーカイブページを作る**

[jekyll/jekyll-archives](https://github.com/jekyll/jekyll-archives)などを使って、
`https://saitoxu.io/2017/`といったアーカイブ用のページを作ります。

## **2. 記事の投稿日付一覧を書き出す**

記事の投稿日付一覧をDOMに書き出しておきます。
これを後でpreactで読み込んでアーカイブメニューを作るという流れです。

```html
<input id="archive-data" type="hidden" value="{{ "{{ site.posts | map: 'date' | jsonify | escape " }}}}" />
```

JavaScriptで処理しやすいよう`jsonify`をかませてます。

## **3. preactのセットアップ**

preactなどのnpmライブラリを使う準備をします。

```sh
$ yarn init
$ yarn install preact watchify babelify babel-preset-es2015 babel-preset-react
```

preactの環境構築にはこちらが参考になりました。

[Reactサブセット実装の preact で、ライフゲームのアニメーション書いて使い方を確認した](http://qiita.com/mizchi/items/427713e68e8c980ce0ec)

## **4. アーカイブメニューのコンポーネント実装**

アーカイブメニューのコンポーネントを作っていきます。
大枠は以下のようになります。

```js
/** @jsx h */

import { render, Component } from 'preact'

class Archive extends Component {
  constructor(props) {
    super(props)
    const postDates = JSON.parse(document.getElementById('archive-data').value)
    // postDatesに記事の日付一覧が入ってるのでよしなに使う
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(e) {
    // 年の横にあるキャレットをクリック/タップしたときに
    // その年の月別アーカイブを表示/非表示にする処理
  }

  render() {
    // アーカイブメニューのレンダリング
  }
}

window.addEventListener('DOMContentLoaded', () => {
  render(<Archive />, document.getElementById('archive'))
})
```

詳しくは[ソース](https://github.com/saitoxu/saitoxu.github.io/blob/master/js/index.js)を見てみてください。

## **おわりに**

preactを使ってアーカイブメニューを作りました。

reactは大仰だけど、ちょっと使いたいってときに使えるなと思いました。
