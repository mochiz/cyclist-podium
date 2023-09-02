require 'rails_helper'

describe Mutations::CreateRider do

  let(:context) {}

  let(:mutation) {
<<-GRAPHQL
  mutation createRider ($inputs: CreateRiderInput!) {
    createRider(input:$inputs) {
      errors
      rider {
        id
        fullName
      }
    }
  }
GRAPHQL
  }

  let(:variables) {
    {
      inputs: {
        familyName: 'Roglic',
        givenName: 'Primoz',
        nationality: 'Slovenia',
        birthday: '1989-10-29',
      }
    }
  }

  subject{ CyclistPodiumApiSchema.execute(mutation, context: context, variables: variables) }

  it "ライダーが作成される" do
    expect{ subject }.to change{ Rider.count }.by(1)
    rider = Rider.last
    expect(rider.full_name).to eq('Primoz Roglic')
  end
end
