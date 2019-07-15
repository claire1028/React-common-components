import React from 'react';
import {useState, useEffect} from 'react';
import PropTypes from 'prop-types';

export default function Tabs(props) {
  const [activeId, setActiveid] = useState(0);
  const tabCts = [];

  const switchClick = (index) => {
    setActiveid(index);
  }

  return(
    <div className="tab-wrapper">
      {React.Children.map(props.children, (el, index) => {
        tabCts.push(el.props.children);
        return React.cloneElement(el, 
          {...el.props, 
            id: index,
            switchClick: switchClick,
            className: index === activeId ? 'active' : ''
          }, 
          el.props.children)
      })}
      <div className="tab-content">
        {
          tabCts.map((el, index) => 
            <div
              key={index}
              className={`cnt ${index === activeId ? 'active' : ''}`}
            >
            {el}
            </div>
          )
        }
      </div>
    </div>
  )
}

export function Tab(props) {
  return (
    <div 
      className={`header ${props.className}`}
      onClick={() => props.switchClick(props.id)}
    >
    {props.title}
    </div>
  )
}

Tab.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  className: PropTypes.string
}
