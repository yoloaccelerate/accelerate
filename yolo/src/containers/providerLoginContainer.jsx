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

<<<<<<< HEAD
const mapStateToProps=state=>{
return{
    data:state.getProviderById.success
}

}
=======
>>>>>>> a99d4e44db915ab24bd957a18280f4c4cbc5e7d1

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        providerLogin: providerLoginAction.providerLogin,
        getProvider:getProviderByIdAction.getProviderById
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(ProviderLoginContainer);