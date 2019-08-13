import React from "react"
import { Button, Card, CardHeader, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap'

export default class MyFlashcards extends React.Component {
  
  myFlashcards = () => {
    const { currentUser, flashcards } = this.props
    return flashcards.map(flashcard => {
      if (flashcard.user_id == currentUser.id) {
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
      }
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
