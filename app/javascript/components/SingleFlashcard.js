import React from "react"
import PropTypes from "prop-types"

export default class SingleFlashcard extends React.Component {
  constructor(props){
    super(props)
    const { match } = this.props
    this.state = {
      flashardId: match.params.id,
    }
  }

  componentDidUpdate = prevProps => {
    const prevMatch = prevProps.match
    const { match } = this.props
    if (match.params.id != prevMatch.params.id) {
      this.setState({ flashcardId: match.params.id })
    }
  }

  

  render () {
    const { flashcards } = this.props
    const flashcard = flashcards.find(flashcard => flashcard.id == flashcardId)
    return (
      <React.Fragment>
      </React.Fragment>
    );
  }
}
