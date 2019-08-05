import React from "react"
import PropTypes from "prop-types"
import { Button, Card, CardHeader, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap'

export default class MyFlashcards extends React.Component {
  // constructor(props){
  //   super(props)
  //   const { match } = this.props
  //   this.state = {
  //     userId: match.params.id,
  //   }
  // }

  // componentDidUpdate = prevProps => {
  //   const prevMatch = prevProps.match
  //   const { match } = this.props
  //   if (match.params.id != prevMatch.params.id) {
  //     this.setState({ userId: match.params.id })
  //   }
  // }
  
  myFlashcards = () => {
    const { flashcards } = this.props
    return flashcards.map(flashcard => {
        return (
          <div key={flashcard.id}>
            <Card>
              <CardHeader>{flashcard.language.toUpperCase()}</CardHeader>
              <CardBody>
                <CardTitle>{flashcard.question}</CardTitle>
                <CardSubtitle>{flashcard.difficulty.toUpperCase()}</CardSubtitle>
              </CardBody>
              <CardBody>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <CardLink href="#">Card Link</CardLink>
                <CardLink href="#">Another Link</CardLink>
              </CardBody>
            </Card>
          </div>
        )
    })
  }
  
  render () {
    return (
      <React.Fragment>
        {this.myFlashcards()}
      </React.Fragment>
    );
  }
}
