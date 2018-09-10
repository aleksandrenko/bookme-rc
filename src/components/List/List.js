import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class List extends React.Component {
  _getSectionedItems = props => {
    const { data = [], childrenCollection } = props;

    const getSectionLi = (item, props) => {
      const { labelKey } = props;

      return (
        <li key={`section-${item[labelKey]}`} className="section">
          {item[labelKey]}
        </li>
      );
    };

    const getItemLi = (item, props) => {
      const {
        labelKey,
        onItemClick,
        hasArrow,
        hasCheckbox,
        checkboxLabel,
        isHighlighted
      } = props;
      let classNames = `item ${hasArrow ? 'arrow-right' : ''} ${
        item.disabled ? 'disabled' : ''
      } ${item[isHighlighted] ? 'highlighted' : ''}`;

      return (
        <li
          className={classNames}
          key={`item-${item.id}`}
          disabled={item.disabled}
          onClick={() => {
            onItemClick && onItemClick(item);
          }}
        >
          {hasCheckbox && (
            <Fragment>
              <input type="checkbox" checked={item.checked} disabled />
              <div className="checkmark" />
            </Fragment>
          )}

          <span className="value">{item[labelKey]}</span>

          {checkboxLabel && (
            <span className="checkboxLabel">{item[checkboxLabel]}</span>
          )}
        </li>
      );
    };

    return data.reduce((acc, section) => {
      const items = section[childrenCollection] || [];

      if (items.length) {
        const itemLis = items.map(item => getItemLi(item, props));
        const sectionLi = getSectionLi(section, props);

        sectionLi.props.children && acc.push(sectionLi);
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
  hasCheckbox: PropTypes.bool,
  checkboxLabel: PropTypes.string,
  isHighlighted: PropTypes.string
};

export default List;
