import React, { Component } from 'react';

export const CountrySelect = () => {
  return (
    <div className="select-style">
      <label id="choiceLabel">
          Select a Country
          <select className="select" name="country" value={this.state.country} onChange={this.handleSelectChange}>
              <option default>Select...</option>
              <option value="au">Australia</option>
              <option value="br">Brazil</option>
              <option value="ca">Canada</option>
              <option value="cn">China</option>
              <option value="de">Germany</option>
              <option value="in">India</option>
              <option value="kr">Korea, Republic of</option>
              <option value="za">South Africa</option>
              <option value="gb">United Kingdom</option>
              <option value="us">United States of America</option>
          </select>
      </label>
    </div>
  )
}
