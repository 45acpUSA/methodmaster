import React from "react"
import { Button, Card, CardHeader, CardBody,
  CardTitle, CardSubtitle, FormGroup, Input, Label } from 'reactstrap'

export default class Javascript extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      style: {
        backgroundColor: 'blue',
      },
      correctCount: 0,
      incorrectCount: 0,
    }
  }
  handleClick = (flashcard, index, rand) => {
    if (flashcard.correct_answer.toLowerCase() == rand.toLowerCase()) {
      flashcard.success = true
      console.log(flashcard.success)
      this.handleResponse(flashcard, index)
    } else {
      flashcard.success = false
      this.handleResponse(flashcard, index)
    }
  }

  handleResponse = (flashcard, index) => {
    // const { flashcards } = this.props
    const responses = ["Try Again", "Not Quite", "Not the Droid You're Looking For"]
    const randomNum = () => Math.floor(Math.random() * 3)
    if (flashcard.success === true) {
      this.setState(state => {
        return{
          style: {
            backgroundColor: 'green'
          },
          correctCount: state.correctCount ++
        }
      })
      console.log(this.state.correctCount)
      if (this.state.correctCount < 5) {
        alert("Correct!")
      } else if (this.state.correctCount >= 5 && this.state.correctCount < 10) {
        alert("You're on a Roll!")
      }
      // return setTimeout(() => {return flashcards.splice(index, 1)}, 2000)
    } else if (flashcard.success === false) {
      this.setState(state => {
        return{
          style: {
            backgroundColor: 'red'
          },
          incorrectCount: state.incorrectCount ++
        }
      })
      console.log(this.state.incorrectCount)
      alert(responses[randomNum()])
    }
  }

  randomAnswers = flashcard => {
    let answers = [flashcard.correct_answer, flashcard.incorrect_answer1, flashcard.incorrect_answer2, flashcard.incorrect_answer3]
    const randomizedAnswers = []
    while (answers.length > 0) {
      const randomNum1 = Math.floor(Math.random() * 4)
      randomizedAnswers.push(answers[randomNum1])
      answers.splice(randomNum1, 1)
      const randomNum2 = Math.floor(Math.random() * 3)
      randomizedAnswers.push(answers[randomNum2])
      answers.splice(randomNum2, 1)
      const randomNum3 = Math.floor(Math.random() * 2)
      randomizedAnswers.push(answers[randomNum3])
      answers.splice(randomNum3, 1)
      randomizedAnswers.push(answers[0])
      answers.splice(0, 1)
    }
    return randomizedAnswers.map((rand, index) => {
      return(
        <div key={index}>
          <Button onClick={() => {this.handleClick(flashcard, index, rand)} }> {rand} </Button>
        </div>
      )
    })
  }

  javascriptCards = () => {
    const { flashcards } = this.props
    return flashcards.map(flashcard => {
      if (flashcard.language === 'Javascript') {
        return(
          <div key={flashcard.id}>
          <Card style={ style }>
            <CardHeader>{flashcard.language.toUpperCase()}</CardHeader>
            <CardBody>
              <CardTitle>{flashcard.data_type.toUpperCase()}</CardTitle>
              <CardTitle>{flashcard.difficulty.toUpperCase()}</CardTitle>
              <CardSubtitle>{flashcard.question}</CardSubtitle>
            </CardBody>
            <CardBody>
              {this.randomAnswers(flashcard)}
            </CardBody>
          </Card>
        </div>
        )
      }
    })
  }

  render () {
    return (
      <React.Fragment>
        { this.javascriptCards() }
      </React.Fragment>
    );
  }
}
