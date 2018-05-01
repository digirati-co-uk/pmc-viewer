import React from 'react';
import { render } from 'react-dom';
import { htmlElementObserver, ObservableElement } from '@canvas-panel/core';
import App from './App';
import PmcViewerPopOutComponent from './components/PmcViewerComponent/PmcViewerComponent';
import createStore from './createStore';
import { Provider } from 'react-redux';

const storeCache = {};
function getStoreFromCache(manifestId) {
  if (!storeCache[manifestId]) {
    storeCache[manifestId] = createStore();
  }
  return storeCache[manifestId];
}

function isValidElement($el) {
  const manifest = $el.getAttribute('data-manifest');
  if (!manifest.trim()) {
    return false;
  }
  return true;
}

function createPmcViewerComponent($viewer) {
  if (!isValidElement($viewer)) {
    return null;
  }
  const initialProps = { ...$viewer.dataset };
  const innerText = $viewer.innerText;
  const store = getStoreFromCache(initialProps.manifest);

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
    const store = getStoreFromCache(manifest);

    render(
      <Provider store={store}>
        <App manifest={$viewer.getAttribute('data-manifest')} />
      </Provider>,
      $viewer
    );
  });
});
