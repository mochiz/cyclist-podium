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
class Rider < ApplicationRecord
  def full_name
    if nationality == "Japan"    
      "#{family_name} #{given_name}"
    else
      "#{given_name} #{family_name}"
    end
  end
end
