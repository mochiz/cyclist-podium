# == Schema Information
#
# Table name: races
#
#  id          :bigint           not null, primary key
#  date        :string
#  nationality :string
#  title       :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :race do
    title { "ツール・ド・フランス" }
    nationality { "France" }
    date { '2023-07-01' }
  end
end
