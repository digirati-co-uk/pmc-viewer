import React, { Component } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { manifestRequest } from '@canvas-panel/redux/es/spaces/manifest';
import Layout from './components/Layout/Layout';
import Viewer from './components/Viewer/Viewer';
import { connect } from 'react-redux';
import Theme from './components/Theme/Theme';
import { search } from '@canvas-panel/search';
import { waitAndSearch } from './createStore';
import { isExternalLinkAnnotation } from './utils';

class App extends Component {
  viewport = null;
  state = { viewportAvailable: false };

  static defaultProps = { searchQuery: null };

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

  componentWillMount() {
    if (this.props.initialSearch) {
      waitAndSearch(this.props.store, this.props.initialSearch);
    }
  }

  componentWillReceiveProps(newProps, newContext) {
    if (newProps.searchQuery !== this.props.searchQuery) {
      waitAndSearch(this.props.store, newProps.searchQuery);
    }
  }

  handleClickAnnotation = anno => {
    const url = anno['@id'];
    if (isExternalLinkAnnotation(anno)) {
      Object.assign(document.createElement('a'), {
        target: '_blank',
        href: anno['@id'],
      }).click();
    } else {
      window.location = anno['@id'];
    }
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
        <Layout>
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
