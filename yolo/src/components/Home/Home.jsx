import React from 'react';
import HeaderContainer from '../../containers/headerContainer';
import ProviderCard from '../Card/providerCard'
import {
    Button, Snackbar, Grid,
    Card, Avatar, CardActionArea,
} from '@material-ui/core';
import './Home.css';
import classNames from "classnames";

import { Rating } from '@material-ui/lab';
import { store } from '../../store';
import CardErrorBoundary from '../shared/CardErrorBoundary';
import log from '../../utils/logger.service'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import { Link } from 'react-router-dom';
import { classList } from '@syncfusion/ej2-base';
import Parallax from '../Parallax/Parallax'
import GridContainer from '../Grid/GridContainer'
import GridItem from '../Grid/GridItem'
import { withStyles } from "@material-ui/core/styles";
import styles from "../../assets/jss/material-kit-react/views/components.js";

import CountrySelect from "../select/country1";
import ResponsivecountrySelect from "../select/responsivecountry"

import HomeProviders from '../Home/HomeProviders'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';
import Sharefunctionality from './Sharefunctionality';
import WorkIcon from '@material-ui/icons/Work';
import Tooltip from '@material-ui/core/Tooltip';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Contact_modal from './Contact_modal';

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined';

import Topprofiles from './Topprofiles.jsx';
import { connect } from 'react-redux';

var media = {
    height: '70px', width: '70px',
    borderRadius: '50%', align: 'center',
    border: '3px solid #f2f2f2',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
}

var share_link = {}
var share_link_2 = {}

var modal_data_1 = {}
var modal_data_2 = {}
var modal_data_3 = {}
var modal_data_4 = {}
var modal_data_5 = {}
var modal_data_6 = {}
var modal_data_7 = {}
var modal_data_8 = {}

var store_your_city_name_through_google_api = "Bengaluru"




const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        padding: '2px 5px 2px 5px',
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            open: false,
            allProfile:true,
            errorMessage: '',
            providerData: [],
            allProviderData: [],
            filteredData: [],
            location: '',
            dialogOpen: false,
            name: '',
            allService: [],
            allExpertise: [],
            allCountry: [],
            allProvidersDetails: [],
            searchedResult: [],
            city:''
        }
    }

    componentDidMount() {
        document.title = 'Welcome to Infosys - Yolo Network';
        this.props.getAllProvider();

        this.props.getAllService();
        this.props.getAllBusinessType();
        this.props.getCountriesList();
        this.props.getAllProvidersDetails();
        this.setState({city:'Delhi'})


        store.subscribe(() => {
            console.log(store.getState(), "lassl")
            if (store.getState().getAllApprovedProvider.error) {
                this.setState({
                    open: true
                })
                this.setState({
                    errorMessage: String(store.getState().getAllApprovedProvider.error)
                })
            } else {
                this.setState({
                    providerData: this.props.providerData,
                    allProviderData: store.getState().getAllApprovedProvider.success,
                    allService: store.getState().getFinancialService.success,
                    allExpertise: store.getState().getBusinessTypes.success,
                    allCountry: store.getState().getCountries.countries,
                    allProvidersDetails: store.getState().getAllProvidersDetails.success,
                    allProfile:false
                })


            }
        })
    }

    filterFunction = (filterValue, field) => {
        this.setState({ filteredData: [] })
        this.setState({city:filterValue.city})
        let filterArr = []
        let searchData = []
        console.log(filterValue, field, "check kro")

        if (filterValue.country != null && filterValue.city == null) {
            this.state.allProvidersDetails.map((obj) => {
                if (obj.country == filterValue.country) {
                    filterArr.push(obj)
                }
            })
        }
        else if (filterValue.city != null && filterValue.city != null) {
            this.setState({city:filterValue.city})
            this.state.allProvidersDetails.map((obj) => {
                if (obj.country == filterValue.country && obj.City == filterValue.city) {
                    filterArr.push(obj)
                }
            })
        }
        else if (filterValue.city == null && filterValue.city == null) {
            this.state.allProvidersDetails.map((obj) => {
                filterArr.push(obj)

            })
        }

        if (field == "name") {
            console.log(filterArr,"dekho")
            for (let obj of filterArr) {
                if (obj.fullName == filterValue.name) {
                    searchData.push(obj)
                }
            }
        }
        else if (field == "orgName") {
            console.log(filterArr,"orgDekho")
            for (let obj of filterArr) {
                if (obj.OrganizationName == filterValue.orgName) {
                    searchData.push(obj)
                }
            }
        }
        else if (field == "service") {
            for (let obj of filterArr) {
                for (let service of obj.servicesOffered) {
                    if (service.name == filterValue.service) {
                        searchData.push(obj)
                    }
                }
            }
        }
        else if (field == "expertise") {
            for (let obj of filterArr) {
                for (let expertise of obj.partnerType) {
                    if (expertise.name == filterValue.expertise) {
                        searchData.push(obj)
                    }
                }
            }
        }

        if (searchData.length == 0) {
            this.setState({ searchedResult: filterArr })
        }
        else {
            console.log(searchData, "bruce")
            this.setState({ searchedResult: searchData })
        }
    }

    change = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'location':
                this.setState({ location: value });
                break;
            case 'name':
                this.setState({ name: value });
                break;
            default:
                break;
        }
    }

    handleClose = () => {
        this.setState({ dialogOpen: false })
    }

    handleClickOpen = () => {
        this.setState({ dialogOpen: true });
    }
    viewAllProfile=()=>{
        this.setState({allProfile:true})
    }

