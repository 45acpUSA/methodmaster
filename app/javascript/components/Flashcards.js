import React from "react"
import { Link } from 'react-router-dom'
import { Button, Card, CardHeader, CardBody,
  CardTitle, CardSubtitle, FormGroup, Input, Label } from 'reactstrap'

export default class Flashcards extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      attributes: {
        language: '',
        dataType: '',
        difficulty: '',
      },
      style: {
        backgroundColor: 'blue',
      },
      correctCount: 0,
      incorrectCount: 0,
    }
  }

  handleChange = event => {
    const { attributes } = this.state
    attributes[event.target.name] = event.target.value
    this.setState({ attributes })
  }

  // handleClick = (flashcard, rand) => {
  //   if (flashcard.correct_answer.toLowerCase() == rand.toLowerCase()) {
  //     return (
  //       this.setState({
  //         correctCount: this.state.correctCount ++,
  //         style: {
  //           background-color: #008000,
  //         }
  //       })
  //     )
  //   } else {
  //     return (
  //       this.setState({
  //         incorrectCount: this.state.incorrectCount ++,
  //         style: {
  //           background-color: #FF0000,
  //         }
  //       })
  //     )
  //   }
  // }


  handleClick = (flashcard, index, rand) => {
    if (flashcard.correct_answer.toLowerCase() == rand.toLowerCase()) {
      flashcard.success = true
      console.log(flashcard.success)
      this.handleResponse(flashcard)
    } else {
      flashcard.success = false
      this.handleResponse(flashcard)
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
      } else if (this.state.correctCount < 10) {
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

  // handleCorrectCount = prevState => {
  //   const { correctCount } = this.state
  //   const { match } = this.props
  //   const prevMatch = prevState.match
  //   if (match.params.correctCount != prevMatch.params.correctCount) {
  //     alert('Correct!')
  //   } else if (correctCount >= 5) {
  //     alert("You're on a roll!")
  //   }
  // }

  // handleIncorrectCount = prevState => {
  //   const { match } = this.props
  //   const prevMatch = prevState.match
  //   if (match.params.incorrectCount != prevMatch.params.incorrectCount) {
  //     alert('Not Quite')
  //   }
  // }

  // languageOptions = () => {
  //   const { flashcards } = this.props
  //   return flashcards.all_languages.map(language => {
  //     return(
  //       <option>{language}</option>
  //     )
  //   })
  // }

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
      let style = flashcard.success !== null ? this.state.style : { backgroundColor: 'blue' }
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
              <option>Object</option>
              <option>Math</option>
              <option>Date</option>
              <option>RegEx</option>
              <option>Operators</option>
              <option>Statements</option>
              <option>Boolean</option>
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
