(window.webpackJsonp=window.webpackJsonp||[]).push([[1666],{4303:function(t,e,r){"use strict";r.r(e);r(44),r(20),r(21),r(17),r(14),r(8),r(5),r(7),r(2),r(16),r(19),r(92),r(30);var n=r(13),i=r.n(n),a=r(26),o=r(4);function s(t,e){if(null==t)return{};var r,n,i=function(t,e){if(null==t)return{};var r,n,i={},a=Object.keys(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||(i[r]=t[r]);return i}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}function c(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function u(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?c(r,!0).forEach((function(e){p(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):c(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function p(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var l={name:"DocumentationDrawer",computed:u({},Object(o.d)("app/*"),{links:Object(o.d)("documentation/links"),children:function(){var t=this;return this.item.children.map((function(e){return u({},e,{to:"".concat(t.item.group,"/").concat(e.to)})}))},group:function(){var t=this;return this.item.children.map((function(e){return"".concat(t.item.group,"/").concat(i()(e.name))})).join("|")},items:function(){return this.links.map(this.addLanguagePrefix)}}),watch:{$route:function(){this.stateless&&this.drawer&&this.$vuetify.breakpoint.mdAndDown&&(this.drawer=!1)}},methods:{genChip:a.b,addLanguagePrefix:function(t){var e=t.children,r=t.subtext,n=u({},s(t,["children","subtext"]),{text:"Vuetify.AppDrawer.".concat(t.text)});return e&&(n.children=e.map(this.addLanguagePrefix)),r&&(n.subtext="Vuetify.AppDrawer.".concat(t.subtext)),n}}},d=r(0),f=Object(d.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-navigation-drawer",{attrs:{right:t.$vuetify.rtl,width:300,app:"",clipped:""},scopedSlots:t._u([{key:"append",fn:function(){return[r("v-divider"),r("div",{staticClass:"px-4 py-2 d-flex"},[r("base-versions-menu"),r("v-spacer"),r("app-notifications"),r("base-theme-toggle",{staticClass:"ml-1"})],1)]},proxy:!0}]),model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[r("v-container",[r("div",{staticClass:"text-center"},[r("v-responsive",{staticClass:"mb-3",attrs:{height:"57"}},[r("supporters-supporter-group",{attrs:{group:1,large:""}})],1),r("supporters-sponsor-btn",{attrs:{small:""}})],1)]),r("v-divider",{staticClass:"my-1"}),r("v-list",{staticClass:"pt-0 pb-7",attrs:{dense:"",expand:"",nav:""}},[t._l(t.items,(function(e,n){return[e.header?r("v-subheader",{key:"subheader-"+n,domProps:{textContent:t._s(e.header)}}):e.divider?r("v-divider",{key:"divider-"+n}):e.group?r("base-group",{key:"group-"+n,attrs:{item:e}}):r("base-item",{key:"item-"+n,attrs:{chip:t.genChip(e),icon:e.icon,subtext:e.subtext,text:e.text,to:e.to}})]}))],2)],1)}),[],!1,null,null,null);e.default=f.exports}}]);