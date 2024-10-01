class CreateComponents < ActiveRecord::Migration[7.0]
  def change
    create_table :components do |t|
      t.references :survey, null: false, foreign_key: true
      t.string :component_type
      t.text :content
      t.integer :x_coordinate
      t.integer :y_coordinate

      t.timestamps
    end
  end
end
