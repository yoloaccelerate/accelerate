import React from 'react';
import * as getApprovedProviders from '../actions/getAllProvidersActions';
import ProviderProfile from '../components/ProviderProfile/ProviderProfile';
import * as getBuisnessTypes from '../actions/getBusinessTypesAction'
import * as getFinancialService from '../actions/getFinancialServiceAction';
import * as providerUpdate from '../actions/updateProvider'
import * as updateProviderExpertise from '../actions/updateProviderExpertise'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
 class ProviderProfileContainer extends React.Component {
    render() {
        return(
            <ProviderProfile 
            getAllProvider = {this.props.getAllProvider}
            getFinancialServiceList={this.props.getFinancialServiceList}
            updateService={this.props.updateService}
            updateExpertise={this.props.updateExpertise}
            getExpertise={this.props.getExpertise}
            />
        )
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getAllProvider: getApprovedProviders.getAllProviders,
        getFinancialServiceList: getFinancialService.getFinancialServiceList,
        updateService:providerUpdate.providerServiceUpdate,
        updateExpertise:updateProviderExpertise.providerExpertiseUpdate,
        getExpertise:getBuisnessTypes.getBusinessTypes

    }, dispatch)
} 

export default connect(null, mapDispatchToProps)(ProviderProfileContainer)