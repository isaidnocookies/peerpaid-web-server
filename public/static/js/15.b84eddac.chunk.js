webpackJsonp([15],{1144:function(module,exports,__webpack_require__){var content=__webpack_require__(1145);if(typeof content==="string")content=[[module.i,content,""]];var transform;var options={hmr:false};options.transform=transform;var update=__webpack_require__(976)(content,options);if(content.locals)module.exports=content.locals},1145:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(975)(true);exports.push([module.i,'.block-about-us{padding:20px;text-align:center}.about-img{display:block;max-width:100%;height:auto}.about-container{padding-top:20px;display:block}.home-divider{height:40px}.home-divider20{height:20px}.home-parallax{color:#fff;background-image:url("/img/bg-login.png");height:250px;background-attachment:fixed;background-position:50%;background-repeat:no-repeat;background-size:cover;text-align:center}.team-title{font-size:32px;color:#32ac65;text-transform:uppercase;text-align:center}.profile-text{padding:10px;text-align:justify;text-justify:inter-word;font-size:.8em}',"",{version:3,sources:["/Users/thelazycoder/Repos/peerpaid/peerpaid-web-client/src/components/AboutUs/AboutUs.css"],names:[],mappings:"AAIA,gBACI,aAAa,AACb,iBAAmB,CACtB,AAED,WACI,cAAe,AACf,eAAgB,AAChB,WAAa,CAChB,AAED,iBACI,iBAAiB,AACjB,aAAe,CAClB,AAED,cACE,WAAY,CACb,AAED,gBACE,WAAY,CACb,AAED,eACE,WAAY,AAEZ,0CAA2C,AAG3C,aAAc,AAGd,4BAA6B,AAC7B,wBAA4B,AAC5B,4BAA6B,AAC7B,sBAAuB,AACvB,iBAAmB,CACpB,AAED,YACE,eAAe,AACf,cAAc,AACd,yBAA0B,AAC1B,iBAAkB,CACnB,AAED,cACE,aAAc,AACd,mBAAoB,AACpB,wBAAyB,AACzB,cAAgB,CACjB",file:"AboutUs.css",sourcesContent:['/*\n  src/components/AboutUs.css\n*/\n\n.block-about-us {\n    padding:20px;\n    text-align: center;\n}\n\n.about-img {\n    display: block;\n    max-width: 100%;\n    height: auto;\n}\n\n.about-container {\n    padding-top:20px;\n    display: block;\n}\n\n.home-divider {\n  height:40px;\n}\n\n.home-divider20 {\n  height:20px;\n}\n\n.home-parallax {\n  color: #fff;\n  /* The image used */\n  background-image: url("/img/bg-login.png");\n\n  /* Set a specific height */\n  height: 250px;\n  \n  /* Create the parallax scrolling effect */\n  background-attachment: fixed;\n  background-position: center;\n  background-repeat: no-repeat;\n  background-size: cover;\n  text-align: center;\n}\n\n.team-title {\n  font-size:32px;\n  color:#32ac65;\n  text-transform: uppercase;\n  text-align:center;\n}\n\n.profile-text {\n  padding: 10px;\n  text-align: justify;\n  text-justify: inter-word;\n  font-size: .8em;\n}\n'],sourceRoot:""}])},982:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});var __WEBPACK_IMPORTED_MODULE_0_react__=__webpack_require__(0);var __WEBPACK_IMPORTED_MODULE_0_react___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);var __WEBPACK_IMPORTED_MODULE_1_react_redux__=__webpack_require__(22);var __WEBPACK_IMPORTED_MODULE_2_redux__=__webpack_require__(16);var __WEBPACK_IMPORTED_MODULE_3_reactstrap__=__webpack_require__(41);var __WEBPACK_IMPORTED_MODULE_4__AboutUs_css__=__webpack_require__(1144);var __WEBPACK_IMPORTED_MODULE_4__AboutUs_css___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__AboutUs_css__);var __WEBPACK_IMPORTED_MODULE_5__modules_ui_actions__=__webpack_require__(65);var __WEBPACK_IMPORTED_MODULE_6__lib_Authorize__=__webpack_require__(108);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var AboutUs=function(_Component){_inherits(AboutUs,_Component);function AboutUs(){var _ref;var _temp,_this,_ret;_classCallCheck(this,AboutUs);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=AboutUs.__proto__||Object.getPrototypeOf(AboutUs)).call.apply(_ref,[this].concat(args))),_this),_this.handleSignup=function(e){if(e&&typeof e.preventDefault==="function")e.preventDefault();_this.props.requestShowSignupForm(true)},_temp),_possibleConstructorReturn(_this,_ret)}_createClass(AboutUs,[{key:"render",value:function render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"mje-main-wrapper diplomat"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["h"],{fluid:true},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["D"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["h"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["D"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"about-container"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:12,md:12,lg:12},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("img",{className:"about-img",src:"/img/about-top.png",alt:""}))))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["D"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:12,md:12,lg:12},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"block-about-us"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"location-text"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("strong",null,"Peer Paid - HQ"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"BITPPEU SERVICES LTD No. 11080104",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Victory House, 205, ",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Archbishop Makarios ",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Avenue, Limassol, 3030, Cyprus",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Office: +442033189188")))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["D"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:12,md:4,lg:4},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"block-about-us"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"location-text"},"Nevis",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Lampa Hill St. Johns Parish, Nevis",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"License # 292348202"))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:12,md:4,lg:4},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"block-about-us"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"location-text"},"UK",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"72 High Street",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Haslemere, Surrey GU27 2LA",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null)))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:12,md:4,lg:4},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"block-about-us"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"location-text"},"Belize",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Suite 102, Ground Floor, Blake BuildingCorner",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Eyre and Hutson Streets Belize City, Belize")))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["D"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:12,md:12,lg:12},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"block-about-us"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"location-text"},"Customer Support",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"1-855-259-4618 *1",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{href:"mailto:info@peerpaid.com"},"info@peerpaid.com"))))))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["D"],{className:"home-divider"}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["D"],{className:"home-parallax"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:12,md:12},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h1",null,"Join Now"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h4",null,"Thank you for showing an interest in PeerPaid"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["D"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:"3"}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:"auto"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"signup-container"},this.props.auth.user&&__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["z"],{className:"btn btn-primary",href:"/profile"},"View your Profile")||__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("form",{onSubmit:this.handleSignup},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["e"],{color:"primary",style:{float:"right"}},"Sign Up Today!")))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:"3"})))))))}}]);return AboutUs}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);function mapStateToProps(appState,ownProps){return Object.assign({},ownProps)}function mapDispatchToProps(dispatch){return Object.assign({},Object(__WEBPACK_IMPORTED_MODULE_2_redux__["b"])({requestShowSignupForm:__WEBPACK_IMPORTED_MODULE_5__modules_ui_actions__["x"]},dispatch))}__webpack_exports__["default"]=Object(__WEBPACK_IMPORTED_MODULE_6__lib_Authorize__["a"])(Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b"])(mapStateToProps,mapDispatchToProps)(AboutUs))}});