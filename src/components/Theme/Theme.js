import React, { Component } from 'react';
import { Bem } from '@canvas-panel/core';
import { Theme as FeskTheme } from '@fesk/react-bem';

class Theme extends Component {
  render() {
    const { children, ...props } = this.props;
    return (
      <Bem {...props}>
        <FeskTheme {...props}>{children}</FeskTheme>
      </Bem>
    );
  }
}

export default Theme;
