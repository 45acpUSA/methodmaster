import React from "react"

export default class LanguageSelector extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div href="#flashcards/languages/javascript" id="javascriptBox">
          <h3>Javascript</h3>
        </div>
        <div href="#flashcards/languages/ruby" id="rubyBox">
          <h3>Ruby</h3>
        </div>
        <div href="#flashcards/languages/python" id="pythonBox">
          <h3>Python</h3>
        </div>
        <div href="#flashcards/languages/cplusplus" id="cPlusPlusBox">
          <h3>C++</h3>
        </div>
      </React.Fragment>
    );
  }
}
