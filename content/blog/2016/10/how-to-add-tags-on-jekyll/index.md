---
title: "How to add tags on Jekyll"
date: "2016-10-18T00:00:00.000Z"
tags: Jekyll Ruby
---
I added tags on my top page and every posts without plugin.

Today, I'll introduce how to add tags on Jekyll.

#### **Step 1**
Add tags on your post.
For example, this article has tags like this.

```md
tags: Jekyll Ruby
```

#### **Step 2**
Then each post has `tags` variable.
You can access these tags by the following code from `index.html`.

```html
{% raw %}<div class="home">
  <h1 class="page-heading">Posts</h1>
  <ul class="post-list">
    {% for post in site.posts %}
      <li>
        <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span>
        <h2>
          <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title | escape }}</a>
        </h2>
        {% for tag in post.tags %}
          <span class="label">{{tag}}</span>
        {% endfor %}
      </li>
    {% endfor %}
  </ul>
  <p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>
</div>{% endraw %}
```

#### **Step 3**
In step 2, you can access `tags` via post in `site.posts`.
From each page, you can access it via `page` variable.
See the following example.

```html
{% raw %}<article class="post" itemscope itemtype="http://schema.org/BlogPosting">
  <header class="post-header">
    <p class="post-meta"><time datetime="{{ page.date | date_to_xmlschema }}" itemprop="datePublished">{{ page.date | date: "%b %-d, %Y" }}</time></p>
    <h1 class="post-title" itemprop="name headline">{{ page.title | escape }}</h1>
    {% for tag in page.tags %}
      <span class="label">{{tag}}</span>
    {% endfor %}
  </header>

  <div class="post-content" itemprop="articleBody">
    {{ content }}
  </div>
</article>{% endraw %}
```

#### **Step 4**
Finally, you just add some cool styles to tags.

Entire code is [here](https://github.com/saitoxu/saitoxu.github.io),
please use that as reference.
