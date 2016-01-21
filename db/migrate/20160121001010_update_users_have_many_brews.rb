class UpdateUsersHaveManyBrews < ActiveRecord::Migration
  def change
    add_reference :brews, :users, index: true, foreign_key: true
  end
end
