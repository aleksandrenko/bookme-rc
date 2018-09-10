import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import { withRouter } from 'react-router-dom';

import './styles.css';
import RoomWithData from './RoomWithData';

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
    const { history, match } = this.props;
    console.log('render');

    return (
      <Query
        query={GET_ROOM}
        variables={{ emailKey: match.params.key, after: new Date() }}
      >
        {({ loading, error, data }) => {
          return (
            <RoomWithData
              loading={loading}
              error={error}
              data={data}
              history={history}
            />
          );
        }}
      </Query>
    );
  }
}

export default withRouter(Room);
