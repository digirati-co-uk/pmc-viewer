import React from 'react';
import { render } from 'react-dom';
import { htmlElementObserver, ObservableElement } from '@canvas-panel/core';
import App from './App';
import PmcViewerPopOutComponent from './components/PmcViewerComponent/PmcViewerComponent';
import createStore from './createStore';
import { Provider } from 'react-redux';

if (process.env.NODE_ENV !== 'production') {
  require('@fesk/plugin-micro-site/lib/js');
  require('./scss/styles.scss');
}

const storeCache = {};
function getStoreFromCache(manifestId, initialSearch) {
  if (!storeCache[manifestId + initialSearch]) {
    storeCache[manifestId + initialSearch] = createStore({ initialSearch });
  }
  return storeCache[manifestId + initialSearch];
}

function isValidElement($el) {
  const manifest = $el.getAttribute('data-manifest');
  return !!manifest.trim();
}

function createPmcViewerComponent($viewer) {
  if (!isValidElement($viewer)) {
    return null;
  }
  const initialProps = { ...$viewer.dataset };
  const innerText = $viewer.innerText;
  const store = getStoreFromCache(
    initialProps.manifest,
    initialProps.initialSearch || null
  );

  render(
    <ObservableElement
      observer={htmlElementObserver($viewer)}
      initialProps={initialProps}
      render={props =>
        props.manifest ? (
          <Provider store={store}>
            <PmcViewerPopOutComponent
              {...props}
              text={innerText}
              getRef={osd => ($viewer.osd = osd)}
            />
          </Provider>
        ) : null
      }
    />,
    $viewer
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const popup = Array.from(
    document.querySelectorAll('[data-element="pmc-viewer-pop-out"]')
  );

  popup.forEach($popOut => {
    try {
      createPmcViewerComponent($popOut);
    } catch (e) {
      console.warn('Unable to render viewer', e);
    }
  });

  const viewers = Array.from(
    document.querySelectorAll('[data-element="pmc-viewer"]')
  );

  viewers.forEach($viewer => {
    if (!isValidElement($viewer)) {
      return null;
    }
    const manifest = $viewer.getAttribute('data-manifest');
    const initialSearch = $viewer.getAttribute('data-initial-search') || null;
    const store = getStoreFromCache(manifest, initialSearch);

    render(
      <Provider store={store}>
        <App {...$viewer.dataset} />
      </Provider>,
      $viewer
    );
  });
});
