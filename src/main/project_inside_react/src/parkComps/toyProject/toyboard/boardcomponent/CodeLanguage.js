import React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import ReactDOM from 'react-dom';

import options from './LanguageData';

import 'react-bootstrap-typeahead/css/Typeahead.css';
import '../../layout/toyStyles.css';

function codeLanguage(option, state) {
  if (state.selected.length) {
    return true;
  }
  return option.label.toLowerCase().indexOf(state.text.toLowerCase()) > -1;
}

const ToggleButton = ({ isOpen, onClick }) => (
  <button
    className="toggle-button"
    onClick={onClick}
    onMouseDown={(e) => {
      // Prevent input from losing focus.
      e.preventDefault();
    }}>
    {isOpen ? '▲' : '▼'}
  </button>
);

const TypeaheadExample = () => (
  <Typeahead
    filterBy={codeLanguage}
    id="toggle-example"
    options={options}
    placeholder="Choose a state...">
    {({ isMenuShown, toggleMenu }) => (
      <ToggleButton isOpen={isMenuShown} onClick={(e) => toggleMenu()} />
    )}
  </Typeahead>
);

ReactDOM.render(<TypeaheadExample />, document.getElementById('root'));

export default codeLanguage;
