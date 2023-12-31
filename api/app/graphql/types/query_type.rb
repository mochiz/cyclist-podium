module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.
    field :riders, resolver: Queries::Riders, description: 'ライダーリストを返します'
    field :rider, resolver: Queries::Rider, description: '指定IDのライダーを返します'
    field :races, resolver: Queries::Races, description: 'レースのリストを返します'
  end
end
