class FlashcardsController < ApplicationController
	before_action :authenticate_user!, except: %i[index]
	before_action :load_flashcard, except: %i[index create]

	def index
		if user_signed_in?
			current_user_id = current_user.id
			flashcards = Flashcard.where(user_id: current_user_id)
		else
			flashcards = Flashcard.all
		end
	end

	def show
		current_user_id = current_user.id
		my_flashcards = flashcards.where(user_id: current_user_id)
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
		if flashcard.update(flashcard_params)
			redirect_to action: 'index'
		else
			render :edit
		end
	end

	def destroy
		flashcard.destroy
	end

	private

	def flashcard_params
		params.require(:flashcard).permit(:language, :difficulty, :data_type, :question, :correct_answer, :incorrect_answer1, :incorrect_answer2, :incorrect_answer3, :success)
	end

	def load_flashcard
		flashcard = Flashcard.find(params[:id])
	end
end
