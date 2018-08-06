import { connect } from 'react-redux';

import Home from './Home.view';

import { requestHomeEvents } from './home.actions';

const mapStateToProps = state => ({
  events: state.getIn(['home', 'events']),
  isFetching: state.getIn(['home', 'isFetching']),
  error: state.getIn(['home', 'error'])
});

const mapDispatchToProps = dispatch => ({
  requestHomeEvents: () => {
    dispatch(requestHomeEvents());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
