---
title: Reactで三目並べの続き
date: "2017-03-26T00:00:00.000Z"
tags:
  - React
  - JavaScript
ogp: ./2017-03-21-ogp.png
---

React の[公式チュートリアル](https://facebook.github.io/react/tutorial/tutorial.html)の三目並べには以下のように続きがあります。

> Now, you've made a tic-tac-toe game that:

- lets you play tic-tac-toe,
- indicates when one player has won the game,
- stores the history of moves during the game,
- allows players to jump back in time to see older versions of the game board.

> Nice work! We hope you now feel like you have a decent grasp on how React works.
> If you have extra time or want to practice your new skills, here are some ideas for improvements you could make, listed in order of increasing difficulty:

1. Display the move locations in the format "(1, 3)" instead of "6".
2. Bold the currently-selected item in the move list.
3. Rewrite Board to use two loops to make the squares instead of hardcoding them.
4. Add a toggle button that lets you sort the moves in either ascending or descending order.
5. When someone wins, highlight the three squares that caused the win.

[前回](/2017/03/react-tic-tac-toe)は基本の三目並べを作ったので、今回はこの続きをやってみます。

最終的な成果物はこちら ↓

[react-tic-tac-toe-next](/playground/react-tic-tac-toe-next/)

## **1. 位置の表示**

各手番でどこに X または O をおいたのかを履歴に表示します。

`Game`コンポーネントの`handleClick()`でクリック後に新しい`state`をセットするとき、そこに位置も計算してセットします（`location`の部分）。

`gist:saitoxu/5aa916e0452aad6a647499ebab2520e3?file=Game.js&highlights=33-45`

あとはレンダリングするときにこれを表示してあげます。

`gist:saitoxu/5aa916e0452aad6a647499ebab2520e3?file=Game.js&highlights=75`

## **2. 今のステップを強調**

`render()`の中で、こんな感じ。

`gist:saitoxu/5aa916e0452aad6a647499ebab2520e3?file=Game.js&highlights=76-78`

## **3. マスのハードコーディングの修正**

`Board`コンポーネントでマスをハードコーディングしていたので、それの修正。

`renderRow()`を定義して、`render()`の中で呼びます。

`gist:saitoxu/5aa916e0452aad6a647499ebab2520e3?file=Board.js&highlights=12-35`

## **4. 履歴の表示順序**

やることはざっとこんな感じです。

- 履歴の表示順序をトグルするボタンを設置
- `state`に昇順か降順かの状態を持たせる
- `render()`で`state`に応じて履歴の表示順序を切り替え

`gist:saitoxu/5aa916e0452aad6a647499ebab2520e3?file=Game.js&highlights=55-59`

`gist:saitoxu/5aa916e0452aad6a647499ebab2520e3?file=Game.js&highlights=85-103`

## **5. 勝利ラインのハイライト**

これはちょっと面倒ですが、`Square`コンポーネントに
勝利に起因したかマスかどうかを伝える必要があります。

まず`Square`コンポーネントは以下のように、`props`によってハイライトするかどうか受けられるようにします。

`gist:saitoxu/5aa916e0452aad6a647499ebab2520e3?file=Square.js`

それで`Game`コンポーネントでは次のように、`value`だけでなくハイライトするかどうかを表す値`highlighted`も保持するようにします。

`gist:saitoxu/5aa916e0452aad6a647499ebab2520e3?file=Game.js&highlights=5-16`

あとは勝利判定のときにこの値を変えて、`Square`まで渡るようにすれば OK です。

大まかなアイデアはこんな感じで、ソースコードは[Gist](https://gist.github.com/saitoxu/5aa916e0452aad6a647499ebab2520e3)に上げたのでこちらを確認してください。
