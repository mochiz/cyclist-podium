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
