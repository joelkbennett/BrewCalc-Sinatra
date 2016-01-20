class CreateBrews < ActiveRecord::Migration
  def change
    create_table :brews do |t|
      t.string :name
    end
  end
end
