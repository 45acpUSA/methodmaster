import React from "react"
import '../../assets/stylesheets/MyFlashcards.scss'
import { Button, Card, CardHeader, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap'

export default class MyFlashcards extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      myFlashcards: [],
      style: {
        backgroundColor: 'blue',
      },
      correctCount: 0,
      incorrectCount: 0,
    }
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount = () => {
    fetch('/users/:user_id/flashcards.json')
      .then(resp => resp.json())
      .then(data => this.setState({ myFlashcards: data }))
  }

  handleDelete = flashcard => {
    console.log(flashcard.id)
    fetch(`/flashcards/${flashcard.id}`, {
      method: "DELETE"
    })
    .then(response => {
      response.json()
    })
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
          <Button onClick={() => {this.handleClick(flashcard, rand)} }> {rand} </Button>
        </div>
      )
    })
  }
  
  myFlashcards = () => {
    const { myFlashcards } = this.state
    const { currentUser } = this.props
    return myFlashcards.map(flashcard => {
      if (flashcard.user_id == currentUser.id) {
        return (
          <Card key={flashcard.id}>
            <CardHeader>{flashcard.language.toUpperCase()}</CardHeader>
            <CardBody>
              <CardTitle>{flashcard.data_type.toUpperCase()}</CardTitle>
              <CardTitle>{flashcard.difficulty.toUpperCase()}</CardTitle>
              <CardSubtitle>{flashcard.question}</CardSubtitle>
            </CardBody>
            <CardBody>
              {this.randomAnswers(flashcard)}
            </CardBody>
            <br />
            <hr />
            <Button id="myCardEditButton" color="primary">Edit</Button>
            <Button id="myCardDeleteButton" color="danger" onClick={() => this.handleDelete(flashcard)}>Delete</Button>
          </Card>
        )
      }
    })
  }
  
  render () {
    const { currentUser, userSignInRoute } = this.props
    return (
      <React.Fragment>
        {currentUser && 
          this.myFlashcards()
        }
        {!currentUser &&
          <div>
            <h3>Whoa, you're not logged in! Please Log In to see your cards!</h3>
            <a href={ userSignInRoute }> Log In </a>
          </div>
        }
      </React.Fragment>
    );
  }
}
