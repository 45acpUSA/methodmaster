import React from "react"
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
  }

  handleChange = event =>{
    const { attributes } = this.state  
    attributes[event.target.name] = event.target.value
    this.setState({ attributes })
  }

  handleNewFlashcard = () => {
    const { success } = this.state
    const { handleNewFlashcard } = this.props
    handleNewFlashcard(this.state.attributes)
    let redirect = success === false ? true : false
    this.setState({ success: redirect })
  }

  render () {
    const { attributes, success } = this.state
    const { currentUser } = this.props
    return (
      <React.Fragment>
        <h1>New Flashcard</h1>
        <FormGroup>
          <Label for="language">Language</Label>
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
        </FormGroup>
        <FormGroup>
          <Label for="data_type">Data Type</Label>
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
        <FormGroup>
          <Label for="question">Question</Label>
          <Input
            type="text" 
            name="question"
            onChange={this.handleChange}
            value = {attributes.question}
          />
        </FormGroup>
        <FormGroup>
          <Label for="correct_answer">Correct Answer</Label>
          <Input
            type="text" 
            name="correct_answer"
            onChange={this.handleChange}
            value = {attributes.correct_answer}
          />
        </FormGroup>
        <FormGroup>
          <Label for="incorrect_answer1">First Incorrect Answer</Label>
          <Input 
            type="text" 
            name="incorrect_answer1"
            onChange={this.handleChange}
            value = {attributes.incorrect_answer1}
          />
        </FormGroup>
        <FormGroup>
          <Label for="incorrect_answer2">Second Incorrect Answer</Label>
          <Input 
            type="text" 
            name="incorrect_answer2"
            onChange={this.handleChange}
            value = {attributes.incorrect_answer2}
          />
        </FormGroup>
        <FormGroup>
          <Label for="incorrect_answer3">Third Incorrect Answer</Label>
          <Input 
            type="text" 
            name="incorrect_answer3"
            onChange={this.handleChange}
            value = {attributes.incorrect_answer3}
          />
        </FormGroup>
        
        <div>
          <Button onClick={ this.handleNewFlashcard }>Save</Button>
          <Link to={`/users/${currentUser.id}/flashcards`}>Cancel</Link>
        </div>

        {success &&
          <Redirect to={`/users/${currentUser.id}/flashcards`} />
        }
      </React.Fragment>
    );
  }
}
