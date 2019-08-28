# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(
  email: admin@test.com,
  password: 'testing123'
)
User.create(
  email: admin2@test.com,
  password: 'testing123'
)

Flashcard.create(
  user_id: 1,
  language: 'Javascript',
  difficulty: 'Easy',
  data_type: 'String',
  question: 'Which method returns the length of any given string?',
  correct_answer: '.length',
  incorrect_answer1: '.count',
  incorrect_answer2: '.chars',
  incorrect_answer3: '.size',
)
Flashcard.create(
  user_id: 1,
  language: 'Javascript',
  difficulty: 'Hard',
  data_type: 'Array',
  question: 'Which of these methods returns a mutated version of the original array?',
  correct_answer: '.slice()',
  incorrect_answer1: '.filter()',
  incorrect_answer2: '.map()',
  incorrect_answer3: '.toString()',
)
Flashcard.create(
  user_id: 2,
  language: 'Javascript',
  difficulty: 'Medium',
  data_type: 'Number',
  question: 'Which method parses a string and returns a whole number?',
  correct_answer: 'parseInt()',
  incorrect_answer1: 'parseFloat()',
  incorrect_answer2: '.toInteger',
  incorrect_answer3: '.toNumber',
)
Flashcard.create(
  user_id: 2,
  language: 'Javascript',
  difficulty: 'Hard',
  data_type: 'Array',
  question: 'Which method returns the value of the first element in an array that passes a test?',
  correct_answer: '.find()',
  incorrect_answer1: '.map()',
  incorrect_answer2: '.filter()',
  incorrect_answer3: '.splice()',
)