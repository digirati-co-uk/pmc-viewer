import React from 'react';
import bem from '@fesk/react-bem';
import Pagination from '../Pagination/Pagination';
import './Footer.scss';
import { RangeSlider, SearchBox } from '@canvas-panel/search';

export default bem(
  'pmc-footer',
  footer => ({
    Footer: footer,
    FooterSearch: footer.element('search'),
    FooterSlider: footer.element('slider'),
    FooterPagination: footer.element('Pagination'),
  }),
  ({ Footer, FooterSearch, FooterSlider, FooterPagination }) => (
    <Footer>
      <FooterSearch>
        <SearchBox />
      </FooterSearch>
      <FooterSlider>
        <RangeSlider />
      </FooterSlider>
      <FooterPagination>
        <Pagination />
      </FooterPagination>
    </Footer>
  )
);
