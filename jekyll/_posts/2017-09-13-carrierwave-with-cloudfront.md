---
layout: post
title: CarrierWave+FogでリソースをS3に保存・CloudFrontで配信するときの小ネタ
date: 2017-09-13
tags:
  - Rails
  - Amazon S3
  - CloudFront
---

RailsでCarrierWave+Fogを使って画像などのリソースをS3に保存し、
それをCloudFront経由で配信するとき、ちょっと困ったことがあったのでメモしておきます。

環境は次のとおりです。

* Rails 5.1.1
* CarrierWave 1.1.0
* Fog 1.40.0

## **問題**

セキュリティのためS3に保存したリソースへの直接アクセスは禁止し、
CloudFrontからのみのアクセスを許可したいという要求があります。

これを実現するには、CarrierWaveの設定を次のようにすればできそうな気がします。

```rb
# config/initializers/carrierwave.rb
CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: 'ABCDEFGHIJKLMNOPQRST',
    aws_secret_access_key: 'abcdefghijklmnopqrstuvwxyz1234567890ABCD',
    region: 'ap-northeast-1',
    path_style: true
  }
  config.fog_public = false
  config.fog_attributes = { 'Cache-Control' => 'public, max-age=86400' }
  config.remove_previously_stored_files_after_update = false
  config.fog_directory = 'bucket-example'
  config.asset_host = 'https://abcdefghijklmn.cloudfront.net'
end
```

しかし、実際に`model.resource.url`のようにアクセスすると、
以下のようなS3のPre-Signed URLが返ってきます。

`https://bucket-example.s3.amazonaws.com/uploads/user/image/1/image.jpeg?X-Amz-Expires=60&X-Amz-Date=20160914T044238Z&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJTIEVPQZEXU26EJA/20160914/us-east-1/s3/aws4_request&X-Amz-SignedHeaders=host&X-Amz-Signature=53daea895d9b40d5821011ee0e4c776c0ab96bdce5f14d078716f40a2e723244`

古いですが以下のIssueなどを見たところ、
AWS Specificな課題なのでCarrierWaveの方で対応はされていないようです。

[Using CloudFront CDN for private files · Issue #1158 · carrierwaveuploader/carrierwave](https://github.com/carrierwaveuploader/carrierwave/issues/1158)

## **解決方法**

安直ですが各Uploaderの`url`メソッドをオーバーライドしてCloudFrontのURLを返すようにします。

CloudFrontのドメインは[railsconfig/config](https://github.com/railsconfig/config)を使って定義していて、
加えて以下の工夫を加えています。

* `default_url`が定義されているときはそれを返す
* 開発・テスト環境と本番環境で場合分け
* リソースを更新したあとはキャッシュクリアしたいので更新日時をクエリパラメータに追加

```rb
class ResourceUploader < CarrierWave::Uploader::Base

  # rest of uploader

  def url
    if path.present?
      # 保存先がローカルの場合
      return "#{super}?updatedAt=#{model.updated_at.to_i}" if Rails.env.development? || Rails.env.test?
      # 保存先がS3の場合
      return "#{Settings.asset_host}/#{path}?updatedAt=#{model.updated_at.to_i}"
    end
    super
  end
end
```

あと次のような解決方法もあるみたいです。

[amazon s3 - Use CDN with carrierwave + fog in s3 + cloudfront with rails 3.1 - Stack Overflow](https://stackoverflow.com/questions/9956712/use-cdn-with-carrierwave-fog-in-s3-cloudfront-with-rails-3-1)

以上、CarrierWave+FogでリソースをS3に保存・CloudFrontで配信するときの小ネタでした。
