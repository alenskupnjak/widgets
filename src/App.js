import React, { useState } from 'react';
import Accordian from './components/Accordian';
import Search from './components/Search';
import Dropdown from './components/Dropdown';
import Translate from './components/Translate';
import Route from './components/Route';
import Header from './components/Header';

const items = [
  {
    title: 'What is React?',
    content: 'React is a front end javascript framework',
  },
  {
    title: 'Why use React?',
    content: 'React is a favorite JS library among engineers',
  },
  {
    title: 'How do you use React?',
    content: 'You use React by creating components',
  },
];

const options = [
  {
    label: 'The Color Red',
    value: 'red',
  },
  {
    label: 'The Color Green',
    value: 'green',
  },
  {
    label: 'A Shade of Blue',
    value: 'blue',
  },
];

function App() {
  const [selected, setSelected] = useState(options[0]);
  const [showDropdown, setShowDropdown] = useState(true);

  return (
    <React.Fragment>
      <Header></Header>

      <Route path="/">
        <Accordian items={items}></Accordian>
      </Route>

      <Route path="/list">
        <Search></Search>
      </Route>

      <Route path="/dropdown">
        <button onClick={() => setShowDropdown(!showDropdown)}>
          Toggle Dropdown
        </button>
        {showDropdown ? (
          <Dropdown
            label="Select a color"
            selected={selected}
            onSelectedChange={setSelected}
            options={options}
          ></Dropdown>
        ) : null}
      </Route>

      <Route path="/translate">
        <Translate></Translate>
      </Route>
      
    </React.Fragment>
  );
}

export default App;
