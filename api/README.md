# README

### Rails7 のセットアップ

```
$ rails new cyclist-podium-api -d=postgresql -S -T
$ mv cyclist-podium-api api
$ cd api
$ rm -rf .git
$ mv .gitignore ../
$ bin/rails db:create
$ bin/rails s
```

graphql-ruby のセットアップ

https://github.com/rmosolgo/graphql-ruby

```
# Gemfile
gem 'graphql'

$ bundle install
$ bin/rails g graphql:install
```

モデルにスキーマ情報を自動追記するための annotate gem のインストール
https://github.com/ctran/annotate_models

```
# Gemfile
group :development do
  ...
  gem 'annotate'
end

$ bundle install
$ bin/rails g annotate:install
```

ローカル開発環境での cors を許容するため rack-cors gem のインストール
https://github.com/cyu/rack-cors

```
gem 'rack-cors'

$ bundle install
$ touch config/initializers/cors.rb
```

cors 設定を追加

```ruby
# config/initializers/cors.rb

# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin AJAX requests.

# Read more: https://github.com/cyu/rack-cors
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    allowed_origins = ENV.fetch('CORS_ALLOWED_ORIGINS', ['localhost:8000', 'localhost:6006'])
    origins *allowed_origins
    resource '*',
		headers: :any,
		methods: [:get, :post, :put, :patch, :delete, :options, :head]
	end
end
```

seed データのために seed-fu を追加

```
# Gemfile
gem 'seed-fu'

$ bundle install
$ mkdir -p db/fixtures/development
```

モデルの追加

```
$ bin/rails g model rider family_name given_name nationality birthday:date
$ bin/rails db:migrate

$ touch mkdir db/fixtures/development/01_riders.rb
```

```ruby
# app/models/rider.rb
class Rider < ApplicationRecord
	def full_name
		if nationality == "Japan"
			"#{family_name} #{given_name}"
		else
			"#{given_name} #{family_name}"
		end
	end

	def age
		((Time.zone.now - birthday.to_time) / 1.year.seconds).floor
	end
end
```

```ruby
# db/fixtures/development/01_riders.rb
Rider.seed_once(:id,
	{
		id: 1,
		family_name: "Pogacar",
		given_name: "Tadej",
		nationality: "Slovenia",
		birthday: "1998-09-21"
	},
	{
		id: 2,
		family_name: "Roglic",
		given_name: "Primoz",
		nationality: "Slovenia",
		birthday: "1989-10-29"
	},
]
```

オブジェクト型とクエリの追加

```
$ mkdir app/graphql/types/object_types
$ touch app/graphql/types/object_types/rider_type.rb

$ mkdir app/graphql/queries
$ touch app/graphql/queries/riders.rb
```

```ruby
module Types
	module ObjectTypes
		class RiderType < Types::BaseObject
			description 'ライダー'

			field :id, ID, 'ID', null: false
			field :full_name, String, '氏名', null: true
			field :family_name, String, '姓', null: true
			field :given_name, String, '名', null: true
			field :nationality, String, '国籍', null: true
			field :birthday, GraphQL::Types::ISO8601Date, '生年月日', null: true
			field :age, Integer, '年齢', null: true
		end
	end
end
```

```ruby
# app/graphql/types/query_type.rb
module Types
	class QueryType < Types::BaseObject
		...
		field :riders, resolver: Queries::Riders, description: 'ライダーリストを返します'
	end
end
```

```ruby
# app/graphql/queries/riders.rb
module Queries
	class Riders < GraphQL::Schema::Resolver
		description 'ライダーリストを返します'

		type [Types::ObjectTypes::RiderType], null: true

		def resolve
			::Rider.all
		end
	end
end
```

graphqiql で動作確認

```
$ bin/rails s
```

http://localhost:3000/graphiql

```
query getRiders {
  riders {
    id
    fullName
    birthday
    age
    nationality
  }
}
```

ミューテーションの追加

```ruby
module Mutations
  class CreateRider < BaseMutation
    description 'ライダー作成ミューテーション'

    # レスポンスデータ
    field :rider, Types::ObjectTypes::RiderType, 'ライダー', null: true
    field :errors, [String], 'エラー内容', null: false

    # リクエストパラメータ
    argument :family_name, String, '姓', required: true
    argument :given_name, String, '名', required: true
    argument :birthday, GraphQL::Types::ISO8601Date, '生年月日', required: true
    argument :nationality, String, '国籍', required: true

    def resolve(arguments)
      rider = Rider.create(arguments)

      return {
        rider: rider,
        errors: rider.errors
      }
    end
  end
end
```

```ruby
# app/graphql/mutations/update_rider.rb
module Mutations
  class UpdateRider < BaseMutation
    description 'ライダー作成ミューテーション'

    # レスポンスデータ
    field :rider, Types::ObjectTypes::RiderType, 'ライダー', null: true
    field :errors, [String], 'エラー内容', null: false

    # リクエストパラメータ
    argument :id, ID, 'ID', required: true
    argument :family_name, String, '姓', required: true
    argument :given_name, String, '名', required: true
    argument :birthday, GraphQL::Types::ISO8601Date, '生年月日', required: true
    argument :nationality, String, '国籍', required: true

    def resolve(arguments)
      rider = Rider.find(arguments[:id])
      rider.update({
        family_name: arguments[:family_name],
        given_name: arguments[:given_name],
        birthday: arguments[:birthday],
        nationality: arguments[:nationality]
      })

      return {
        rider: rider,
        errors: rider.errors
      }
    end
  end
end
```

```ruby
# app/graphql/types/mutation_type.rb
module Types
  class MutationType < Types::BaseObject
    field :createRider, mutation: Mutations::CreateRider, description: 'ライダーを作成します'
    field :updateRider, mutation: Mutations::UpdateRider, description: 'ライダーを更新します'
  end
end
```

```
mutation createRider($input: CreateRiderInput!) {
  createRider(input: $input) {
    rider {
      id
      fullName
      nationality
      birthday
      age
    }
    errors
  }
}

{
  "input": {
    "familyName": "佐野",
    "givenName": "淳哉",
    "nationality": "japan",
    "birthday": "1982-01-09"
  }
}
```

```
mutation createRider($input: CreateRiderInput!) {
  createRider(input: $input) {
    rider {
      id
      fullName
      nationality
    }
    errors
  }
}

{
  "input": {
    "id": 9,
    "familyName": "佐野",
    "givenName": "淳哉",
    "nationality": "japan",
    "birthday": "1982-01-09"

  }
}
```
