(function(t){function e(e){for(var i,o,a=e[0],c=e[1],l=e[2],_=0,h=[];_<a.length;_++)o=a[_],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&h.push(r[o][0]),r[o]=0;for(i in c)Object.prototype.hasOwnProperty.call(c,i)&&(t[i]=c[i]);u&&u(e);while(h.length)h.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],i=!0,a=1;a<n.length;a++){var c=n[a];0!==r[c]&&(i=!1)}i&&(s.splice(e--,1),t=o(o.s=n[0]))}return t}var i={},r={app:0},s=[];function o(e){if(i[e])return i[e].exports;var n=i[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=t,o.c=i,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="";var a=window["webpackJsonp"]=window["webpackJsonp"]||[],c=a.push.bind(a);a.push=e,a=a.slice();for(var l=0;l<a.length;l++)e(a[l]);var u=c;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";n("85ec")},"2f1f":function(t,e,n){"use strict";n("3c3c")},"3c3c":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var i=n("2b0e"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("CLI")],1)},s=[],o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cli-main"},[n("CLIStart"),t._l(t.histories,(function(e,i){return n("div",{key:i,staticClass:"cli-history"},[n("span",{staticClass:"cli-head"},[t._v("stonesaw.github.io ")]),n("span",{staticClass:"cli-dir"},[t._v(t._s(e.dir.join("/")))]),n("span",{staticClass:"cli-head"},[t._v(" $ ")]),n("span",{staticClass:"cli-input-history"},[t._v(t._s(e.input))]),t._l(e.result_ary,(function(e,i){return n("div",{key:i},[n("span",{staticClass:"cli-result",domProps:{innerHTML:t._s(e)}})])}))],2)})),n("div",[n("span",{staticClass:"cli-head"},[t._v("stonesaw.github.io ")]),n("span",{staticClass:"cli-dir"},[t._v(t._s(t.dir.join("/")))]),n("span",{staticClass:"cli-head"},[t._v(" $ ")]),n("CLIInput",{ref:"input",on:{"exec-cmd":t.inputEnter}})],1)],2)},a=[],c=(n("ac1f"),n("1276"),n("5319"),n("5b81"),n("4de4"),n("d3b7"),n("a434"),function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)}),l=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"cli-start"},[n("div",[n("div",[t._v(" _       __     __                             __           ________    ____   __")]),n("div",[t._v("| |     / /__  / /________  ____ ___  ___     / /_____     / ____/ /   /  _/  / /")]),n("div",[t._v("| | /| / / _ \\/ / ___/ __ \\/ __ `__ \\/ _ \\   / __/ __ \\   / /   / /    / /   / / ")]),n("div",[t._v("| |/ |/ /  __/ / /__/ /_/ / / / / / /  __/  / /_/ /_/ /  / /___/ /____/ /   /_/  ")]),n("div",[t._v("|__/|__/\\___/_/\\___/\\____/_/ /_/ /_/\\___/   \\__/\\____/   \\____/_____/___/  (_)   ")])]),n("div",[t._v("Welcome to cli")])])}],u=n("2877"),_={},h=Object(u["a"])(_,c,l,!1,null,null,null),p=h.exports,f=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("span",{staticClass:"cli-input",on:{keydown:[function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"up",38,e.key,["Up","ArrowUp"])?null:t.pressKeyUp.apply(null,arguments)},function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"down",40,e.key,["Down","ArrowDown"])?null:t.pressKeyDown.apply(null,arguments)}]}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.inputText,expression:"inputText"}],attrs:{type:"text",autofocus:"",maxlength:"30"},domProps:{value:t.inputText},on:{keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.pressKeyEnter.apply(null,arguments)},input:function(e){e.target.composing||(t.inputText=e.target.value)}}})])},d=[],y=(n("e9c4"),{data:function(){return{inputText:"",history:[],historyIndex:null}},mounted:function(){this.loadHistory()},methods:{loadHistory:function(){if(localStorage.getItem("history"))try{this.history=JSON.parse(localStorage.getItem("history"))}catch(t){localStorage.removeItem("history")}},saveHistory:function(){var t=JSON.stringify(this.history);localStorage.setItem("history",t)},clearHistory:function(){this.history=[]},pressKeyEnter:function(){this.$emit("exec-cmd",this.inputText),""!==this.inputText&&(this.history.push(this.inputText),this.historyIndex=this.history.length,this.inputText="",this.saveHistory())},pressKeyUp:function(t){t.preventDefault(),this.history.length>0&&(this.historyIndex=Math.max(this.historyIndex-1,0),this.inputText=this.history[this.historyIndex])},pressKeyDown:function(t){t.preventDefault(),this.history.length>0&&null!==this.historyIndex&&(this.historyIndex===this.history.length-1?(this.historyIndex=null,this.inputText=""):(this.historyIndex=Math.min(this.historyIndex+1,this.history.length-1),this.inputText=this.history[this.historyIndex]))}}}),v=y,m=(n("2f1f"),Object(u["a"])(v,f,d,!1,null,"42a2ca36",null)),x=m.exports;n("99af"),n("cf0e");var g=function(t,e){return"change directory (".concat(t," -> ").concat(e,")")},b=function(t,e){return"file list"},I=(n("caad"),n("2532"),n("6b93"),n("159b"),n("4d90"),n("25f0"),function(t){if(t.includes("-clear"))return localStorage.removeItem("history"),"clear history";var e=[];if(!localStorage.getItem("history"))return"no history";try{e=JSON.parse(localStorage.getItem("history"))}catch(r){localStorage.removeItem("history")}var n=Math.log10(e.length)+1,i="";return e.forEach((function(t,e){i+=" ".concat(e.toString().padStart(n," "),"  ").concat(t,"\n")})),i}),w={name:"CLI",components:{CLIStart:p,CLIInput:x},data:function(){return{inputText:"",dir:["~","cli"],histories:[]}},methods:{inputEnter:function(t){var e=this.cmdProcess(t).replaceAll(" ","&nbsp;").split("\n");this.histories.push({input:t,dir:this.dir,result_ary:e})},cmdProcess:function(t){var e=t.split(" ").filter((function(t){return""!==t}));if(0===e.length)return"";switch(e[0]){case"help":return"Command list\n                cat [file]\n                cd [dir]\n                history [-clear]\n                ls\n                open\n                share\n                ";case"cd":return g(this.dir,e[1]);case"ls":return b(this.dir,e.shift);case"history":return"-clear"===e[1]&&this.$refs.input.clearHistory(),I(e.splice(1));default:return"Command '".concat(e[0],"' is not found! Use 'help' to see the command list.")}}}},C=w,O=(n("b213"),Object(u["a"])(C,o,a,!1,null,"54a836f6",null)),S=O.exports,k={name:"App",components:{CLI:S}},T=k,j=(n("034f"),Object(u["a"])(T,r,s,!1,null,null,null)),E=j.exports;i["a"].config.productionTip=!1,new i["a"]({render:function(t){return t(E)}}).$mount("#app")},"85ec":function(t,e,n){},"8f7e":function(t,e,n){},b213:function(t,e,n){"use strict";n("8f7e")},cf0e:function(t){t.exports=JSON.parse('{"~":{"cli":{"README.md":"txt","src":{"assets":{"logo.png":"img"}}}}}')}});
//# sourceMappingURL=app.6ff4ffcc.js.map