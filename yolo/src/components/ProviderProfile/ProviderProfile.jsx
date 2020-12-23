import React from "react";
import {
  Button,
  Snackbar,
  Grid,
  TextField,
  Card,
  Avatar,
  CardActionArea,
  Typography,
  CircularProgress,
  IconButton,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import EditIcon from "@material-ui/icons/Edit";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import log from "../../utils/logger.service";
import { Link } from "react-router-dom";
import { store } from "../../store";
import "./ProviderProfile.css";
import MailIcon from "@material-ui/icons/Mail";
import SmartphoneIcon from "@material-ui/icons/Smartphone";
import HomeIcon from "@material-ui/icons/Home";
import WorkIcon from "@material-ui/icons/Work";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import { withStyles } from "@material-ui/core/styles";
import CreditCardOutlinedIcon from "@material-ui/icons/CreditCardOutlined";
import Chip from "@material-ui/core/Chip";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Sharefunctionality from "../Home/Sharefunctionality";

import HeaderContainer from "../../containers/headerContainer";
import Background from "../../assets/img/newbg.jpg";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import MyLocationIcon from "@material-ui/icons/MyLocation";

import Similar_Profiles_location from "./Similar_Profiles_location.jsx";
import Similar_Profiles_expertise from "./Similar_Profiles_expertise.jsx";
import Similar_Profiles_service from "./Similar_Profiles_service.jsx";

import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { TransferWithinAStationSharp, RssFeed } from "@material-ui/icons";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Success from "../ProviderRegister/WelcomeSnackbar";
import { history } from "../../store";

var share_link = {};

var relevant_city_name = {};
var relevant_expertise_name = {};
var relevant_service_name = {};

var chip_style = {
  fontSize: "10px",
  color: "#fff",
  marginTop: "5px",
  backgroundColor: "rgba(0, 153, 204,0.8)",
  border: "1px solid #f2f2f2",
};

const similar_profile_location = () => {
  document.getElementById("similar_profile_location").style.display = "block";
  document.getElementById("similar_profile_expertise").style.display = "none";
  document.getElementById("similar_profile_service").style.display = "none";
  document.getElementById("buttons_visibility").style.display = "block";

  window.scrollBy(0, 250);
};

const similar_profile_expertise = () => {
  document.getElementById("similar_profile_expertise").style.display = "block";
  document.getElementById("similar_profile_location").style.display = "none";
  document.getElementById("similar_profile_service").style.display = "none";
  document.getElementById("buttons_visibility").style.display = "block";

  window.scrollBy(0, 250);
};

const similar_profile_service = () => {
  document.getElementById("similar_profile_service").style.display = "block";
  document.getElementById("similar_profile_expertise").style.display = "none";
  document.getElementById("similar_profile_location").style.display = "none";
  document.getElementById("buttons_visibility").style.display = "block";

  window.scrollBy(0, 250);
};

const moveright = () => {
  document.getElementById("similar_profile_location").scrollLeft += 100;
  document.getElementById("similar_profile_service").scrollLeft += 100;
  document.getElementById("similar_profile_service").scrollLeft += 100;
};

const moveleft = () => {
  document.getElementById("similar_profile_location").scrollLeft -= 100;
  document.getElementById("similar_profile_service").scrollLeft -= 100;
  document.getElementById("similar_profile_service").scrollLeft -= 100;
};

// const HtmlTooltip = withStyles((theme) => ({
//     tooltip: {
//       backgroundColor: '#f5f5f9',
//       color: 'rgba(0, 0, 0, 0.87)',
//       padding: '2px 5px 2px 5px',
//       fontSize: theme.typography.pxToRem(12),
//       border: '1px solid #dadde9',
//     },
//   }))(Tooltip);

export default class ProviderProfile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      providerData: {},
      servicesData: [],
      expertiseList: [],
      city: "",
      rap: ["a", "b", "c"],
      provider: false,
      services: [],
      servivesList: [],
      update: false,
      expertise: [],
      expertiseSelected: [],
      selectedExpertiseValue: [],
      updateExpertise: false,
      open: false,
      errors: {
        name: "",
        email: "",
        phone_number: "",
        // message: ''
      },
      name: "",
      email: "",
      phone_number: "",
      providerImg: "",
      errorMessage: "",
      open1: false,
      anchor: null,
    };
  }

  openUpdateExpertise = () => {
    this.setState({ updateExpertise: true });
  };
  handleClickOpen = () => {
    if (
      this.state.providerData.partnerId === localStorage.getItem("providerId")
    ) {
      this.setState({ open: true });
    }
  };
  handleClick = (event) => {
    this.setState({ anchor: event.currentTarget });
  };
  handleClose = () => {
    this.setState({
      open: false,
      open1: false,
      anchor: null,
    });
  };
  componentDidMount() {
    let demo = window.location.search;
    let myParam = demo.split("=");
    let partnerId = myParam[1];
    //    var pcity = '';
    if (localStorage.getItem("userName")) {
      this.viewers();
    }
    //    console.log(this.props.updateData);
    this.props.getFinancialServiceList();
    this.props.getExpertise();
    this.providerDetail();
    store.subscribe(() => {
      this.setState({
        services: store.getState().getFinancialService.success,
        expertise: store.getState().getBusinessTypes.success,
      });
      setTimeout(() => {
        this.state.services.map((item) => {
          var joined = this.state.servivesList.concat(item.name);
          this.setState({ servivesList: [...new Set(joined)] });
        });

        this.state.expertise.map((item) => {
          //
          var joined = this.state.expertiseList.concat(item.name);
          this.setState({ expertiseList: [...new Set(joined)] });
        });
      }, 1000);
    });
  }
  viewers = () => {
    let demo = window.location.search;
    let myParam = demo.split("=");
    let partnerId = myParam[1];
    console.log(partnerId);
    fetch("/api/provider/viewers", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: localStorage.getItem("userId"),
        partnerId: partnerId,
      }),
    });
    //.then(res=>{
    //     if(res.status=200){

    //     }
    // })
  };

  closeDialog = () => {
    this.setState({ update: false });
  };

  providerDetail = () => {
    let demo = window.location.search;
    let myParam = demo.split("=");
    let Id;

    Id = myParam[1];

    fetch("/api/provider/" + Id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json().then((res) => {
            console.log(res, "popp");
            let arr = [];
            let arr2 = [];
            res.servicesOffered.map((ser) => {
              //   console.log(ser,223)
              arr.push(ser.name);
            });
            res.partnerType.map((exp) => {
              // console.log(exp.name,2996)
              arr2.push(exp.name);
            });
            this.setState({
              providerData: res,
              provider: true,
              servicesData: arr,
              expertiseSelected: arr2,
              selectedValue: arr,
              selectedExpertiseValue: arr2,
              name: res.fullName,
              email: res.email,
              phone_number: res.mobileNumber,
              providerImg: res.providerIdentityImg,
            });
          });
        }
      })
      .catch((err) => {
        console.log(err, 6566);
      });
  };

  handleSelectedservices = (event, value) => {
    console.log(value, 67676);
    if (value.length > 0) {
      this.setState({ selectedValue: value });
    }
  };

  handleSelectedExpertise = (event, value) => {
    console.log(value);
    this.setState({ selectedExpertiseValue: value });
  };

  updateProfile = () => {
    console.log("working");

    this.setState({ update: true });
  };

  updateExpertise = () => {
    let demo = window.location.search;
    let myParam = demo.split("=");
    let Id = myParam[1];
    this.props.updateExpertise(Id, this.state.selectedExpertiseValue);
    setTimeout(() => {
      this.providerDetail();
    }, 500);
    this.setState({ updateExpertise: false });
    //   window.location.reload();
  };

  updateService = () => {
    let demo = window.location.search;
    let myParam = demo.split("=");
    let Id = myParam[1];
    console.log(this.state.selectedValue, "amamaa");
    this.props.updateService(Id, this.state.selectedValue);
    setTimeout(() => {
      this.providerDetail();
    }, 1000);
    this.setState({ update: false });
    //   window.location.reload();
  };

  change = (e) => {
    const { name, value } = e.target;
    // console.log(this.state.countries_code);
    let errors = this.state.errors;
    var regex = /^[A-z]{3,}$/;

    switch (name) {
      case "name":
        errors.name =
          value.length < 3
            ? "Name should be more than 3 characters long"
            : null;
        if (value.length < 3) {
          errors.name = "Name should be more than 3 characters long";
        } else if (!regex.test(value.replace(/\s/g, ""))) {
          errors.name = "Name should contain only alphabets";
        } else {
          this.setState({ name: value });
          errors.name = "";
        }
        break;
      case "email":
        errors.email = value.match(
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
        )
          ? ""
          : "Invalid Email Address";
        if (
          !value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z]+\.)+[a-zA-Z]{2,}))$/
          )
        ) {
          errors.email = "Invalid Email Address";
        } else {
          this.setState({ email: value });
          errors.email = "";
        }
        break;
      case "phone_number":
        errors.phone_number = value.match(
          /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
        )
          ? ""
          : "Invalid phone number.";
        if (
          !value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)
        ) {
          errors.phone_number = "Invalid phone number.";
        } else {
          this.setState({ phone_number: value });
          errors.phone_number = "";
        }
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value }, () => {
      return null;
    });
    // this.handleUpdate();
  };

  updatePhoto = (e) => {
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = () => {
      this.setState({
        providerImg: reader.result,
      });
    };
  };

  update = () => {
    this.handleClose();
    // console.log("hiiii1");
    this.props.providerUpdate(
      this.state.email,
      this.state.name,
      this.state.phone_number,
      this.state.providerImg,
      this.state.providerData.partnerId
    );
    // console.log("hiiii2");
    setTimeout(() => {
      // console.log("hii3");
      // console.log(this.props.updateData.providerUpdate);
      if (this.props.updateData.providerUpdate.error) {
        this.setState({ open: true });
        this.setState({
          open1: true,
          errorMessage: this.props.updateData.providerUpdate.error,
        });
      } else {
        // console.log("update profile--->",this.statupdateData.provider                     // console.log(this.propsupdateData.provider                      this.setState({open: true});
        this.setState({
          open1: true,
          errorMessage: this.props.updateData.providerUpdate.success.message,
        });
        // overriding token and name with new token
        // console.log("jjjj",this.props.updateData);
        store.subscribe(() => {
          // console.log("hiii",store.getState())

          localStorage.setItem(
            "token",
            store.getState().providerUpdate.success.token
          );
          localStorage.setItem(
            "providerName",
            store.getState().providerUpdate.success.name
          );
          localStorage.setItem(
            "providerId",
            store.getState().providerUpdate.success.partnerId
          );
          // setTimeout(()=>{this.providerDetail()},500);
          // this.props.getUserDetails();
          // setTimeout(()=>{
          //     console.log(this.props.userDetails);
          // },1000)
        });
        setTimeout(() => {
          this.providerDetail();
        }, 1000);
      }
    }, 10);

    // this.providerDetail();
    // setTimeout(()=>{this.providerDetail()},500);
  };
  componentWillUnmount() {
    history.location.state = undefined;
  }
  render() {
    console.log("HERE 1!!!!! ", history);
    return (
      <div>
        {" "}
        {this.state.provider ? (
          <div style={{ width: "100%", marginTop: "100px" }}>
            {history.location.state?.from.length > 0 ? <Success /> : null}
            <HeaderContainer />

            <div class="profile_container">
              <div class="left_profile_container ">
                <div class="box_shadow" style={{ paddingBottom: "20px" }}>
                  <div
                    style={{
                      width: "100%",
                      height: "120px",
                      backgroundImage: `url(${Background})`,
                      backgroundSize: "100% 100%",
                    }}
                  >
                    <span style={{ display: "none" }}>
                      {
                        (share_link = `/provider/profile?id=${this.state.providerData.partnerId}`)
                      }
                    </span>

                    <Link
                      style={{
                        float: "right",
                        marginRight: "15px",
                        color: "#fff",
                        fontSize: "20px",
                      }}
                    >
                      <Sharefunctionality
                        brand={share_link}
                        style={{ fontSize: "20px" }}
                      />
                    </Link>
                  </div>

                  <div
                    style={{
                      width: "96%",
                      marginLeft: "2%",
                      textAlign: "left",
                      marginTop: "-60px",
                    }}
                  >
                    <img
                      src={this.state.providerData.providerIdentityImg}
                      class="rounded_image"
                    ></img>
                    <br />
                    {this.state.providerData.approved == true ? (
                      <CheckCircleIcon
                        style={{
                          backgroundColor: "#fff",
                          color: "#0077b3",
                          fontSize: "18px",
                          border: "1px solid #fff",
                          borderRadius: "50%",
                          marginLeft: "50px",
                          marginTop: "-25px",
                        }}
                      />
                    ) : (
                      ""
                    )}

                    <br />
                    <Typography
                      color="text"
                      variant="button"
                      style={{ fontSize: "16px" }}
                    >
                      {this.state.providerData.fullName}&nbsp;||&nbsp;
                      {this.state.providerData.partnerId}&nbsp;
                    </Typography>
                    <Typography
                      color="text"
                      variant="body"
                      style={{ fontSize: "18px" }}
                    >
                      <IconButton style={{ float: "right" }}>
                        <EditIcon
                          style={{
                            float: "right",
                            fontSize: "17px",
                            color: "#006699",
                          }}
                          onClick={this.handleClickOpen}
                        />
                      </IconButton>
                    </Typography>

                    <br />

                    <Typography
                      color="text"
                      variant="caption"
                      style={{ fontSize: "13px" }}
                    >
                      <WorkIcon
                        style={{ fontSize: "12px", color: "#666666" }}
                      />
                      &nbsp;
                      {this.state.providerData.OrganizationName},&nbsp;
                      {this.state.providerData.OrganizationAddress},&nbsp;
                      {this.state.providerData.country} <br />
                      <CreditCardOutlinedIcon
                        style={{ fontSize: "12px", color: "#666666" }}
                      />
                      &nbsp; Fees : {this.state.providerData.Fees}
                    </Typography>

                    <Typography
                      color="text"
                      variant="caption"
                      style={{ float: "right" }}
                    >
                      Joined on &nbsp;
                      {this.state.providerData.createdOn != undefined
                        ? this.state.providerData.createdOn.substr(0, 4)
                        : ""}
                    </Typography>
                  </div>
                </div>

                <div class="bottom_container box_shadow">
                  <div
                    style={{
                      width: "96%",
                      marginLeft: "2%",
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      color="text"
                      variant="body"
                      style={{ fontSize: "18px" }}
                    >
                      Contact Info
                      <DescriptionOutlinedIcon
                        style={{
                          float: "right",
                          fontSize: "17px",
                          color: "#006699",
                        }}
                      />
                    </Typography>
                    <br />
                    <br />
                    <MailIcon style={{ fontSize: "12px", color: "#666666" }} />
                    &nbsp;
                    <Typography variant="caption" style={{ fontSize: "12px" }}>
                      {this.state.providerData.email}
                    </Typography>{" "}
                    <br />
                    <SmartphoneIcon
                      style={{ fontSize: "12px", color: "#666666" }}
                    />
                    &nbsp;
                    <Typography variant="caption" style={{ fontSize: "12px" }}>
                      {this.state.providerData.mobileNumber}
                    </Typography>{" "}
                    <br />
                    <HomeIcon style={{ fontSize: "14px", color: "#666666" }} />
                    &nbsp;
                    <Typography variant="caption" style={{ fontSize: "12px" }}>
                      {this.state.providerData.ALineOne},&nbsp;
                      {this.state.providerData.ALineTwo},<br />
                      &nbsp;&nbsp;&nbsp; City - {this.state.providerData.City.replace('Others-','')}
                      ,&nbsp; Country - {this.state.providerData.country},&nbsp;
                      Pin Code - {this.state.providerData.PinCode}
                    </Typography>
                  </div>
                </div>

                <div class="bottom_container box_shadow">
                  <div
                    style={{
                      width: "96%",
                      marginLeft: "2%",
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      color="text"
                      variant="body"
                      style={{ fontSize: "18px" }}
                    >
                      Business Services Info
                      <DescriptionOutlinedIcon
                        style={{
                          float: "right",
                          fontSize: "17px",
                          color: "#006699",
                        }}
                      />
                    </Typography>
                    <br />

                    {this.state.providerData.busChecked != undefined &&
                      this.state.providerData.busChecked.map((expertise) => {
                        return (
                          <span>
                            {expertise.children != undefined &&
                              expertise.children.map((child) => {
                                return (
                                  <span>
                                    {child.children.length > 0 ? (
                                      <span>
                                        <br />
                                        <Typography
                                          variant="caption"
                                          color="text"
                                        >
                                          {child.value}
                                        </Typography>{" "}
                                        &nbsp;{" "}
                                      </span>
                                    ) : (
                                      ""
                                    )}

                                    {child.children != undefined &&
                                      child.children.map((sub_child) => {
                                        return (
                                          <span>
                                            <Chip
                                              size="small"
                                              style={chip_style}
                                              label={sub_child.value}
                                            />
                                            &nbsp;
                                          </span>
                                        );
                                      })}
                                  </span>
                                );
                              })}
                          </span>
                        );
                      })}
                  </div>
                </div>

                <div class="bottom_container box_shadow">
                  <div
                    style={{
                      width: "96%",
                      marginLeft: "2%",
                      textAlign: "left",
                    }}
                  >
                    <Typography
                      color="text"
                      variant="body"
                      style={{ fontSize: "18px" }}
                    >
                      Individual Services Info
                      <DescriptionOutlinedIcon
                        style={{
                          float: "right",
                          fontSize: "17px",
                          color: "#006699",
                        }}
                      />
                    </Typography>
                    <br />

                    {this.state.providerData.indChecked != undefined &&
                      this.state.providerData.indChecked.map((expertise) => {
                        return (
                          <span>
                            {expertise.children != undefined &&
                              expertise.children.map((child) => {
                                return (
                                  <span>
                                    {child.children.length > 0 ? (
                                      <span>
                                        <br />
                                        <Typography
                                          variant="caption"
                                          color="text"
                                        >
                                          {child.value}
                                        </Typography>{" "}
                                        &nbsp;{" "}
                                      </span>
                                    ) : (
                                      ""
                                    )}

                                    {child.children != undefined &&
                                      child.children.map((sub_child) => {
                                        return (
                                          <span>
                                            <Chip
                                              size="small"
                                              style={chip_style}
                                              label={sub_child.value}
                                            />
                                            &nbsp;
                                          </span>
                                        );
                                      })}
                                  </span>
                                );
                              })}
                          </span>
                        );
                      })}
                  </div>
                </div>
              </div>

              <div class="right_profile_container box_shadow">
                <div
                  style={{ width: "94%", marginLeft: "3%", textAlign: "left" }}
                >
                  <Typography
                    color="text"
                    variant="body"
                    style={{ fontSize: "18px" }}
                  >
                    Work Info
                    <DescriptionOutlinedIcon
                      style={{
                        float: "right",
                        fontSize: "17px",
                        color: "#006699",
                      }}
                    />
                    <NotificationsIcon
                      aria-label="more"
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      style={{
                        float: "right",
                        fontSize: "17px",
                        color: "#006699",
                      }}
                      onClick={this.handleClick}
                    />
                    <Menu
                      id="simple-menu"
                      anchor={this.state.anchor}
                      keepMounted
                      open={Boolean(this.state.anchor)}
                      onClose={this.handleClose}
                    >
                      <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                      <MenuItem onClick={this.handleClose}>My account</MenuItem>
                      <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </Menu>
                  </Typography>

                  <div
                    style={{
                      width: "100%",
                      padding: "5%",
                      backgroundColor: "rgba(236, 242, 249,0.7)",
                      marginTop: "10px",
                    }}
                  >
                    <Typography color="Primary" variant="caption">
                      Organisation Info
                    </Typography>
                    <br />

                    <Typography color="text" variant="caption">
                      <FiberManualRecordIcon
                        style={{ fontSize: "8px", color: "#666666" }}
                      />
                      &nbsp; Co. Type {this.state.providerData.idType} <br />
                      <FiberManualRecordIcon
                        style={{ fontSize: "8px", color: "#666666" }}
                      />
                      &nbsp; Reg Id.{" "}
                      {this.state.providerData.OrganizationRegNumber} &nbsp;
                    </Typography>
                  </div>

                  <div
                    style={{
                      width: "100%",
                      padding: "5%",
                      backgroundColor: "rgba(236, 242, 249,0.7)",
                      marginTop: "10px",
                    }}
                  >
                    <Typography color="Primary" variant="caption">
                      Services
                    </Typography>
                    <DescriptionOutlinedIcon
                      style={{
                        float: "right",
                        fontSize: "17px",
                        color: "#006699",
                      }}
                      onClick={this.updateProfile}
                    />
                    <br />

                    {this.state.providerData.servicesOffered != undefined &&
                    this.state.providerData.servicesOffered.length > 0 ? (
                      <div style={{ marginLeft: "-15px" }}>
                        <Accordion
                          style={{
                            background: "none",
                            boxShadow: "none",
                            border: "none",
                          }}
                        >
                          {this.state.update ? (
                            <Dialog
                              open={this.state.update}
                              style={{ width: `2000` }}
                              //   onClose={handleClose}
                              //   PaperComponent={PaperComponent}
                              aria-labelledby="draggable-dialog-title"
                            >
                              <DialogTitle
                                style={{ cursor: "move" }}
                                id="draggable-dialog-title"
                              >
                                Subscribe
                              </DialogTitle>
                              <DialogContent>
                                <DialogContentText>
                                  <Autocomplete
                                    multiple
                                    id="checkboxes-tags-demo"
                                    size="small"
                                    // value={this.state.servicesData}
                                    defaultValue={this.state.servicesData}
                                    options={this.state.servivesList}
                                    disableCloseOnSelect
                                    getOptionLabel={(option) => option}
                                    onChange={(event, value) =>
                                      this.handleSelectedservices(event, value)
                                    }
                                    renderOption={(option, { selected }) => (
                                      <React.Fragment>
                                        <Checkbox
                                          icon={
                                            <CheckBoxOutlineBlankIcon fontSize="small" />
                                          }
                                          checkedIcon={
                                            <CheckBoxIcon fontSize="small" />
                                          }
                                          style={{ marginRight: 8 }}
                                          checked={selected}
                                        />
                                        {option}
                                      </React.Fragment>
                                    )}
                                    className="dropDown"
                                    renderInput={(params) => (
                                      <TextField
                                        {...params}
                                        variant="outlined"
                                        label="Select your service Type"
                                        placeholder=""
                                      />
                                    )}
                                  />
                                </DialogContentText>
                              </DialogContent>
                              <DialogActions>
                                <Button
                                  autoFocus
                                  color="primary"
                                  onClick={this.closeDialog}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  color="primary"
                                  onClick={this.updateService}
                                >
                                  Update
                                </Button>
                              </DialogActions>
                            </Dialog>
                          ) : (
                            <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                              <Typography color="text" variant="caption">
                                {
                                  this.state.providerData.servicesOffered[0]
                                    .name
                                }
                              </Typography>
                            </AccordionSummary>
                          )}

                          <AccordionDetails style={{ marginTop: "-20px" }}>
                            <Typography color="text" variant="caption">
                              {this.state.providerData.servicesOffered !=
                                undefined &&
                                this.state.providerData.servicesOffered.map(
                                  (expertise) => {
                                    return (
                                      <div>
                                        {expertise.name !=
                                        this.state.providerData
                                          .servicesOffered[0].name
                                          ? expertise.name + ","
                                          : ""}
                                      </div>
                                    );
                                  }
                                )}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ) : this.state.providerData.servicesOffered != undefined &&
                      this.state.providerData.servicesOffered[0].name !=
                        undefined ? (
                      !this.state.update ? (
                        //     <Autocomplete
                        //     multiple
                        //     id="checkboxes-tags-demo"
                        //     size="small"

                        //     options={this.state.c}
                        //     disableCloseOnSelect
                        //     getOptionLabel={(option) => option}
                        //     // onChange={(event, value) => this.handleSelectedservices(event, value)}
                        //     renderOption={(option, { selected }) => (
                        //         <React.Fragment>
                        //             <Checkbox
                        //                 icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                        //                 checkedIcon={<CheckBoxIcon fontSize="small" />}
                        //                 style={{ marginRight: 8 }}
                        //                 checked={selected}
                        //             />
                        //             {option}
                        //         </React.Fragment>
                        //     )}
                        //     className="dropDown"
                        //     renderInput={(params) => (
                        //         <TextField {...params} variant="outlined" label="Select your service Type" placeholder="services" />
                        //     )}
                        // />
                        <div>mayank</div>
                      ) : (
                        <Typography color="text" variant="caption">
                          {this.state.providerData.servicesOffered[0].name}
                        </Typography>
                      )
                    ) : (
                      ""
                    )}
                  </div>

                  <div
                    style={{
                      width: "100%",
                      padding: "5%",
                      backgroundColor: "rgba(236, 242, 249,0.7)",
                      marginTop: "5px",
                    }}
                  >
                    <Typography color="Primary" variant="caption">
                      Expertise
                    </Typography>
                    <DescriptionOutlinedIcon
                      style={{
                        float: "right",
                        fontSize: "17px",
                        color: "#006699",
                      }}
                      onClick={this.openUpdateExpertise}
                    />
                    <br />

                    {this.state.providerData.partnerType != undefined &&
                    this.state.providerData.partnerType[0].name != undefined &&
                    this.state.providerData.partnerType.length > 1 ? (
                      <div style={{ marginLeft: "-15px" }}>
                        <Accordion
                          style={{
                            background: "none",
                            boxShadow: "none",
                            border: "none",
                          }}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography color="text" variant="caption">
                              {this.state.providerData.partnerType[0].name}
                            </Typography>
                          </AccordionSummary>

                          <AccordionDetails style={{ marginTop: "-20px" }}>
                            <Typography color="text" variant="caption">
                              {this.state.providerData.partnerType !=
                                undefined &&
                                this.state.providerData.partnerType.map(
                                  (expertise) => {
                                    return (
                                      <span>
                                        {expertise.name !=
                                        this.state.providerData.partnerType[0]
                                          .name
                                          ? expertise.name + ", "
                                          : ""}
                                      </span>
                                    );
                                  }
                                )}
                            </Typography>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    ) : this.state.providerData.partnerType != undefined &&
                      this.state.providerData.partnerType[0].name !=
                        undefined ? (
                      <Typography color="text" variant="caption">
                        {this.state.providerData.partnerType[0].name}
                      </Typography>
                    ) : (
                      ""
                    )}

                    <br />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Dialog
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">update</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Update your details here
                  </DialogContentText>
                  <img src={this.state.providerImg} class="rounded_image"></img>
                  <br />

                  <AddAPhotoIcon
                    style={{
                      backgroundColor: "#fff",
                      color: "#0077b3",
                      fontSize: "25px",
                      border: "1px solid #fff",
                      borderRadius: "50%",
                      marginLeft: "50px",
                      marginTop: "-25px",
                    }}
                  />
                  <br></br>
                  <input
                    accept="image/*"
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={(e) => {
                      this.updatePhoto(e);
                    }}
                  />

                  <TextField
                    autoFocus
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={(e) => {
                      this.change(e);
                    }}
                    fullWidth
                  />
                  <TextField
                    // autoFocus
                    margin="dense"
                    id="name"
                    label="name"
                    type="name"
                    name="name"
                    value={this.state.name}
                    onChange={(e) => {
                      this.change(e);
                    }}
                    fullWidth
                  />
                  <TextField
                    // autoFocus
                    margin="dense"
                    id="phoneno"
                    label="phoneno"
                    type="phoneno"
                    name="phone_number"
                    value={this.state.phone_number}
                    onChange={(e) => {
                      this.change(e);
                    }}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.update} color="primary">
                    Update
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
            {/* <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    open1={this.state.open1}
                    autoHideDuration={3000}
                    onClose={(e,r)=>this.handleClose(e,r)}
                    message={this.state.errorMessage}
                    action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={(e,r)=>this.handleClose(e,r)}>
                            Hide
                        </Button>
                    </React.Fragment>
                    }
                /> */}

            <div class="similar_profiles_heading box_shadow">
              <Typography
                variant="body"
                style={{ fontSize: "20px", color: "#4d4d4d" }}
              >
                Similar profiles in your network area, you may like
              </Typography>
              <br />
              <Typography variant="caption" color="text">
                Inspired by your Interest & Location
              </Typography>
              <br />
              <br />
              <Typography variant="caption">
                <button
                  class="see_more_link_buttons"
                  onClick={similar_profile_location}
                  style={{ color: "#006699", fontSize: "13px" }}
                >
                  More Profiles from {this.state.providerData.City.replace('Others-','')}
                </button>
              </Typography>
              &nbsp; &nbsp;
              {this.state.providerData.partnerType != undefined &&
              this.state.providerData.partnerType[0].name != undefined ? (
                <Typography variant="caption">
                  <button
                    class="see_more_link_buttons"
                    onClick={similar_profile_expertise}
                    style={{ color: "#006699", fontSize: "13px" }}
                  >
                    {" "}
                    More Profiles expertised in{" "}
                    {this.state.providerData.partnerType[0].name}
                  </button>
                </Typography>
              ) : (
                ""
              )}
              &nbsp; &nbsp;
              {this.state.providerData.servicesOffered != undefined &&
              this.state.providerData.servicesOffered[0].name != undefined ? (
                <Typography variant="caption">
                  <button
                    class="see_more_link_buttons"
                    onClick={similar_profile_service}
                    style={{ color: "#006699", fontSize: "13px" }}
                  >
                    {" "}
                    More Profiles serving in{" "}
                    {this.state.providerData.servicesOffered[0].name}
                  </button>
                </Typography>
              ) : (
                ""
              )}
              <div class="navigation_button_div" id="buttons_visibility">
                <div
                  class="sub_navigation_button__div"
                  style={{ float: "right", textAlign: "right" }}
                >
                  <button
                    class="navigation_button box_shadow"
                    onClick={moveright}
                  >
                    <ChevronRightIcon />
                  </button>
                </div>
                <div
                  class="sub_navigation_button_div"
                  style={{ float: "left", textAlign: "left" }}
                >
                  <button
                    class="navigation_button box_shadow"
                    onClick={moveleft}
                  >
                    <ChevronLeftIcon />
                  </button>
                </div>
              </div>
              <span style={{ display: "none" }}>
                {(relevant_city_name = this.state.providerData.City)}
              </span>
              <div class="similar_container" id="similar_profile_location">
                <div class="sim_con">
                  {<Similar_Profiles_location rcn={relevant_city_name}/>}
                </div>
              </div>
              {this.state.providerData.partnerType != undefined &&
              this.state.providerData.partnerType[0].name != undefined ? (
                <span style={{ display: "none" }}>
                  {
                    (relevant_expertise_name = this.state.providerData
                      .partnerType[0].name)
                  }
                </span>
              ) : (
                ""
              )}
              <div class="similar_container" id="similar_profile_expertise">
                <div class="sim_con">
                  {<Similar_Profiles_expertise ren={relevant_expertise_name}/>}
                </div>
              </div>
              {this.state.providerData.servicesOffered != undefined &&
              this.state.providerData.servicesOffered[0].name != undefined ? (
                <span style={{ display: "none" }}>
                  {
                    (relevant_service_name = this.state.providerData
                      .servicesOffered[0].name)
                  }
                </span>
              ) : (
                ""
              )}
              <div class="similar_container" id="similar_profile_service">
                <div class="sim_con">
                  {<Similar_Profiles_service rsn={relevant_service_name}/>}
                </div>
              </div>
            </div>

            <br />
            <br />
          </div>
        ) : (
          <div style={{ marginTop: "250px" }}>
            <CircularProgress color="secondary" />
          </div>
        )}
        <Dialog
          open={this.state.updateExpertise}
          style={{ width: `2000` }}
          //   onClose={handleClose}
          //   PaperComponent={PaperComponent}
          aria-labelledby="draggable-dialog-title"
        >
          <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
            Update
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                size="small"
                // value={this.state.servicesData}
                defaultValue={this.state.expertiseSelected}
                options={this.state.expertiseList}
                disableCloseOnSelect
                getOptionLabel={(option) => option}
                onChange={(event, value) =>
                  this.handleSelectedExpertise(event, value)
                }
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                      checkedIcon={<CheckBoxIcon fontSize="small" />}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </React.Fragment>
                )}
                className="dropDown"
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Select your service Type"
                    placeholder=""
                  />
                )}
              />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus color="primary" onClick={this.closeDialog}>
              Cancel
            </Button>
            <Button color="primary" onClick={this.updateExpertise}>
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
