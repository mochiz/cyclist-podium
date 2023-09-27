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
class Race < ApplicationRecord
end
