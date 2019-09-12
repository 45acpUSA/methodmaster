import React from "react"
import '../../assets/stylesheets/NewFlashcard.scss'
import { Link, Redirect } from 'react-router-dom'
import { Button, FormGroup, Label, Input } from 'reactstrap'

export default class NewFlashcard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      attributes: {
        language: '',
        data_type: '',
        difficulty: '',
        question: '',
        correct_answer: '',
        incorrect_answer1: '',
        incorrect_answer2: '',
        incorrect_answer3: '',
      },
      success: false,
    }
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
  }

  handleChange = event =>{
    const { attributes } = this.state  
    attributes[event.target.name] = event.target.value
    this.setState({ attributes })
  }

  handleClearForm = event => {
    event.preventDefault()
    this.setState({ 
      attributes: {
        language: '',
        data_type: '',
        difficulty: '',
        question: '',
        correct_answer: '',
        incorrect_answer1: '',
        incorrect_answer2: '',
        incorrect_answer3: ''
      }
    })
}

handleFormSubmit = event => {
  event.preventDefault()
  const { attributes, success } = this.state

  fetch("/users/:user_id/flashcards.json", {
    method: "POST",
    body: JSON.stringify(attributes),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
  .then(response => {
    response.json()
    .then(data => {
      console.log("Successful" + data)
    })
  })

  let redirect = success === false ? true : false
  this.setState({ success: redirect })
}

  render () {
    const { attributes, success } = this.state
    const { currentUser } = this.props
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-md-4" id="entireForm">
            <h1 id="title">New Flashcard</h1>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="language">Language</Label>
                <Input
                  type="select" 
                  name="language"
                  onChange={ this.handleChange }
                  value={ attributes.language }
                >
                  <option>Select...</option>
                  <option>JavaScript</option>
                  <option>Ruby</option>
                  <option>Python</option>
                  <option>C++</option>
                </Input>
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="data_type">Data Type</Label>
                <Input
                  type="select" 
                  name="data_type"
                  onChange={this.handleChange}
                  value = {attributes.data_type}
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
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="difficulty">Difficulty</Label>
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
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="question">Question</Label>
                <Input
                  type="textarea" 
                  name="question"
                  onChange={this.handleChange}
                  value = {attributes.question}
                  className="form-control"
                />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="correct_answer">Correct Answer</Label>
                <Input
                  type="textarea" 
                  name="correct_answer"
                  onChange={this.handleChange}
                  value = {attributes.correct_answer}
                  className="form-control"
                  />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="incorrect_answer1">First Incorrect Answer</Label>
                <Input 
                  type="textarea" 
                  name="incorrect_answer1"
                  onChange={this.handleChange}
                  value = {attributes.incorrect_answer1}
                  className="form-control"
                  />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="incorrect_answer2">Second Incorrect Answer</Label>
                <Input 
                  type="textarea" 
                  name="incorrect_answer2"
                  onChange={this.handleChange}
                  value = {attributes.incorrect_answer2}
                  className="form-control"
                  />
              </div>
            </FormGroup>
            <FormGroup className="form-horizontal">
              <div className="form-group">
                <Label className="control-label" for="incorrect_answer3">Third Incorrect Answer</Label>
                <Input 
                  type="textarea" 
                  name="incorrect_answer3"
                  onChange={this.handleChange}
                  value = {attributes.incorrect_answer3}
                  className="form-control"
                  />
                </div>
            </FormGroup>
            
            <Button id="newCardSaveButton" color="primary" onClick={ this.handleFormSubmit }>Save</Button>
            <Button id="newCardClearButton" color="secondary" onClick={ this.handleClearForm }>Clear</Button>
            <br />
            <br />
            <hr />
            <div>
              <Link to={`/users/${currentUser.id}/flashcards`}>Return to My Flashcards</Link>
            </div>
            <div>
              <Link to='/#'>Return to My Profile</Link>
            </div>
            {success &&
              <Redirect to={`/users/${currentUser.id}/flashcards`} />
            }
          </div>
        </div>
      </React.Fragment>
    );
  }
}
