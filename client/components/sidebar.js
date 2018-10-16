import React from 'react';

const Sidebar = (props) => {
  return (
    <div id="sidebar">
    {
      props.map(elem => {
        return (<li key={elem}>{elem}</li>)
      })
    }
    </div>
  )
}

export default Sidebar;
