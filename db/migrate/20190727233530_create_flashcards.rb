class CreateFlashcards < ActiveRecord::Migration[5.2]
  def change
    create_table :flashcards do |t|
      t.references :user, foreign_key: true
      t.string :language
      t.string :difficulty
      t.string :data_type
      t.string :question
      t.string :correct_answer
      t.string :incorrect_answer1
      t.string :incorrect_answer2
      t.string :incorrect_answer3
      t.boolean :success

      t.timestamps
    end
  end
end
