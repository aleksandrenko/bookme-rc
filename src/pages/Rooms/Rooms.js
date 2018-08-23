import React, { Fragment } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import LoadWrapper from '../../components/LoadWrapper/LoadWrapper';

const GET_FLOORS = gql`
  query floors($pageSize: Int, $offset: Int) {
    floors(pageSize: $pageSize, offset: $offset) {
      name
      rooms {
        id
        emailKey
        name
      }
    }
    currentUser {
      id
    }
  }
`;

class RoomGroups extends React.Component {
  constructor() {
    super();
    this.state = {
      pageSize: 3,
      offset: 0,
      city: 'Sofia'
    };
  }

  render() {
    const state = this.state;

    return (
      <Query
        query={GET_FLOORS}
        variables={{ pageSize: state.pageSize, offset: state.offset }}
      >
        {({ loading, error, data, fetchMore, refetch }) => {
          return (
            <LoadWrapper loading={loading} error={error} data={data}>
              <Fragment>
                {data &&
                  data.floors && (
                    <ul>
                      {data.floors.map(floor => (
                        <li key={floor.name}>
                          {floor.name}
                          <ul>
                            {floor.rooms.map(room => (
                              <li key={room.id}>{room.name}</li>
                            ))}
                          </ul>
                        </li>
                      ))}
                    </ul>
                  )}
              </Fragment>
            </LoadWrapper>
          );
        }}
      </Query>
    );
  }
}

export default RoomGroups;
