import React from "react"
import PropTypes from "prop-types"
import { Button, Card, CardHeader, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap'

export default class Flashcards extends React.Component {

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
    return(
      <div>
        <Button>{randomizedAnswers[0]}</Button>
        <Button>{randomizedAnswers[1]}</Button>
        <Button>{randomizedAnswers[2]}</Button>
        <Button>{randomizedAnswers[3]}</Button>
      </div>
    )
  }

  flashcards = () => {
    const { flashcards } = this.props
    return flashcards.map(flashcard => {
      return (
        <div key={flashcard.id}>
          <Card>
            <CardHeader>{flashcard.language.toUpperCase()}</CardHeader>
            <CardBody>
              <CardTitle>{flashcard.difficulty.toUpperCase()}</CardTitle>
              <CardSubtitle>{flashcard.question}</CardSubtitle>
            </CardBody>
            <CardBody>
              {this.randomAnswers(flashcard)}
            </CardBody>
          </Card>
        </div>
      )
    })
  }

  render () {
    return (
      <React.Fragment>
        <div>
          <Button href="#languages">Languages</Button>
          <Button href="#datatype">Data Type</Button>
          <Button href="#difficulty">Difficulty</Button>
        </div>
        {this.flashcards()}
      </React.Fragment>
    );
  }
}
