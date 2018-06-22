import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  manifestNextCanvas,
  manifestPrevCanvas,
} from '@canvas-panel/redux/es/spaces/manifest';
import { withBemClass } from '@canvas-panel/core';
import './Pagination.scss';

class Pagination extends Component {
  render() {
    const { dispatch, bem } = this.props;

    return (
      <nav className={bem}>
        <button
          onClick={() => dispatch(manifestPrevCanvas())}
          className={bem.element('button').modifier('previous')}
        >
          <svg width="8" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.5 10l-5-5.001L6.499 0"
              stroke="#FFF"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>
        <button
          onClick={() => dispatch(manifestNextCanvas())}
          className={bem.element('button').modifier('next')}
        >
          <svg width="8" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.5 0l5 5.001L1.503 10"
              stroke="#FFF"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
        </button>
      </nav>
    );
  }
}

export default connect()(withBemClass('pagination')(Pagination));
