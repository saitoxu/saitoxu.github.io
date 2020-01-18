---
title: 'How to use Gulp "watch"'
date: "2016-10-31T00:00:00.000Z"
tags:
  - Gulp
  - JavaScript
  - Sass
  - SCSS
---

Gulp has `watch` method as default.

This method watches changes of specified files,
and executes tasks which you want to do automatically.

Usage is below.

```js
gulp.watch(["files you want to watch"], ["tasks you want to do"])
```

Let's create task which watches the change of SCSS file and compile it
by using [the previous post sample]({{ site.baseurl }}/2016/10/29/gulp-first-step.html).

#### **Step 1**

Fisrt, add a task to `gulpfile.js`.

```js
// gulpfile.js
const gulp = require("gulp")
const sass = require("gulp-sass")

gulp.task("watch", () => {
  gulp.watch(["*.scss"], ["scss"])
})

gulp.task("scss", () => {
  gulp
    .src("*.scss")
    .pipe(sass())
    .pipe(gulp.dest(""))
})
```

#### **Step 2**

Next, execute the following command.

```sh
$ gulp watch
```

#### **Step 3**

Finally, let's change `style.scss`.

You can find that `scss` task is automatically done as below.

```sh
[22:08:16] Starting 'watch'...
[22:08:16] Finished 'watch' after 14 ms
[22:08:30] Starting 'scss'...
[22:08:30] Finished 'scss' after 15 ms
```
