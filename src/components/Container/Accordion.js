import React from 'react';
import classes from './Accordion.module.css';

const Accordion = ({ mission_name, launch_success, upcoming }) => {
  const tag = upcoming ? 'upcoming' : launch_success ? 'success' : 'failed';
  const color = upcoming ? 'yellow' : launch_success ? 'green' : 'red';

  return (
    <li className={classes.accordion}>
      <div className={classes.accordionHeader}>
        <h3>{mission_name}</h3>
        <span
          className={classes.tag}
          style={{ backgroundColor: color, color: '#fff' }}
        >
          {tag}
        </span>
      </div>

      <div className="accordionBody">
        <button className="btn">View</button>
      </div>
    </li>
  );
};

export default Accordion;
