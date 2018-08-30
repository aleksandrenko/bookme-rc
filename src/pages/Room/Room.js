import React, { Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import LoadWrapper from '../../components/LoadWrapper/LoadWrapper';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';

import styles from './styles.css';

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
  render() {
    // const { history } = this.props;
    const { loading, error, data, history } = this.props;

    const mockdata = [
      {
        children: [
          { name: '12:00 - 12:30', id: 11 },
          { name: '12:30 - 13:00', id: 12 },
          { name: '13:00 - 13:30', id: 13 },
          { name: '13:30 - 14:00', id: 14 },
          { name: '14:00 - 14:30', id: 15 },
          { name: '14:30 - 15:00', id: 16 },
          { name: '15:00 - 15:30', id: 17 },
          { name: '15:30 - 16:00', id: 18 },
          { name: '16:00 - 16:30', id: 19 },
          { name: '16:30 - 17:00', id: 20 }
        ]
      }
    ];

    return (
      // <Query query={GET_ROOM}>
      //   {({ loading, error, data }) => {
      // return (
      <div className="wrapper">
        <Header
          title="Room Name"
          subTitle="Room Floor"
          showLoading={loading}
          hasBackButton
        />

        <LoadWrapper loading={loading} error={error} data={data}>
          <Fragment>
            <div className="details">
              <img src={{}} className="roomImage" alt="room name" />
              <div className="info">
                <p>Seats:</p>
                <p>Assets:</p>
              </div>
            </div>
            <div className="slots">
              <p className="sectionHeader">Appointment Slots</p>
              <List
                data={mockdata}
                // data={data.getRoom}
                hasCheckbox
                childrenCollection="children"
                labelKey="name"
                onItemClick={item => {
                  console.log(`Item Clicked: ${item.label}`);
                }}
              />
            </div>
          </Fragment>
        </LoadWrapper>
      </div>
      //   )
      // }}
      // </Query>
    );
  }
}

export default Room;
