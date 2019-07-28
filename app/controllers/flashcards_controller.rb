class FlashcardsController < ApplicationController
	before_action :authenticate_user!, except: %i[index]
	before_action :load_flashcard, except: %i[index]

	def index
		flashcards = Flashcard.all
	end

	def show
	end

	def create
	end

	def edit
	end

	def update
	end

	def destroy
	end

	private

	def flashcard_params
		params.require(:flashcard).permit(:language, :difficulty, :data_type, :question, :correct_answer, :incorrect_answer1, :incorrect_answer2, :incorrect_answer3, :success)
	end

	def load_flashcard
		flashcard = Flashcard.find(params[:id])
	end
end
