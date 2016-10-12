---
layout: post
title: "GitHub and Twitter integration"
date: 2016-10-12
tags: Twitter Ruby Sinatra GitHub
---
I used GitHub webhook to integrate with Twitter,
and created a below service.

When I commit a blog post with some specific commit message,
then the blog post is automatically tweeted.

For example, when I push the commit having the following message,

```
POST: hoge
```

then a tweet is automatically posted like this.

```
hoge
http://saitoxu.io/blog/2016/01/01/hoge.html
```

I created this small service by using Sinatra, Thin, Nginx.
I want to introduce the structure next time.
