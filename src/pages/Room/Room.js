import React from 'react';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import RoomWithData from './RoomWithData';
import './styles.css';

const GET_ROOM = gql`
  query getRoom($emailKey: String!, $before: String, $after: String) {
    getRoom(emailKey: $emailKey) {
      name
      id
      emailKey
      assets
      seats
      image
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

const BOOK_ROOM = gql`
  mutation toggleRoomBooking($slotInput: AppointmentSlotInput!) {
    toggleRoomBooking(slotInput: $slotInput) {
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
`;

class Room extends React.Component {
  render() {
    const { history, match } = this.props;

    return (
      <Query
        query={GET_ROOM}
        variables={{ emailKey: match.params.key, after: new Date() }}
      >
        {queryParams => (
          <Mutation mutation={BOOK_ROOM}>
            {(toggleRoomBooking, mutationParams) => {
              const {
                loading: queryLoading,
                error: queryError,
                data
              } = queryParams;
              const {
                loading: mutationLoading,
                error: mutationError
              } = mutationParams;

              return (
                <RoomWithData
                  loading={queryLoading || mutationLoading}
                  error={queryError || mutationError}
                  data={data}
                  history={history}
                  toggleRoomBooking={toggleRoomBooking}
                />
              );
            }}
          </Mutation>
        )}
      </Query>
    );
  }
}

export default withRouter(Room);
