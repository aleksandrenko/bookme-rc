import React, { Fragment } from 'react';

import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import LoadWrapper from '../../components/LoadWrapper/LoadWrapper';
import Header from '../../components/Header/Header';
import List from '../../components/List/List';
import TransitionItem from '../../components/TransitionItem/TransitionItem';

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
    const { history } = this.props;

    return (
      <Query
        query={GET_FLOORS}
        variables={{ pageSize: state.pageSize, offset: state.offset }}
      >
        {({ loading, error, data, fetchMore, refetch }) => {
          return (
            <TransitionItem>
              <Header title="Sofia" showLoading={loading} history={history} />

              <LoadWrapper loading={loading} error={error} data={data}>
                <Fragment>
                  <List
                    data={data && data.floors}
                    childrenCollection="rooms"
                    labelKey="name"
                    hasArrow={true}
                    onItemClick={item => {
                      history.push(`/room/${item.emailKey}`);
                    }}
                  />
                </Fragment>
              </LoadWrapper>
            </TransitionItem>
          );
        }}
      </Query>
    );
  }
}

export default RoomGroups;
