class CreateRiders < ActiveRecord::Migration[7.0]
  def change
    create_table :riders do |t|
      t.string :family_name, null: false
      t.string :given_name, null: false
      t.string :nationality, null: false
      t.date :birthday, null: false

      t.timestamps
    end
  end
end
