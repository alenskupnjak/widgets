import React, { useState } from 'react';

const Accordian = (props) => {
  const to = useState(null);
  console.log(to);

  const [activeIndex, setActiveIndex] = useState(null);

  console.log(setActiveIndex.name);

  const onTitleClick = (e, index) => {
    console.log(e, 'Title clicked', index);
    setActiveIndex(index);
  };

  const renderItems = props.items.map((item, index) => {
    console.log(index, activeIndex);

    const active = index === activeIndex ? 'active' : '';
    console.log(active);

    return (
      <React.Fragment key={index}>
        <div
          className={'title ' + active}
          onClick={(e) => onTitleClick(e, index)}
        >
          ;<i className="dropdown icon"></i>
          {item.title}
        </div>
        <div className={'content ' + active}>
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled accordion">{renderItems}</div>;
};

export default Accordian;
