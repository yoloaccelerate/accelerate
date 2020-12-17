import React from 'react';
import HeaderContainer from '../../containers/headerContainer';
import './ProviderLogin.css';
import {
    Grid, Container,
    Card, TextField,
    CardHeader, CardContent, CardActions,
    Snackbar, Button, Typography
} from '@material-ui/core';
import { history, store } from '../../store';
import log from '../../utils/logger.service';


import {Link} from 'react-router-dom';
import logo from "../../assets/img/Logo.png";


var button_style={

    backgroundColor: '#0099cc', 
    color: '#fff',
    padding: '10px 0px 10px 0px',
    width: '80%',
    borderRadius: '1px'


}


export default class ProviderLogin extends React.Component {
    constructor(props) {
        super();
      
        this.state = {
            email: '',
            setemail:'',
            password: '',
            errorMessage: '',
            open: false,
            errors: {
                email: '',
                password: ''
            }
        }
    }

    componentDidMount() {
        document.title = 'Yolo - Provider Login';
        log('User is on Provider Login')
    }
    
    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        this.setState({open: false});
    };
    
    

    change = (e) => {
        const { name, value } = e.target;
        
        let errors = this.state.errors;
        switch(name) {
            case 'email':
                errors.email = value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/) ? '' : 'Invalid Email Address';
                break;
            case 'password':
                errors.password = value.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/) ? '' : 'Password should be atleast 7 characters with alphanumeric characters';
                break;
            default:
                break;
                
        }
        this.setState({errors, [name]: value}, ()=> {
            return null;
        });
        this.setState({open:false});
    }

    login = (e) => {
        
        e.preventDefault();
        
        this.props.providerLogin(this.state.email, this.state.password);
        setTimeout(()=>{
            if(this.props.data.providerLogin.error) {

                this.setState({
                    open: true
                })
                this.setState({
                    errorMessage: this.props.data.providerLogin.error
                })
            } else {
                localStorage.setItem('token', this.props.data.providerLogin.success.token);
                // setName(this.props.data.providerLogin.success[0].name);
               localStorage.setItem('providerProfile', true);
                //window.localStorage.setItem('setemail',this.props.data.providerLogin.success.email);
                localStorage.setItem('providerId',this.props.data.providerLogin.success.partnerId);
                localStorage.setItem('providerName',this.props.data.providerLogin.success.name);
                //console.log("provider id  is-----",this.props.data.providerLogin.success.providerId);
                // window.localStorage.setItem('providerData',JSON.stringify(this.props.data.providerLogin.success.partnerData));
            //    setTimeout(()=>{history.push(`/provider/profile?id=${localStorage.getItem('providerId')}`)},1000) 
            
                history.push(`/provider/profile?id=${localStorage.getItem('providerId')}`)
               }
            },1000);
    }

    render() {
console.log(history)
        return(
            <div>
                <HeaderContainer />
          
                
                <div className="section box_shadow">


                    <div className="login_background">
                        
                        <div className="sub_login_background" >

                            <div className="sub_section_content_login_background">
                                
                                <br/>
                                <Typography variant="h5">Yoloj <img src ={logo} style={{width: '16px', height: '16px'}}/></Typography>

                                <br/><br/>
                                <Typography variant="body" style={{fontSize: '24px'}}>
                                    Manage your<br/> personal & professional Identity
                                </Typography>
                                <br/><br/>

                                <Typography varian="subtitle1" style={{fontSize: '13px'}}>
                                    Yolos delivers you the exquisite service by providing you the platform<br/>
                                    to build your peronal & professional identity to manage your individual and business<br/>
                                    expertises all over the world.
                                </Typography>

                            </div>

                        </div>

                    </div>


                    <div className="sub_section">

                        <div className="login_section">

                        <img src ={logo}/>
                    
                            <br/><br/>

                            <Typography variant="caption" style={{fontSize: '18px', color: '#4dd4d4d'}}>
                                Welcome Back Provider
                            </Typography>

                            <CardContent>
                                <form noValidate autoCapitalize="off" onSubmit={(e) => this.login(e)}>
                                    <TextField
                                        id="email"
                                        label="Enter your Email Address"
                                        variant="outlined"
                                        name="email"
                                        type="email"
                                        size="small"
                                        error={this.state.errors.email}
                                        helperText={this.state.errors.email}
                                        autoFocus
                                        required
                                        onChange={(e)=> this.change(e)}
                                        value={this.state.email}
                                        style={{marginBottom: 15,width: '80%',borderRadius: '1px'}}
                                    />
                                    
                                    <TextField
                                        id="password"
                                        label="Enter your password"
                                        variant="outlined"
                                        name="password"
                                        fullWidth
                                        size="small"
                                        type="password"
                                        error={this.state.errors.password}
                                        helperText={this.state.errors.password}
                                        autoFocus
                                        required
                                        onChange={(e)=> this.change(e)}
                                        value={this.state.password}
                                        style={{marginBottom: 15,width: '80%',borderRadius: '1px'}}
                                    />


                                <Button variant="contained" type="submit" fullWidth style={button_style}>SIGN IN</Button>
                                </form>


                            </CardContent>
                        
                                    
                        </div>

                        <div className="forget_section">
                            <label>Don't have an account ?</label>
                            <Link to={'./register'}>&nbsp;Sign Up</Link>
                        </div>

                    </div>





                </div>


                <br/><br/>


                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={(e,r)=>this.handleClose(e,r)}
                    message={this.state.errorMessage}
                    action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={(e,r)=>this.handleClose(e,r)}>
                        Hide
                        </Button>
                    </React.Fragment>
                    }
                />
            </div>
        )
    }
}