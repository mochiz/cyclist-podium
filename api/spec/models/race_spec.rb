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
require 'rails_helper'

RSpec.describe Race, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
