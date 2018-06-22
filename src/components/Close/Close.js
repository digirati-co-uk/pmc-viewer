import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './Close.scss';

class Close extends Component {
  render() {
    const { onClose, bem } = this.props;
    return (
      <div className={bem} onClick={onClose}>
        <svg width="34" height="34" xmlns="http://www.w3.org/2000/svg">
          <g
            transform="translate(1 1)"
            stroke="#FFF"
            fill="none"
            fillRule="evenodd"
          >
            <g strokeOpacity=".9">
              <path d="M20.646 11.354l-9.293 9.293M20.646 20.646l-9.293-9.293" />
            </g>
            <circle cx="16" cy="16" r="16" />
          </g>
        </svg>
      </div>
    );
  }
}

export default withBemClass('close-icon')(Close);
