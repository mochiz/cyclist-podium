# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2023_09_27_062437) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "races", force: :cascade do |t|
    t.string "title"
    t.string "nationality"
    t.string "date"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "results", force: :cascade do |t|
    t.bigint "race_id", null: false
    t.bigint "rider_id", null: false
    t.integer "ranking"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["race_id"], name: "index_results_on_race_id"
    t.index ["rider_id"], name: "index_results_on_rider_id"
  end

  create_table "riders", force: :cascade do |t|
    t.string "family_name", null: false
    t.string "given_name", null: false
    t.string "nationality", null: false
    t.date "birthday", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "results", "races"
  add_foreign_key "results", "riders"
end
