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
