import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import LoadWrapper from '../../components/LoadWrapper/LoadWrapper';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import { withRouter } from 'react-router-dom';

import './styles.css';

const GET_ROOM = gql`
  query getRoom($emailKey: String!, $before: String, $after: String) {
    getRoom(emailKey: $emailKey) {
      name
      id
      emailKey
      floor {
        name
      }
      appointmentSlots(before: $before, after: $after) {
        id
        bookedBy
        hour {
          startTime
          endTime
        }
        room {
          id
        }
      }
    }
  }
`;

class Room extends React.Component {
  constructor() {
    super();
    this.state = {
      modalOpen: false,
      dirtySlots: {},
      agregatedData: {} // Do I need this!?
    };
  }

  handleChildClick(array, item) {
    const isSlotChangedfromUser = item.checked !== (item.bookedBy === '1');
    if (isSlotChangedfromUser) {
      array[item.name] = item;
      this.setState({ dirtySlots: array });
    }
    console.log('isSlotChangedfromDB', isSlotChangedfromUser);
    console.log('dirtySlots', array);
  }

  renderModal = () => {
    return <div>***</div>;
  };

  render() {
    const { history, match } = this.props;
    const { dirtySlots, agregatedData, modalOpen } = this.state;

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

    const touchedSlotsByUser = Object.assign({}, dirtySlots);
    const hasChangesFromTheUser = !!Object.keys(agregatedData).length;

    return (
      <Query
        query={GET_ROOM}
        variables={{ emailKey: match.params.key, after: new Date() }}
      >
        {({ loading, error, data }) => {
          const rawSlotsData = data.getRoom
            ? data.getRoom.appointmentSlots
            : [];
          const labaledSlotsData = rawSlotsData.map(slot => {
            // console.log('slot', slot);
            const isChecked = !!slot.bookedBy;
            // console.log('isChecked', isChecked);
            const isDisabled = !!data.getRoom.appointmentSlots.find(
              item => item.id === slot.id
            ).bookedBy;
            const checkedByUser = Object.values(agregatedData).find(
              item => item.id === slot.id
            );
            const isDirty =
              checkedByUser &&
              !!checkedByUser.bookedBy !== checkedByUser.checked;
            // console.log(isDirty);
            const objWithLabel = {
              name: `${extractHour(slot.hour.startTime)} - ${extractHour(
                slot.hour.endTime
              )}`,
              checked: isChecked,
              disabled: isDisabled
              // isDirty: !!bookedBy !== !!UI checked
            };
            const labaledSlot = Object.assign(objWithLabel, slot);
            return labaledSlot;
          });

          return (
            <div className="room">
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
                    {/* TODO: add assets */}
                  </div>
                </div>
                <div className="slots">
                  <div className="sectionHeader">Appointment Slots</div>
                  <div className="scrollable-wrapper">
                    <div className="scrollable">
                      <List
                        data={labaledSlotsData}
                        hasCheckbox
                        childrenCollection="children"
                        labelKey="name"
                        // checkboxLabel={{
                        //   on: 'book',
                        //   off: 'unbook'
                        // }}
                        onItemClick={item => {
                          this.handleChildClick(touchedSlotsByUser, item);
                        }}
                      />
                    </div>
                  </div>
                </div>
                {hasChangesFromTheUser && (
                  <div className="actionButtons">
                    <button
                      className="submitButton"
                      title="Submit"
                      onClick={() => console.log('click')}
                    >
                      Submit
                    </button>
                    <button
                      className="cancelButton"
                      title="Cancel"
                      onClick={() => this.setState({ agregatedData: {} })}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {modalOpen && this.renderModal()}
              </LoadWrapper>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Room);
