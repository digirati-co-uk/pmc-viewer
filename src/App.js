import React, { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { manifestRequest } from '@canvas-panel/redux/es/spaces/manifest';
import Layout from './components/Layout/Layout';
import Viewer from './components/Viewer/Viewer';
import { connect } from 'react-redux';
import Theme from './components/Theme/Theme';

class App extends Component {
  viewport = null;
  state = { viewportAvailable: false };

  setViewport = viewport => {
    this.viewport = viewport;
    this.setState({ viewportAvailable: true });
  };

  componentDidMount() {
    this.props.dispatch(
      manifestRequest(this.props.manifest, 'en-GB', {
        startCanvas:
          this.props.startCanvas === 0 ? 0 : this.props.startCanvas || 2,
      })
    );
  }

  handleClickAnnotation = anno => {
    window.location = anno['@id'];
  };

  configureTheme() {
    const { cssPrefix, cssClassMap } = this.props;

    const themeProps = {};
    if (cssPrefix) {
      themeProps.prefix = cssPrefix;
    }
    if (cssClassMap) {
      themeProps.cssClassMap = JSON.parse(cssClassMap);
    }

    return themeProps;
  }

  render() {
    const {
      onClose,
      onClickAnnotation = this.handleClickAnnotation,
    } = this.props;
    const { viewportAvailable } = this.state;
    return (
      <Theme {...this.configureTheme()}>
        <Layout style={{ background: '#2D3135' }}>
          <Layout.Header>
            <Header
              onClose={onClose}
              viewport={viewportAvailable ? this.viewport : null}
            />
          </Layout.Header>
          <Layout.Main>
            <Viewer
              onClickAnnotation={onClickAnnotation}
              setViewport={this.setViewport}
            />
          </Layout.Main>
          <Layout.Footer>
            <Footer />
          </Layout.Footer>
        </Layout>
      </Theme>
    );
  }
}

export default connect()(App);
