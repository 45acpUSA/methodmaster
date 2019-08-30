import React from "react"
import { Button, Card, CardHeader, CardBody,
  CardTitle, CardSubtitle, FormGroup, Input, Label } from 'reactstrap'
import '../../assets/stylesheets/flashcards.scss'

export default class Flashcards extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      attributes: {
        language: '',
        dataType: '',
        difficulty: '',
      },
      count: 0,
    }
  }

  handleChange = event => {
    const { attributes } = this.state
    attributes[event.target.name] = event.target.value
    this.setState({ attributes })
  }

  handleClick = (flashcard, index, rand) => {
    const { count } = this.state
    if (flashcard.correct_answer.toLowerCase() == rand.toLowerCase()) {
      flashcard.success = true
      this.handleResponse(flashcard, index)
      this.setState(state => {
        return{
          count: state.count ++
        }
      })
    } else {
      flashcard.success = false
      this.handleResponse(flashcard, index)
      if (count > 0) {
        this.setState(state => {
          return{
            count: state.count --
          }
        })
      }
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
            color: 'green'
          }
        }
      })
      if (this.state.count < 5) {
        alert("Correct!")
      } else if (this.state.count >= 5 && this.state.count < 10) {
        alert("You're on a Roll!")
      }
      // return setTimeout(() => {return flashcards.splice(index, 1)}, 2000)
    } else if (flashcard.success === false) {
      this.setState(state => {
        return{
          style: {
            color: 'red'
          }
        }
      })
      alert(responses[randomNum()])
    }
    console.log(this.state.count)
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

  allCards = () => {
    const { flashcards } = this.props
    return flashcards.map(flashcard => {
      let style
      if (flashcard.success === true) {
        style = { color: 'green' }
      } else if (flashcard.success === false) {
        style = { color: 'red' }
      } else {
        style = { color: 'blue' }
      }
      return(
        <div key={flashcard.id}>
          <Card id="flashcard">
            <CardHeader style={ style } id="flashcardText">{flashcard.language.toUpperCase()}</CardHeader>
            <CardBody>
              <CardTitle style={ style } id="flashcardText">{flashcard.data_type.toUpperCase()}</CardTitle>
              <CardTitle style={ style } id="flashcardText">{flashcard.difficulty.toUpperCase()}</CardTitle>
              <CardSubtitle style={ style } id="flashcardText">{flashcard.question}</CardSubtitle>
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
        let style
        if (flashcard.success === true) {
          style = { color: 'green' }
        } else if (flashcard.success === false) {
          style = { color: 'red' }
        } else {
          style = { color: 'blue' }
        }
        return(
          <div key={flashcard.id}>
            <Card>
              <CardHeader style={ style } id="flashcardText">{flashcard.language.toUpperCase()}</CardHeader>
              <CardBody>
                <CardTitle style={ style } id="flashcardText">{flashcard.data_type.toUpperCase()}</CardTitle>
                <CardTitle style={ style } id="flashcardText">{flashcard.difficulty.toUpperCase()}</CardTitle>
                <CardSubtitle style={ style } id="flashcardText">{flashcard.question}</CardSubtitle>
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
        <div id="filterFormDiv">
          <FormGroup id="filterFormGroupLanguage">
            <Label for="language" id="filterForm">Language</Label>
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
          <FormGroup id="filterFormGroupDataType">
            <Label for="dataType" id="filterForm">Data Type</Label>
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
              <option>Object</option>
              <option>Math</option>
              <option>Date</option>
              <option>RegEx</option>
              <option>Operators</option>
              <option>Statements</option>
              <option>Boolean</option>
            </Input>
          </FormGroup>
          <FormGroup id="filterFormGroupDifficulty">
            <Label for="difficulty" id="filterForm">Difficulty</Label>
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
