webpackJsonp([16],{1036:function(module,__webpack_exports__,__webpack_require__){"use strict";var __WEBPACK_IMPORTED_MODULE_0_react__=__webpack_require__(0);var __WEBPACK_IMPORTED_MODULE_0_react___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);var __WEBPACK_IMPORTED_MODULE_1_react_router__=__webpack_require__(406);var __WEBPACK_IMPORTED_MODULE_2_redux__=__webpack_require__(16);var __WEBPACK_IMPORTED_MODULE_3_react_redux__=__webpack_require__(22);var __WEBPACK_IMPORTED_MODULE_4_react_router_dom__=__webpack_require__(37);var __WEBPACK_IMPORTED_MODULE_5_material_ui__=__webpack_require__(217);var __WEBPACK_IMPORTED_MODULE_6_material_ui_Dialog__=__webpack_require__(91);var __WEBPACK_IMPORTED_MODULE_6_material_ui_Dialog___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_material_ui_Dialog__);var __WEBPACK_IMPORTED_MODULE_7_material_ui_FlatButton__=__webpack_require__(67);var __WEBPACK_IMPORTED_MODULE_7_material_ui_FlatButton___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_material_ui_FlatButton__);var __WEBPACK_IMPORTED_MODULE_8_reactstrap__=__webpack_require__(41);var __WEBPACK_IMPORTED_MODULE_9__modules_account_actions__=__webpack_require__(66);var __WEBPACK_IMPORTED_MODULE_10__modules_ui_actions__=__webpack_require__(65);var __WEBPACK_IMPORTED_MODULE_11__modules_user_actions__=__webpack_require__(42);var __WEBPACK_IMPORTED_MODULE_12__css_StyleVariables__=__webpack_require__(216);var __WEBPACK_IMPORTED_MODULE_13__Login_css__=__webpack_require__(420);var __WEBPACK_IMPORTED_MODULE_13__Login_css___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13__Login_css__);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var submitLogin;var Login=function(_Component){_inherits(Login,_Component);function Login(){_classCallCheck(this,Login);var _this=_possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this));_this.componentWillReceiveProps=function(nextProps){if(nextProps.user.profile){_this.setState({loggedIn:true})}if(nextProps.shouldCall){_this.submitLogin()}if(nextProps.loginResults){var newError=nextProps.loginResults.error;var newForm=Object.assign({},_this.state.form);if(newError){newForm.password="";setTimeout(function(){_this.refs.username.focus()},10)}_this.setState(Object.assign({},_this.state,{error:Object.assign({},newError),form:Object.assign({},newForm)}))}};_this.handleFormChange=function(e){_this.setState({form:Object.assign({},_this.state.form,_defineProperty({},e.target.name,e.target.value))});if(!e.target.value||e.target.value===undefined||e.target.value===""){_this.setState({error:Object.assign({},_this.state.error,_defineProperty({},e.target.name,e.target.name+" is required"))})}else{_this.setState({error:Object.assign({},_this.state.error,_defineProperty({},e.target.name,""))})}};_this.handleSubmit=function(e){e.preventDefault();_this.submitLogin();if(_this.props.loginRedirect){_this.props.history.push(_this.props.loginRedirect)}};_this.submitLogin=function(){_this.props.requestLogin(_this.state.form)};_this.onLogin=function(){_this.setState({callLogin:true})};_this.dialogClose=function(){_this.setState({dialogOpen:false})};_this.dialogOpen=function(){_this.setState({dialogOpen:true})};_this.resetEmailInputChange=function(e){var emailInput=e.target.value;_this.setState({resetPwd:{email:emailInput}})};_this.sendResetPwd=function(e){e.preventDefault();console.log("send pass reset email via state",_this.state.resetPwd.email);if(_this.state.resetPwd.email){_this.props.requestCommandParser({action:"sendResetPwd",value:{emailAddress:_this.state.resetPwd.email}});console.log("send email with payload",_this.state.resetPwd.email)}};_this.state={form:{username:"",password:""},error:{username:"",password:""},callLogin:false,dialogOpen:false,resetPwd:{email:""}};return _this}_createClass(Login,[{key:"render",value:function render(){var dialogActions=[__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_material_ui_FlatButton___default.a,{label:"Submit",onClick:this.sendResetPwd}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_7_material_ui_FlatButton___default.a,{label:"Cancel",onClick:this.dialogClose})];return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"login-page"},this.state.loggedIn&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_1_react_router__["a"],{to:"/"}),"Redirect"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h3",null,"Enter Credentials to Login"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("form",{onSubmit:this.handleSubmit},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui__["d"],{autoFocus:true,id:"username",name:"username",hintText:"Username",ref:"username",value:this.state.form.username,errorText:this.props.loginErrorMessage,onChange:this.handleFormChange,fullWidth:true,floatingLabelText:"Username",floatingLabelStyle:__WEBPACK_IMPORTED_MODULE_12__css_StyleVariables__["l"].floatingLabelStyle,underlineFocusStyle:__WEBPACK_IMPORTED_MODULE_12__css_StyleVariables__["l"].underlineFocusStyle}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui__["d"],{id:"password",name:"password",type:"password",hintText:"Password",value:this.state.form.password,errorText:this.state.error.password,onChange:this.handleFormChange,fullWidth:true,floatingLabelText:"Password",floatingLabelStyle:__WEBPACK_IMPORTED_MODULE_12__css_StyleVariables__["l"].floatingLabelStyle,underlineFocusStyle:__WEBPACK_IMPORTED_MODULE_12__css_StyleVariables__["l"].underlineFocusStyle,style:{marginBottom:"10px"}}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{style:{color:__WEBPACK_IMPORTED_MODULE_12__css_StyleVariables__["d"]},onClick:this.dialogOpen},"Forgot Password"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6_material_ui_Dialog___default.a,{title:"Reset Password",titleStyle:{color:__WEBPACK_IMPORTED_MODULE_12__css_StyleVariables__["d"]},actions:dialogActions,modal:false,open:this.state.dialogOpen,onRequestClose:this.dialogClose,style:{textAlign:"center"}},"Enter your email to get instructions on how to reset password",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_reactstrap__["m"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_reactstrap__["n"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_material_ui__["d"],{className:"profile-data__textfield",name:"resetPasswordEmail",hintText:"email@email.com",errorText:this.props.noUserError&&this.props.noUserError.data.message,onChange:this.resetEmailInputChange,floatingLabelText:"Email",floatingLabelStyle:__WEBPACK_IMPORTED_MODULE_12__css_StyleVariables__["l"].floatingLabelStyle,underlineFocusStyle:__WEBPACK_IMPORTED_MODULE_12__css_StyleVariables__["l"].underlineFocusStyle})))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_8_reactstrap__["e"],{type:"submit",style:{display:"block",margin:"20px 0"}},"Login")))}}]);return Login}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);function mapStateToProps(appState,ownProps){console.log(ownProps);var loginErrorMessage=appState.user.loginError&&appState.user.loginError.message;if(loginErrorMessage==="Invalid Auth Token-ws")loginErrorMessage=void 0;return{user:appState.user,loginErrorMessage:loginErrorMessage,noUserError:appState.account&&appState.account.commandParserResults}}function mapDispatchToProps(dispatch){var props=Object(__WEBPACK_IMPORTED_MODULE_2_redux__["b"])({requestLogin:__WEBPACK_IMPORTED_MODULE_11__modules_user_actions__["J"],requestShowLoginForm:__WEBPACK_IMPORTED_MODULE_10__modules_ui_actions__["w"],requestCommandParser:__WEBPACK_IMPORTED_MODULE_9__modules_account_actions__["Q"]},dispatch);return props}__webpack_exports__["a"]=Object(__WEBPACK_IMPORTED_MODULE_1_react_router__["b"])(Object(__WEBPACK_IMPORTED_MODULE_3_react_redux__["b"])(mapStateToProps,mapDispatchToProps)(Login))},986:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});var __WEBPACK_IMPORTED_MODULE_0_react__=__webpack_require__(0);var __WEBPACK_IMPORTED_MODULE_0_react___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);var __WEBPACK_IMPORTED_MODULE_1__lib_Authorize__=__webpack_require__(108);var __WEBPACK_IMPORTED_MODULE_2_react_redux__=__webpack_require__(22);var __WEBPACK_IMPORTED_MODULE_3_react_router_dom__=__webpack_require__(37);var __WEBPACK_IMPORTED_MODULE_4_redux__=__webpack_require__(16);var __WEBPACK_IMPORTED_MODULE_5_reactstrap__=__webpack_require__(41);var __WEBPACK_IMPORTED_MODULE_6__Login__=__webpack_require__(1036);var __WEBPACK_IMPORTED_MODULE_7__modules_ui_actions__=__webpack_require__(65);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Example=function(_Component){_inherits(Example,_Component);function Example(){_classCallCheck(this,Example);var _this=_possibleConstructorReturn(this,(Example.__proto__||Object.getPrototypeOf(Example)).call(this));_this.componentDidMount=function(){if(_this.props.location.pathname==="/login"){_this.setState({isVisible:true});_this.interval=0}else{_this.interval=setTimeout(function(){_this.setState({isVisible:true})},1500)}};_this.componentWillUnmount=function(){clearTimeout(_this.interval)};_this.state={};return _this}_createClass(Example,[{key:"render",value:function render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_reactstrap__["h"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_reactstrap__["D"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_reactstrap__["f"],{xs:"12",md:"2"}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_reactstrap__["f"],{xs:"12",md:"8"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"main-content"},this.state.isVisible&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_6__Login__["a"],this.props))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_5_reactstrap__["f"],{xs:"12",md:"2"})))}}]);return Example}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);function mapStateToProps(appState){return{}}function mapDispatchToProps(dispatch){return Object.assign({},Object(__WEBPACK_IMPORTED_MODULE_4_redux__["b"])({requestShowLoginForm:__WEBPACK_IMPORTED_MODULE_7__modules_ui_actions__["w"]},dispatch))}__webpack_exports__["default"]=Object(__WEBPACK_IMPORTED_MODULE_2_react_redux__["b"])(mapStateToProps,mapDispatchToProps)(Example)}});