# frozen_string_literal: true

module Types
  class Objects::ResultType < Types::BaseObject
    field :id, ID, null: false
    field :race, Objects::RaceType, 'レース', null: false
    field :rider, ObjectTypes::RiderType, 'ライダー', null: false
    field :ranking, Integer, '順位', null: false
  end
end
