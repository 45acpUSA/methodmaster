import React from "react"
import PropTypes from "prop-types"
import { Link } from 'react-router-dom'
import { Button, Card, CardHeader, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, FormGroup, Input, Label } from 'reactstrap'

export default class Flashcards extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      attributes: {
        language: '',
        dataType: '',
        difficulty: '',
      }
    }
  }

  handleChange = event =>{
    const { attributes } = this.state
    const { flashcards } = this.props
    attributes[event.target.name] = event.target.value
    this.setState({ attributes })
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
    return(
      <div>
        <Button>{randomizedAnswers[0]}</Button>
        <Button>{randomizedAnswers[1]}</Button>
        <Button>{randomizedAnswers[2]}</Button>
        <Button>{randomizedAnswers[3]}</Button>
      </div>
    )
  }

  allCards = () => {
    const { flashcards } =this.props
    return flashcards.map(flashcard => {
      return(
        <div key={flashcard.id}>
          <Card>
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
    })
  }

  filteredFlashcards = () => {
    const { flashcards } = this.props
    const { language, dataType, difficulty } = this.state.attributes
    return flashcards.map(flashcard => {
      if (
        language.toLowerCase() === flashcard.language.toLowerCase() &&
        dataType.toLowerCase() === flashcard.data_type.toLowerCase() &&
        difficulty.toLowerCase() === flashcard.difficulty.toLowerCase() )
      {
        return(
          <div key={flashcard.id}>
            <Card>
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
    const { attributes } = this.state
    return (
      <React.Fragment>
        <div>
          <FormGroup>
            <Label for="language">Language</Label>
            <Input 
              type="select" 
              name="language" 
              onChange={this.handleChange}
              value = {attributes.language}
            >
              <option>Select...</option>
              <option>JavaScript</option>
              <option>Ruby</option>
              <option>Python</option>
              <option>C++</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="dataType">Data Type</Label>
            <Input 
              type="select" 
              name="dataType" 
              onChange={this.handleChange}
              value = {attributes.dataType}
            >
              <option>Select...</option>
              <option>String</option>
              <option>Number</option>
              <option>Array</option>
              <option>Regex</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <Label for="difficulty">Difficulty</Label>
            <Input 
              type="select" 
              name="difficulty" 
              onChange={this.handleChange}
              value = {attributes.difficulty}
            >
              <option>Select...</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </Input>
          </FormGroup>

        </div>
        <br />
        <br />
        <br />
        {(attributes.language.length === 0 && attributes.dataType.length === 0 && attributes.difficulty.length === 0) &&
          <div>
            {this.allCards()}
          </div>
        }
        {(attributes.language.length > 0 || attributes.dataType.length > 0 || attributes.difficulty.length > 0) &&
          <div>
            {this.filteredFlashcards()}
          </div>
        }
      </React.Fragment>
    );
  }
}
