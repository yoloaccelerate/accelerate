import React from 'react';
import { connect } from 'react-redux';
import * as userRegisterReducer from '../actions/registerUserAction';
import * as getCountriesReducer from '../actions/getUtilsAction';

import Register from '../components/Register/Register';
import { bindActionCreators } from 'redux';

class RegisterContainer extends React.Component {
    render() {
        return <Register 
            userRegister={this.props.userRegister}
            getCountries={this.props.getCountriesList}
            countries={this.props.countries}
        />
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
       userRegister: userRegisterReducer.registerUser,
       getCountriesList: getCountriesReducer.getCountriesList,
    }, dispatch);
}


const mapStateToProps=(state)=>{
    return {
        countries:state.getCountries.countries,
        error:state.userRegister.error,
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterContainer);