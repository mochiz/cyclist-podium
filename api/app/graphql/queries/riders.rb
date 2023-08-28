module Queries
  class Riders < GraphQL::Schema::Resolver
    description 'ライダーリストを返します'

    type [Types::ObjectTypes::RiderType], null: true

    def resolve
      ::Rider.all
    end
  end
end
