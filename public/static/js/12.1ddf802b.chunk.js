webpackJsonp([12],{1051:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});var __WEBPACK_IMPORTED_MODULE_0_react__=__webpack_require__(0);var __WEBPACK_IMPORTED_MODULE_0_react___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);var __WEBPACK_IMPORTED_MODULE_1_react_router_dom__=__webpack_require__(15);var __WEBPACK_IMPORTED_MODULE_2_react_redux__=__webpack_require__(13);var __WEBPACK_IMPORTED_MODULE_3_redux__=__webpack_require__(10);var __WEBPACK_IMPORTED_MODULE_4_reactstrap__=__webpack_require__(20);var __WEBPACK_IMPORTED_MODULE_5_util__=__webpack_require__(157);var __WEBPACK_IMPORTED_MODULE_5_util___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_util__);var __WEBPACK_IMPORTED_MODULE_6_password_sheriff__=__webpack_require__(239);var __WEBPACK_IMPORTED_MODULE_6_password_sheriff___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_password_sheriff__);var __WEBPACK_IMPORTED_MODULE_7_email_validator__=__webpack_require__(440);var __WEBPACK_IMPORTED_MODULE_7_email_validator___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_email_validator__);var __WEBPACK_IMPORTED_MODULE_8_uuid_v4__=__webpack_require__(242);var __WEBPACK_IMPORTED_MODULE_8_uuid_v4___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_uuid_v4__);var __WEBPACK_IMPORTED_MODULE_9_material_ui_TextField__=__webpack_require__(77);var __WEBPACK_IMPORTED_MODULE_9_material_ui_TextField___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_material_ui_TextField__);var __WEBPACK_IMPORTED_MODULE_10_react_google_recaptcha__=__webpack_require__(449);var __WEBPACK_IMPORTED_MODULE_10_react_google_recaptcha___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_react_google_recaptcha__);var __WEBPACK_IMPORTED_MODULE_11__modules_user_actions__=__webpack_require__(24);var __WEBPACK_IMPORTED_MODULE_12__modules_ui_actions__=__webpack_require__(58);var __WEBPACK_IMPORTED_MODULE_13__PeerPaidUI_PeerpaidButton__=__webpack_require__(101);var __WEBPACK_IMPORTED_MODULE_14__Register_css__=__webpack_require__(450);var __WEBPACK_IMPORTED_MODULE_14__Register_css___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14__Register_css__);var __WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__=__webpack_require__(76);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Register=function(_Component){_inherits(Register,_Component);function Register(){_classCallCheck(this,Register);var _this=_possibleConstructorReturn(this,(Register.__proto__||Object.getPrototypeOf(Register)).call(this));_this.policyPass=function(value){return _this.passwordPolicies.reduce(function(policy,policy2){if(typeof policy==="boolean"){return policy&&policy2.check(value)}else{return policy.check(value)&&policy2.check(value)}})};_this.policyExplain=function(value){var explanation="";_this.passwordPolicies.forEach(function(policy){if(!policy.check(value)){if(explanation.length>0){explanation+="\n"}var explain=policy.explain();var result=__WEBPACK_IMPORTED_MODULE_5_util___default.a.format.apply(__WEBPACK_IMPORTED_MODULE_5_util___default.a,[explain[0].message].concat(_toConsumableArray(explain[0].format)));if(explain[0].items)result+="\n\t"+explain[0].items.map(function(item){return item.message}).join("\n\t");explanation+=result}});return explanation};_this.handleFormChange=function(e){_this.setState({form:Object.assign({},_this.state.form,_defineProperty({},e.target.name,e.target.value))});if(e.target.name==="password"&&_this.policyPass()===false){_this.setState({error:Object.assign({},_this.state.error,_defineProperty({},e.target.name,_this.policyExplain(e.target.value)))})}else if(e.target.name==="password2"&&e.target.value!==_this.state.form.password){_this.setState({error:Object.assign({},_this.state.error,_defineProperty({},e.target.name,"Passwords must match"))})}else if(e.target.name==="emailAddress"&&__WEBPACK_IMPORTED_MODULE_7_email_validator___default.a.validate(e.target.value)===false){_this.setState({error:Object.assign({},_this.state.error,_defineProperty({},e.target.name,"Must Use a Valid Email"))})}else if(!e.target.value||e.target.value===undefined||e.target.value===""){if(e.target.name!=="middleName"){_this.setState({error:Object.assign({},_this.state.error,_defineProperty({},e.target.name,e.target.name+" is required"))})}}else{_this.setState({error:Object.assign({},_this.state.error,_defineProperty({},e.target.name,""))})}};_this.handleSubmit=function(e){e.preventDefault();_this.submitRegistration();_this.props.history.push("/coming-soon");_this.props.requestAlert({color:"success",alertText:"Thank you for registering!"})};_this.submitRegistration=function(){_this.props.requestSignup(_this.state.form)};_this.onCaptchaChange=function(value){_this.setState({form:Object.assign({},_this.state.form,{captcha:value})})};_this.onRegisterLogin=function(){_this.props.requestShowSignupForm(false);_this.props.requestShowLoginForm(true)};_this.componentWillMount=function(){_this.setState({form:Object.assign({},_this.state.form,_this.props.signupPrefill),error:Object.assign({},_this.props.user.signupFailed&&_this.props.user.signupFailed.data)})};_this.componentWillReceiveProps=function(nextProps){if(nextProps.shouldCall){_this.submitRegistration()}if(nextProps.callRegistration){_this.submitRegistration();nextProps.onRegistrationCalled()}if(nextProps.signupFailed&&nextProps.signupFailed.data){_this.setState({error:nextProps.signupFailed.data})}};_this.submitRegisterForm=function(e){e.preventDefault();document.getElementById("register-form").submit()};_this.state={form:{uuid:"",username:"",password:"",password2:"",firstName:"",middleName:"",lastName:"",emailAddress:"",captcha:"TEST"},error:{username:"",password:"",password2:"",firstName:"",middleName:"",lastName:"",emailAddress:"",captcha:""}};_this.passwordPolicies=[new __WEBPACK_IMPORTED_MODULE_6_password_sheriff___default.a.PasswordPolicy({length:{minLength:6}}),new __WEBPACK_IMPORTED_MODULE_6_password_sheriff___default.a.PasswordPolicy({containsAtLeast:{atLeast:3,expressions:[__WEBPACK_IMPORTED_MODULE_6_password_sheriff___default.a.charsets.lowerCase,__WEBPACK_IMPORTED_MODULE_6_password_sheriff___default.a.charsets.upperCase,__WEBPACK_IMPORTED_MODULE_6_password_sheriff___default.a.charsets.numbers,__WEBPACK_IMPORTED_MODULE_6_password_sheriff___default.a.charsets.specialCharacters]}}),new __WEBPACK_IMPORTED_MODULE_6_password_sheriff___default.a.PasswordPolicy({identicalChars:{max:3}})];return _this}_createClass(Register,[{key:"render",value:function render(){var registerCompleteComponent=__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["d"],{to:"/profile"},"Redirect to Profile");var registerIncompleteComponent=__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["D"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["f"],{xs:"12",md:"6"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_material_ui_TextField___default.a,{autoFocus:true,id:"username",name:"username",hintText:"Username",value:this.state.form.username,errorText:this.state.error.username,onChange:this.handleFormChange,fullWidth:true,floatingLabelStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].floatingLabelStyle,underlineFocusStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].underlineFocusStyle}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_material_ui_TextField___default.a,{id:"password",name:"password",type:"password",hintText:"Password",errorStyle:{whiteSpace:"pre"},value:this.state.form.password,errorText:this.state.error.password,onChange:this.handleFormChange,fullWidth:true,floatingLabelStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].floatingLabelStyle,underlineFocusStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].underlineFocusStyle}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_material_ui_TextField___default.a,{id:"password2",name:"password2",type:"password",hintText:"Confirm Password",value:this.state.form.password2,errorText:this.state.error.password2,onChange:this.handleFormChange,fullWidth:true,floatingLabelStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].floatingLabelStyle,underlineFocusStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].underlineFocusStyle}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_material_ui_TextField___default.a,{id:"emailAddress",name:"emailAddress",hintText:"Email Address",value:this.state.form.emailAddress,errorText:this.state.error.emailAddress,onChange:this.handleFormChange,fullWidth:true,floatingLabelStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].floatingLabelStyle,underlineFocusStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].underlineFocusStyle})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["f"],{xs:"12",md:"6"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_material_ui_TextField___default.a,{id:"firstName",name:"firstName",hintText:"First Name",value:this.state.form.firstName,errorText:this.state.error.firstName,onChange:this.handleFormChange,fullWidth:true,floatingLabelStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].floatingLabelStyle,underlineFocusStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].underlineFocusStyle}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_material_ui_TextField___default.a,{id:"middleName",name:"middleName",hintText:"Middle Name",value:this.state.form.middleName,errorText:this.state.error.middleName,onChange:this.handleFormChange,fullWidth:true,floatingLabelStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].floatingLabelStyle,underlineFocusStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].underlineFocusStyle}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_9_material_ui_TextField___default.a,{id:"lastName",name:"lastName",hintText:"Last Name",value:this.state.form.lastName,errorText:this.state.error.lastName,onChange:this.handleFormChange,fullWidth:true,floatingLabelStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].floatingLabelStyle,underlineFocusStyle:__WEBPACK_IMPORTED_MODULE_15__css_StyleVariables__["l"].underlineFocusStyle}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",null,"Already A Member ",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router_dom__["b"],{to:"/login",className:"pp--blue-light"},"Login"))));var RegisterComponent=this.props.registerCompleted?registerCompleteComponent:registerIncompleteComponent;return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["h"],{className:"main-content pp--page"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"bg-logo-gray"}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["D"],{className:"paddingTB30"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["f"],{xs:"12"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h3",{className:"pp--green pp--trajanpro-r center"},"Register")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"pp--separator"})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("form",{onSubmit:this.handleSubmit,id:"register-form",className:"padding30 pp--border"},RegisterComponent,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_4_reactstrap__["e"],{type:"submit",className:"btn Peerpaid-button__button Peerpaid-button--blue-light pp--trajanpro-r marginTB30"},"Register")))}}]);return Register}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);function mapStateToProps(appState){var result={user:appState.user,signupPrefill:appState.ui.signupPrefill,registerCompleted:appState.user.registerCompleted,signupFailed:appState.user.signupFailed};return result}function mapDispatchToProps(dispatch){return Object(__WEBPACK_IMPORTED_MODULE_3_redux__["b"])({requestSignup:__WEBPACK_IMPORTED_MODULE_11__modules_user_actions__["M"],requestShowSignupForm:__WEBPACK_IMPORTED_MODULE_12__modules_ui_actions__["x"],requestShowLoginForm:__WEBPACK_IMPORTED_MODULE_12__modules_ui_actions__["w"],requestAlert:__WEBPACK_IMPORTED_MODULE_11__modules_user_actions__["H"],requestRemoveAlert:__WEBPACK_IMPORTED_MODULE_11__modules_user_actions__["L"]},dispatch)}__webpack_exports__["default"]=Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["b"])(mapStateToProps,mapDispatchToProps)(Register)}});