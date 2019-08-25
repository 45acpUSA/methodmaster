import React from "react"

export default class LanguageSelector extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div id="javascriptBox">
          <a href="#flashcards/languages/javascript">Javascript</a>
        </div>
        <div id="rubyBox">
          <a href="#flashcards/languages/ruby">Ruby</a>
        </div>
        <div id="pythonBox">
          <a href="#flashcards/languages/python">Python</a>
        </div>
        <div id="cPlusPlusBox">
          <a href="#flashcards/languages/cplusplus">C++</a>
        </div>
      </React.Fragment>
    );
  }
}
