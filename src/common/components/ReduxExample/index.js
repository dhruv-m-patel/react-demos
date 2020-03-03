import { connect } from 'react-redux';
import ReduxExample from './ReduxExample';
import { fetchTestData } from '../../../client/redux/actions';

function mapStateToProps({ test }) {
  return {
    isFetching: test.isFetching,
    error: test.error,
    data: test.data,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchTestData: () => dispatch(fetchTestData()),
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(ReduxExample);
