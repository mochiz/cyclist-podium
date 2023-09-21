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
require 'rails_helper'

RSpec.describe Rider, type: :model do
  let(:rider) { build(:rider) }

  describe "#full_name" do
    it "returns the full name of the rider" do
      expect(rider.full_name).to eq "Tadej Pogacar"
    end
  end
end
