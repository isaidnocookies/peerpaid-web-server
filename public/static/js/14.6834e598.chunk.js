webpackJsonp([14],{1153:function(module,exports,__webpack_require__){var content=__webpack_require__(1154);if(typeof content==="string")content=[[module.i,content,""]];var transform;var options={hmr:false};options.transform=transform;var update=__webpack_require__(968)(content,options);if(content.locals)module.exports=content.locals},1154:function(module,exports,__webpack_require__){exports=module.exports=__webpack_require__(967)(true);exports.push([module.i,".modern-about-us .support-contact{-ms-flex-pack:center;justify-content:center}.modern-about-us .support-contact>div{margin:0 10px}.modern-about-us .about-us-map{background-image:url(/img/about_us_map.png);background-size:90%;width:100%;height:70vh;background-position:50%;background-repeat:no-repeat;margin:auto}@media (min-width:992px){.modern-about-us .about-us-map{height:400px}}@media (min-width:1200px){.modern-about-us .about-us-map{height:500px}}","",{version:3,sources:["/Users/jmckinley/Repos/peerpaid/peerpaid-web-client/src/components/AboutUsNew/AboutUs.css"],names:[],mappings:"AAIA,kCACE,qBAAsB,AAClB,sBAAuB,CAC5B,AACD,sCACE,aAAe,CAChB,AACD,+BACE,4CAA6C,AAE7C,oBAAqB,AACrB,WAAY,AAEZ,YAAa,AACb,wBAA4B,AAC5B,4BAA6B,AAC7B,WAAa,CACd,AACD,yBACE,+BACE,YAAc,CACf,CACF,AACD,0BACE,+BACE,YAAc,CACf,CACF",file:"AboutUs.css",sourcesContent:["/*\n  src/components/AboutUsNew.css\n*/\n\n.modern-about-us .support-contact {\n  -ms-flex-pack: center;\n      justify-content: center\n}\n.modern-about-us .support-contact > div{\n  margin: 0 10px;\n}\n.modern-about-us .about-us-map {\n  background-image: url(/img/about_us_map.png);\n  /* background-size: 300px; */\n  background-size: 90%;\n  width: 100%;\n  /* height: 500px; */\n  height: 70vh;\n  background-position: center;\n  background-repeat: no-repeat;\n  margin: auto;\n}\n@media (min-width: 992px) {\n  .modern-about-us .about-us-map {\n    height: 400px;\n  }\n}\n@media (min-width: 1200px) {\n  .modern-about-us .about-us-map {\n    height: 500px;\n  }\n}\n"],sourceRoot:""}])},975:function(module,__webpack_exports__,__webpack_require__){"use strict";Object.defineProperty(__webpack_exports__,"__esModule",{value:true});var __WEBPACK_IMPORTED_MODULE_0_react__=__webpack_require__(0);var __WEBPACK_IMPORTED_MODULE_0_react___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);var __WEBPACK_IMPORTED_MODULE_1_react_redux__=__webpack_require__(20);var __WEBPACK_IMPORTED_MODULE_2_redux__=__webpack_require__(16);var __WEBPACK_IMPORTED_MODULE_3_reactstrap__=__webpack_require__(42);var __WEBPACK_IMPORTED_MODULE_4__AboutUs_css__=__webpack_require__(1153);var __WEBPACK_IMPORTED_MODULE_4__AboutUs_css___default=__webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__AboutUs_css__);var __WEBPACK_IMPORTED_MODULE_5__modules_ui_actions__=__webpack_require__(55);var __WEBPACK_IMPORTED_MODULE_6__lib_Authorize__=__webpack_require__(107);var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var AboutUs=function(_Component){_inherits(AboutUs,_Component);function AboutUs(){var _ref;var _temp,_this,_ret;_classCallCheck(this,AboutUs);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=AboutUs.__proto__||Object.getPrototypeOf(AboutUs)).call.apply(_ref,[this].concat(args))),_this),_this.handleSignup=function(e){if(e&&typeof e.preventDefault==="function")e.preventDefault();_this.props.requestShowSignupForm(true)},_temp),_possibleConstructorReturn(_this,_ret)}_createClass(AboutUs,[{key:"componentDidMount",value:function componentDidMount(){setTimeout(function(){window.scrollTo(0,0)},1)}},{key:"render",value:function render(){return __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["h"],{className:"modern-about-us main-content pp--page"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"bg-logo-gray"}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["E"],{className:"paddingTB30"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:"12"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h3",{className:"pp--green pp--trajanpro-r center"},"Global Bitcoin ",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("span",{className:"pp--blue-light"},"Exchange"))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"pp--separator"})),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["E"],{className:"paddingTB30"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:"12"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h5",{className:"pp--green pp--trajanpro-r center"},"Customer Support")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:"12",className:"support-contact inline-wrap"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"inline-wrap"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i",{className:"fa fa-map-marker pp--green"}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{href:"tel:+44-203-318-9188"},"+44-203-318-9188")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("div",{className:"inline-wrap"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("i",{className:"fa fa-envelope pp--green"}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("a",{href:"mailto:info@peerpaid.com"},"support@peerpaid.freshdesk.com")))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["E"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:"12",className:"about-us-map hidden-sm-down pp--border"}),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:"12",className:"about-us-text hidden-md-up center"},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["E"],null,__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:12},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h5",{className:"pp--green pp--trajanpro-r center"},"Peer Paid - HQ"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"location-text"},"BITPPEU SERVICES LTD No. 11080104",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Victory House, 205, ",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Archbishop Makarios Avenue,",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Limassol, 3030, Cyprus",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Office: +442033189188")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:12},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h5",{className:"pp--green pp--trajanpro-r center"},"Nevis"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"location-text"},"Lampa Hill St. Johns Parish, Nevis",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"License # 292348202")),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:12},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h5",{className:"pp--green pp--trajanpro-r center"},"UK"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"location-text"},"72 High Street",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Haslemere, Surrey GU27 2LA",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null))),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_3_reactstrap__["f"],{xs:12},__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("h5",{className:"pp--green pp--trajanpro-r center"},"Belize"),__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("p",{className:"location-text"},"Suite 102, Ground Floor, Blake BuildingCorner",__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement("br",null),"Eyre and Hutson Streets Belize City, Belize"))))))}}]);return AboutUs}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);function mapStateToProps(appState,ownProps){return Object.assign({},ownProps)}function mapDispatchToProps(dispatch){return Object.assign({},Object(__WEBPACK_IMPORTED_MODULE_2_redux__["b"])({requestShowSignupForm:__WEBPACK_IMPORTED_MODULE_5__modules_ui_actions__["F"]},dispatch))}__webpack_exports__["default"]=Object(__WEBPACK_IMPORTED_MODULE_6__lib_Authorize__["a"])(Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b"])(mapStateToProps,mapDispatchToProps)(AboutUs))}});