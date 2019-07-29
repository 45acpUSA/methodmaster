require "rails_helper"

RSpec.describe Flashcard do
  
  context "attribute validation" do
    it "should validate presence of lanuage" do
      flashcard = Flashcard.create
      expect(flashcard.errors[:language]).to_not be_empty
    end
    it "should validate presence of difficulty" do
      flashcard = Flashcard.create
      expect(flashcard.errors[:difficulty]).to_not be_empty
    end
    it "should validate presence of data type" do
      flashcard = Flashcard.create
      expect(flashcard.errors[:data_type]).to_not be_empty
    end
    it "should validate presence of question" do
      flashcard = Flashcard.create
      expect(flashcard.errors[:question]).to_not be_empty
    end
    it "should validate presence of correct answer" do
      flashcard = Flashcard.create
      expect(flashcard.errors[:correct_answer]).to_not be_empty
    end
    it "should validate presence of incorrect answer1" do
      flashcard = Flashcard.create
      expect(flashcard.errors[:incorrect_answer1]).to_not be_empty
    end
    it "should validate presence of incorrect answer2" do
      flashcard = Flashcard.create
      expect(flashcard.errors[:incorrect_answer2]).to_not be_empty
    end
    it "should validate presence of incorrect answer3" do
      flashcard = Flashcard.create
      expect(flashcard.errors[:incorrect_answer3]).to_not be_empty
    end
  end


end