---
title: gatsby-starter-blogでhot reloadが失敗するときの対応
date: "2020-04-05T00:00:00.000Z"
tags:
  - Gatsby
  - React
  - JavaScript
---

[gatsby-starter-blog](https://github.com/gatsbyjs/gatsby-starter-blog)をテンプレートに記事を書いていると、
たまにhot reloadが失敗することがありました。
hot reloadに失敗すると毎回ページを再読込する必要があり、執筆中けっこう手間だなーと感じていたのでその対応策のメモです。

## エラーの内容

`BlogTemplate`の`props`として渡される`data.markdownRemark`(記事の情報)が`null`のため、
後続のレンダリング処理でエラーになります。

```jsx
const BlogPostTemplate = ({ data, pageContext, location }) => {
  const post = data.markdownRemark // <- markdownRemarkがnullになる
  const siteTitle = data.site.siteMetadata.title
  const { previous, next } = pageContext
  // ...
}
```

解決はされていませんが、一応GitHubにもissueとして上がっています: [gatsby-starter-blog blog-post.js fails hot reload due to graphql query failure · Issue #11183 · gatsbyjs/gatsby](https://github.com/gatsbyjs/gatsby/issues/11183)

Issueでも発生条件がいまいち分かっていないようで、
自分も原因特定には至っていないのですが、
今回はとりあえず問題を回避する方法を紹介します。

## 対応策

記事情報が`null`でないときにstateにキャッシュしておいて、
`data.markdownRemark`が`null`の場合はそのキャッシュした値を参照するようにします。
コードは以下のようになります。

```jsx
class BlogPostTemplate extends React.Component {
  constructor(props) {
    super(props)
    this.state = { oldPost: props.data.markdownRemark }
  }

  componentWillReceiveProps(nextProps) {
    // 前の記事の内容をstateにキャッシュしておく
    if (nextProps.data.markdownRemark) {
      this.setState({ oldPost: nextProps.data.markdownRemark })
    }
  }

  render() {
    // data.markdownRemarkがnullだったらoldPostを参照
    const post = this.props.data.markdownRemark || this.state.oldPost
    // ...
  }
}
```

暫定的ではあるものの、これでエラーが発生しなくなりhot reloadが機能するようになりました。
