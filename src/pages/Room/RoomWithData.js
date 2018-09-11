import React from 'react';

import LoadWrapper from '../../components/LoadWrapper/LoadWrapper';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import TransitionItem from '../../components/TransitionItem/TransitionItem';
import Popup from '../../components/Popup/Popup';
import { CSSTransitionGroup } from 'react-transition-group';

const formatTimeHHMMA = d => {
  function z(n) {
    return (n < 10 ? '0' : '') + n;
  }

  const h = d.getHours();
  return (
    (h % 12 || 12) + ':' + z(d.getMinutes()) + ' ' + (h < 12 ? 'AM' : 'PM')
  );
};
const extractHour = date => formatTimeHHMMA(new Date(date));
const isSlotBookedByMe = slot => slot.bookedBy === '1';

const children = {
  booking: ['12:30 PM - 13:30 PM', '14:00 PM - 14:30 PM'],
  unbooking: ['13:30 PM - 14:00 PM']
};

class RoomWithData extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      dirtySlots: {}
    };
  }

  handleChildClick = item => {
    const dirtySlots = Object.assign({}, this.state.dirtySlots);
    const newItem = Object.assign(item, { checked: !item.checked });
    const isSlotChangedByUser = newItem.checked !== !!item.bookedBy;

    if (isSlotChangedByUser) {
      dirtySlots[newItem.id] = newItem;
    } else {
      delete dirtySlots[newItem.id];
    }

    this.setState({
      dirtySlots
    });
  };

  closePopup = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const dirtySlots = this.state.dirtySlots;
    const { data, error, loading, history } = this.props;
    const rawSlotsData = data.getRoom ? data.getRoom.appointmentSlots : [];

    const hasChangesFromTheUser = !!Object.keys(dirtySlots).length;

    const aggregatedSlots = rawSlotsData.map(rawSlot => {
      const slotCheckStatus = dirtySlots[rawSlot.id]
        ? !!dirtySlots[rawSlot.id].checked
        : !!rawSlot.bookedBy;
      const isItemStatusChangedInTheUI = slotCheckStatus !== !!rawSlot.bookedBy;
      const contextLabel =
        isItemStatusChangedInTheUI && (slotCheckStatus ? '(Book)' : '(Unbook)');

      const additionalSlotData = {
        checked: slotCheckStatus,
        isDisabled: !isSlotBookedByMe(rawSlot),
        isDirty: isItemStatusChangedInTheUI,
        contextLabel,
        highlighted: isItemStatusChangedInTheUI,
        name: `${extractHour(rawSlot.hour.startTime)} - ${extractHour(
          rawSlot.hour.endTime
        )}`
      };

      return Object.assign(additionalSlotData, rawSlot);
    });

    return (
      <TransitionItem>
        <Header
          title="Room Name"
          subTitle="Room Floor"
          showLoading={loading}
          hasBackButton={true}
          history={history}
        />
        <LoadWrapper loading={loading} error={error} data={data}>
          <div className="details">
            <img src="" className="roomImage" alt="room name" />
            <div className="info">
              <div className="prop">Seats:</div>
              <div className="prop">Assets:</div>
            </div>
          </div>
          <div className="slots">
            <div className="sectionHeader">Appointment Slots</div>
            <div className="scrollable-wrapper">
              <div className="scrollable">
                {!aggregatedSlots.length && (
                  <div className="noSlots">No Available Slots</div>
                )}

                <List
                  data={aggregatedSlots}
                  hasCheckbox
                  childrenCollection="children"
                  labelKey="name"
                  checkboxLabel="contextLabel"
                  onItemClick={this.handleChildClick}
                  isHighlighted="highlighted"
                />
              </div>
            </div>
          </div>

          <CSSTransitionGroup
            transitionName="actionButtonsTransition"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {hasChangesFromTheUser && (
              <div className="actionButtons">
                <button
                  className="submitButton"
                  title="Submit"
                  onClick={() => this.setState({ modalOpen: true })}
                >
                  Submit
                </button>
                <button
                  className="cancelButton"
                  title="Cancel"
                  onClick={() => {
                    this.setState({ dirtySlots: {} });
                  }}
                >
                  Cancel
                </button>
              </div>
            )}
          </CSSTransitionGroup>

          <CSSTransitionGroup
            transitionName="popupTransition"
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
          >
            {this.state.modalOpen && (
              <div className="popupWrapper">
                <Popup children={children} onClose={() => this.closePopup()} />
              </div>
            )}
          </CSSTransitionGroup>
        </LoadWrapper>
      </TransitionItem>
    );
  }
}

export default RoomWithData;
