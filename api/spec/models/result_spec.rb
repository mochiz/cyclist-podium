# == Schema Information
#
# Table name: results
#
#  id         :bigint           not null, primary key
#  ranking    :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  race_id    :bigint           not null
#  rider_id   :bigint           not null
#
# Indexes
#
#  index_results_on_race_id   (race_id)
#  index_results_on_rider_id  (rider_id)
#
# Foreign Keys
#
#  fk_rails_...  (race_id => races.id)
#  fk_rails_...  (rider_id => riders.id)
#
require 'rails_helper'

RSpec.describe Result, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
