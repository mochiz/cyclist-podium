class CreateRaces < ActiveRecord::Migration[7.1]
  def change
    create_table :races do |t|
      t.string :title
      t.string :nationality
      t.string :date

      t.timestamps
    end
  end
end
