module Types
  class MutationType < Types::BaseObject
    field :createRider, mutation: Mutations::CreateRider, description: 'ライダーを作成します'
    field :updateRider, mutation: Mutations::UpdateRider, description: 'ライダーを更新します'
  end
end
