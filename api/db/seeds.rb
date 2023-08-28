# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

Rider.create!(
  [
    {
      family_name: "Pogacar",
      given_name: "Tadej",
      nationality: "Slovenia",
      birthday: "1998-09-21"
    },
    {
      family_name: "Roglic",
      given_name: "Primoz",
      nationality: "Slovenia",
      birthday: "1989-10-29"
    },
    {
      family_name: "Bernal",
      given_name: "Egan",
      nationality: "Colombia",
      birthday: "1997-01-13"
    },
    {
      family_name: "Carapaz",
      given_name: "Richard",
      nationality: "Ecuador",
      birthday: "1993-05-29"
    },
    {
      family_name: "Alaphilippe",
      given_name: "Julian",
      nationality: "France",
      birthday: "1992-06-11"
    },
    {
      family_name: "Van Aert",
      given_name: "Wout",
      nationality: "Belgium",
      birthday: "1994-09-15"
    },
    {
      family_name: "Van der Poel",
      given_name: "Mathieu",
      nationality: "Netherlands",
      birthday: "1995-01-19"
    },
    {
      family_name: "新城",
      given_name: "幸也",
      nationality: "Japan",
      birthday: "1982-11-09"
    },
    {
      family_name: "別府",
      given_name: "史之",
      nationality: "Japan",
      birthday: "1982-11-09"
    },
  ]
)