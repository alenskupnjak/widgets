import React, { useState, useEffect, useRef } from 'react';

const Dropdown = ({ selected, onSelectedChange, options, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Samo jednom se in icijalizira
  useEffect(() => {
    //
    const onBodyClick = (event) => {
      if (ref.current.contains(event.target)) {
        return;
      }
      setOpen(false);
    };

    document.body.addEventListener('click', onBodyClick, { capture: true });

    // clean
    return () => {
      document.body.removeEventListener('click', onBodyClick, {
        capture: true,
      });
    };
  }, []);

  // prepare for RENDER
  const renderOptions = options.map((data) => {
    if (selected.value === data.value) {
      return null;
    }
    return (
      <div
        key={data.value}
        className="item"
        onClick={() => {
          console.log('Item CLICKED', data);
          onSelectedChange(data);
        }}
      >
        {data.label}
      </div>
    );
  });

  console.log(ref.current);

  // RENDER
  return (
    <div ref={ref} className="ui form">
      <div className="field">
        <label className="label">{label}</label>
        <div
          onClick={() => {
            console.log('Dropdown CLICKED', open);

            setOpen(!open);
          }}
          className={`ui selection dropdown ${open ? 'visible active' : ''}`}
        >
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderOptions}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
