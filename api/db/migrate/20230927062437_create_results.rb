class CreateResults < ActiveRecord::Migration[7.1]
  def change
    create_table :results do |t|
      t.references :race, null: false, foreign_key: true
      t.references :rider, null: false, foreign_key: true
      t.integer :ranking

      t.timestamps
    end
  end
end
