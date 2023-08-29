module Queries
  class Rider < GraphQL::Schema::Resolver
    description '指定IDのライダーを返します'

    type Types::ObjectTypes::RiderType, null: false

    argument :id, ID, required: true

    def resolve(id:)
      ::Rider.find(id)
    end
  end
end