allProfile=()=>{
let arr=[]
arr=this.state.allProvidersDetails.filter((provider)=>{
    
    if(provider.City==this.state.city)
            {
                  return true
                }
            }
            )
console.log(arr,9899)
this.setState({searchedResult:arr})
}

    logic_for_profiles_based_on_city() {
        console.log(this.state.allproviderDetails, "home2233")
        var fullname_array = []
        console.log(this.state.allproviderDetails, "outside");
        return (
            <div>
                {
                    (this.state.searchedResult != [] && this.state.searchedResult.length) ? this.state.searchedResult.map((itemz, index) => {
                        console.log(itemz, "inside");
                        return (
                            <div>
                                <div>
                                    <span style={{ display: 'none' }}>
                                        {!fullname_array.includes(itemz.fullName) ?
                                            (
                                                fullname_array.push(itemz.fullName)
                                            )
                                            :
                                            (
                                                ""
                                            )
                                        }

                                    </span>

                                    {index < 2 ?
                                        (
                                            <div>
                                                <ProviderCard itemz={itemz} />
                                            </div>
                                        )
                                        :
                                        ("")


                                    }




                                </div>


                            </div>
                        )
                    })
                        : ('')
                }

                <div className="carddd" style={{ textAlign: 'center', backgroundColor: '#fff', height: '215px' }}>
                    <br /><br />
                    <CheckCircleOutlinedIcon style={{ color: '#006699' }} /><br />
                    <Link  onClick={this.allProfile} variant="caption">See all profiles from<br />{this.state.city}<br />{this.props.rcn}</Link>
                    <br />
                </div>


            </div>
        )/*end of return  statement*/
    }



    render() {
        console.log(this.state.allproviderDetails,"check me")
        const { classes } = this.props;
        return (
            <div>
                <HeaderContainer />
                <Parallax image={require("../../assets/img/newbg.jpg")}>
                    <div className={classes.container} class="window_search">
                        <GridContainer>
                            <GridItem>
                                <div className={classes.brand}>
                                    <CountrySelect
                                        getAllProvider={this.state.allProviderData}
                                        getAllService={this.state.allService}
                                        getAllExpertise={this.state.allExpertise}
                                        getAllCountries={this.state.allCountry}
                                        filterFunction={this.filterFunction}
                                        providerData={this.state.allProviderData}
                                    />
                                </div>
                            </GridItem>
                        </GridContainer>
                    </div>


                    <div class="mobile_search">
                        <ResponsivecountrySelect
                            getAllProvider={this.state.allProviderData}
                            getAllService={this.state.allService}
                            getAllExpertise={this.state.allExpertise}
                            getAllCountries={this.state.allCountry}
                            filterFunction={this.filterFunction} />
                    </div>


                </Parallax>

                <div className={classNames(classes.main, classes.mainRaised)} style={{ padding: 2, backgroundColor: "#F8F8F8" }}>

                    <br /><br />
                    <Grid container spacing={2} xs={12} style={{ marginTop: 70 }} >

                        <div class="profiles_based_on_city">
                            <div style={{ paddingLeft: '15px' }}>Profiles based on {this.state.city}</div><br /><br />
                            {this.logic_for_profiles_based_on_city()}
                        </div>

                    </Grid>
                    {/*end of div of profile based city*/}


                    <Grid container spacing={2} xs={12} style={{ marginTop: 70 }} >
                        <div class="grid_roww" >

                            <div style={{ textAlign: 'left', paddingLeft: '15px' }}>All Profiles</div><br /><br />
                            {
                                (this.state.allproviderDetails != [] && this.state.allProvidersDetails.length) ? this.state.allProvidersDetails.map((itemz, index) => {


                                    return (
                                        <div>
                                        {index < 7 || this.state.allProfile ?
                                            (
                                                <div>
                                                    <ProviderCard itemz={itemz} />
                                                </div>
                                            )
                                            :
                                            ("")
    
    
                                        }
                                          
                                           
                                            </div>

                                    )
                                }
                                
                                ) : <span>We do not have enough data right now. Please check back later.</span>
                            }
                            {!this.state.allProfile&& this.state.allProvidersDetails.length>0?
                                (<div class="carddd" style={{ textAlign: 'center', backgroundColor: '#fff', height: '215px' }}>
                                    <br /><br />
                                    <CheckCircleOutlinedIcon style={{ color: '#006699' }} /><br />
                                    <Link onClick={this.viewAllProfile} variant="caption" >See all profiles <br /><br />{this.props.rcn}</Link>
                                    <br />   
                                    </div>                                       
                               ):('')
                            }
                             </div>
                        
                    </Grid>









                </div>{/*end of content div*/}



                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open={this.state.open}
                    autoHideDuration={5000}
                    onClose={(e, r) => this.handleClose(e, r)}
                    message={this.state.errorMessage}
                    action={
                        <React.Fragment>
                            <Button color="secondary" size="small" onClick={(e, r) => this.handleClose(e, r)}>
                                Hide
                        </Button>
                        </React.Fragment>
                    }
                />
            </div>
        )
    }
}


export default (withStyles(styles, { withTheme: true })(Home));