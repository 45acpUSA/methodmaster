import React from "react"
import PropTypes from "prop-types"
import { Button, Card, CardHeader, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle } from 'reactstrap'

export default class Flashcards extends React.Component {

  flashcards = () => {
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
