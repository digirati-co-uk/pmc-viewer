import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './Close.scss';

class Close extends Component {
  render() {
    const { onClose, bem } = this.props;
    return (
      <div className={bem} onClick={onClose}>
        &times;
      </div>
    );
  }
}

export default withBemClass('close-icon')(Close);
