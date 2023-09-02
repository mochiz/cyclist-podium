require 'rails_helper'

RSpec.describe Rider, type: :model do
  let(:rider) { build(:rider) }

  describe "#full_name" do
    it "returns the full name of the rider" do
      expect(rider.full_name).to eq "Tadej Pogacarrrr"
    end
  end
end
