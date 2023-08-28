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
