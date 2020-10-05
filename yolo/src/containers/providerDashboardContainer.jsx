import React from 'react';
import ProviderDashboard from '../components/ProviderDashboard/ProviderDashboard';
import { connect } from 'react-redux';
import * as getProviderByIdAction from '../actions/getproviderByIdAction'
import { bindActionCreators } from 'redux';

class ProviderDashboardContainer extends React.Component {
    render() {
        return (
            <ProviderDashboard
                getProviderById={this.props.getProviderById}
            />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProviderById: getProviderByIdAction.getProviderById
    }, dispatch)
}


export default connect(null, mapDispatchToProps)(ProviderDashboardContainer);