class Component < ApplicationRecord
  belongs_to :survey

  validates :component_type, presence: true
  validates :x_coordinate, :y_coordinate, presence: true
end
