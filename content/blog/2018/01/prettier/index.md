---
title: ESLintを使ってるプロジェクトにPrettierを導入した
date: "2018-01-31T00:00:00.000Z"
tags:
  - JavaScript
ogp: ./01-31-ogp.png
---

ESLint を使ってるプロジェクトに code formatter の[Prettier](https://github.com/prettier/prettier)を導入した。
参考記事の寄せ集めに過ぎない感があるが、自分の備忘録ということでメモしておく。

## **やりたいこと**

- Prettier を使ってコードを自動フォーマットしたい
- ESLint を導入してるのでルールがかち合わないようにしたい
- エディタは Atom を使っていてうまく連携したい

## **Prettier インストール**

```sh
$ yarn add prettier --dev --exact
$ yarn add eslint-plugin-prettier eslint-config-prettier --dev
```

[eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)は eslint 実行時に prettier も実行するプラグインで、
[eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)は不要・競合する可能性のある prettier のルールを無効化するもの。

## **設定を書く**

`.eslintrc`はこんな感じ。

```json
{
  "extends": [
    "plugin:react/recommended",
    "plugin:flowtype/recommended",
    "prettier",
    "prettier/react"
  ],
  "env": {
    "browser": true,
    "jest/globals": true
  },
  "parser": "babel-eslint",
  "plugins": [
    "jest",
    "react",
    "prettier",
    "flowtype"
  ],
  "rules": {
    "prettier/prettier": [
      "error",
      {
        printWidth: 100,
        trailingComma: none,
        singleQuote: true,
        semi: false
      }
    ],
    "no-mixed-operators": 0
    // ...
  }
}
```

ここまでで`yarn eslint src/app.js --fix`などとすると prettier が効くと思う。
`no-mixed-operators`のルールは prettier といっしょに使うとちょっとコードを修正しないといけないので、面倒で off にしておいた。

参考: [https://github.com/prettier/eslint-config-prettier#no-mixed-operators](https://github.com/prettier/eslint-config-prettier#no-mixed-operators)

## **Atom のパッケージインストール**

[prettier-atom](https://github.com/prettier/prettier-atom)というパッケージがあるのでインストール。
"Format Files on Save"という設定があるのでチェックを入れておくとファイル保存時に自動フォーマットされる。

## **参考記事**

- [Prettier · Opinionated Code Formatter](https://prettier.io/)
- [JS のコードの自動整形に Prettier が便利だったので、 eslint と Atom から使えるように設定した - Qiita](https://qiita.com/mizchi/items/f42c77c0a7a24dd5a567)
- [prettier 時代の ESLint の設定 - Qiita](https://qiita.com/akameco/items/c4c92135a9d50727c7ed)
