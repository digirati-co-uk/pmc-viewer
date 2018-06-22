import React, { Component } from 'react';
import { withBemClass } from '@canvas-panel/core';
import './Controls.scss';

class Controls extends Component {
  render() {
    const {
      bem,
      onZoomIn,
      onZoomOut,
      isFullscreen,
      onFullscreen,
      fullscreenEnabled = false,
    } = this.props;
    return (
      <nav className={bem.modifiers({ active: true })}>
        <button
          onClick={onZoomIn}
          className={`${bem.element('control').modifier('zoom-in')}`}
        >
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#FEFEFE" fill="none" fillRule="evenodd">
              <path d="M6 0v12M0 6h12" />
            </g>
          </svg>
        </button>
        <button
          onClick={onZoomOut}
          className={`${bem.element('control').modifier('zoom-out')}`}
        >
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 6h12" stroke="#FFF" fill="none" fillRule="evenodd" />
          </svg>
        </button>
        {fullscreenEnabled ? (
          <button
            onClick={onFullscreen}
            className={`${bem
              .element('control')
              .modifier('fullscreen')} material-icons`}
          >
            {isFullscreen ? 'close' : 'fullscreen'}
          </button>
        ) : null}
      </nav>
    );
  }
}

export default withBemClass('viewer-controls')(Controls);
