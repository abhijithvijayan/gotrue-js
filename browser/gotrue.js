(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _pagination=require("./pagination");function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var API=function(){function API(apiURL){_classCallCheck(this,API);this.apiURL=apiURL}_createClass(API,[{key:"headers",value:function headers(){var _headers=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return _extends({"Content-Type":"application/json"},_headers)}},{key:"parseJsonResponse",value:function parseJsonResponse(response){return response.json().then(function(json){if(!response.ok){return Promise.reject(json)}var pagination=(0,_pagination.getPagination)(response);return pagination?{pagination:pagination,items:json}:json})}},{key:"request",value:function request(path){var _this=this;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var headers=this.headers(options.headers||{});return fetch(this.apiURL+path,_extends({},options,{headers:headers})).then(function(response){var contentType=response.headers.get("Content-Type");if(contentType&&contentType.match(/json/)){return _this.parseJsonResponse(response)}return response.text().then(function(data){if(!response.ok){return Promise.reject({data:data})}return{data:data}})})}}]);return API}();exports.default=API},{"./pagination":2}],2:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i["return"])_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError("Invalid attempt to destructure non-iterable instance")}}}();exports.getPagination=getPagination;function getPagination(response){var links=response.headers.get("Link");var pagination={};if(links==null){return null}links=links.split(",");var total=response.headers.get("X-Total-Count");for(var i=0,len=links.length;i<len;i++){var link=links[i].replace(/(^\s*|\s*$)/,"");var _link$split=link.split(";");var _link$split2=_slicedToArray(_link$split,2);var url=_link$split2[0];var rel=_link$split2[1];var m=url.match(/page=(\d+)/);var page=m&&parseInt(m[1],10);if(rel.match(/last/)){pagination.last=page}else if(rel.match(/next/)){pagination.next=page}else if(rel.match(/prev/)){pagination.prev=page}else if(rel.match(/first/)){pagination.first=page}}pagination.last=Math.max(pagination.last||0,pagination.prev&&pagination.prev+1||0);pagination.current=pagination.next?pagination.next-1:pagination.last||1;pagination.total=total?parseInt(total,10):null;return pagination}},{}],3:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var Admin=function(){function Admin(user){_classCallCheck(this,Admin);this.user=user}_createClass(Admin,[{key:"listUsers",value:function listUsers(aud){return this.user._request("/admin/users",{method:"GET",audience:aud})}},{key:"getUser",value:function getUser(user){return this.user._request("/admin/users/"+user.id)}},{key:"updateUser",value:function updateUser(user){var attributes=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};return this.user._request("/admin/users/"+user.id,{method:"PUT",body:JSON.stringify(attributes)})}},{key:"createUser",value:function createUser(email,password){var attributes=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};attributes.email=email;attributes.password=password;return this.user._request("/admin/users",{method:"POST",body:JSON.stringify(attributes)})}},{key:"deleteUser",value:function deleteUser(user){return this.user._request("/admin/users/"+user.id,{method:"DELETE"})}}]);return Admin}();exports.default=Admin},{}],4:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _microApiClient=require("micro-api-client");var _microApiClient2=_interopRequireDefault(_microApiClient);var _user=require("./user");var _user2=_interopRequireDefault(_user);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var HTTPRegexp=/^http:\/\//;var defaultApiURL="https://"+window.location.hostname+"/.netlify/identity";var GoTrue=function(){function GoTrue(){var _ref=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{},_ref$APIUrl=_ref.APIUrl,APIUrl=_ref$APIUrl===undefined?defaultApiURL:_ref$APIUrl,_ref$audience=_ref.audience,audience=_ref$audience===undefined?"":_ref$audience;_classCallCheck(this,GoTrue);if(APIUrl.match(HTTPRegexp)){console.warn("Warning:\n\nDO NOT USE HTTP IN PRODUCTION FOR GOTRUE EVER!\nGoTrue REQUIRES HTTPS to work securely.")}if(audience){this.audience=audience}this.api=new _microApiClient2.default(APIUrl)}_createClass(GoTrue,[{key:"_request",value:function _request(path){var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};options.headers=options.headers||{};var aud=options.audience||this.audience;if(aud){options.headers["X-JWT-AUD"]=aud}return this.api.request(path,options)}},{key:"settings",value:function settings(){return this._request("/settings")}},{key:"signup",value:function signup(email,password,data){return this._request("/signup",{method:"POST",body:JSON.stringify({email:email,password:password,data:data})})}},{key:"login",value:function login(email,password,remember){var _this=this;return this._request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=password&username="+encodeURIComponent(email)+"&password="+encodeURIComponent(password)}).then(function(response){_user2.default.removeSavedSession();return _this.createUser(response,remember)})}},{key:"loginExternalUrl",value:function loginExternalUrl(provider){return this.api.apiURL+"/authorize?provider="+provider}},{key:"confirm",value:function confirm(token){return this.verify("signup",token)}},{key:"requestPasswordRecovery",value:function requestPasswordRecovery(email){return this._request("/recover",{method:"POST",body:JSON.stringify({email:email})})}},{key:"recover",value:function recover(token){return this.verify("recovery",token)}},{key:"acceptInvite",value:function acceptInvite(token,password){var _this2=this;return this._request("/verify",{method:"POST",body:JSON.stringify({token:token,password:password,type:"signup"})}).then(function(response){return _this2.createUser(response)})}},{key:"createUser",value:function createUser(tokenResponse){var remember=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var user=new _user2.default(this.api,tokenResponse,this.audience);return user.getUserData().then(function(user){if(remember){user._saveSession()}return user})}},{key:"currentUser",value:function currentUser(){return _user2.default.recoverSession()}},{key:"verify",value:function verify(type,token){var _this3=this;return this._request("/verify",{method:"POST",body:JSON.stringify({token:token,type:type})}).then(function(response){return _this3.createUser(response)})}}]);return GoTrue}();exports.default=GoTrue;if(typeof window!=="undefined"){window.GoTrue=GoTrue}},{"./user":5,"micro-api-client":1}],5:[function(require,module,exports){"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _microApiClient=require("micro-api-client");var _microApiClient2=_interopRequireDefault(_microApiClient);var _admin=require("./admin");var _admin2=_interopRequireDefault(_admin);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var ExpiryMargin=60*1e3;var storageKey="gotrue.user";var currentUser=null;var forbiddenUpdateAttributes={api:1,token:1,audience:1,url:1};var forbiddenSaveAttributes={api:1};var User=function(){function User(api,tokenResponse,audience){_classCallCheck(this,User);this.api=api;this.url=api.apiURL;this.audience=audience;this._processTokenResponse(tokenResponse);currentUser=this}_createClass(User,[{key:"update",value:function update(attributes){var _this=this;return this._request("/user",{method:"PUT",body:JSON.stringify(attributes)}).then(function(response){return _this._saveUserData(response)._refreshSavedSession()})}},{key:"jwt",value:function jwt(){var _this2=this;var _tokenDetails=this.tokenDetails(),expires_at=_tokenDetails.expires_at,refresh_token=_tokenDetails.refresh_token,access_token=_tokenDetails.access_token;if(expires_at-ExpiryMargin<Date.now()){return this.api._request("/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:"grant_type=refresh_token&refresh_token="+refresh_token}).then(function(response){_this2._processTokenResponse(response);_this2._refreshSavedSession();return _this2.token.access_token}).catch(function(error){_this2.clearSession();return Promise.reject(error)})}return Promise.resolve(access_token)}},{key:"logout",value:function logout(){return this._request("/logout",{method:"POST"}).then(this.clearSession.bind(this)).catch(this.clearSession.bind(this))}},{key:"_request",value:function _request(path){var _this3=this;var options=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};options.headers=options.headers||{};var aud=options.audience||this.audience;if(aud){options.headers["X-JWT-AUD"]=aud}return this.jwt().then(function(token){return _this3.api.request(path,_extends({headers:Object.assign(options.headers,{Authorization:"Bearer "+token})},options))})}},{key:"getUserData",value:function getUserData(){return this._request("/user").then(this._saveUserData.bind(this)).then(this._refreshSavedSession.bind(this))}},{key:"_saveUserData",value:function _saveUserData(attributes){for(var key in attributes){if(key in User.prototype||key in forbiddenUpdateAttributes){continue}this[key]=attributes[key]}return this}},{key:"_processTokenResponse",value:function _processTokenResponse(tokenResponse){this.token=tokenResponse;this.token.expires_at=Date.now()+tokenResponse.expires_in*1e3}},{key:"_refreshSavedSession",value:function _refreshSavedSession(){if(localStorage.getItem(storageKey)){this._saveSession()}return this}},{key:"_saveSession",value:function _saveSession(){localStorage.setItem(storageKey,JSON.stringify(this._details));return this}},{key:"tokenDetails",value:function tokenDetails(){return this.token}},{key:"clearSession",value:function clearSession(){User.removeSavedSession();this.token=null;currentUser=null}},{key:"admin",get:function get(){return new _admin2.default(this)}},{key:"_details",get:function get(){var userCopy={};for(var key in this){if(key in User.prototype||key in forbiddenSaveAttributes){continue}userCopy[key]=this[key]}return userCopy}}],[{key:"removeSavedSession",value:function removeSavedSession(){localStorage.removeItem(storageKey)}},{key:"recoverSession",value:function recoverSession(){if(currentUser){return currentUser}var json=localStorage.getItem(storageKey);if(json){try{var data=JSON.parse(json);var url=data.url,token=data.token,audience=data.audience;if(!url||!token){return null}var api=new _microApiClient2.default(url);return new User(api,token,audience)._saveUserData(data)}catch(ex){return null}}return null}}]);return User}();exports.default=User},{"./admin":3,"micro-api-client":1}]},{},[4]);
