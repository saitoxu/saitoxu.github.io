---
layout: post
title: Rails5.2の新機能Active StorageでCarrierWave+Fogは置き換わるか
date: 2017-12-20
tags:
  - Ruby
  - Rails
---

```sh
mkdir rails-active-storage-sample
cd rails-active-storage-sample
bundle init
vim Gemfile
bundle install -h
bundle install --path vendor/bundle
bundle exec rails -h
bundle exec rails new --skip-bundle --skip-turbolinks
bundle exec rails new . --skip-bundle --skip-turbolinks
ls
less Gemfile
bundle install
bin/rails active_storage:install
```
