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
                data={this.props.data}
                // getProvider={this.props.getProvider}
            />
        )
    }
}

const mapStateToProps=state=>{
return{
    data:state
}

}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        providerLogin: providerLoginAction.providerLogin,
        // getProvider:getProviderByIdAction.getProviderById
    }, dispatch)
}

export default connect(mapStateToProps , mapDispatchToProps)(ProviderLoginContainer);