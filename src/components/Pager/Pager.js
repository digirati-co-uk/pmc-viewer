import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './Pager.scss';

class Pager extends Component {
  render() {
    const { bem } = this.props;
    return <div className={bem}>{this.props.children}</div>;
  }
}

export default withBemClass('pager')(Pager);
