require 'rails_helper'

describe Queries::Riders do
  let!(:rider) { create(:rider) }

  let(:context) {}

  let(:query) do
<<-GRAPHQL
query getRiders {
  riders {
    id
    fullName
    age
  }
}
GRAPHQL
  end

  let(:variables) { { } }
  subject { CyclistPodiumApiSchema.execute(query, context: context, variables: variables) }

  it 'Ridersが取得できる' do
    result = subject
    expect(result['data']['errors']).to eq(nil)
    expect(result['data']['riders'].count).to eq(1)

    expect(result['data']['riders'][0]['id']).to eq(rider.id.to_s)
    expect(result['data']['riders'][0]['fullName']).to eq(rider.full_name)
    expect(result['data']['riders'][0]['age']).to eq(rider.age)
  end
end
