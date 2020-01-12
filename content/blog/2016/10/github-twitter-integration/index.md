---
title: "GitHub and Twitter integration"
date: "2016-10-12T00:00:00.000Z"
tags: Twitter Ruby Sinatra GitHub
---
I used GitHub webhook to integrate with Twitter,
and created a below service.

When I commit a blog post with some specific commit message,
then the blog post is automatically tweeted.

For example, when I push the commit having the following message,

```
POST: GitHub and Twitter integration
```

then a tweet is automatically posted like this.

![GitHub and Twitter integration]({{site.baseurl}}/images/2016-10-12-github-twitter-integration.png)

I created this small service by using Sinatra, Thin, Nginx.

I want to introduce the structure next time.
