import React from 'react';

const PIIForm = (props) => {
  return (
    <div>
      <input type="radio" name="gender" id="g1" value="m" onClick={props.handleGenderChange} /><label>Male</label>
      <input type="radio" name="gender" id="g2" value="f" onClick={props.handleGenderChange} /><label>Female</label>
    </div>
  )
}

export default PIIForm;
