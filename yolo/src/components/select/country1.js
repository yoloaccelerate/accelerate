/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import GridItem from '../Grid/GridItem';
import GridContainer from "../Grid/GridContainer.js";
import SearchIcon from '@material-ui/icons/Search';
import Button from "../CustomButtons/Button";
import { store } from '../../store';
import city from '../../../src/assets/countryCity.json'
import {connect} from 'react-redux'

class Country extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allProvider: [],
      filterValue: { country: "India", city: "Delhi",name:''},
      allServices: [],
      allExpertise: [],
      searchBox: [],
      selectedCountry:'India',
      selectedCity:'Bengaluru',
      selectedSearchByValue:'',
      searchValues: [],
      filterValueField: "services",
      searchByName: false,
      searchByOrg: false,
      orgNames: [],
      names: [],
      country: [],
      city: []
    }

   
  }

  componentDidMount() {
    this.setState({
      allProvider: this.props.getAllProvider,
      allServices: this.props.getAllService,
      allExpertise: this.props.getAllExpertise,
      country: this.props.getAllCountries
    })

    setTimeout(()=>{
      let orgNameUnique = []
      let nameUnique = []
      console.log( this.props.providerData,"yes")
      for (let obj of this.props.providerData) {
        console.log(obj)
        orgNameUnique.push(obj.OrganizationName)
        nameUnique.push(obj.fullName)
      }
      console.log(orgNameUnique,"orgName")
      orgNameUnique = orgNameUnique.filter(function (item, pos) {
        return orgNameUnique.indexOf(item) == pos;
      });
      nameUnique = nameUnique.filter(function (item, pos) {
        return nameUnique.indexOf(item) == pos;
      });
      this.setState({
        names: nameUnique,
        orgNames: orgNameUnique,
        searchBox:this.props.getAllService
      })
  },5000)
   console.log(this.state.names,"names")
    setTimeout(()=>{ this.citySelect()

    },5000)

  }
