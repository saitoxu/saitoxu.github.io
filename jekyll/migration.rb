def migrate(path)
  new_blog_dir = 'content/blog'
  result = /^.+\/(\d{4})-(\d{2})-(\d{2})-(.*)\.md$/.match(path)
  year = result[1]
  month = result[2]
  # day = result[3]
  title = result[4]
  # 年のディレクトリを作成
  unless Dir.exist?("./#{new_blog_dir}/#{year}")
    Dir.mkdir("./#{new_blog_dir}/#{year}", 0755)
  end
  # 月のディレクトリを作成
  unless Dir.exist?("./#{new_blog_dir}/#{year}/#{month}")
    Dir.mkdir("./#{new_blog_dir}/#{year}/#{month}", 0755)
  end
  Dir.mkdir("./#{new_blog_dir}/#{year}/#{month}/#{title}", 0755)
  new_path = "./#{new_blog_dir}/#{year}/#{month}/#{title}/index.md"
  # 記事をコピー
  ogp_path = nil
  image_paths = []
  File.open(new_path, 'w') do |file|
    File.foreach(path) do |line|
      result = nil
      if result = /^date:\s(\d{4}-\d{2}-\d{2})$/.match(line)
        # dateはgatsbyのフォーマットに書き換える
        file.puts("date: \"#{result[1]}T00:00:00.000Z\"")
      elsif /^layout:.*$/.match?(line)
        # 何もしない
      elsif result = /^ogp:\s(.*)$/.match(line)
        # ogpはファイルパスが変わるのでそれの対応
        ogp_path = result[1]
        file.puts("ogp: ./#{result[1].split('/')[-1]}")
      elsif result = /^.*\((\/images\/(.+)\.(gif|png|jpeg|jpg))\).*$/.match(line)
        # 画像もファイルパスが変わるので変更する
        new_image = "./#{result[2].split('/')[-1]}.#{result[3]}"
        l = line.gsub(result[1], new_image)
        file.puts(l)
        image_paths << { old: result[1], new: new_image }
      else
        file.puts(line)
      end
    end
  end
  # ogpの移行
  if ogp_path
    new_opg_path = "./#{new_blog_dir}/#{year}/#{month}/#{title}/#{ogp_path.split('/')[-1]}"
    `cp jekyll/images/#{ogp_path} #{new_opg_path}`
  end
  # 画像ファイルの移行
  image_paths.each do |image_path|
    new_image_path = "./#{new_blog_dir}/#{year}/#{month}/#{title}/#{image_path[:new].gsub('./', '')}"
    `cp jekyll/#{image_path[:old]} #{new_image_path}`
  end
end

# migrate('./jekyll/_posts/2017-12-31-one-year-summary.md')
old_posts_dir = 'jekyll/_posts'
Dir.glob("./#{old_posts_dir}/**/*.md").each do |path|
  migrate(path)
end
