import React, { Component } from 'react';
import { connect } from 'react-redux';
import Title from '../Title/Title';
import Close from '../Close/Close';
import ControlBar from '../ControlBar/ControlBar';
import Controls from '../Controls/Controls';
import Pager from '../Pager/Pager';
import IIIFLink from '../IIIFLink/IIIFLink';

let leftPad = n => (n <= 999 ? ('00' + n).slice(-3) : n);

class Header extends Component {
  getCurrentPage() {
    const { currentCanvas, totalCanvases } = this.props;
    return `Page ${leftPad(currentCanvas + 1)} of ${leftPad(totalCanvases)}`;
  }

  render() {
    const { viewport, onClose, id } = this.props;
    return (
      <div style={{ position: 'relative' }}>
        <Title>{this.props.label}</Title>
        {onClose ? <Close onClose={onClose} /> : null}
        <ControlBar>
          <ControlBar.Left>
            <Pager>{this.getCurrentPage()}</Pager>
          </ControlBar.Left>
          <ControlBar.Right>
            {viewport ? (
              <Controls
                onZoomIn={() => viewport.zoomIn()}
                onZoomOut={() => viewport.zoomOut()}
              />
            ) : null}
            {id ? <IIIFLink manifest={id} /> : null}
          </ControlBar.Right>
        </ControlBar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    id: state.manifest.jsonLd ? state.manifest.jsonLd['@id'] : null,
    label: state.manifest.jsonLd ? state.manifest.jsonLd.label : '',
    // canvasLabel: state.canvas
    //   ? state.canvas.jsonLd ? state.canvas.jsonLd.label : ''
    //   : '',
    canvasLabel: state.canvas ? state.canvas.getLabel() : '',
    currentCanvas: state.manifest ? state.manifest.currentCanvas : null,
    totalCanvases: state.manifest.jsonLd
      ? state.manifest.jsonLd.sequences[0].canvases.length
      : null,
  };
}

export default connect(mapStateToProps)(Header);
