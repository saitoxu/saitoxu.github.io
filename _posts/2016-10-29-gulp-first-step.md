---
layout: post
title: "Gulp first step"
date: 2016-10-29
tags: Gulp JavaScript
---
Today I'll introduce the first step of Gulp.

As first step, let's try to compile Scss file by using Gulp.

#### **Step 1**
First, create npm project.

```sh
$ mkdir gulp-first-step
$ cd gulp-first-step
$ npm init
```

#### **Step 2**
Next, install `gulp` and `gulp-sass`,
and install `http-server` too for debug.

```sh
$ npm install gulp gulp-sass http-server
```

#### **Step 3**
Create `index.html` and `style.scss`.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>Gulp First Step</title>
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>Gulp First Step</h1>
  </body>
</html>
```

```scss
// style.scss
body {
  h1 {
    color: red;
  }
}
```

#### **Step 4**
Next, create `gulpfile.js` in project directory top.

```js
// gulpfile.js
const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('scss', () => {
  gulp.src('*.scss')
    .pipe(sass())
    .pipe(gulp.dest(''));
});
```

#### **Step 5**
OK, let's execute gulp task.

Then you can find `style.css` created.

```sh
$ gulp scss
$ cat style.css
body h1 {
  color: red; }
```

#### **Step 6**
Finally, start http server,
and let's access `http://127.0.0.1:8080` by your browser.

```sh
$ hs
```

You can see that css is effective rightly.
