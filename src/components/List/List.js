import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.css';

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: {}
    };
  }

  _getSectionedItems = props => {
    const {
      data = [],
      childrenCollection,
      labelKey,
      onItemClick,
      hasArrow,
      hasCheckbox
    } = props;

    const getSectionLi = (item, props) => {
      const { labelKey } = props;

      return (
        <li key={`section-${item[labelKey]}`} className="section">
          {item[labelKey]}
        </li>
      );
    };

    const getItemLi = (item, props) => {
      const { labelKey, onItemClick, hasArrow, hasCheckbox } = props;
      const classNames = `item ${hasArrow ? 'arrow-right' : ''}`;

      const selectedItemKey = item.id;
      const currentItemStatus = this.state.selectedItems[selectedItemKey];

      return (
        <li
          className={classNames}
          key={`item-${selectedItemKey}`}
          onClick={() => {
            const itemCopy = Object.assign({}, item);

            if (hasCheckbox) {
              const changedSelectedItems = Object.assign(
                {},
                this.state.selectedItems
              );
              const newCheckboxState = !currentItemStatus;
              changedSelectedItems[selectedItemKey] = newCheckboxState;

              this.setState({
                selectedItems: changedSelectedItems
              });

              itemCopy.checked = newCheckboxState;
            }

            onItemClick && onItemClick(itemCopy);
          }}
        >
          {hasCheckbox && (
            <input type="checkbox" checked={currentItemStatus || false} />
          )}
          {item[labelKey]}
        </li>
      );
    };

    return data.reduce((acc, section) => {
      const items = section[childrenCollection] || [];

      if (items.length) {
        const itemLis = items.map(item => getItemLi(item, props));
        const sectionLi = getSectionLi(section, props);

        acc.push(sectionLi);
        acc = acc.concat(itemLis);
      } else {
        const itemLi = getItemLi(section, props);
        acc.push(itemLi);
      }

      return acc;
    }, []);
  };

  render() {
    return <ul className="list">{this._getSectionedItems(this.props)}</ul>;
  }
}

List.propTypes = {
  data: PropTypes.array,
  childrenCollection: PropTypes.string,
  labelKey: PropTypes.string,
  onItemClick: PropTypes.func,
  hasArrow: PropTypes.bool,
  hasCheckbox: PropTypes.bool
};

export default List;
