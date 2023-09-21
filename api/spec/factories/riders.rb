# == Schema Information
#
# Table name: riders
#
#  id          :bigint           not null, primary key
#  birthday    :date             not null
#  family_name :string           not null
#  given_name  :string           not null
#  nationality :string           not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#
FactoryBot.define do
  factory :rider do
    family_name { "Pogacar" }
    given_name { "Tadej" }
    nationality { "Slovenia" }
    birthday { "1998-09-23" }
  end
end
