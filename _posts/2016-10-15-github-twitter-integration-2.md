---
layout: post
title: "GitHub and Twitter integration (2)"
date: 2016-10-15
tags: Twitter Ruby Sinatra GitHub Thin Nginx
---
I will start from where we left off, in this post,
I will introduce my small system I mentioned in [the previous post](http://saitoxu.io/blog/2016/10/12/github-twitter-integration.html).

The system works as below.

1. I push a commit to my blog repository.
2. GitHub sends a POST request to my system.
3. My system posts a tweet automatically.

![Figure]({{site.baseurl}}/images/2016-10-15-figure.png)

As I said at the last time, my system is built by Sinatra, Thin, Nginx.

First, the app code is below, it's small.

```rb
require 'sinatra'
require 'twitter'
require 'json'

get '/' do
  'working'
end

post '/payload' do

  client = Twitter::REST::Client.new do |config|
    config.consumer_key        = ENV['TWITTER_CONSUMER_KEY']
    config.consumer_secret     = ENV['TWITTER_CONSUMER_SECRET']
    config.access_token        = ENV['TWITTER_ACCESS_TOKEN']
    config.access_token_secret = ENV['TWITTER_ACCESS_TOKEN_SECRET']
  end
  count = 0
  prefix = 'POST:'
  commits = JSON.parse(request.body.read)['commits']

  if commits
    for commit in commits do
      message = commit['message']
      if message.start_with?(prefix)
        title = message.sub(/#{prefix}/, '').strip
        addedFiles = commit['added']
        for added in addedFiles do
          if md = added.match(/([0-9]{4})-([0-9]{2})-([0-9]{2})-(.*).md/)
            year  = md[1]
            month = md[2]
            day   = md[3]
            page  = md[4] + '.html'
            url = ['http://saitoxu.io/blog', year, month, day, page].join('/')

            client.update(title + "\n" + url)
            count += 1
          end
        end
      end
    end
  end
  "#{count} tweet(s) posted."

end
```

To use Twitter API, we need some authentications,
so I stored them as environment variables.

Next, a config file of thin server is like this.

```yml
---
chdir: /var/lib/github-twitter-integration
environment: production
port: 10080
timeout: 30
log: log/production.log
pid: tmp/pids/thin.pid
max_conns: 1024
max_persistent_conns: 100
require: []
wait: 30
threadpool_size: 20
socket: /tmp/thin.sock
daemonize: true
```

Finally, Nginx's config is as below.

```nginx
user root;
worker_processes 2;

events {
  worker_connections 1024;
}
http {
  upstream thin {
    server unix:/tmp/thin.sock;
  }

  server {
    listen 80;
    server_name example.com;
    location / {
      proxy_pass http://thin;
    }
  }
}
```

Then we can start this server by the following commands.

```sh
$ bundle exec thin -C config/thin.yml
$ sudo service nginx start
```

GitHub Webhook and Twitter API are easy to use,

please use this post as reference and try to use them!

Sample code: [GitHub Twitter integration](https://github.com/saitoxu/github-twitter-integration)
