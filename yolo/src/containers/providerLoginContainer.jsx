import React from 'react';
import ProviderLogin from '../components/ProviderLogin/ProviderLogin';
import { connect } from 'react-redux';
import * as providerLoginAction from '../actions/loginProviderAction';
import { bindActionCreators } from 'redux';
import * as getProviderByIdAction from '../actions/getproviderByIdAction'
class ProviderLoginContainer extends React.Component {
    render() {
        
        return(
            <ProviderLogin 
                providerLogin = {this.props.providerLogin}
                getProvider={this.props.getProvider}
            />
        )
    }
}

const mapStateToProps=state=>{
return{
    data:state.getProviderById.success
}

}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        providerLogin: providerLoginAction.providerLogin,
        getProvider:getProviderByIdAction.getProviderById
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(ProviderLoginContainer);