getNames=()=>{
  let orgNameUnique = []
      let nameUnique = []
      let spellFlag=true;

  for (let obj of this.props.providerData) {
    if(orgNameUnique.length>0){
      for ( let org of orgNameUnique){
        if(org.toUpperCase()!=obj.OrganizationName.toUpperCase()){
          spellFlag=true;
          
          }
          else{
            spellFlag=false;
            break
          }
      }
    }
    else{
      spellFlag=true
    }
    
    if(spellFlag){
      orgNameUnique.push(obj.OrganizationName)
        nameUnique.push(obj.fullName)
        console.log("inserted org")
    }

    
  }
  console.log(orgNameUnique,"orgName")
  orgNameUnique = orgNameUnique.filter(function (item, pos) {
    return orgNameUnique.indexOf(item) == pos;
  });
  nameUnique = nameUnique.filter(function (item, pos) {
    return nameUnique.indexOf(item) == pos;
  });
  this.setState({
    names: nameUnique,
    orgNames: orgNameUnique,
    searchBox:this.props.getAllService
  })

}
  citySelect = () => {
    var cityValue = []
    var finalCity = []
     console.log(this.state.filterValue.country,"first")
    this.props.getAllCountries.map((item) => {
      if (item.name === this.state.filterValue.country) {
        cityValue = item.cities
        for (let city of cityValue) {
          if (city.substr(0, 6) == "Others") {
            finalCity.push(city.substr(7))
          }
          else {
            finalCity.push(city)
          }
        }
        finalCity = finalCity.sort()
        console.log(finalCity)
        this.setState({ city: finalCity })
      }
    })
  }

  filterData = (e) => {
  
    
  const { filterValue } = this.state
    if (e.target.id.substring(0, 2) == "co") {
      
    
      this.setState({ filterValue: { ...filterValue, country: e.target.innerHTML},selectedCountry:e.target.innerHTML  });
      this.props.filterFunction({...this.state.filterValue,country:e.target.innerHTML}, this.state.filterValueField)
      setTimeout(() => {
        this.citySelect()
      }, 500);
    }
    else if (e.target.id.substring(0, 2) == "ci") {
      this.setState({ filterValue: { ...filterValue, city: e.target.innerHTML },selectedCity:e.target.innerHTML });
      this.props.filterFunction({...this.state.filterValue,city:e.target.innerHTML}, this.state.filterValueField)
    }
    else {
        switch(this.state.filterValueField){
                case"name":
                this.setState({filterValue:{...filterValue,name:e.target.innerHTML} });
                this.props.filterFunction({...this.state.filterValue,name:e.target.innerHTML}, this.state.filterValueField)
                break;
                case"services":
                this.setState({filterValue:{...filterValue,service:e.target.innerHTML} });
                this.props.filterFunction({...this.state.filterValue,service:e.target.innerHTML}, this.state.filterValueField)

                break;
                case"orgName":
                this.setState({filterValue:{...filterValue,orgName:e.target.innerHTML} });
                this.props.filterFunction({...this.state.filterValue,orgName:e.target.innerHTML}, this.state.filterValueField)
                break;
                case"expertise":
                this.setState({filterValue:{...filterValue,expertise:e.target.innerHTML} });
                this.props.filterFunction({...this.state.filterValue,expertise:e.target.innerHTML}, this.state.filterValueField)
                 break;

        }
      this.setState({ selectedSearchByValue:e.target.innerHTML});
    }
  }

  searchByFilter = (e) => {
    //this.setState({filterValueField:e.target.innerHTML})
    console.log(e.target.innerHTML)
    if (e.target.innerHTML == "Services") {
      this.setState({ selectedSearchByValue:'',searchBox: this.props.getAllService, searchByName: false, searchByOrg: false, filterValueField: "service" })
    }
    else if (e.target.innerHTML == "Expertise") {
      this.setState({selectedSearchByValue:'', searchBox: this.props.getAllExpertise, searchByName: false, searchByOrg: false, filterValueField: "expertise" })
    }
    else if (e.target.innerHTML == "Name") {
      this.getNames()
      this.setState({selectedSearchByValue:'', searchBox: this.state.names, searchByName: true, searchByOrg: false, filterValueField: "name" })
    }
    else if (e.target.innerHTML == "Organization Name") {
      this.getNames()
      this.setState({selectedSearchByValue:'', searchBox: this.state.orgNames, searchByOrg: true, searchByName: false, filterValueField: "orgName" })
    }
  }

  filterArray = () => {
    this.props.filterFunction(this.state.filterValue, this.state.filterValueField)
  }

  render() {
    console.log(this.props.providerData)
    return (
      <React.Fragment>
        <div className="d-flex justify-content-between">
          {/* <GridContainer> */}

          <div>
            <GridItem xs={6} sm={6} md={2}>
              <Autocomplete
                onChange={(event)=>this.filterData(event)}
                style={{ width: 200, background: "#fff", borderColor: "#fff", borderRadius: 2 }}
                id="country"
               
                options={this.props.getAllCountries}
                getOptionLabel={(option) =>{
                
                  return option.name}}
             
                renderInput={(params) =>{
                 
                return  ( <TextField {...params}
                                placeholder="Select Country"
                                // inputProps={{
                                //   ...params.inputProps,
                                //   value:this.state.filterValue.country// disable autocomplete and autofill
                                // }}
                                variant="outlined" />)
                
              }
            }
              />
            </GridItem>
          </div>

          <div>
            <GridItem xs={6} sm={6} md={2}>
              <Autocomplete
                onChange={this.filterData}
                style={{ width: 200, background: "#fff", borderColor: "#fff", borderRadius: 2 }}
                id="city"
                options={this.state.city}
                getOptionLabel={(option) => option}
                renderInput={(params) =>
                  <TextField {...params}
                   placeholder="Select City"
                  //  inputProps={{
                  //   ...params.inputProps,
                  //   value:this.state.filterValue.city// disable autocomplete and autofill
                  // }}
                   variant="outlined" />
                }
              />
            </GridItem>
          </div>

          <div>
            <GridItem xs={6} sm={6} md={2}>
              <Autocomplete
                onChange={this.searchByFilter}
                style={{ width: 200, background: "#fff", borderColor: "#fff", borderRadius: 2 }}
                id="searchBy"
                options={searchByValue}
                getOptionLabel={(option) => option}
                renderInput={(params) =>
                  <TextField {...params}
                  // inputProps={{
                  //   ...params.inputProps,
                  //   value:this.state.filterValueField// disable autocomplete and autofill
                  // }}
                  placeholder="Search By" variant="outlined" />
                }
              />
            </GridItem>
          </div>

          <div>
            <GridItem xs={12} sm={12} md={6}>
              <Autocomplete
                 onChange={this.filterData}
                style={{ width: 200, background: "#fff", borderColor: "#fff", borderRadius: 2 }}
                id="SearchByField"
                options={this.state.searchBox}
                getOptionLabel={(option) => this.state.searchByOrg ? option : (this.state.searchByName ? option : option.name)}
                renderInput={(params) =>
                  <TextField {...params} 
                  // inputProps={{
                  //   ...params.inputProps,
                  //   value:this.state.selectedSearchByValue  //disable autocomplete and autofill
                  // }}
                  placeholder="Type to search" variant="outlined" />
                }
              />
            </GridItem>
          </div>

          <div>
            <GridItem xs={2} sm={2} md={2}>
              <Button onClick={this.filterArray} color="warning" size="lg">Search<SearchIcon class="text-primary" /></Button>
            </GridItem>
          </div>
          <div>
            <GridItem xs={2} sm={2} md={2}>
              <a href="" onClick={this.filterArray}>Clear All Fields</a>
            </GridItem>
          </div>

          {/* </GridContainer> */}
        </div>

      </React.Fragment>
    )
  }
}

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js

const searchByValue = ["All", "Name", "Organization Name", "Services", "Expertise"]
// const mapStateToProp=(state)=>{
//   return {
//     providerData:state.getAllProvidersDetails.success
//   }
// }
export default (Country);