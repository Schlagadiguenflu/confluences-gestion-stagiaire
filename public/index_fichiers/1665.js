(window.webpackJsonp=window.webpackJsonp||[]).push([[1665],{4316:function(t,e,n){"use strict";n.r(e);n(20),n(21),n(17),n(14),n(8),n(5),n(7),n(2),n(16),n(19),n(38);var r=n(4),o=n(26),i=n(194);function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var u={name:"DocumentationContribution",props:{branch:{type:String,default:"master"}},computed:function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(n,!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(n).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({},Object(r.b)("route/params@*"),{contributionGuide:function(){return this.parseLink(this.lang,"contribute","/getting-started/contributing")},contributionLanguage:function(){var t="https://github.com/vuetifyjs/vuetify/tree/".concat(this.branch,"/packages/docs/src/lang/en/").concat(this.file,".json");return this.parseLink("","Content",t)},contributionGithub:function(){var t="https://github.com/vuetifyjs/vuetify/tree/".concat(this.branch,"/packages/docs/src/data/pages/").concat(this.file,".pug");return this.parseLink("","Layout",t)},file:function(){return"".concat(this.namespace,"/").concat(Object(i.upperFirst)(Object(i.camelCase)(this.page)))}}),methods:{parseLink:o.f,changeLanguageEoUy:function(t){var e=this;t.preventDefault();setTimeout((function(){return e.$router.go()}),1e3),this.$router.replace({params:{lang:"eo-UY"}}),document.cookie="currentLanguage=".concat("eo-UY",";path=/;max-age=").concat(604800)}}},s=n(0),p=Object(s.a)(u,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"py-4 mb-12"},[t._v("\n  Caught a mistake or want to "),n("strong",{domProps:{innerHTML:t._s(t.contributionGuide)}}),t._v(" to the documentation?\n  Edit "),n("strong",{domProps:{innerHTML:t._s(t.contributionGithub)}}),"en"===t.lang?[t._v("\n    or "),n("strong",{domProps:{innerHTML:t._s(t.contributionLanguage)}})]:t._e(),t._v("\n  on GitHub!\n")],2)}),[],!1,null,null,null);e.default=p.exports}}]);