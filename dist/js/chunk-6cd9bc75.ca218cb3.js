(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6cd9bc75"],{"95d4":function(t,e,a){"use strict";var s=a("ff5d"),i=a.n(s);i.a},"99af":function(t,e,a){"use strict";var s=a("23e7"),i=a("d039"),n=a("e8b5"),r=a("861d"),o=a("7b0b"),c=a("50c4"),u=a("8418"),l=a("65f0"),d=a("1dde"),p=a("b622"),m=a("2d00"),f=p("isConcatSpreadable"),v=9007199254740991,g="Maximum allowed index exceeded",b=m>=51||!i((function(){var t=[];return t[f]=!1,t.concat()[0]!==t})),h=d("concat"),w=function(t){if(!r(t))return!1;var e=t[f];return void 0!==e?!!e:n(t)},C=!b||!h;s({target:"Array",proto:!0,forced:C},{concat:function(t){var e,a,s,i,n,r=o(this),d=l(r,0),p=0;for(e=-1,s=arguments.length;e<s;e++)if(n=-1===e?r:arguments[e],w(n)){if(i=c(n.length),p+i>v)throw TypeError(g);for(a=0;a<i;a++,p++)a in n&&u(d,p,n[a])}else{if(p>=v)throw TypeError(g);u(d,p++,n)}return d.length=p,d}})},a55b:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login"},[a("Loading",{attrs:{active:t.isLoading},on:{"update:active":function(e){t.isLoading=e}}}),a("div",{staticClass:"container"},[a("div",{staticClass:"login-bg d-flex justify-content-center align-items-center"},[a("div",{staticClass:"loginForm p-4 "},[a("h1",{staticClass:"font-weight-bold text-center mb-3"},[t._v(" Login")]),a("form",{on:{submit:function(e){return e.preventDefault(),t.signin(e)}}},[a("div",{staticClass:"form-group"},[a("label",{staticClass:"sr-only",attrs:{for:"inputEmail1"}},[t._v("Email address")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.email,expression:"user.email"}],staticClass:"form-control",attrs:{type:"email",id:"inputEmail1","aria-describedby":"emailHelp",placeholder:"Enter email",required:"",autocomplete:"username"},domProps:{value:t.user.email},on:{input:function(e){e.target.composing||t.$set(t.user,"email",e.target.value)}}})]),a("div",{staticClass:"form-group"},[a("label",{staticClass:"sr-only",attrs:{for:"inputPassword1"}},[t._v("Password")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{type:"password",id:"inputPassword1",placeholder:"Password",required:"",autocomplete:"current-password"},domProps:{value:t.user.password},on:{input:function(e){e.target.composing||t.$set(t.user,"password",e.target.value)}}})]),a("button",{staticClass:"btn btn-primary w-100",attrs:{type:"submit"}},[t._v("登入")])]),t._m(0),a("p",{staticClass:"mt-5 mb-3 text-muted"},[t._v(" © 2020~∞ - Emily Chen ")])])])])],1)},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("button",{staticClass:"btn btn-outline-primary w-100 mt-3",attrs:{type:"button",disabled:""}},[a("i",{staticClass:"fas fa-long-arrow-alt-left"}),t._v(" 前台 ")])}],n=(a("99af"),{data:function(){return{user:{email:"",password:""},token:"",isLoading:!1}},methods:{signin:function(){var t=this;this.isLoading=!0;var e="".concat("https://course-ec-api.hexschool.io/api/","auth/login");this.$http.post(e,this.user).then((function(e){var a=e.data.token,s=e.data.expired;document.cookie="token=".concat(a,"; expires=").concat(new Date(1e3*s),"; path=/"),t.$bus.$emit("message:push","登入成功","success"),t.isLoading=!1,t.$router.push("/admin/products")})).catch((function(e){t.$bus.$emit("message:push","登入失敗，請重新輸入\n            ".concat(e),"danger"),t.isLoading=!1}))}}}),r=n,o=(a("95d4"),a("2877")),c=Object(o["a"])(r,s,i,!1,null,"9be8c758",null);e["default"]=c.exports},ff5d:function(t,e,a){}}]);
//# sourceMappingURL=chunk-6cd9bc75.ca218cb3.js.map