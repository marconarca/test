import React, { useState } from 'react';
import classes from './Accordion.module.css';

const Accordion = ({ mission_name, launch_success, upcoming, details }) => {
  const [isToggle, setIsToggle] = useState(false);

  const tag = upcoming ? 'upcoming' : launch_success ? 'success' : 'failed';
  const color = upcoming ? 'yellow' : launch_success ? 'green' : 'red';

  const handleClick = () => {
    setIsToggle(!isToggle);
  };

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
        {isToggle && (
          <>
            <div className={classes.accordionInfo}>
              <span>13 years ago</span>
              <span>Article</span>
              <span>Video</span>
            </div>

            <div className={classes.accordionSummary}>
              <img
                src="https://mission-patch.com/assets/rocket-patch-9967ff4d11ce9226df330d0faf37477586991aa93081e5c23c496ef24a9c252a.png"
                alt="mission"
                height="100"
                width="100"
              />
              <p>{details}</p>
            </div>
          </>
        )}
        <button className="btn" onClick={handleClick}>
          View
        </button>
      </div>
    </li>
  );
};

export default Accordion;
