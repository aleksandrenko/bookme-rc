import React from 'react';
import { storiesOf } from '@storybook/react';
// import { action } from '@storybook/addon-actions';

import Header from '../components/Header/Header';

const book = storiesOf('Header', module);

const mockData = {
  title: 'Book Me Title',
  subTitle: 'Here goes the subtitle',
  hasBackButton: true,
  showLoading: true
};
const mockHistory = {
  goBack: () => console.log('Back button clicked'),
  push: () => console.log('Redirect link clicked')
};

book.add('- with title and menu', () => <Header title={mockData.title} />);

book.add('- with title, menu and subtitle', () => (
  <Header title={mockData.title} subTitle={mockData.subTitle} />
));

book.add('- with title, menu and back button', () => (
  <Header title={mockData.title} history={mockHistory} hasBackButton />
));

book.add('- with title, menu and loader', () => (
  <Header title={mockData.title} showLoading={mockData.showLoading} />
));

book.add('- with title, without menu', () => (
  <Header title={mockData.title} showMenu={false} />
));

book.add('- with title and only About page in menu', () => (
  <Header
    title={mockData.title}
    history={mockHistory}
    showLogoutMenuItem={false}
  />
));

book.add('- with title and only Logout page in menu', () => (
  <Header
    title={mockData.title}
    history={mockHistory}
    showAboutMenuItem={false}
  />
));
