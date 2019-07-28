class Flashcard < ApplicationRecord
  belongs_to :user

  validates :language, :difficulty, :data_type, :question, :correct_answer, :incorrect_answer1, :incorrect_answer2, :incorrect_answer3, presence: true
  
end
