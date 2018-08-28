import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import List from '../components/List/List';

const book = storiesOf('List', module);

book.add('- empty not crashing.', () => <List />);

book.add('- item with arrow.', () => {
  const mockdata = [
    { name: 'item1', id: 71 },
    { name: 'item2', id: 72 },
    { name: 'item3', id: 73 }
  ];

  return <List data={mockdata} hasArrow={true} labelKey="name" />;
});

book.add('- item with checkbox with click handler.', () => {
  const mockdata = [
    { label: 'item1', id: 81 },
    { label: 'item2', id: 82 },
    { label: 'item3', id: 83 }
  ];

  return (
    <List
      data={mockdata}
      hasCheckbox={true}
      labelKey="label"
      onItemClick={item => {
        action(`Item Clicked: ${item.label}`);
      }}
    />
  );
});

book.add('- item with checkboxLabel.', () => {
  const mockdata = [
    { label: 'item1', id: 61 },
    { label: 'item2', id: 62 },
    { label: 'item3', id: 63 }
  ];

  return (
    <List
      data={mockdata}
      hasCheckbox={true}
      checkboxLabel={{
        on: 'checked',
        off: 'unchecked'
      }}
      labelKey="label"
      onItemClick={item => {
        action(`Item Clicked: ${item.label}`);
      }}
    />
  );
});

book.add('- sectioned list.', () => {
  const mockdata = [
    {
      name: 'Floor1',
      children: [
        { name: 'item1', id: 91 },
        { name: 'item2', id: 92 },
        { name: 'item3', id: 93 }
      ]
    },
    {
      name: 'Floor12',
      children: [
        { name: 'item1', id: 94 },
        { name: 'item2', id: 95 },
        { name: 'item3', id: 96 }
      ]
    }
  ];

  return (
    <List
      data={mockdata}
      hasCheckbox={true}
      childrenCollection="children"
      labelKey="name"
      onItemClick={item => {
        action(`Item Clicked: ${item.label}`);
      }}
    />
  );
});
