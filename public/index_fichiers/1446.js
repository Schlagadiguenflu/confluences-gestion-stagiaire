(window.webpackJsonp=window.webpackJsonp||[]).push([[1446],{3886:function(t,e,a){},4241:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.factory=s,e.default=void 0;var n,i=(n=a(10))&&n.__esModule?n:{default:n};function r(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}function s(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"value",e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"change";return i.default.extend({name:"proxyable",model:{prop:t,event:e},props:r({},t,{required:!1}),data:function(){return{internalLazyValue:this[t]}},computed:{internalValue:{get:function(){return this.internalLazyValue},set:function(t){t!==this.internalLazyValue&&(this.internalLazyValue=t,this.$emit(e,t))}}},watch:r({},t,(function(t){this.internalLazyValue=t}))})}var l=s();e.default=l},4242:function(t,e,a){"use strict";var n=a(3886);a.n(n).a},4317:function(t,e,a){"use strict";a.r(e);var n=a(4241),i={name:"HomeCards",mixins:[a.n(n).a],props:{cards:{type:Array,default:function(){return[]}},heading:{type:String,default:void 0},subheading:{type:String,default:void 0}}},r=(a(4242),a(0)),s=Object(r.a)(i,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"text-center home-cards"},[a("base-heading",[t._v(t._s(t.heading))]),t.subheading?a("base-text",{staticClass:"mx-auto",attrs:{"max-width":"600"}},[t._v(t._s(t.subheading))]):t._e(),a("v-container",{staticClass:"pa-0 mb-6"},[a("v-row",{attrs:{align:"center",justify:"center"}},[t._l(t.cards,(function(e,n){return[a("v-col",{key:n,attrs:{cols:"auto"}},[a("v-hover",{scopedSlots:t._u([{key:"default",fn:function(n){var i=n.hover;return[a("v-skeleton-loader",{attrs:{loading:t.internalValue,"min-width":"550",type:"image",width:"100%"}},[Object(e)===e?a("base-card",{staticClass:"v-card--mwvjs mx-auto",attrs:{href:e.url+"?ref=vuetifyjs.com"+(e.query||""),title:"Link to "+e.title,"max-width":"100%",rel:"noopener",target:"_blank",width:"450"},on:{click:function(a){return t.$ga.event("home","click","card",e.title)}}},[a("v-img",{attrs:{alt:e.title,src:e.src,height:"300",width:"100%"}},[a("v-fade-transition",[a("v-overlay",{directives:[{name:"show",rawName:"v-show",value:i,expression:"hover"}],attrs:{absolute:"",opacity:"0.9"}},[a("h3",{staticClass:"headline mb-2",domProps:{textContent:t._s(e.title)}}),a("div",{staticClass:"overline grey--text mb-12 px-6",domProps:{textContent:t._s(e.description)}}),a("v-btn",{attrs:{"aria-label":"Link to "+e.title,color:"success",fab:"",large:"",tabindex:"-1"}},[a("v-icon",[t._v("mdi-open-in-new")])],1)],1)],1)],1)],1):t._e()],1)]}}],null,!0)})],1),n%2==1?a("v-col",{key:"break-"+n,staticClass:"pa-0",attrs:{cols:"12"}}):t._e()]}))],2)],1)],1)}),[],!1,null,null,null);e.default=s.exports}}]);