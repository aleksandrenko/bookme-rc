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

const concatConsecutiveSlots = _slots => {
  const slots = JSON.parse(JSON.stringify(_slots));
  const groupedSlots = slots.reduce((acc, item) => {
    if (acc.length === 0) {
      acc.push(item);
      return acc;
    }

    const previousItem = acc[acc.length - 1];
    if (item.hour.startTime === previousItem.hour.endTime) {
      previousItem.hour = {
        ...previousItem.hour,
        endTime: item.hour.endTime
      };
    } else {
      acc.push(item);
    }
    return acc;
  }, []);

  return groupedSlots;
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
    if (item.isDisabled) {
      return;
    }

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

  onPopupConfirm = aggregatedSlots => {
    const { toggleRoomBooking } = this.props;

    aggregatedSlots.filter(slot => slot.isDirty).forEach(slot => {
      const slotInput = this.transformDataForBE(slot);
      toggleRoomBooking({
        variables: {
          slotInput
        }
      });
    });

    this.setState({ modalOpen: false });
  };

  transformDataForBE = slot => {
    return {
      startTime: new Date(slot.hour.startTime).toISOString(),
      endTime: new Date(slot.hour.endTime).toISOString(),
      emailKey: slot.roomEmailKey,
      booked: !!slot.bookedBy,
      roomId: slot.room.id
    };
  };

  modifyData = data => {
    const touchedData = data.filter(slot => slot.isDirty);
    const bookingData = touchedData.filter(slot => slot.checked);
    const unbookingData = touchedData.filter(slot => !slot.checked);
    const groupedBookingSlots = concatConsecutiveSlots(bookingData);
    const groupedUnbookingSlots = concatConsecutiveSlots(unbookingData);

    const finalData = {};
    finalData.booking = groupedBookingSlots.map(
      slot =>
        `${extractHour(slot.hour.startTime)} - ${extractHour(
          slot.hour.endTime
        )}`
    );
    finalData.unbooking = groupedUnbookingSlots.map(
      slot =>
        `${extractHour(slot.hour.startTime)} - ${extractHour(
          slot.hour.endTime
        )}`
    );
    return finalData;
  };

  render() {
    const dirtySlots = this.state.dirtySlots;
    const { data, error, loading, history } = this.props;
    const rawSlotsData = data.getRoom ? data.getRoom.appointmentSlots : [];
    const roomEmailKey = data.getRoom && data.getRoom.emailKey;
    const image = data.getRoom && data.getRoom.image;
    const seats = data.getRoom && data.getRoom.seats;
    const assets = data.getRoom && data.getRoom.assets;

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
        isDisabled: !!rawSlot.bookedBy && !isSlotBookedByMe(rawSlot),
        isDirty: isItemStatusChangedInTheUI,
        contextLabel,
        highlighted: isItemStatusChangedInTheUI,
        name: `${extractHour(rawSlot.hour.startTime)} - ${extractHour(
          rawSlot.hour.endTime
        )}`,
        roomEmailKey
      };

      return Object.assign(additionalSlotData, rawSlot);
    });

    console.log(aggregatedSlots);

    return (
      <TransitionItem>
        <Header
          title={data.getRoom && data.getRoom.name}
          subTitle={data.getRoom && data.getRoom.floor.name}
          showLoading={loading}
          hasBackButton={true}
          history={history}
        />
        <LoadWrapper loading={loading} error={error} data={data}>
          <div className="details">
            <img src={image} className="roomImage" alt="room name" />
            <div className="info">
              <div className="prop">
                Seats: <span className="roomDetails">{seats}</span>
              </div>
              <div className="prop">
                Assets: <span className="roomDetails">{assets}</span>
              </div>
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
                <Popup
                  children={this.modifyData(aggregatedSlots)}
                  onClose={() => this.closePopup()}
                  onConfirm={() => {
                    this.onPopupConfirm(aggregatedSlots);
                  }}
                />
              </div>
            )}
          </CSSTransitionGroup>
        </LoadWrapper>
      </TransitionItem>
    );
  }
}

export default RoomWithData;
