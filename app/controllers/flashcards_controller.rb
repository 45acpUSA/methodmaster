class FlashcardsController < ApplicationController
	before_action :authenticate_user!, except: %i[index]
	before_action :load_flashcard, except: %i[index create]
	
	def index
		flashcards = Flashcard.all
		render json: flashcards, status: 200
	end

	def show
	end

	def new
	end

	def create
		flashcard = current_user.flashcards.new(flashcard_params)
		if flashcard.save
			render json: flashcard, status: 201
		else
			render json: flashcard.errors.full_message, status: 422
		end
	end

	def edit
	end

	def update
		if current_user.flashcards.update(flashcard_params)
			redirect_to users_flashcards_path
		else
			render :edit
		end
	end

	def destroy
		flashcard = Flashcard.find(params[:id])
		if flashcard.destroy
			redirect_to action: "index"
		else
			redirect_back fallback_location: users_flashcards_path
		end
	end

	private

	def flashcard_params
		params.require(:flashcard).permit(:language, :difficulty, :data_type, :question, :correct_answer, :incorrect_answer1, :incorrect_answer2, :incorrect_answer3, :success)
	end

	def load_flashcard
		flashcard = Flashcard.find(params[:id])
	end
end
