# frozen_string_literal: true

module Types
  class Objects::RaceType < Types::BaseObject
    field :id, ID, null: false
    field :title, String, 'レース名', null: false
    field :nationality, String, '開催国', null: false
    field :date, GraphQL::Types::ISO8601Date, '開催日', null: false
    field :results, [Objects::ResultType], 'レース結果', null: false

    def results
      object.results.order(:ranking)
    end
  end
end
