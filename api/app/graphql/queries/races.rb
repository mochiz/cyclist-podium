module Queries
  class Races < GraphQL::Schema::Resolver
    description 'レースリストを返します'

    type [Types::Objects::RaceType], null: true

    def resolve
      ::Race.includes(results: :rider).order(:id)
    end
  end
end
