class UpdateBrews < ActiveRecord::Migration
  def change
    change_table :brews do |t|
      t.decimal :grain, :precision => 4, :scale => 2
      t.decimal :hops, :precision => 4, :scale => 2
      t.date :date
    end
  end
end
