import React from 'react';
// import gql from 'graphql-tag';

import LoadWrapper from '../../components/LoadWrapper/LoadWrapper';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import { withRouter } from 'react-router-dom';

import './styles.css';
import TransitionItem from '../../components/TransitionItem/TransitionItem';

// const GET_ROOM = gql`
//   query getRoom($emailKey: String!, $before: String, $after: String) {
//     getRoom(emailKey: $emailKey) {
//       name
//       id
//       emailKey
//       floor {
//         name
//       }
//       appointmentSlots(before: $before, after: $after) {
//         id
//         bookedBy
//         hour {
//           startTime
//           endTime
//         }
//         room {
//           id
//         }
//       }
//     }
//   }
// `;

class Room extends React.Component {
  render() {
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
          { name: '16:30 - 17:00', id: 20 },
          { name: '17:00 - 17:30', id: 21 },
          { name: '17:30 - 18:00', id: 22 },
          { name: '18:00 - 18:30', id: 23 },
          { name: '18:30 - 19:00', id: 24 },
          { name: '19:00 - 19:30', id: 25 },
          { name: '19:30 - 20:00', id: 26 }
        ]
      }
    ]; //data.getRoom

    return (
      // <Query query={GET_ROOM}>
      //   {({ loading, error, data }) => {
      // return (
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
              {/* TODO: add assets */}
            </div>
          </div>
          <div className="slots">
            <div className="sectionHeader">Appointment Slots</div>
            <div className="scrollable-wrapper">
              <div className="scrollable">
                <List
                  data={mockdata}
                  hasCheckbox
                  childrenCollection="children"
                  labelKey="name"
                  onItemClick={item => {
                    console.log(`Item Clicked: ${item.name}, id: ${item.id}`);
                  }}
                />
              </div>
            </div>
          </div>
        </LoadWrapper>
      </TransitionItem>
      //   )
      // }}
      // </Query>
    );
  }
}

export default withRouter(Room);
