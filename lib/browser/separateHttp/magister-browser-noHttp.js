/* Magister.js (browser version) by simplyApps. Built on: 15-05-2015 21:50 UTC */
/**
 * @license
 * lodash 3.8.0 (Custom Build) lodash.com/license | Underscore.js 1.8.3 underscorejs.org/LICENSE
 * Build: `lodash modern -o ./lodash.js`
 */
;(function(){function n(n,t){if(n!==t){var r=n===n,e=t===t;if(n>t||!r||n===w&&e)return 1;if(n<t||!e||t===w&&r)return-1}return 0}function t(n,t,r){for(var e=n.length,u=r?e:-1;r?u--:++u<e;)if(t(n[u],u,n))return u;return-1}function r(n,t,r){if(t!==t)return p(n,r);r-=1;for(var e=n.length;++r<e;)if(n[r]===t)return r;return-1}function e(n){return typeof n=="function"||false}function u(n){return typeof n=="string"?n:null==n?"":n+""}function o(n){return n.charCodeAt(0)}function i(n,t){for(var r=-1,e=n.length;++r<e&&-1<t.indexOf(n.charAt(r)););
return r}function f(n,t){for(var r=n.length;r--&&-1<t.indexOf(n.charAt(r)););return r}function a(t,r){return n(t.a,r.a)||t.b-r.b}function c(n){return $n[n]}function l(n){return Ln[n]}function s(n){return"\\"+Mn[n]}function p(n,t,r){var e=n.length;for(t+=r?0:-1;r?t--:++t<e;){var u=n[t];if(u!==u)return t}return-1}function h(n){return!!n&&typeof n=="object"}function _(n){return 160>=n&&9<=n&&13>=n||32==n||160==n||5760==n||6158==n||8192<=n&&(8202>=n||8232==n||8233==n||8239==n||8287==n||12288==n||65279==n);

}function v(n,t){for(var r=-1,e=n.length,u=-1,o=[];++r<e;)n[r]===t&&(n[r]=z,o[++u]=r);return o}function g(n){for(var t=-1,r=n.length;++t<r&&_(n.charCodeAt(t)););return t}function y(n){for(var t=n.length;t--&&_(n.charCodeAt(t)););return t}function d(n){return zn[n]}function m(_){function $n(n){if(h(n)&&!(To(n)||n instanceof Bn)){if(n instanceof zn)return n;if(Ge.call(n,"__chain__")&&Ge.call(n,"__wrapped__"))return Lr(n)}return new zn(n)}function Ln(){}function zn(n,t,r){this.__wrapped__=n,this.__actions__=r||[],
this.__chain__=!!t}function Bn(n){this.__wrapped__=n,this.__actions__=null,this.__dir__=1,this.__filtered__=false,this.__iteratees__=null,this.__takeCount__=Iu,this.__views__=null}function Mn(){this.__data__={}}function Dn(n){var t=n?n.length:0;for(this.data={hash:du(null),set:new lu};t--;)this.push(n[t])}function Pn(n,t){var r=n.data;return(typeof t=="string"||se(t)?r.set.has(t):r.hash[t])?0:-1}function qn(n,t){var r=-1,e=n.length;for(t||(t=Ue(e));++r<e;)t[r]=n[r];return t}function Kn(n,t){for(var r=-1,e=n.length;++r<e&&false!==t(n[r],r,n););
return n}function Vn(n,t){for(var r=-1,e=n.length;++r<e;)if(!t(n[r],r,n))return false;return true}function Gn(n,t){for(var r=-1,e=n.length,u=-1,o=[];++r<e;){var i=n[r];t(i,r,n)&&(o[++u]=i)}return o}function Jn(n,t){for(var r=-1,e=n.length,u=Ue(e);++r<e;)u[r]=t(n[r],r,n);return u}function Xn(n,t,r,e){var u=-1,o=n.length;for(e&&o&&(r=n[++u]);++u<o;)r=t(r,n[u],u,n);return r}function Hn(n,t){for(var r=-1,e=n.length;++r<e;)if(t(n[r],r,n))return true;return false}function Qn(n,t){return n===w?t:n}function nt(n,t,r,e){
return n!==w&&Ge.call(e,r)?n:t}function tt(n,t,r){var e=Ko(t);fu.apply(e,Zu(t));for(var u=-1,o=e.length;++u<o;){var i=e[u],f=n[i],a=r(f,t[i],i,n,t);(a===a?a===f:f!==f)&&(f!==w||i in n)||(n[i]=a)}return n}function rt(n,t){for(var r=-1,e=null==n,u=!e&&jr(n),o=u&&n.length,i=t.length,f=Ue(i);++r<i;){var a=t[r];f[r]=u?kr(a,o)?n[a]:w:e?w:n[a]}return f}function et(n,t,r){r||(r={});for(var e=-1,u=t.length;++e<u;){var o=t[e];r[o]=n[o]}return r}function ut(n,t,r){var e=typeof n;return"function"==e?t===w?n:zt(n,t,r):null==n?Re:"object"==e?wt(n):t===w?Te(n):bt(n,t);

}function ot(n,t,r,e,u,o,i){var f;if(r&&(f=u?r(n,e,u):r(n)),f!==w)return f;if(!se(n))return n;if(e=To(n)){if(f=wr(n),!t)return qn(n,f)}else{var a=Xe.call(n),c=a==K;if(a!=Y&&a!=B&&(!c||u))return Nn[a]?xr(n,a,t):u?n:{};if(f=br(c?{}:n),!t)return $u(f,n)}for(o||(o=[]),i||(i=[]),u=o.length;u--;)if(o[u]==n)return i[u];return o.push(n),i.push(f),(e?Kn:ht)(n,function(e,u){f[u]=ot(e,t,r,u,n,o,i)}),f}function it(n,t,r){if(typeof n!="function")throw new Pe(L);return su(function(){n.apply(w,r)},t)}function ft(n,t){
var e=n?n.length:0,u=[];if(!e)return u;var o=-1,i=mr(),f=i==r,a=f&&200<=t.length?qu(t):null,c=t.length;a&&(i=Pn,f=false,t=a);n:for(;++o<e;)if(a=n[o],f&&a===a){for(var l=c;l--;)if(t[l]===a)continue n;u.push(a)}else 0>i(t,a,0)&&u.push(a);return u}function at(n,t){var r=true;return zu(n,function(n,e,u){return r=!!t(n,e,u)}),r}function ct(n,t){var r=[];return zu(n,function(n,e,u){t(n,e,u)&&r.push(n)}),r}function lt(n,t,r,e){var u;return r(n,function(n,r,o){return t(n,r,o)?(u=e?r:n,false):void 0}),u}function st(n,t,r){
for(var e=-1,u=n.length,o=-1,i=[];++e<u;){var f=n[e];if(h(f)&&jr(f)&&(r||To(f)||ae(f))){t&&(f=st(f,t,r));for(var a=-1,c=f.length;++a<c;)i[++o]=f[a]}else r||(i[++o]=f)}return i}function pt(n,t){Mu(n,t,me)}function ht(n,t){return Mu(n,t,Ko)}function _t(n,t){return Du(n,t,Ko)}function vt(n,t){for(var r=-1,e=t.length,u=-1,o=[];++r<e;){var i=t[r];No(n[i])&&(o[++u]=i)}return o}function gt(n,t,r){if(null!=n){r!==w&&r in Fr(n)&&(t=[r]),r=-1;for(var e=t.length;null!=n&&++r<e;)n=n[t[r]];return r&&r==e?n:w}
}function yt(n,t,r,e,u,o){if(n===t)return true;var i=typeof n,f=typeof t;if("function"!=i&&"object"!=i&&"function"!=f&&"object"!=f||null==n||null==t)n=n!==n&&t!==t;else n:{var i=yt,f=To(n),a=To(t),c=M,l=M;f||(c=Xe.call(n),c==B?c=Y:c!=Y&&(f=ge(n))),a||(l=Xe.call(t),l==B?l=Y:l!=Y&&ge(t));var s=c==Y,a=l==Y,l=c==l;if(!l||f||s){if(!e&&(c=s&&Ge.call(n,"__wrapped__"),a=a&&Ge.call(t,"__wrapped__"),c||a)){n=i(c?n.value():n,a?t.value():t,r,e,u,o);break n}if(l){for(u||(u=[]),o||(o=[]),c=u.length;c--;)if(u[c]==n){
n=o[c]==t;break n}u.push(n),o.push(t),n=(f?_r:gr)(n,t,i,r,e,u,o),u.pop(),o.pop()}else n=false}else n=vr(n,t,c)}return n}function dt(n,t,r,e,u){for(var o=-1,i=t.length,f=!u;++o<i;)if(f&&e[o]?r[o]!==n[t[o]]:!(t[o]in n))return false;for(o=-1;++o<i;){var a=t[o],c=n[a],l=r[o];if(f&&e[o]?a=c!==w||a in n:(a=u?u(c,l,a):w,a===w&&(a=yt(l,c,u,true))),!a)return false}return true}function mt(n,t){var r=-1,e=jr(n)?Ue(n.length):[];return zu(n,function(n,u,o){e[++r]=t(n,u,o)}),e}function wt(n){var t=Ko(n),r=t.length;if(!r)return Ie(true);

if(1==r){var e=t[0],u=n[e];if(Cr(u))return function(n){return null==n?false:n[e]===u&&(u!==w||e in Fr(n))}}for(var o=Ue(r),i=Ue(r);r--;)u=n[t[r]],o[r]=u,i[r]=Cr(u);return function(n){return null!=n&&dt(Fr(n),t,o,i)}}function bt(n,t){var r=To(n),e=Er(n)&&Cr(t),u=n+"";return n=$r(n),function(o){if(null==o)return false;var i=u;if(o=Fr(o),!(!r&&e||i in o)){if(o=1==n.length?o:gt(o,It(n,0,-1)),null==o)return false;i=Pr(n),o=Fr(o)}return o[i]===t?t!==w||i in o:yt(t,o[i],null,true)}}function xt(n,t,r,e,u){if(!se(n))return n;

var o=jr(t)&&(To(t)||ge(t));if(!o){var i=Ko(t);fu.apply(i,Zu(t))}return Kn(i||t,function(f,a){if(i&&(a=f,f=t[a]),h(f)){e||(e=[]),u||(u=[]);n:{for(var c=a,l=e,s=u,p=l.length,_=t[c];p--;)if(l[p]==_){n[c]=s[p];break n}var p=n[c],v=r?r(p,_,c,n,t):w,g=v===w;g&&(v=_,jr(_)&&(To(_)||ge(_))?v=To(p)?p:jr(p)?qn(p):[]:Fo(_)||ae(_)?v=ae(p)?ye(p):Fo(p)?p:{}:g=false),l.push(_),s.push(v),g?n[c]=xt(v,_,r,l,s):(v===v?v!==p:p===p)&&(n[c]=v)}}else c=n[a],l=r?r(c,f,a,n,t):w,(s=l===w)&&(l=f),!o&&l===w||!s&&(l===l?l===c:c!==c)||(n[a]=l);

}),n}function At(n){return function(t){return null==t?w:t[n]}}function jt(n){var t=n+"";return n=$r(n),function(r){return gt(r,n,t)}}function kt(n,t){for(var r=n?t.length:0;r--;){var e=parseFloat(t[r]);if(e!=u&&kr(e)){var u=e;pu.call(n,e,1)}}}function Ot(n,t){return n+uu(Ou()*(t-n+1))}function Et(n,t,r,e,u){return u(n,function(n,u,o){r=e?(e=false,n):t(r,n,u,o)}),r}function It(n,t,r){var e=-1,u=n.length;for(t=null==t?0:+t||0,0>t&&(t=-t>u?0:u+t),r=r===w||r>u?u:+r||0,0>r&&(r+=u),u=t>r?0:r-t>>>0,t>>>=0,
r=Ue(u);++e<u;)r[e]=n[e+t];return r}function Rt(n,t){var r;return zu(n,function(n,e,u){return r=t(n,e,u),!r}),!!r}function Ct(n,t){var r=n.length;for(n.sort(t);r--;)n[r]=n[r].c;return n}function Wt(t,r,e){var u=dr(),o=-1;return r=Jn(r,function(n){return u(n)}),t=mt(t,function(n){return{a:Jn(r,function(t){return t(n)}),b:++o,c:n}}),Ct(t,function(t,r){var u;n:{u=-1;for(var o=t.a,i=r.a,f=o.length,a=e.length;++u<f;){var c=n(o[u],i[u]);if(c){u=u<a?c*(e[u]?1:-1):c;break n}}u=t.b-r.b}return u})}function St(n,t){
var r=0;return zu(n,function(n,e,u){r+=+t(n,e,u)||0}),r}function Tt(n,t){var e=-1,u=mr(),o=n.length,i=u==r,f=i&&200<=o,a=f?qu():null,c=[];a?(u=Pn,i=false):(f=false,a=t?[]:c);n:for(;++e<o;){var l=n[e],s=t?t(l,e,n):l;if(i&&l===l){for(var p=a.length;p--;)if(a[p]===s)continue n;t&&a.push(s),c.push(l)}else 0>u(a,s,0)&&((t||f)&&a.push(s),c.push(l))}return c}function Ut(n,t){for(var r=-1,e=t.length,u=Ue(e);++r<e;)u[r]=n[t[r]];return u}function Nt(n,t,r,e){for(var u=n.length,o=e?u:-1;(e?o--:++o<u)&&t(n[o],o,n););
return r?It(n,e?0:o,e?o+1:u):It(n,e?o+1:0,e?u:o)}function Ft(n,t){var r=n;r instanceof Bn&&(r=r.value());for(var e=-1,u=t.length;++e<u;){var r=[r],o=t[e];fu.apply(r,o.args),r=o.func.apply(o.thisArg,r)}return r}function $t(n,t,r){var e=0,u=n?n.length:e;if(typeof t=="number"&&t===t&&u<=Wu){for(;e<u;){var o=e+u>>>1,i=n[o];(r?i<=t:i<t)?e=o+1:u=o}return u}return Lt(n,t,Re,r)}function Lt(n,t,r,e){t=r(t);for(var u=0,o=n?n.length:0,i=t!==t,f=t===w;u<o;){var a=uu((u+o)/2),c=r(n[a]),l=c===c;(i?l||e:f?l&&(e||c!==w):e?c<=t:c<t)?u=a+1:o=a;

}return xu(o,Cu)}function zt(n,t,r){if(typeof n!="function")return Re;if(t===w)return n;switch(r){case 1:return function(r){return n.call(t,r)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,o){return n.call(t,r,e,u,o)};case 5:return function(r,e,u,o,i){return n.call(t,r,e,u,o,i)}}return function(){return n.apply(t,arguments)}}function Bt(n){return tu.call(n,0)}function Mt(n,t,r){for(var e=r.length,u=-1,o=bu(n.length-e,0),i=-1,f=t.length,a=Ue(o+f);++i<f;)a[i]=t[i];

for(;++u<e;)a[r[u]]=n[u];for(;o--;)a[i++]=n[u++];return a}function Dt(n,t,r){for(var e=-1,u=r.length,o=-1,i=bu(n.length-u,0),f=-1,a=t.length,c=Ue(i+a);++o<i;)c[o]=n[o];for(i=o;++f<a;)c[i+f]=t[f];for(;++e<u;)c[i+r[e]]=n[o++];return c}function Pt(n,t){return function(r,e,u){var o=t?t():{};if(e=dr(e,u,3),To(r)){u=-1;for(var i=r.length;++u<i;){var f=r[u];n(o,f,e(f,u,r),r)}}else zu(r,function(t,r,u){n(o,t,e(t,r,u),u)});return o}}function qt(n){return fe(function(t,r){var e=-1,u=null==t?0:r.length,o=2<u&&r[u-2],i=2<u&&r[2],f=1<u&&r[u-1];

for(typeof o=="function"?(o=zt(o,f,5),u-=2):(o=typeof f=="function"?f:null,u-=o?1:0),i&&Or(r[0],r[1],i)&&(o=3>u?null:o,u=1);++e<u;)(i=r[e])&&n(t,i,o);return t})}function Kt(n,t){return function(r,e){var u=r?Yu(r):0;if(!Rr(u))return n(r,e);for(var o=t?u:-1,i=Fr(r);(t?o--:++o<u)&&false!==e(i[o],o,i););return r}}function Vt(n){return function(t,r,e){var u=Fr(t);e=e(t);for(var o=e.length,i=n?o:-1;n?i--:++i<o;){var f=e[i];if(false===r(u[f],f,u))break}return t}}function Yt(n,t){function r(){return(this&&this!==Yn&&this instanceof r?e:n).apply(t,arguments);

}var e=Gt(n);return r}function Zt(n){return function(t){var r=-1;t=Oe(be(t));for(var e=t.length,u="";++r<e;)u=n(u,t[r],r);return u}}function Gt(n){return function(){var t=Lu(n.prototype),r=n.apply(t,arguments);return se(r)?r:t}}function Jt(n){function t(r,e,u){return u&&Or(r,e,u)&&(e=null),r=hr(r,n,null,null,null,null,null,e),r.placeholder=t.placeholder,r}return t}function Xt(n,t){return function(r,e,u){u&&Or(r,e,u)&&(e=null);var i=dr(),f=null==e;if(i===ut&&f||(f=false,e=i(e,u,3)),f){if(e=To(r),e||!ve(r))return n(e?r:Nr(r));

e=o}return yr(r,e,t)}}function Ht(n,r){return function(e,u,o){return u=dr(u,o,3),To(e)?(u=t(e,u,r),-1<u?e[u]:w):lt(e,u,n)}}function Qt(n){return function(r,e,u){return r&&r.length?(e=dr(e,u,3),t(r,e,n)):-1}}function nr(n){return function(t,r,e){return r=dr(r,e,3),lt(t,r,n,true)}}function tr(n){return function(){var t=arguments.length;if(!t)return function(){return arguments[0]};for(var r,e=n?t:-1,u=0,o=Ue(t);n?e--:++e<t;){var i=o[u++]=arguments[e];if(typeof i!="function")throw new Pe(L);var f=r?"":Vu(i);

r="wrapper"==f?new zn([]):r}for(e=r?-1:t;++e<t;)i=o[e],f=Vu(i),r=(u="wrapper"==f?Ku(i):null)&&Ir(u[0])&&u[1]==(R|k|E|C)&&!u[4].length&&1==u[9]?r[Vu(u[0])].apply(r,u[3]):1==i.length&&Ir(i)?r[f]():r.thru(i);return function(){var n=arguments;if(r&&1==n.length&&To(n[0]))return r.plant(n[0]).value();for(var e=0,n=o[e].apply(this,n);++e<t;)n=o[e].call(this,n);return n}}}function rr(n,t){return function(r,e,u){return typeof e=="function"&&u===w&&To(r)?n(r,e):t(r,zt(e,u,3))}}function er(n){return function(t,r,e){
return(typeof r!="function"||e!==w)&&(r=zt(r,e,3)),n(t,r,me)}}function ur(n){return function(t,r,e){return(typeof r!="function"||e!==w)&&(r=zt(r,e,3)),n(t,r)}}function or(n){return function(t,r,e){var u={};return r=dr(r,e,3),ht(t,function(t,e,o){o=r(t,e,o),e=n?o:e,t=n?t:o,u[e]=t}),u}}function ir(n){return function(t,r,e){return t=u(t),(n?t:"")+lr(t,r,e)+(n?"":t)}}function fr(n){var t=fe(function(r,e){var u=v(e,t.placeholder);return hr(r,n,null,e,u)});return t}function ar(n,t){return function(r,e,u,o){
var i=3>arguments.length;return typeof e=="function"&&o===w&&To(r)?n(r,e,u,i):Et(r,dr(e,o,4),u,i,t)}}function cr(n,t,r,e,u,o,i,f,a,c){function l(){for(var b=arguments.length,j=b,k=Ue(b);j--;)k[j]=arguments[j];if(e&&(k=Mt(k,e,u)),o&&(k=Dt(k,o,i)),_||y){var j=l.placeholder,O=v(k,j),b=b-O.length;if(b<c){var R=f?qn(f):null,b=bu(c-b,0),C=_?O:null,O=_?null:O,W=_?k:null,k=_?null:k;return t|=_?E:I,t&=~(_?I:E),g||(t&=~(x|A)),k=[n,t,r,W,C,k,O,R,a,b],R=cr.apply(w,k),Ir(n)&&Gu(R,k),R.placeholder=j,R}}if(j=p?r:this,
h&&(n=j[m]),f)for(R=k.length,b=xu(f.length,R),C=qn(k);b--;)O=f[b],k[b]=kr(O,R)?C[O]:w;return s&&a<k.length&&(k.length=a),(this&&this!==Yn&&this instanceof l?d||Gt(n):n).apply(j,k)}var s=t&R,p=t&x,h=t&A,_=t&k,g=t&j,y=t&O,d=!h&&Gt(n),m=n;return l}function lr(n,t,r){return n=n.length,t=+t,n<t&&mu(t)?(t-=n,r=null==r?" ":r+"",je(r,ru(t/r.length)).slice(0,t)):""}function sr(n,t,r,e){function u(){for(var t=-1,f=arguments.length,a=-1,c=e.length,l=Ue(f+c);++a<c;)l[a]=e[a];for(;f--;)l[a++]=arguments[++t];return(this&&this!==Yn&&this instanceof u?i:n).apply(o?r:this,l);

}var o=t&x,i=Gt(n);return u}function pr(n){return function(t,r,e,u){var o=dr(e);return o===ut&&null==e?$t(t,r,n):Lt(t,r,o(e,u,1),n)}}function hr(n,t,r,e,u,o,i,f){var a=t&A;if(!a&&typeof n!="function")throw new Pe(L);var c=e?e.length:0;if(c||(t&=~(E|I),e=u=null),c-=u?u.length:0,t&I){var l=e,s=u;e=u=null}var p=a?null:Ku(n);return r=[n,t,r,e,u,l,s,o,i,f],p&&(e=r[1],t=p[1],f=e|t,u=t==R&&e==k||t==R&&e==C&&r[7].length<=p[8]||t==(R|C)&&e==k,(f<R||u)&&(t&x&&(r[2]=p[2],f|=e&x?0:j),(e=p[3])&&(u=r[3],r[3]=u?Mt(u,e,p[4]):qn(e),
r[4]=u?v(r[3],z):qn(p[4])),(e=p[5])&&(u=r[5],r[5]=u?Dt(u,e,p[6]):qn(e),r[6]=u?v(r[5],z):qn(p[6])),(e=p[7])&&(r[7]=qn(e)),t&R&&(r[8]=null==r[8]?p[8]:xu(r[8],p[8])),null==r[9]&&(r[9]=p[9]),r[0]=p[0],r[1]=f),t=r[1],f=r[9]),r[9]=null==f?a?0:n.length:bu(f-c,0)||0,(p?Pu:Gu)(t==x?Yt(r[0],r[2]):t!=E&&t!=(x|E)||r[4].length?cr.apply(w,r):sr.apply(w,r),r)}function _r(n,t,r,e,u,o,i){var f=-1,a=n.length,c=t.length,l=true;if(a!=c&&(!u||c<=a))return false;for(;l&&++f<a;){var s=n[f],p=t[f],l=w;if(e&&(l=u?e(p,s,f):e(s,p,f)),
l===w)if(u)for(var h=c;h--&&(p=t[h],!(l=s&&s===p||r(s,p,e,u,o,i))););else l=s&&s===p||r(s,p,e,u,o,i)}return!!l}function vr(n,t,r){switch(r){case D:case P:return+n==+t;case q:return n.name==t.name&&n.message==t.message;case V:return n!=+n?t!=+t:n==+t;case Z:case G:return n==t+""}return false}function gr(n,t,r,e,u,o,i){var f=Ko(n),a=f.length,c=Ko(t).length;if(a!=c&&!u)return false;for(var c=u,l=-1;++l<a;){var s=f[l],p=u?s in t:Ge.call(t,s);if(p){var h=n[s],_=t[s],p=w;e&&(p=u?e(_,h,s):e(h,_,s)),p===w&&(p=h&&h===_||r(h,_,e,u,o,i));

}if(!p)return false;c||(c="constructor"==s)}return c||(r=n.constructor,e=t.constructor,!(r!=e&&"constructor"in n&&"constructor"in t)||typeof r=="function"&&r instanceof r&&typeof e=="function"&&e instanceof e)?true:false}function yr(n,t,r){var e=r?Iu:Eu,u=e,o=u;return zu(n,function(n,i,f){i=t(n,i,f),((r?i<u:i>u)||i===e&&i===o)&&(u=i,o=n)}),o}function dr(n,t,r){var e=$n.callback||Ee,e=e===Ee?ut:e;return r?e(n,t,r):e}function mr(n,t,e){var u=$n.indexOf||Dr,u=u===Dr?r:u;return n?u(n,t,e):u}function wr(n){var t=n.length,r=new n.constructor(t);

return t&&"string"==typeof n[0]&&Ge.call(n,"index")&&(r.index=n.index,r.input=n.input),r}function br(n){return n=n.constructor,typeof n=="function"&&n instanceof n||(n=Be),new n}function xr(n,t,r){var e=n.constructor;switch(t){case J:return Bt(n);case D:case P:return new e(+n);case X:case H:case Q:case nn:case tn:case rn:case en:case un:case on:return t=n.buffer,new e(r?Bt(t):t,n.byteOffset,n.length);case V:case G:return new e(n);case Z:var u=new e(n.source,kn.exec(n));u.lastIndex=n.lastIndex}return u;

}function Ar(n,t,r){return null==n||Er(t,n)||(t=$r(t),n=1==t.length?n:gt(n,It(t,0,-1)),t=Pr(t)),t=null==n?n:n[t],null==t?w:t.apply(n,r)}function jr(n){return null!=n&&Rr(Yu(n))}function kr(n,t){return n=+n,t=null==t?Tu:t,-1<n&&0==n%1&&n<t}function Or(n,t,r){if(!se(r))return false;var e=typeof t;return("number"==e?jr(r)&&kr(t,r.length):"string"==e&&t in r)?(t=r[t],n===n?n===t:t!==t):false}function Er(n,t){var r=typeof n;return"string"==r&&dn.test(n)||"number"==r?true:To(n)?false:!yn.test(n)||null!=t&&n in Fr(t);

}function Ir(n){var t=Vu(n);return!!t&&n===$n[t]&&t in Bn.prototype}function Rr(n){return typeof n=="number"&&-1<n&&0==n%1&&n<=Tu}function Cr(n){return n===n&&!se(n)}function Wr(n,t){n=Fr(n);for(var r=-1,e=t.length,u={};++r<e;){var o=t[r];o in n&&(u[o]=n[o])}return u}function Sr(n,t){var r={};return pt(n,function(n,e,u){t(n,e,u)&&(r[e]=n)}),r}function Tr(n){var t;if(!h(n)||Xe.call(n)!=Y||!(Ge.call(n,"constructor")||(t=n.constructor,typeof t!="function"||t instanceof t)))return false;var r;return pt(n,function(n,t){
r=t}),r===w||Ge.call(n,r)}function Ur(n){for(var t=me(n),r=t.length,e=r&&n.length,u=$n.support,u=e&&Rr(e)&&(To(n)||u.nonEnumArgs&&ae(n)),o=-1,i=[];++o<r;){var f=t[o];(u&&kr(f,e)||Ge.call(n,f))&&i.push(f)}return i}function Nr(n){return null==n?[]:jr(n)?se(n)?n:Be(n):we(n)}function Fr(n){return se(n)?n:Be(n)}function $r(n){if(To(n))return n;var t=[];return u(n).replace(mn,function(n,r,e,u){t.push(e?u.replace(An,"$1"):r||n)}),t}function Lr(n){return n instanceof Bn?n.clone():new zn(n.__wrapped__,n.__chain__,qn(n.__actions__));

}function zr(n,t,r){return n&&n.length?((r?Or(n,t,r):null==t)&&(t=1),It(n,0>t?0:t)):[]}function Br(n,t,r){var e=n?n.length:0;return e?((r?Or(n,t,r):null==t)&&(t=1),t=e-(+t||0),It(n,0,0>t?0:t)):[]}function Mr(n){return n?n[0]:w}function Dr(n,t,e){var u=n?n.length:0;if(!u)return-1;if(typeof e=="number")e=0>e?bu(u+e,0):e;else if(e)return e=$t(n,t),n=n[e],(t===t?t===n:n!==n)?e:-1;return r(n,t,e||0)}function Pr(n){var t=n?n.length:0;return t?n[t-1]:w}function qr(n){return zr(n,1)}function Kr(n,t,e,u){
if(!n||!n.length)return[];null!=t&&typeof t!="boolean"&&(u=e,e=Or(n,t,u)?null:t,t=false);var o=dr();if((o!==ut||null!=e)&&(e=o(e,u,3)),t&&mr()==r){t=e;var i;e=-1,u=n.length;for(var o=-1,f=[];++e<u;){var a=n[e],c=t?t(a,e,n):a;e&&i===c||(i=c,f[++o]=a)}n=f}else n=Tt(n,e);return n}function Vr(n){if(!n||!n.length)return[];var t=-1,r=0;n=Gn(n,function(n){return jr(n)?(r=bu(n.length,r),true):void 0});for(var e=Ue(r);++t<r;)e[t]=Jn(n,At(t));return e}function Yr(n,t,r){return n&&n.length?(n=Vr(n),null==t?n:(t=zt(t,r,4),
Jn(n,function(n){return Xn(n,t,w,true)}))):[]}function Zr(n,t){var r=-1,e=n?n.length:0,u={};for(!e||t||To(n[0])||(t=[]);++r<e;){var o=n[r];t?u[o]=t[r]:o&&(u[o[0]]=o[1])}return u}function Gr(n){return n=$n(n),n.__chain__=true,n}function Jr(n,t,r){return t.call(r,n)}function Xr(n,t,r){var e=To(n)?Vn:at;return r&&Or(n,t,r)&&(t=null),(typeof t!="function"||r!==w)&&(t=dr(t,r,3)),e(n,t)}function Hr(n,t,r){var e=To(n)?Gn:ct;return t=dr(t,r,3),e(n,t)}function Qr(n,t,r,e){var u=n?Yu(n):0;return Rr(u)||(n=we(n),
u=n.length),u?(r=typeof r!="number"||e&&Or(t,r,e)?0:0>r?bu(u+r,0):r||0,typeof n=="string"||!To(n)&&ve(n)?r<u&&-1<n.indexOf(t,r):-1<mr(n,t,r)):false}function ne(n,t,r){var e=To(n)?Jn:mt;return t=dr(t,r,3),e(n,t)}function te(n,t,r){return(r?Or(n,t,r):null==t)?(n=Nr(n),t=n.length,0<t?n[Ot(0,t-1)]:w):(n=re(n),n.length=xu(0>t?0:+t||0,n.length),n)}function re(n){n=Nr(n);for(var t=-1,r=n.length,e=Ue(r);++t<r;){var u=Ot(0,t);t!=u&&(e[t]=e[u]),e[u]=n[t]}return e}function ee(n,t,r){var e=To(n)?Hn:Rt;return r&&Or(n,t,r)&&(t=null),
(typeof t!="function"||r!==w)&&(t=dr(t,r,3)),e(n,t)}function ue(n,t){var r;if(typeof t!="function"){if(typeof n!="function")throw new Pe(L);var e=n;n=t,t=e}return function(){return 0<--n&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}}function oe(n,t,r){function e(){var r=t-(wo()-c);0>=r||r>t?(f&&eu(f),r=p,f=s=p=w,r&&(h=wo(),a=n.apply(l,i),s||f||(i=l=null))):s=su(e,r)}function u(){s&&eu(s),f=s=p=w,(v||_!==t)&&(h=wo(),a=n.apply(l,i),s||f||(i=l=null))}function o(){if(i=arguments,c=wo(),l=this,p=v&&(s||!g),
!1===_)var r=g&&!s;else{f||g||(h=c);var o=_-(c-h),y=0>=o||o>_;y?(f&&(f=eu(f)),h=c,a=n.apply(l,i)):f||(f=su(u,o))}return y&&s?s=eu(s):s||t===_||(s=su(e,t)),r&&(y=true,a=n.apply(l,i)),!y||s||f||(i=l=null),a}var i,f,a,c,l,s,p,h=0,_=false,v=true;if(typeof n!="function")throw new Pe(L);if(t=0>t?0:+t||0,true===r)var g=true,v=false;else se(r)&&(g=r.leading,_="maxWait"in r&&bu(+r.maxWait||0,t),v="trailing"in r?r.trailing:v);return o.cancel=function(){s&&eu(s),f&&eu(f),f=s=p=w},o}function ie(n,t){function r(){var e=arguments,u=r.cache,o=t?t.apply(this,e):e[0];

return u.has(o)?u.get(o):(e=n.apply(this,e),u.set(o,e),e)}if(typeof n!="function"||t&&typeof t!="function")throw new Pe(L);return r.cache=new ie.Cache,r}function fe(n,t){if(typeof n!="function")throw new Pe(L);return t=bu(t===w?n.length-1:+t||0,0),function(){for(var r=arguments,e=-1,u=bu(r.length-t,0),o=Ue(u);++e<u;)o[e]=r[t+e];switch(t){case 0:return n.call(this,o);case 1:return n.call(this,r[0],o);case 2:return n.call(this,r[0],r[1],o)}for(u=Ue(t+1),e=-1;++e<t;)u[e]=r[e];return u[t]=o,n.apply(this,u);

}}function ae(n){return h(n)&&jr(n)&&Xe.call(n)==B}function ce(n){return!!n&&1===n.nodeType&&h(n)&&-1<Xe.call(n).indexOf("Element")}function le(n){return h(n)&&typeof n.message=="string"&&Xe.call(n)==q}function se(n){var t=typeof n;return"function"==t||!!n&&"object"==t}function pe(n){return null==n?false:Xe.call(n)==K?Qe.test(Ze.call(n)):h(n)&&En.test(n)}function he(n){return typeof n=="number"||h(n)&&Xe.call(n)==V}function _e(n){return h(n)&&Xe.call(n)==Z}function ve(n){return typeof n=="string"||h(n)&&Xe.call(n)==G;

}function ge(n){return h(n)&&Rr(n.length)&&!!Un[Xe.call(n)]}function ye(n){return et(n,me(n))}function de(n){return vt(n,me(n))}function me(n){if(null==n)return[];se(n)||(n=Be(n));for(var t=n.length,t=t&&Rr(t)&&(To(n)||Fu.nonEnumArgs&&ae(n))&&t||0,r=n.constructor,e=-1,r=typeof r=="function"&&r.prototype===n,u=Ue(t),o=0<t;++e<t;)u[e]=e+"";for(var i in n)o&&kr(i,t)||"constructor"==i&&(r||!Ge.call(n,i))||u.push(i);return u}function we(n){return Ut(n,Ko(n))}function be(n){return(n=u(n))&&n.replace(In,c).replace(xn,"");

}function xe(n){return(n=u(n))&&bn.test(n)?n.replace(wn,"\\$&"):n}function Ae(n,t,r){return r&&Or(n,t,r)&&(t=0),ku(n,t)}function je(n,t){var r="";if(n=u(n),t=+t,1>t||!n||!mu(t))return r;do t%2&&(r+=n),t=uu(t/2),n+=n;while(t);return r}function ke(n,t,r){var e=n;return(n=u(n))?(r?Or(e,t,r):null==t)?n.slice(g(n),y(n)+1):(t+="",n.slice(i(n,t),f(n,t)+1)):n}function Oe(n,t,r){return r&&Or(n,t,r)&&(t=null),n=u(n),n.match(t||Wn)||[]}function Ee(n,t,r){return r&&Or(n,t,r)&&(t=null),h(n)?Ce(n):ut(n,t)}function Ie(n){
return function(){return n}}function Re(n){return n}function Ce(n){return wt(ot(n,true))}function We(n,t,r){if(null==r){var e=se(t),u=e&&Ko(t);((u=u&&u.length&&vt(t,u))?u.length:e)||(u=false,r=t,t=n,n=this)}u||(u=vt(t,Ko(t)));var o=true,e=-1,i=No(n),f=u.length;false===r?o=false:se(r)&&"chain"in r&&(o=r.chain);for(;++e<f;){r=u[e];var a=t[r];n[r]=a,i&&(n.prototype[r]=function(t){return function(){var r=this.__chain__;if(o||r){var e=n(this.__wrapped__);return(e.__actions__=qn(this.__actions__)).push({func:t,args:arguments,
thisArg:n}),e.__chain__=r,e}return r=[this.value()],fu.apply(r,arguments),t.apply(n,r)}}(a))}return n}function Se(){}function Te(n){return Er(n)?At(n):jt(n)}_=_?Zn.defaults(Yn.Object(),_,Zn.pick(Yn,Tn)):Yn;var Ue=_.Array,Ne=_.Date,Fe=_.Error,$e=_.Function,Le=_.Math,ze=_.Number,Be=_.Object,Me=_.RegExp,De=_.String,Pe=_.TypeError,qe=Ue.prototype,Ke=Be.prototype,Ve=De.prototype,Ye=(Ye=_.window)&&Ye.document,Ze=$e.prototype.toString,Ge=Ke.hasOwnProperty,Je=0,Xe=Ke.toString,He=_._,Qe=Me("^"+xe(Xe).replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),nu=pe(nu=_.ArrayBuffer)&&nu,tu=pe(tu=nu&&new nu(0).slice)&&tu,ru=Le.ceil,eu=_.clearTimeout,uu=Le.floor,ou=pe(ou=Be.getOwnPropertySymbols)&&ou,iu=pe(iu=Be.getPrototypeOf)&&iu,fu=qe.push,au=pe(au=Be.preventExtensions)&&au,cu=Ke.propertyIsEnumerable,lu=pe(lu=_.Set)&&lu,su=_.setTimeout,pu=qe.splice,hu=pe(hu=_.Uint8Array)&&hu,_u=pe(_u=_.WeakMap)&&_u,vu=function(){
try{var n=pe(n=_.Float64Array)&&n,t=new n(new nu(10),0,1)&&n}catch(r){}return t}(),gu=function(){var n=au&&pe(n=Be.assign)&&n;try{if(n){var t=au({1:0});t[0]=1}}catch(r){try{n(t,"xo")}catch(e){}return!t[1]&&n}return false}(),yu=pe(yu=Ue.isArray)&&yu,du=pe(du=Be.create)&&du,mu=_.isFinite,wu=pe(wu=Be.keys)&&wu,bu=Le.max,xu=Le.min,Au=pe(Au=Ne.now)&&Au,ju=pe(ju=ze.isFinite)&&ju,ku=_.parseInt,Ou=Le.random,Eu=ze.NEGATIVE_INFINITY,Iu=ze.POSITIVE_INFINITY,Ru=Le.pow(2,32)-1,Cu=Ru-1,Wu=Ru>>>1,Su=vu?vu.BYTES_PER_ELEMENT:0,Tu=Le.pow(2,53)-1,Uu=_u&&new _u,Nu={},Fu=$n.support={};

!function(n){function t(){this.x=n}var r=arguments,e=[];t.prototype={valueOf:n,y:n};for(var u in new t)e.push(u);Fu.funcDecomp=/\bthis\b/.test(function(){return this}),Fu.funcNames=typeof $e.name=="string";try{Fu.dom=11===Ye.createDocumentFragment().nodeType}catch(o){Fu.dom=false}try{Fu.nonEnumArgs=!cu.call(r,1)}catch(i){Fu.nonEnumArgs=true}}(1,0),$n.templateSettings={escape:_n,evaluate:vn,interpolate:gn,variable:"",imports:{_:$n}};var $u=gu||function(n,t){return null==t?n:et(t,Zu(t),et(t,Ko(t),n))},Lu=function(){
function n(){}return function(t){if(se(t)){n.prototype=t;var r=new n;n.prototype=null}return r||_.Object()}}(),zu=Kt(ht),Bu=Kt(_t,true),Mu=Vt(),Du=Vt(true),Pu=Uu?function(n,t){return Uu.set(n,t),n}:Re;tu||(Bt=nu&&hu?function(n){var t=n.byteLength,r=vu?uu(t/Su):0,e=r*Su,u=new nu(t);if(r){var o=new vu(u,0,r);o.set(new vu(n,0,r))}return t!=e&&(o=new hu(u,e),o.set(new hu(n,e))),u}:Ie(null));var qu=du&&lu?function(n){return new Dn(n)}:Ie(null),Ku=Uu?function(n){return Uu.get(n)}:Se,Vu=function(){return Fu.funcNames?"constant"==Ie.name?At("name"):function(n){
for(var t=n.name,r=Nu[t],e=r?r.length:0;e--;){var u=r[e],o=u.func;if(null==o||o==n)return u.name}return t}:Ie("")}(),Yu=At("length"),Zu=ou?function(n){return ou(Fr(n))}:Ie([]),Gu=function(){var n=0,t=0;return function(r,e){var u=wo(),o=U-(u-t);if(t=u,0<o){if(++n>=T)return r}else n=0;return Pu(r,e)}}(),Ju=fe(function(n,t){return jr(n)?ft(n,st(t,false,true)):[]}),Xu=Qt(),Hu=Qt(true),Qu=fe(function(t,r){r=st(r);var e=rt(t,r);return kt(t,r.sort(n)),e}),no=pr(),to=pr(true),ro=fe(function(n){return Tt(st(n,false,true));

}),eo=fe(function(n,t){return jr(n)?ft(n,t):[]}),uo=fe(Vr),oo=fe(function(n){var t=n.length,r=n[t-2],e=n[t-1];return 2<t&&typeof r=="function"?t-=2:(r=1<t&&typeof e=="function"?(--t,e):w,e=w),n.length=t,Yr(n,r,e)}),io=fe(function(n,t){return rt(n,st(t))}),fo=Pt(function(n,t,r){Ge.call(n,r)?++n[r]:n[r]=1}),ao=Ht(zu),co=Ht(Bu,true),lo=rr(Kn,zu),so=rr(function(n,t){for(var r=n.length;r--&&false!==t(n[r],r,n););return n},Bu),po=Pt(function(n,t,r){Ge.call(n,r)?n[r].push(t):n[r]=[t]}),ho=Pt(function(n,t,r){
n[r]=t}),_o=fe(function(n,t,r){var e=-1,u=typeof t=="function",o=Er(t),i=jr(n)?Ue(n.length):[];return zu(n,function(n){var f=u?t:o&&null!=n&&n[t];i[++e]=f?f.apply(n,r):Ar(n,t,r)}),i}),vo=Pt(function(n,t,r){n[r?0:1].push(t)},function(){return[[],[]]}),go=ar(Xn,zu),yo=ar(function(n,t,r,e){var u=n.length;for(e&&u&&(r=n[--u]);u--;)r=t(r,n[u],u,n);return r},Bu),mo=fe(function(n,t){if(null==n)return[];var r=t[2];return r&&Or(t[0],t[1],r)&&(t.length=1),Wt(n,st(t),[])}),wo=Au||function(){return(new Ne).getTime();

},bo=fe(function(n,t,r){var e=x;if(r.length)var u=v(r,bo.placeholder),e=e|E;return hr(n,e,t,r,u)}),xo=fe(function(n,t){t=t.length?st(t):de(n);for(var r=-1,e=t.length;++r<e;){var u=t[r];n[u]=hr(n[u],x,n)}return n}),Ao=fe(function(n,t,r){var e=x|A;if(r.length)var u=v(r,Ao.placeholder),e=e|E;return hr(t,e,n,r,u)}),jo=Jt(k),ko=Jt(O),Oo=fe(function(n,t){return it(n,1,t)}),Eo=fe(function(n,t,r){return it(n,t,r)}),Io=tr(),Ro=tr(true),Co=fr(E),Wo=fr(I),So=fe(function(n,t){return hr(n,C,null,null,null,st(t));

}),To=yu||function(n){return h(n)&&Rr(n.length)&&Xe.call(n)==M};Fu.dom||(ce=function(n){return!!n&&1===n.nodeType&&h(n)&&!Fo(n)});var Uo=ju||function(n){return typeof n=="number"&&mu(n)},No=e(/x/)||hu&&!e(hu)?function(n){return Xe.call(n)==K}:e,Fo=iu?function(n){if(!n||Xe.call(n)!=Y)return false;var t=n.valueOf,r=pe(t)&&(r=iu(t))&&iu(r);return r?n==r||iu(n)==r:Tr(n)}:Tr,$o=qt(function(n,t,r){return r?tt(n,t,r):$u(n,t)}),Lo=fe(function(n){var t=n[0];return null==t?t:(n.push(Qn),$o.apply(w,n))}),zo=nr(ht),Bo=nr(_t),Mo=er(Mu),Do=er(Du),Po=ur(ht),qo=ur(_t),Ko=wu?function(n){
var t=null!=n&&n.constructor;return typeof t=="function"&&t.prototype===n||typeof n!="function"&&jr(n)?Ur(n):se(n)?wu(n):[]}:Ur,Vo=or(true),Yo=or(),Zo=qt(xt),Go=fe(function(n,t){if(null==n)return{};if("function"!=typeof t[0])return t=Jn(st(t),De),Wr(n,ft(me(n),t));var r=zt(t[0],t[1],3);return Sr(n,function(n,t,e){return!r(n,t,e)})}),Jo=fe(function(n,t){return null==n?{}:"function"==typeof t[0]?Sr(n,zt(t[0],t[1],3)):Wr(n,st(t))}),Xo=Zt(function(n,t,r){return t=t.toLowerCase(),n+(r?t.charAt(0).toUpperCase()+t.slice(1):t);

}),Ho=Zt(function(n,t,r){return n+(r?"-":"")+t.toLowerCase()}),Qo=ir(),ni=ir(true);8!=ku(Sn+"08")&&(Ae=function(n,t,r){return(r?Or(n,t,r):null==t)?t=0:t&&(t=+t),n=ke(n),ku(n,t||(On.test(n)?16:10))});var ti=Zt(function(n,t,r){return n+(r?"_":"")+t.toLowerCase()}),ri=Zt(function(n,t,r){return n+(r?" ":"")+(t.charAt(0).toUpperCase()+t.slice(1))}),ei=fe(function(n,t){try{return n.apply(w,t)}catch(r){return le(r)?r:new Fe(r)}}),ui=fe(function(n,t){return function(r){return Ar(r,n,t)}}),oi=fe(function(n,t){
return function(r){return Ar(n,r,t)}}),ii=Xt(function(n){for(var t=-1,r=n.length,e=Eu;++t<r;){var u=n[t];u>e&&(e=u)}return e}),fi=Xt(function(n){for(var t=-1,r=n.length,e=Iu;++t<r;){var u=n[t];u<e&&(e=u)}return e},true);return $n.prototype=Ln.prototype,zn.prototype=Lu(Ln.prototype),zn.prototype.constructor=zn,Bn.prototype=Lu(Ln.prototype),Bn.prototype.constructor=Bn,Mn.prototype["delete"]=function(n){return this.has(n)&&delete this.__data__[n]},Mn.prototype.get=function(n){return"__proto__"==n?w:this.__data__[n];

},Mn.prototype.has=function(n){return"__proto__"!=n&&Ge.call(this.__data__,n)},Mn.prototype.set=function(n,t){return"__proto__"!=n&&(this.__data__[n]=t),this},Dn.prototype.push=function(n){var t=this.data;typeof n=="string"||se(n)?t.set.add(n):t.hash[n]=true},ie.Cache=Mn,$n.after=function(n,t){if(typeof t!="function"){if(typeof n!="function")throw new Pe(L);var r=n;n=t,t=r}return n=mu(n=+n)?n:0,function(){return 1>--n?t.apply(this,arguments):void 0}},$n.ary=function(n,t,r){return r&&Or(n,t,r)&&(t=null),
t=n&&null==t?n.length:bu(+t||0,0),hr(n,R,null,null,null,null,t)},$n.assign=$o,$n.at=io,$n.before=ue,$n.bind=bo,$n.bindAll=xo,$n.bindKey=Ao,$n.callback=Ee,$n.chain=Gr,$n.chunk=function(n,t,r){t=(r?Or(n,t,r):null==t)?1:bu(+t||1,1),r=0;for(var e=n?n.length:0,u=-1,o=Ue(ru(e/t));r<e;)o[++u]=It(n,r,r+=t);return o},$n.compact=function(n){for(var t=-1,r=n?n.length:0,e=-1,u=[];++t<r;){var o=n[t];o&&(u[++e]=o)}return u},$n.constant=Ie,$n.countBy=fo,$n.create=function(n,t,r){var e=Lu(n);return r&&Or(n,t,r)&&(t=null),
t?$u(e,t):e},$n.curry=jo,$n.curryRight=ko,$n.debounce=oe,$n.defaults=Lo,$n.defer=Oo,$n.delay=Eo,$n.difference=Ju,$n.drop=zr,$n.dropRight=Br,$n.dropRightWhile=function(n,t,r){return n&&n.length?Nt(n,dr(t,r,3),true,true):[]},$n.dropWhile=function(n,t,r){return n&&n.length?Nt(n,dr(t,r,3),true):[]},$n.fill=function(n,t,r,e){var u=n?n.length:0;if(!u)return[];for(r&&typeof r!="number"&&Or(n,t,r)&&(r=0,e=u),u=n.length,r=null==r?0:+r||0,0>r&&(r=-r>u?0:u+r),e=e===w||e>u?u:+e||0,0>e&&(e+=u),u=r>e?0:e>>>0,r>>>=0;r<u;)n[r++]=t;

return n},$n.filter=Hr,$n.flatten=function(n,t,r){var e=n?n.length:0;return r&&Or(n,t,r)&&(t=false),e?st(n,t):[]},$n.flattenDeep=function(n){return n&&n.length?st(n,true):[]},$n.flow=Io,$n.flowRight=Ro,$n.forEach=lo,$n.forEachRight=so,$n.forIn=Mo,$n.forInRight=Do,$n.forOwn=Po,$n.forOwnRight=qo,$n.functions=de,$n.groupBy=po,$n.indexBy=ho,$n.initial=function(n){return Br(n,1)},$n.intersection=function(){for(var n=[],t=-1,e=arguments.length,u=[],o=mr(),i=o==r,f=[];++t<e;){var a=arguments[t];jr(a)&&(n.push(a),
u.push(i&&120<=a.length?qu(t&&a):null))}if(e=n.length,2>e)return f;var i=n[0],c=-1,l=i?i.length:0,s=u[0];n:for(;++c<l;)if(a=i[c],0>(s?Pn(s,a):o(f,a,0))){for(t=e;--t;){var p=u[t];if(0>(p?Pn(p,a):o(n[t],a,0)))continue n}s&&s.push(a),f.push(a)}return f},$n.invert=function(n,t,r){r&&Or(n,t,r)&&(t=null),r=-1;for(var e=Ko(n),u=e.length,o={};++r<u;){var i=e[r],f=n[i];t?Ge.call(o,f)?o[f].push(i):o[f]=[i]:o[f]=i}return o},$n.invoke=_o,$n.keys=Ko,$n.keysIn=me,$n.map=ne,$n.mapKeys=Vo,$n.mapValues=Yo,$n.matches=Ce,
$n.matchesProperty=function(n,t){return bt(n,ot(t,true))},$n.memoize=ie,$n.merge=Zo,$n.method=ui,$n.methodOf=oi,$n.mixin=We,$n.negate=function(n){if(typeof n!="function")throw new Pe(L);return function(){return!n.apply(this,arguments)}},$n.omit=Go,$n.once=function(n){return ue(2,n)},$n.pairs=function(n){for(var t=-1,r=Ko(n),e=r.length,u=Ue(e);++t<e;){var o=r[t];u[t]=[o,n[o]]}return u},$n.partial=Co,$n.partialRight=Wo,$n.partition=vo,$n.pick=Jo,$n.pluck=function(n,t){return ne(n,Te(t))},$n.property=Te,
$n.propertyOf=function(n){return function(t){return gt(n,$r(t),t+"")}},$n.pull=function(){var n=arguments,t=n[0];if(!t||!t.length)return t;for(var r=0,e=mr(),u=n.length;++r<u;)for(var o=0,i=n[r];-1<(o=e(t,i,o));)pu.call(t,o,1);return t},$n.pullAt=Qu,$n.range=function(n,t,r){r&&Or(n,t,r)&&(t=r=null),n=+n||0,r=null==r?1:+r||0,null==t?(t=n,n=0):t=+t||0;var e=-1;t=bu(ru((t-n)/(r||1)),0);for(var u=Ue(t);++e<t;)u[e]=n,n+=r;return u},$n.rearg=So,$n.reject=function(n,t,r){var e=To(n)?Gn:ct;return t=dr(t,r,3),
e(n,function(n,r,e){return!t(n,r,e)})},$n.remove=function(n,t,r){var e=[];if(!n||!n.length)return e;var u=-1,o=[],i=n.length;for(t=dr(t,r,3);++u<i;)r=n[u],t(r,u,n)&&(e.push(r),o.push(u));return kt(n,o),e},$n.rest=qr,$n.restParam=fe,$n.set=function(n,t,r){if(null==n)return n;var e=t+"";t=null!=n[e]||Er(t,n)?[e]:$r(t);for(var e=-1,u=t.length,o=u-1,i=n;null!=i&&++e<u;){var f=t[e];se(i)&&(e==o?i[f]=r:null==i[f]&&(i[f]=kr(t[e+1])?[]:{})),i=i[f]}return n},$n.shuffle=re,$n.slice=function(n,t,r){var e=n?n.length:0;

return e?(r&&typeof r!="number"&&Or(n,t,r)&&(t=0,r=e),It(n,t,r)):[]},$n.sortBy=function(n,t,r){if(null==n)return[];r&&Or(n,t,r)&&(t=null);var e=-1;return t=dr(t,r,3),n=mt(n,function(n,r,u){return{a:t(n,r,u),b:++e,c:n}}),Ct(n,a)},$n.sortByAll=mo,$n.sortByOrder=function(n,t,r,e){return null==n?[]:(e&&Or(t,r,e)&&(r=null),To(t)||(t=null==t?[]:[t]),To(r)||(r=null==r?[]:[r]),Wt(n,t,r))},$n.spread=function(n){if(typeof n!="function")throw new Pe(L);return function(t){return n.apply(this,t)}},$n.take=function(n,t,r){
return n&&n.length?((r?Or(n,t,r):null==t)&&(t=1),It(n,0,0>t?0:t)):[]},$n.takeRight=function(n,t,r){var e=n?n.length:0;return e?((r?Or(n,t,r):null==t)&&(t=1),t=e-(+t||0),It(n,0>t?0:t)):[]},$n.takeRightWhile=function(n,t,r){return n&&n.length?Nt(n,dr(t,r,3),false,true):[]},$n.takeWhile=function(n,t,r){return n&&n.length?Nt(n,dr(t,r,3)):[]},$n.tap=function(n,t,r){return t.call(r,n),n},$n.throttle=function(n,t,r){var e=true,u=true;if(typeof n!="function")throw new Pe(L);return false===r?e=false:se(r)&&(e="leading"in r?!!r.leading:e,
u="trailing"in r?!!r.trailing:u),Fn.leading=e,Fn.maxWait=+t,Fn.trailing=u,oe(n,t,Fn)},$n.thru=Jr,$n.times=function(n,t,r){if(n=uu(n),1>n||!mu(n))return[];var e=-1,u=Ue(xu(n,Ru));for(t=zt(t,r,1);++e<n;)e<Ru?u[e]=t(e):t(e);return u},$n.toArray=function(n){var t=n?Yu(n):0;return Rr(t)?t?qn(n):[]:we(n)},$n.toPlainObject=ye,$n.transform=function(n,t,r,e){var u=To(n)||ge(n);return t=dr(t,e,4),null==r&&(u||se(n)?(e=n.constructor,r=u?To(n)?new e:[]:Lu(No(e)&&e.prototype)):r={}),(u?Kn:ht)(n,function(n,e,u){
return t(r,n,e,u)}),r},$n.union=ro,$n.uniq=Kr,$n.unzip=Vr,$n.unzipWith=Yr,$n.values=we,$n.valuesIn=function(n){return Ut(n,me(n))},$n.where=function(n,t){return Hr(n,wt(t))},$n.without=eo,$n.wrap=function(n,t){return t=null==t?Re:t,hr(t,E,null,[n],[])},$n.xor=function(){for(var n=-1,t=arguments.length;++n<t;){var r=arguments[n];if(jr(r))var e=e?ft(e,r).concat(ft(r,e)):r}return e?Tt(e):[]},$n.zip=uo,$n.zipObject=Zr,$n.zipWith=oo,$n.backflow=Ro,$n.collect=ne,$n.compose=Ro,$n.each=lo,$n.eachRight=so,
$n.extend=$o,$n.iteratee=Ee,$n.methods=de,$n.object=Zr,$n.select=Hr,$n.tail=qr,$n.unique=Kr,We($n,$n),$n.add=function(n,t){return(+n||0)+(+t||0)},$n.attempt=ei,$n.camelCase=Xo,$n.capitalize=function(n){return(n=u(n))&&n.charAt(0).toUpperCase()+n.slice(1)},$n.clone=function(n,t,r,e){return t&&typeof t!="boolean"&&Or(n,t,r)?t=false:typeof t=="function"&&(e=r,r=t,t=false),r=typeof r=="function"&&zt(r,e,1),ot(n,t,r)},$n.cloneDeep=function(n,t,r){return t=typeof t=="function"&&zt(t,r,1),ot(n,true,t)},$n.deburr=be,
$n.endsWith=function(n,t,r){n=u(n),t+="";var e=n.length;return r=r===w?e:xu(0>r?0:+r||0,e),r-=t.length,0<=r&&n.indexOf(t,r)==r},$n.escape=function(n){return(n=u(n))&&hn.test(n)?n.replace(sn,l):n},$n.escapeRegExp=xe,$n.every=Xr,$n.find=ao,$n.findIndex=Xu,$n.findKey=zo,$n.findLast=co,$n.findLastIndex=Hu,$n.findLastKey=Bo,$n.findWhere=function(n,t){return ao(n,wt(t))},$n.first=Mr,$n.get=function(n,t,r){return n=null==n?w:gt(n,$r(t),t+""),n===w?r:n},$n.has=function(n,t){if(null==n)return false;var r=Ge.call(n,t);

return r||Er(t)||(t=$r(t),n=1==t.length?n:gt(n,It(t,0,-1)),t=Pr(t),r=null!=n&&Ge.call(n,t)),r},$n.identity=Re,$n.includes=Qr,$n.indexOf=Dr,$n.inRange=function(n,t,r){return t=+t||0,"undefined"===typeof r?(r=t,t=0):r=+r||0,n>=xu(t,r)&&n<bu(t,r)},$n.isArguments=ae,$n.isArray=To,$n.isBoolean=function(n){return true===n||false===n||h(n)&&Xe.call(n)==D},$n.isDate=function(n){return h(n)&&Xe.call(n)==P},$n.isElement=ce,$n.isEmpty=function(n){return null==n?true:jr(n)&&(To(n)||ve(n)||ae(n)||h(n)&&No(n.splice))?!n.length:!Ko(n).length;

},$n.isEqual=function(n,t,r,e){return r=typeof r=="function"&&zt(r,e,3),!r&&Cr(n)&&Cr(t)?n===t:(e=r?r(n,t):w,e===w?yt(n,t,r):!!e)},$n.isError=le,$n.isFinite=Uo,$n.isFunction=No,$n.isMatch=function(n,t,r,e){var u=Ko(t),o=u.length;if(!o)return true;if(null==n)return false;if(r=typeof r=="function"&&zt(r,e,3),n=Fr(n),!r&&1==o){var i=u[0];if(e=t[i],Cr(e))return e===n[i]&&(e!==w||i in n)}for(var i=Ue(o),f=Ue(o);o--;)e=i[o]=t[u[o]],f[o]=Cr(e);return dt(n,u,i,f,r)},$n.isNaN=function(n){return he(n)&&n!=+n},$n.isNative=pe,
$n.isNull=function(n){return null===n},$n.isNumber=he,$n.isObject=se,$n.isPlainObject=Fo,$n.isRegExp=_e,$n.isString=ve,$n.isTypedArray=ge,$n.isUndefined=function(n){return n===w},$n.kebabCase=Ho,$n.last=Pr,$n.lastIndexOf=function(n,t,r){var e=n?n.length:0;if(!e)return-1;var u=e;if(typeof r=="number")u=(0>r?bu(e+r,0):xu(r||0,e-1))+1;else if(r)return u=$t(n,t,true)-1,n=n[u],(t===t?t===n:n!==n)?u:-1;if(t!==t)return p(n,u,true);for(;u--;)if(n[u]===t)return u;return-1},$n.max=ii,$n.min=fi,$n.noConflict=function(){
return _._=He,this},$n.noop=Se,$n.now=wo,$n.pad=function(n,t,r){n=u(n),t=+t;var e=n.length;return e<t&&mu(t)?(e=(t-e)/2,t=uu(e),e=ru(e),r=lr("",e,r),r.slice(0,t)+n+r):n},$n.padLeft=Qo,$n.padRight=ni,$n.parseInt=Ae,$n.random=function(n,t,r){r&&Or(n,t,r)&&(t=r=null);var e=null==n,u=null==t;return null==r&&(u&&typeof n=="boolean"?(r=n,n=1):typeof t=="boolean"&&(r=t,u=true)),e&&u&&(t=1,u=false),n=+n||0,u?(t=n,n=0):t=+t||0,r||n%1||t%1?(r=Ou(),xu(n+r*(t-n+parseFloat("1e-"+((r+"").length-1))),t)):Ot(n,t)},$n.reduce=go,
$n.reduceRight=yo,$n.repeat=je,$n.result=function(n,t,r){var e=null==n?w:n[t];return e===w&&(null==n||Er(t,n)||(t=$r(t),n=1==t.length?n:gt(n,It(t,0,-1)),e=null==n?w:n[Pr(t)]),e=e===w?r:e),No(e)?e.call(n):e},$n.runInContext=m,$n.size=function(n){var t=n?Yu(n):0;return Rr(t)?t:Ko(n).length},$n.snakeCase=ti,$n.some=ee,$n.sortedIndex=no,$n.sortedLastIndex=to,$n.startCase=ri,$n.startsWith=function(n,t,r){return n=u(n),r=null==r?0:xu(0>r?0:+r||0,n.length),n.lastIndexOf(t,r)==r},$n.sum=function(n,t,r){r&&Or(n,t,r)&&(t=null);

var e=dr(),u=null==t;if(e===ut&&u||(u=false,t=e(t,r,3)),u){for(n=To(n)?n:Nr(n),t=n.length,r=0;t--;)r+=+n[t]||0;n=r}else n=St(n,t);return n},$n.template=function(n,t,r){var e=$n.templateSettings;r&&Or(n,t,r)&&(t=r=null),n=u(n),t=tt($u({},r||t),e,nt),r=tt($u({},t.imports),e.imports,nt);var o,i,f=Ko(r),a=Ut(r,f),c=0;r=t.interpolate||Rn;var l="__p+='";r=Me((t.escape||Rn).source+"|"+r.source+"|"+(r===gn?jn:Rn).source+"|"+(t.evaluate||Rn).source+"|$","g");var p="sourceURL"in t?"//# sourceURL="+t.sourceURL+"\n":"";

if(n.replace(r,function(t,r,e,u,f,a){return e||(e=u),l+=n.slice(c,a).replace(Cn,s),r&&(o=true,l+="'+__e("+r+")+'"),f&&(i=true,l+="';"+f+";\n__p+='"),e&&(l+="'+((__t=("+e+"))==null?'':__t)+'"),c=a+t.length,t}),l+="';",(t=t.variable)||(l="with(obj){"+l+"}"),l=(i?l.replace(fn,""):l).replace(an,"$1").replace(cn,"$1;"),l="function("+(t||"obj")+"){"+(t?"":"obj||(obj={});")+"var __t,__p=''"+(o?",__e=_.escape":"")+(i?",__j=Array.prototype.join;function print(){__p+=__j.call(arguments,'')}":";")+l+"return __p}",
t=ei(function(){return $e(f,p+"return "+l).apply(w,a)}),t.source=l,le(t))throw t;return t},$n.trim=ke,$n.trimLeft=function(n,t,r){var e=n;return(n=u(n))?n.slice((r?Or(e,t,r):null==t)?g(n):i(n,t+"")):n},$n.trimRight=function(n,t,r){var e=n;return(n=u(n))?(r?Or(e,t,r):null==t)?n.slice(0,y(n)+1):n.slice(0,f(n,t+"")+1):n},$n.trunc=function(n,t,r){r&&Or(n,t,r)&&(t=null);var e=W;if(r=S,null!=t)if(se(t)){var o="separator"in t?t.separator:o,e="length"in t?+t.length||0:e;r="omission"in t?u(t.omission):r}else e=+t||0;

if(n=u(n),e>=n.length)return n;if(e-=r.length,1>e)return r;if(t=n.slice(0,e),null==o)return t+r;if(_e(o)){if(n.slice(e).search(o)){var i,f=n.slice(0,e);for(o.global||(o=Me(o.source,(kn.exec(o)||"")+"g")),o.lastIndex=0;n=o.exec(f);)i=n.index;t=t.slice(0,null==i?e:i)}}else n.indexOf(o,e)!=e&&(o=t.lastIndexOf(o),-1<o&&(t=t.slice(0,o)));return t+r},$n.unescape=function(n){return(n=u(n))&&pn.test(n)?n.replace(ln,d):n},$n.uniqueId=function(n){var t=++Je;return u(n)+t},$n.words=Oe,$n.all=Xr,$n.any=ee,$n.contains=Qr,
$n.detect=ao,$n.foldl=go,$n.foldr=yo,$n.head=Mr,$n.include=Qr,$n.inject=go,We($n,function(){var n={};return ht($n,function(t,r){$n.prototype[r]||(n[r]=t)}),n}(),false),$n.sample=te,$n.prototype.sample=function(n){return this.__chain__||null!=n?this.thru(function(t){return te(t,n)}):te(this.value())},$n.VERSION=b,Kn("bind bindKey curry curryRight partial partialRight".split(" "),function(n){$n[n].placeholder=$n}),Kn(["dropWhile","filter","map","takeWhile"],function(n,t){var r=t!=$,e=t==N;Bn.prototype[n]=function(n,u){
var o=this.__filtered__,i=o&&e?new Bn(this):this.clone();return(i.__iteratees__||(i.__iteratees__=[])).push({done:false,count:0,index:0,iteratee:dr(n,u,1),limit:-1,type:t}),i.__filtered__=o||r,i}}),Kn(["drop","take"],function(n,t){var r=n+"While";Bn.prototype[n]=function(r){var e=this.__filtered__,u=e&&!t?this.dropWhile():this.clone();return r=null==r?1:bu(uu(r)||0,0),e?t?u.__takeCount__=xu(u.__takeCount__,r):Pr(u.__iteratees__).limit=r:(u.__views__||(u.__views__=[])).push({size:r,type:n+(0>u.__dir__?"Right":"")
}),u},Bn.prototype[n+"Right"]=function(t){return this.reverse()[n](t).reverse()},Bn.prototype[n+"RightWhile"]=function(n,t){return this.reverse()[r](n,t).reverse()}}),Kn(["first","last"],function(n,t){var r="take"+(t?"Right":"");Bn.prototype[n]=function(){return this[r](1).value()[0]}}),Kn(["initial","rest"],function(n,t){var r="drop"+(t?"":"Right");Bn.prototype[n]=function(){return this[r](1)}}),Kn(["pluck","where"],function(n,t){var r=t?"filter":"map",e=t?wt:Te;Bn.prototype[n]=function(n){return this[r](e(n));

}}),Bn.prototype.compact=function(){return this.filter(Re)},Bn.prototype.reject=function(n,t){return n=dr(n,t,1),this.filter(function(t){return!n(t)})},Bn.prototype.slice=function(n,t){n=null==n?0:+n||0;var r=this;return 0>n?r=this.takeRight(-n):n&&(r=this.drop(n)),t!==w&&(t=+t||0,r=0>t?r.dropRight(-t):r.take(t-n)),r},Bn.prototype.toArray=function(){return this.drop(0)},ht(Bn.prototype,function(n,t){var r=$n[t];if(r){var e=/^(?:filter|map|reject)|While$/.test(t),u=/^(?:first|last)$/.test(t);$n.prototype[t]=function(){
function t(n){return n=[n],fu.apply(n,o),r.apply($n,n)}var o=arguments,i=this.__chain__,f=this.__wrapped__,a=!!this.__actions__.length,c=f instanceof Bn,l=o[0],s=c||To(f);return s&&e&&typeof l=="function"&&1!=l.length&&(c=s=false),c=c&&!a,u&&!i?c?n.call(f):r.call($n,this.value()):s?(f=n.apply(c?f:new Bn(this),o),u||!a&&!f.__actions__||(f.__actions__||(f.__actions__=[])).push({func:Jr,args:[t],thisArg:$n}),new zn(f,i)):this.thru(t)}}}),Kn("concat join pop push replace shift sort splice split unshift".split(" "),function(n){
var t=(/^(?:replace|split)$/.test(n)?Ve:qe)[n],r=/^(?:push|sort|unshift)$/.test(n)?"tap":"thru",e=/^(?:join|pop|replace|shift)$/.test(n);$n.prototype[n]=function(){var n=arguments;return e&&!this.__chain__?t.apply(this.value(),n):this[r](function(r){return t.apply(r,n)})}}),ht(Bn.prototype,function(n,t){var r=$n[t];if(r){var e=r.name;(Nu[e]||(Nu[e]=[])).push({name:t,func:r})}}),Nu[cr(null,A).name]=[{name:"wrapper",func:null}],Bn.prototype.clone=function(){var n=this.__actions__,t=this.__iteratees__,r=this.__views__,e=new Bn(this.__wrapped__);

return e.__actions__=n?qn(n):null,e.__dir__=this.__dir__,e.__filtered__=this.__filtered__,e.__iteratees__=t?qn(t):null,e.__takeCount__=this.__takeCount__,e.__views__=r?qn(r):null,e},Bn.prototype.reverse=function(){if(this.__filtered__){var n=new Bn(this);n.__dir__=-1,n.__filtered__=true}else n=this.clone(),n.__dir__*=-1;return n},Bn.prototype.value=function(){var n=this.__wrapped__.value();if(!To(n))return Ft(n,this.__actions__);var t,r=this.__dir__,e=0>r;t=n.length;for(var u=this.__views__,o=0,i=-1,f=u?u.length:0;++i<f;){
var a=u[i],c=a.size;switch(a.type){case"drop":o+=c;break;case"dropRight":t-=c;break;case"take":t=xu(t,o+c);break;case"takeRight":o=bu(o,t-c)}}t={start:o,end:t},u=t.start,o=t.end,t=o-u,u=e?o:u-1,o=xu(t,this.__takeCount__),f=(i=this.__iteratees__)?i.length:0,a=0,c=[];n:for(;t--&&a<o;){for(var u=u+r,l=-1,s=n[u];++l<f;){var p=i[l],h=p.iteratee,_=p.type;if(_==N){if(p.done&&(e?u>p.index:u<p.index)&&(p.count=0,p.done=false),p.index=u,!(p.done||(_=p.limit,p.done=-1<_?p.count++>=_:!h(s))))continue n}else if(p=h(s),
_==$)s=p;else if(!p){if(_==F)continue n;break n}}c[a++]=s}return c},$n.prototype.chain=function(){return Gr(this)},$n.prototype.commit=function(){return new zn(this.value(),this.__chain__)},$n.prototype.plant=function(n){for(var t,r=this;r instanceof Ln;){var e=Lr(r);t?u.__wrapped__=e:t=e;var u=e,r=r.__wrapped__}return u.__wrapped__=n,t},$n.prototype.reverse=function(){var n=this.__wrapped__;return n instanceof Bn?(this.__actions__.length&&(n=new Bn(this)),new zn(n.reverse(),this.__chain__)):this.thru(function(n){
return n.reverse()})},$n.prototype.toString=function(){return this.value()+""},$n.prototype.run=$n.prototype.toJSON=$n.prototype.valueOf=$n.prototype.value=function(){return Ft(this.__wrapped__,this.__actions__)},$n.prototype.collect=$n.prototype.map,$n.prototype.head=$n.prototype.first,$n.prototype.select=$n.prototype.filter,$n.prototype.tail=$n.prototype.rest,$n}var w,b="3.8.0",x=1,A=2,j=4,k=8,O=16,E=32,I=64,R=128,C=256,W=30,S="...",T=150,U=16,N=0,F=1,$=2,L="Expected a function",z="__lodash_placeholder__",B="[object Arguments]",M="[object Array]",D="[object Boolean]",P="[object Date]",q="[object Error]",K="[object Function]",V="[object Number]",Y="[object Object]",Z="[object RegExp]",G="[object String]",J="[object ArrayBuffer]",X="[object Float32Array]",H="[object Float64Array]",Q="[object Int8Array]",nn="[object Int16Array]",tn="[object Int32Array]",rn="[object Uint8Array]",en="[object Uint8ClampedArray]",un="[object Uint16Array]",on="[object Uint32Array]",fn=/\b__p\+='';/g,an=/\b(__p\+=)''\+/g,cn=/(__e\(.*?\)|\b__t\))\+'';/g,ln=/&(?:amp|lt|gt|quot|#39|#96);/g,sn=/[&<>"'`]/g,pn=RegExp(ln.source),hn=RegExp(sn.source),_n=/<%-([\s\S]+?)%>/g,vn=/<%([\s\S]+?)%>/g,gn=/<%=([\s\S]+?)%>/g,yn=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,dn=/^\w*$/,mn=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g,wn=/[.*+?^${}()|[\]\/\\]/g,bn=RegExp(wn.source),xn=/[\u0300-\u036f\ufe20-\ufe23]/g,An=/\\(\\)?/g,jn=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,kn=/\w*$/,On=/^0[xX]/,En=/^\[object .+?Constructor\]$/,In=/[\xc0-\xd6\xd8-\xde\xdf-\xf6\xf8-\xff]/g,Rn=/($^)/,Cn=/['\n\r\u2028\u2029\\]/g,Wn=RegExp("[A-Z\\xc0-\\xd6\\xd8-\\xde]+(?=[A-Z\\xc0-\\xd6\\xd8-\\xde][a-z\\xdf-\\xf6\\xf8-\\xff]+)|[A-Z\\xc0-\\xd6\\xd8-\\xde]?[a-z\\xdf-\\xf6\\xf8-\\xff]+|[A-Z\\xc0-\\xd6\\xd8-\\xde]+|[0-9]+","g"),Sn=" \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000",Tn="Array ArrayBuffer Date Error Float32Array Float64Array Function Int8Array Int16Array Int32Array Math Number Object RegExp Set String _ clearTimeout document isFinite parseInt setTimeout TypeError Uint8Array Uint8ClampedArray Uint16Array Uint32Array WeakMap window".split(" "),Un={};

Un[X]=Un[H]=Un[Q]=Un[nn]=Un[tn]=Un[rn]=Un[en]=Un[un]=Un[on]=true,Un[B]=Un[M]=Un[J]=Un[D]=Un[P]=Un[q]=Un[K]=Un["[object Map]"]=Un[V]=Un[Y]=Un[Z]=Un["[object Set]"]=Un[G]=Un["[object WeakMap]"]=false;var Nn={};Nn[B]=Nn[M]=Nn[J]=Nn[D]=Nn[P]=Nn[X]=Nn[H]=Nn[Q]=Nn[nn]=Nn[tn]=Nn[V]=Nn[Y]=Nn[Z]=Nn[G]=Nn[rn]=Nn[en]=Nn[un]=Nn[on]=true,Nn[q]=Nn[K]=Nn["[object Map]"]=Nn["[object Set]"]=Nn["[object WeakMap]"]=false;var Fn={leading:false,maxWait:0,trailing:false},$n={"\xc0":"A","\xc1":"A","\xc2":"A","\xc3":"A","\xc4":"A","\xc5":"A",
"\xe0":"a","\xe1":"a","\xe2":"a","\xe3":"a","\xe4":"a","\xe5":"a","\xc7":"C","\xe7":"c","\xd0":"D","\xf0":"d","\xc8":"E","\xc9":"E","\xca":"E","\xcb":"E","\xe8":"e","\xe9":"e","\xea":"e","\xeb":"e","\xcc":"I","\xcd":"I","\xce":"I","\xcf":"I","\xec":"i","\xed":"i","\xee":"i","\xef":"i","\xd1":"N","\xf1":"n","\xd2":"O","\xd3":"O","\xd4":"O","\xd5":"O","\xd6":"O","\xd8":"O","\xf2":"o","\xf3":"o","\xf4":"o","\xf5":"o","\xf6":"o","\xf8":"o","\xd9":"U","\xda":"U","\xdb":"U","\xdc":"U","\xf9":"u","\xfa":"u",
"\xfb":"u","\xfc":"u","\xdd":"Y","\xfd":"y","\xff":"y","\xc6":"Ae","\xe6":"ae","\xde":"Th","\xfe":"th","\xdf":"ss"},Ln={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","`":"&#96;"},zn={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'","&#96;":"`"},Bn={"function":true,object:true},Mn={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},Dn=Bn[typeof exports]&&exports&&!exports.nodeType&&exports,Pn=Bn[typeof module]&&module&&!module.nodeType&&module,qn=Bn[typeof self]&&self&&self.Object&&self,Kn=Bn[typeof window]&&window&&window.Object&&window,Vn=Pn&&Pn.exports===Dn&&Dn,Yn=Dn&&Pn&&typeof global=="object"&&global&&global.Object&&global||Kn!==(this&&this.window)&&Kn||qn||this,Zn=m();

typeof define=="function"&&typeof define.amd=="object"&&define.amd?(Yn._=Zn, define(function(){return Zn})):Dn&&Pn?Vn?(Pn.exports=Zn)._=Zn:Dn._=Zn:Yn._=Zn}).call(this);

(function() {
  var findQueries, messageFolder, root, _, _ref, _ref1, _ref10, _ref11, _ref12, _ref13, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8, _ref9,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  root = (_ref = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref : this;


  /**
   * An appointment.
   *
   * @class Appointment
   * @private
   * @param _magisterObj {Magister} A Magister object this Appointment is child of.
   * @constructor
   */

  root.Appointment = (function() {
    function Appointment(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = root._getset("_end");

      /**
      		 * @property beginBySchoolHour
      		 * @final
      		 * @type Number
       */
      this.beginBySchoolHour = root._getset("_beginBySchoolHour");

      /**
      		 * @property endBySchoolHour
      		 * @final
      		 * @type Number
       */
      this.endBySchoolHour = root._getset("_endBySchoolHour");

      /**
      		 * @property fullDay
      		 * @final
      		 * @type Boolean
       */
      this.fullDay = root._getset("_fullDay");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property location
      		 * @final
      		 * @type String
       */
      this.location = root._getset("_location");

      /**
      		 * @property status
      		 * @final
      		 * @type Number
       */
      this.status = root._getset("_status");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property displayType
      		 * @final
      		 * @type Number
       */
      this.displayType = root._getset("_displayType");

      /**
      		 * @property content
      		 * @final
      		 * @type String
       */
      this.content = root._getset("_content", null, function(x) {
        if (x != null) {
          return x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "").replace(/\n{2,}/g, "\n").replace(/&amp;/ig, "&").trim();
        } else {
          return "";
        }
      });

      /**
      		 * @property infoType
      		 * @final
      		 * @type Number
       */
      this.infoType = root._getset("_infoType");

      /**
      		 * infoType parsed as a string.
      		 * @property infoTypeString
      		 * @final
      		 * @type String
       */
      this.infoTypeString = root._getset("_infoType", null, function(x) {
        switch (x) {
          case 0:
            return "none";
          case 1:
            return "homework";
          case 2:
            return "test";
          case 3:
            return "exam";
          case 4:
            return "quiz";
          case 5:
            return "oral test";
          case 6:
            return "information";
          default:
            return "unknown";
        }
      });

      /**
      		 * @property notes
      		 * @final
      		 * @type String
       */
      this.notes = root._getset("_notes");

      /**
      		 * @property isDone
      		 * @type Boolean
       */
      this.isDone = root._getset("_isDone", (function(_this) {
        return function(d) {
          if (_this._isDone === d) {
            return;
          }
          _this._isDone = d;
          return _this._magisterObj.http.put(_this.url(), _this._toMagisterStyle(), {}, (function() {}));
        };
      })(this));

      /**
      		 * @property classes
      		 * @final
      		 * @type String[]
       */
      this.classes = root._getset("_classes");

      /**
      		 * @property teachers
      		 * @final
      		 * @type Person[]
       */
      this.teachers = root._getset("_teachers");

      /**
      		 * @property classRooms
      		 * @final
      		 * @type String[]
       */
      this.classRooms = root._getset("_classRooms");

      /**
      		 * @property groups
      		 * @final
      		 * @type String[]
       */
      this.groups = root._getset("_groups");

      /**
      		 * @property appointmentId
      		 * @final
      		 * @type Number
       */
      this.appointmentId = root._getset("_appointmentId");

      /**
      		 * @property attachments
      		 * @final
      		 * @type File[]
       */
      this.attachments = root._getset("_attachments");

      /**
      		 * @property url
      		 * @final
      		 * @type String
       */
      this.url = root._getset("_url");

      /**
      		 * @property scrapped
      		 * @final
      		 * @type Boolean
       */
      this.scrapped = root._getset("_scrapped");

      /**
      		 * @property absenceInfo
      		 * @final
      		 * @type Object
       */
      this.absenceInfo = root._getset("_absenceInfo");
    }

    Appointment.prototype._toMagisterStyle = function() {
      var c, obj, p, _ref1;
      obj = {};
      obj.Id = this._id;
      obj.Start = root._helpers.toUtcString(this._begin);
      obj.Einde = root._helpers.toUtcString(this._end);
      obj.LesuurVan = this._beginBySchoolHour;
      obj.LesuurTotMet = this._endBySchoolHour;
      obj.DuurtHeleDag = this._fullDay;
      obj.Omschrijving = this._description;
      obj.Lokatie = this._location;
      obj.Status = this._status;
      obj.Type = this._type;
      obj.WeergaveType = this._displayType;
      obj.Inhoud = this._content;
      obj.InfoType = this._infoType;
      obj.Aantekening = this._notes;
      obj.Afgerond = this._isDone;
      obj.Lokalen = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this._classRooms;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          c = _ref1[_i];
          _results.push({
            Naam: c
          });
        }
        return _results;
      }).call(this);
      obj.Docenten = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this._teachers;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          p = _ref1[_i];
          _results.push(p._toMagisterStyle());
        }
        return _results;
      }).call(this);
      obj.Vakken = (function() {
        var _i, _len, _ref1, _results;
        _ref1 = this._classes;
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
          c = _ref1[_i];
          _results.push({
            Naam: c
          });
        }
        return _results;
      }).call(this);
      obj.Groepen = this._groups;
      obj.OpdrachtId = this._appointmentId;
      obj.Bijlagen = (_ref1 = this._attachments) != null ? _ref1 : [];
      return obj;
    };

    Appointment.prototype._makeStorable = function() {
      return _.omit(this, "_magisterObj");
    };

    Appointment._convertRaw = function(magisterObj, raw) {
      var c, obj, p, _ref1, _ref2;
      obj = new root.Appointment(magisterObj);
      obj._id = raw.Id;
      obj._begin = new Date(Date.parse(raw.Start));
      obj._end = new Date(Date.parse(raw.Einde));
      obj._beginBySchoolHour = raw.LesuurVan;
      obj._endBySchoolHour = raw.LesuurTotMet;
      obj._fullDay = raw.DuurtHeleDag;
      obj._description = (_ref1 = raw.Omschrijving) != null ? _ref1 : "";
      obj._location = (_ref2 = raw.Lokatie) != null ? _ref2 : "";
      obj._status = raw.Status;
      obj._type = raw.Type;
      obj._displayType = raw.WeergaveType;
      obj._content = raw.Inhoud;
      obj._infoType = raw.InfoType;
      obj._notes = raw.Aantekening;
      obj._isDone = raw.Afgerond;
      obj._classes = raw.Vakken != null ? (function() {
        var _i, _len, _ref3, _results;
        _ref3 = raw.Vakken;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          c = _ref3[_i];
          _results.push(c.Naam);
        }
        return _results;
      })() : [];
      obj._teachers = raw.Docenten != null ? (function() {
        var _i, _len, _ref3, _results;
        _ref3 = raw.Docenten;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          p = _ref3[_i];
          _results.push(root.Person._convertRaw(magisterObj, p));
        }
        return _results;
      })() : [];
      obj._classRooms = raw.Lokalen != null ? (function() {
        var _i, _len, _ref3, _results;
        _ref3 = raw.Lokalen;
        _results = [];
        for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
          c = _ref3[_i];
          _results.push(c.Naam);
        }
        return _results;
      })() : [];
      obj._groups = raw.Groepen;
      obj._appointmentId = raw.OpdrachtId;
      obj._attachments = raw.Bijlagen;
      obj._url = "" + magisterObj._personUrl + "/afspraken/" + obj._id;
      obj._scrapped = raw.Status === 0;
      return obj;
    };

    Appointment._convertStored = function(magisterObj, raw) {
      var obj;
      obj = _.extend(raw, new root.Appointment(magisterObj));
      obj._magisterObj = magisterObj;
      obj._begin = new Date(Date.parse(raw._begin));
      obj._end = new Date(Date.parse(raw._end));
      return obj;
    };

    return Appointment;

  })();

  root = (_ref1 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref1 : this;


  /**
   * An Assignment.
   *
   * @class Assignment
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Assignment is child of.
   */

  root.Assignment = (function() {
    function Assignment(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property class
      		 * @final
      		 * @type Class
       */
      this["class"] = root._getset("_class");

      /**
      		 * @property deadline
      		 * @final
      		 * @type Date
       */
      this.deadline = root._getset("_deadline");

      /**
      		 * @property handedInOn
      		 * @final
      		 * @type Date
       */
      this.handedInOn = root._getset("_handedInOn");

      /**
      		 * @property files
      		 * @final
      		 * @type File[]
       */
      this.files = root._getset("_files");

      /**
      		 * @property teachers
      		 * @final
      		 * @type Person[]
       */
      this.teachers = root._getset("_teachers");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = root._getset("_grade");

      /**
      		 * @property markedOn
      		 * @final
      		 * @type Date
       */
      this.markedOn = root._getset("_markedOn");

      /**
      		 * @property handInAgain
      		 * @final
      		 * @type Boolean
       */
      this.handInAgain = root._getset("_handInAgain");

      /**
      		 * @property finished
      		 * @final
      		 * @type Boolean
       */
      this.finished = root._getset("_finished");

      /**
      		 * @property canHandIn
      		 * @final
      		 * @type Boolean
       */
      this.canHandIn = root._getset("_canHandIn");
    }


    /**
    	 * Gets the versions of this Assigment.
    	 *
    	 * @method versions
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {AssignmentVersion[]} An array containing AssignmentVersions.
     */

    Assignment.prototype.versions = function(callback) {
      var id, pushResult, _i, _len, _ref2, _results;
      pushResult = root._helpers.asyncResultWaiter(this._versionIds.length, function(r) {
        return callback(null, r);
      });
      _ref2 = this._versionIds;
      _results = [];
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        id = _ref2[_i];
        _results.push(this._magisterObj.http.get("" + this._magisterObj._personUrl + "/opdrachten/versie/" + id, {}, (function(_this) {
          return function(error, result) {
            if (error != null) {
              return callback(error, null);
            } else {
              return pushResult(root.AssignmentVersion._convertRaw(_this._magisterObj, _this, JSON.parse(result.content)));
            }
          };
        })(this)));
      }
      return _results;
    };

    Assignment._convertRaw = function(magisterObj, raw) {
      var f, obj, p, v;
      obj = new root.Assignment(magisterObj);
      obj._id = raw.Id;
      obj._name = raw.Titel;
      obj._description = raw.Omschrijving;
      obj._class = raw.Vak;
      obj._deadline = new Date(Date.parse(raw.InleverenVoor));
      obj._handedInOn = new Date(Date.parse(raw.IngeleverdOp));
      obj._files = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.Bijlagen;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          f = _ref2[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._teachers = raw.Docenten != null ? (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.Docenten;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          p = _ref2[_i];
          _results.push(root.Person._convertRaw(magisterObj, p));
        }
        return _results;
      })() : void 0;
      obj._versionIds = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.VersieNavigatieItems;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          v = _ref2[_i];
          _results.push(v.Id);
        }
        return _results;
      })();
      obj._grade = raw.Beoordeling;
      obj._markedOn = new Date(Date.parse(raw.BeoordeeldOp));
      obj._handInAgain = raw.OpnieuwInleveren;
      obj._finished = raw.Afgesloten;
      obj._canHandIn = raw.MagInleveren;
      return obj;
    };

    return Assignment;

  })();


  /**
   * An (handed in) version of an Assignment.
   *
   * @class AssignmentVersion
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this AssignmentVersion is child of.
   */

  root.AssignmentVersion = (function() {
    function AssignmentVersion(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property class
      		 * @final
      		 * @type Class
       */
      this["class"] = root._getset("_class");

      /**
      		 * @property state
      		 * @final
      		 * @type Number
       */
      this.state = root._getset("_state");

      /**
      		 * @property pupilMessage
      		 * @final
      		 * @type String
       */
      this.pupilMessage = root._getset("_pupilMessage");

      /**
      		 * @property teacherNotice
      		 * @final
      		 * @type String
       */
      this.teacherNotice = root._getset("_teacherNotice");

      /**
      		 * @property handedInFiles
      		 * @final
      		 * @type File[]
       */
      this.handedInFiles = root._getset("_handedInFiles");

      /**
      		 * @property feedbackFiles
      		 * @final
      		 * @type File[]
       */
      this.feedbackFiles = root._getset("_feedbackFiles");

      /**
      		 * @property deadline
      		 * @final
      		 * @type Date
       */
      this.deadline = root._getset("_deadline");

      /**
      		 * @property handedInOn
      		 * @final
      		 * @type Date
       */
      this.handedInOn = root._getset("_handedInOn");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = root._getset("_grade");

      /**
      		 * @property markedOn
      		 * @final
      		 * @type Date
       */
      this.markedOn = root._getset("_markedOn");

      /**
      		 * @property version
      		 * @final
      		 * @type Number
       */
      this.version = root._getset("_version");

      /**
      		 * @property tooLate
      		 * @final
      		 * @type Boolean
       */
      this.tooLate = root._getset("_tooLate");
    }

    AssignmentVersion._convertRaw = function(magisterObj, sender, raw) {
      var f, obj;
      obj = new root.AssignmentVersion(magisterObj);
      obj._id = raw.Id;
      obj._class = sender._class;
      obj._state = raw.Status;
      obj._pupilMessage = raw.LeerlingOpmerking;
      obj._teacherNotice = raw.DocentOpmerking;
      obj._handedInFiles = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.LeerlingBijlagen;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          f = _ref2[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._feedbackFiles = (function() {
        var _i, _len, _ref2, _results;
        _ref2 = raw.FeedbackBijlagen;
        _results = [];
        for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
          f = _ref2[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      obj._deadline = new Date(Date.parse(raw.InleverenVoor));
      obj._handedInOn = new Date(Date.parse(raw.IngeleverdOp));
      obj._grade = raw.Beoordeling;
      obj._markedOn = new Date(Date.parse(raw.BeoordeeldOp));
      obj._version = raw.VersieNummer;
      obj._tooLate = raw.IsTeLaat;
      return obj;
    };

    return AssignmentVersion;

  })();

  root = (_ref2 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref2 : this;


  /**
   * A Class (ex. English class)
   *
   * @class Class
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Class is child of.
   */

  root.Class = (function() {
    function Class(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property beginDate
      		 * @final
      		 * @type Date
       */
      this.beginDate = root._getset("_beginDate");

      /**
      		 * @property endDate
      		 * @final
      		 * @type Date
       */
      this.endDate = root._getset("_endDate");

      /**
      		 * @property abbreviation
      		 * @final
      		 * @type String
       */
      this.abbreviation = root._getset("_abbreviation");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = root._getset("_number");

      /**
      		 * @property teacher
      		 * @final
      		 * @type Person
       */
      this.teacher = root._getset("_teacher");

      /**
      		 * @property classExemption
      		 * @final
      		 * @type Boolean
       */
      this.classExemption = root._getset("_classExemption");
    }

    Class._convertRaw = function(magisterObj, raw) {
      var obj, _ref3, _ref4, _ref5, _ref6;
      obj = new root.Class(magisterObj);
      obj._id = (_ref3 = raw.id) != null ? _ref3 : raw.Id;
      obj._beginDate = new Date(Date.parse(raw.begindatum));
      obj._endDate = new Date(Date.parse(raw.einddatum));
      obj._abbreviation = (_ref4 = raw.afkorting) != null ? _ref4 : raw.Afkorting;
      obj._description = (_ref5 = raw.omschrijving) != null ? _ref5 : raw.Omschrijving;
      obj._number = (_ref6 = raw.volgnr) != null ? _ref6 : raw.Volgnr;
      obj._teacher = root.Person._convertRaw(magisterObj, {
        Docentcode: raw.docent
      });
      obj._classExemption = raw.VakDispensatie || raw.VakVrijstelling;
      return obj;
    };

    return Class;

  })();


  /**
   * A Course (like: 4 VWO E/M 14-15).
   *
   * @class Course
   * @private
   * @param _magisterObj {Magister} A Magister object this Course is child of.
   * @constructor
   */

  root.Course = (function() {
    function Course(_magisterObj) {
      this._magisterObj = _magisterObj;
      this.getOtherTutors = __bind(this.getOtherTutors, this);

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = root._getset("_end");

      /**
      		 * The 'school period' of this Course (e.g: "1415").
      		 * @property schoolPeriod
      		 * @final
      		 * @type String
       */
      this.schoolPeriod = root._getset("_schoolPeriod");

      /**
      		 * Type of this Course (e.g: { description: "VWO 4", id: 420 }).
      		 * @property type
      		 * @final
      		 * @type Object
       */
      this.type = root._getset("_type");

      /**
      		 * The group of this Course contains the class the user belongs to (e.g: { description: "Klas 4v3", id: 420, locationId: 0 }).
      		 * @property group
      		 * @final
      		 * @type Object
       */
      this.group = root._getset("_group");

      /**
      		 * The 'profile' of this Course (e.g: "A-EM").
      		 * @property profile
      		 * @final
      		 * @type String
       */
      this.profile = root._getset("_profile");

      /**
      		 * An alternative profile, if it exists (e.g: "A-EM").
      		 * @property alternativeProfile
      		 * @final
      		 * @type String
       */
      this.alternativeProfile = root._getset("_alternativeProfile");
    }


    /**
    	 * Gets the classes of this Course.
    	 *
    	 * @method classes
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Class[]} An array containing the Classes.
     */

    Course.prototype.classes = function(callback) {
      return this._magisterObj.http.get(this._classesUrl, {}, (function(_this) {
        return function(error, result) {
          var c;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref3, _results;
              _ref3 = JSON.parse(result.content);
              _results = [];
              for (_i = 0, _len = _ref3.length; _i < _len; _i++) {
                c = _ref3[_i];
                _results.push(root.Class._convertRaw(this._magisterObj, c));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };


    /**
    	 * Gets the grades of this Course.
    	 *
    	 * @method grades
    	 * @async
    	 * @param [fillPersons=true] {Boolean} Whether or not to download the full user objects from the server.
    	 * @param [fillGrade=true] {Boolean} Whether or not to download the full grade info should be downloaded from the server. If this is set to false some properties will be not be set or have incorrect values.
    	 * @param [onlyRecent=false] {Boolean} If true this method will only fetch the grades filled in between 7 days ago and now.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Grade[]} An array containing the Grades.
     */

    Course.prototype.grades = function() {
      var callback, fillGrade, fillPersons, onlyRecent, _ref3;
      _ref3 = _.filter(arguments, function(a) {
        return _.isBoolean(a);
      }), fillPersons = _ref3[0], fillGrade = _ref3[1], onlyRecent = _ref3[2];
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        throw new Error("Callback can't be null");
      }
      if (fillPersons == null) {
        fillPersons = true;
      }
      if (fillGrade == null) {
        fillGrade = true;
      }
      if (onlyRecent == null) {
        onlyRecent = false;
      }
      return this._magisterObj.http.get((onlyRecent ? this._gradesUrlPrefix : this._gradesUrl), {}, (function(_this) {
        return function(error, result) {
          var pushResult, raw, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content).Items;
            pushResult = root._helpers.asyncResultWaiter(result.length, function(r) {
              var c, g, _i, _j, _len, _len1, _ref4, _ref5;
              _ref4 = _.uniq(r, function(g) {
                return g["class"]().id();
              }).map(function(g) {
                return g["class"]();
              });
              for (_i = 0, _len = _ref4.length; _i < _len; _i++) {
                c = _ref4[_i];
                _ref5 = _.filter(r, function(g) {
                  return g["class"]().id() === c.id();
                });
                for (_j = 0, _len1 = _ref5.length; _j < _len1; _j++) {
                  g = _ref5[_j];
                  g._class = c;
                }
              }
              return callback(null, _.sortBy(r, function(g) {
                return g.dateFilledIn();
              }));
            });
            _results = [];
            for (_i = 0, _len = result.length; _i < _len; _i++) {
              raw = result[_i];
              _results.push((function(raw) {
                var g, push, _ref4;
                g = root.Grade._convertRaw(_this._magisterObj, raw);
                g._columnUrl = _this._columnUrlPrefix + ((_ref4 = raw.CijferKolom) != null ? _ref4.Id : void 0);
                push = root._helpers.asyncResultWaiter(2, function() {
                  return pushResult(g);
                });
                if (fillPersons && !onlyRecent) {
                  _this._magisterObj.getPersons(g.Docent, 3, function(e, r) {
                    if (!((e != null) || (r[0] == null))) {
                      g._teacher = r[0];
                    }
                    return push();
                  });
                } else {
                  push();
                }
                if (fillGrade && !onlyRecent) {
                  return g.fillGrade(function(e, r) {
                    if (e != null) {
                      return callback(e, null);
                    } else {
                      return push();
                    }
                  });
                } else {
                  return push();
                }
              })(raw));
            }
            return _results;
          }
        };
      })(this));
    };


    /**
    	 * Gets the perosnal tutor of the current user for this Course.
    	 *
    	 * @method getPersonalTutor
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person} The tutor as a Person object.
     */

    Course.prototype.getPersonalTutor = function(callback) {
      if (callback == null) {
        throw new Error("Callback can't be null");
      }
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/aanmeldingen/" + this._id + "/mentor", {}, (function(_this) {
        return function(error, result) {
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, root.Person._convertRaw(_this._magisterObj, JSON.parse(result.content)));
          }
        };
      })(this));
    };


    /**
    	 * Gets the (group / class) tutors.
    	 *
    	 * @method getOtherTutors
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person} The tutor as a Person object.
     */

    Course.prototype.getOtherTutors = function(callback) {
      if (callback == null) {
        throw new Error("Callback can't be null");
      }
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/aanmeldingen/" + this._id + "/mentor", {}, (function(_this) {
        return function(error, result) {
          var items, p;
          if (error != null) {
            return callback(error, null);
          } else {
            items = JSON.parse(result.content).items;
            return callback(null, (function() {
              var _i, _len, _results;
              _results = [];
              for (_i = 0, _len = items.length; _i < _len; _i++) {
                p = items[_i];
                _results.push(root.Person._convertRaw(this._magisterObj, p));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };

    Course._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.Course(magisterObj);
      obj._classesUrl = magisterObj._personUrl + ("/aanmeldingen/" + raw.Id + "/vakken");
      obj._gradesUrlPrefix = magisterObj._personUrl + ("/aanmeldingen/" + raw.Id + "/cijfers");
      obj._gradesUrl = obj._gradesUrlPrefix + "/cijferoverzichtvooraanmelding?actievePerioden=false&alleenBerekendeKolommen=false&alleenPTAKolommen=false";
      obj._columnUrlPrefix = obj._gradesUrlPrefix + "/extracijferkolominfo/";
      obj._id = raw.Id;
      obj._begin = new Date(Date.parse(raw.Start));
      obj._end = new Date(Date.parse(raw.Einde));
      obj._schoolPeriod = raw.Lesperiode;
      obj._type = {
        id: raw.Studie.Id,
        description: raw.Studie.Omschrijving
      };
      obj._group = {
        id: raw.Groep.Id,
        description: raw.Groep.Omschrijving,
        locationId: raw.Groep.LocatieId
      };
      obj._profile = raw.Profiel;
      obj._alternativeProfile = raw.Profiel2;
      return obj;
    };

    return Course;

  })();

  root = (_ref3 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref3 : this;


  /**
   * A Digital school utility, usually things like a gateway to an online platform of a book used by a school.
   *
   * @class DigitalSchoolUtility
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this DigitalSchoolUtility is child of.
   */

  root.DigitalSchoolUtility = (function() {
    function DigitalSchoolUtility(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property publisher
      		 * @final
      		 * @type String
       */
      this.publisher = root._getset("_publisher");

      /**
      		 * @property state
      		 * @final
      		 * @type Number
       */
      this.state = root._getset("_state");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = root._getset("_end");

      /**
      		 * @property EAN
      		 * @final
      		 * @type Number
       */
      this.EAN = root._getset("_EAN");

      /**
      		 * @property url
      		 * @final
      		 * @type String
       */
      this.url = root._getset("_url");

      /**
      		 * This should be a Class object, if no class was found this will be undefined.
      		 * @property class
      		 * @final
      		 * @type Class|undefined
       */
      this["class"] = root._getset("_class");
    }

    DigitalSchoolUtility._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.DigitalSchoolUtility(magisterObj);
      obj._id = raw.Id;
      obj._type = raw.MateriaalType;
      obj._name = raw.Titel;
      obj._publisher = raw.Uitgeverij;
      obj._state = raw.Status;
      obj._begin = new Date(Date.parse(raw.Start));
      obj._end = new Date(Date.parse(raw.Eind));
      obj._EAN = Number(raw.EAN);
      obj._url = raw.Url;
      obj._class = raw.Vak;
      return obj;
    };

    return DigitalSchoolUtility;

  })();

  root = (_ref4 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref4 : this;


  /**
   * A folder containing File instances.
   *
   * @class FileFolder
   * @private
   * @param _magisterObj {Magister} A Magister object this FileFolder is child of.
   * @constructor
   */

  root.FileFolder = (function() {
    function FileFolder(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * The rights the current user has on this FileFolder.
      		 * @property rights
      		 * @final
      		 * @type Number
       */
      this.rights = root._getset("_rights");

      /**
      		 * The ID of the parent FileFolder of this FileFolder.
      		 * @property parentId
      		 * @final
      		 * @type Number
       */
      this.parentId = root._getset("_parentId");
    }


    /**
    	 * Gets all the files in the current FileFolder.
    	 *
    	 * @method files
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {File[]} The results as an Array.
     */

    FileFolder.prototype.files = function(callback) {
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/bronnen?parentId=" + (this.id()), {}, (function(_this) {
        return function(error, result) {
          var f, files, pushResult, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            files = (function() {
              var _i, _len, _ref5, _results;
              _ref5 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref5.length; _i < _len; _i++) {
                f = _ref5[_i];
                _results.push(root.File._convertRaw(this._magisterObj, this, f));
              }
              return _results;
            }).call(_this);
            pushResult = root._helpers.asyncResultWaiter(files.length, function(r) {
              return callback(null, files);
            });
            _results = [];
            for (_i = 0, _len = files.length; _i < _len; _i++) {
              f = files[_i];
              _results.push((function(f) {
                return _this._magisterObj.getPersons(f.GeplaatstDoor, function(e, r) {
                  if (!((e != null) || r.length === 0)) {
                    f._addedBy = r[0];
                  }
                  return pushResult();
                });
              })(f));
            }
            return _results;
          }
        };
      })(this));
    };

    FileFolder._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.FileFolder(magisterObj);
      obj._id = raw.Id;
      obj._name = raw.Naam;
      obj._rights = raw.Privilege;
      obj._parentId = raw.ParentId;
      return obj;
    };

    return FileFolder;

  })();


  /**
   * A file from Magister, can be downloaded.
   *
   * @class File
   * @private
   * @param _magisterObj {Magister} A Magister object this File is child of.
   * @constructor
   */

  root.File = (function() {
    function File(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property name
      		 * @type String
       */
      this.name = root._getset("_name", (function(_this) {
        return function(x) {
          _this._name = x;
          return _this._update();
        };
      })(this));

      /**
      		 * @property uri
      		 * @final
      		 * @type String
       */
      this.uri = root._getset("_uri");

      /**
      		 * The size of this file in bytes.
      		 * @property size
      		 * @final
      		 * @type Number
       */
      this.size = root._getset("_size");

      /**
      		 * The rights the current user has on this File.
      		 * @property rights
      		 * @final
      		 * @type Number
       */
      this.rights = root._getset("_rights");

      /**
      		 * @property mime
      		 * @final
      		 * @type String
       */
      this.mime = root._getset("_mime");

      /**
      		 * @property changedDate
      		 * @final
      		 * @type Date
       */
      this.changedDate = root._getset("_changedDate");

      /**
      		 * @property creationDate
      		 * @final
      		 * @type Date
       */
      this.creationDate = root._getset("_creationDate");

      /**
      		 * @property addedBy
      		 * @final
      		 * @type Person
       */
      this.addedBy = root._getset("_addedBy");

      /**
      		 * @property fileBlobId
      		 * @final
      		 * @type Number
       */
      this.fileBlobId = root._getset("_fileBlobId");

      /**
      		 * The FileFolder this File is in.
      		 * @property fileFolder
      		 * @type FileFolder
       */
      this.fileFolder = root._getset("_fileFolder", this.move);

      /**
      		 * @property uniqueId
      		 * @final
      		 * @type String
       */
      this.uniqueId = root._getset("_uniqueId");
    }


    /**
    	 * Downloads the current file
    	 * Currently only accessible from the server.
    	 *
    	 * @method download
    	 * @async
    	 * @param [downloadFile=true] {Boolean|String} Whether or not to download the file directly. If `downloadFile` is a truely string the file will be downloaded in with the name set to the string's content.
    	 * @param [callback] {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {String} A string containing the base64 encoded binary data of the downloaded file.
     */

    File.prototype.download = function() {
      var callback, downloadFile, fileName, request, _ref5;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      downloadFile = (_ref5 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref5 : true;
      request = null;
      if (typeof Meteor !== "undefined" && Meteor !== null ? Meteor.isServer : void 0) {
        request = Npm.require("request");
      } else if ((typeof module !== "undefined" && module !== null ? module.exports : void 0) != null) {
        request = require("request");
      } else {
        if (typeof callback === "function") {
          callback(new Error("`File.download` is only accessible from the server at the moment.\nYou can set a proxy yourself with something like iron:router serverside routes."), null);
        }
        return void 0;
      }
      fileName = (downloadFile != null ? _.isString(downloadFile) ? downloadFile : this.name() : void 0);
      return request({
        url: this._downloadUrl,
        method: "GET",
        headers: this._magisterObj.http._cookieInserter(),
        encoding: null
      }).on("error", function(err) {
        return typeof callback === "function" ? callback(err, null) : void 0;
      }).on("response", function(res) {
        return typeof callback === "function" ? callback(null, "") : void 0;
      }).pipe(require("fs").createWriteStream(fileName));
    };


    /**
    	 * Moves the current File to another FileFolder
    	 *
    	 * @method move
    	 * @param fileFolder {FileFolder|Number|String} A FileFolder, an ID of a FileFolder or (a part of) the name of a FileFolder.
     */

    File.prototype.move = function(fileFolder) {
      return this._magisterObj.fileFolders((function(_this) {
        return function(e, r) {
          if (e != null) {
            throw e;
          }
          if (!_.isObject(fileFolder)) {
            fileFolder = _.find(r, function(f) {
              return root._helpers.contains(f.name(), fileFolder, true) || f.id() === fileFolder;
            });
          }
          _this._fileFolder = fileFolder;
          return _this._update();
        };
      })(this));
    };


    /**
    	 * WARNING. Removes the current File.
    	 *
    	 * @method remove
     */

    File.prototype.remove = function() {
      return this._magisterObj.http["delete"]("" + this._magisterObj._personUrl + "/bronnen/" + (this.id()), {}, function(error, result) {
        if (error != null) {
          throw error;
        }
      });
    };


    /**
    	 * Updates the current File on the Magister servers.
    	 *
    	 * @private
    	 * @method _update
     */

    File.prototype._update = function() {
      return this._magisterObj.http.put("" + this._magisterObj._personUrl + "/bronnen/" + (this.id()), this._toMagisterStyle(), {}, (function() {}));
    };

    File.prototype._toMagisterStyle = function() {
      var obj;
      obj = {};
      obj.Id = this._id;
      obj.BronSoort = this._type;
      obj.Naam = this._name;
      obj.Uri = this._uri;
      obj.Grootte = this._size;
      obj.Privilege = this._rights;
      obj.ContentType = this._mime;
      obj.FileBlobId = this._fileBlobId;
      obj.ParentId = this._fileFolder.id();
      obj.UniqueId = this._uniqueId;
      return obj;
    };

    File._convertRaw = function(magisterObj, sender, raw) {
      var addedBy, l, obj, _ref5;
      if (raw._addedBy != null) {
        addedBy = raw._addedBy;
      } else {
        addedBy = new root.Person(magisterObj, null, "", "");
        addedBy._fullName = raw.GeplaatstDoor;
      }
      obj = new root.File(magisterObj);
      obj._id = raw.Id;
      obj._type = raw.BronSoort;
      obj._name = raw.Naam;
      obj._uri = raw.Uri;
      obj._size = raw.Grootte;
      obj._rights = raw.Privilege;
      obj._mime = raw.ContentType;
      obj._changedDate = new Date(Date.parse(raw.GewijzigdOp));
      obj._creationDate = new Date(Date.parse((_ref5 = raw.GemaaktOp) != null ? _ref5 : raw.Datum));
      obj._addedBy = addedBy;
      obj._fileBlobId = raw.FileBlobId;
      obj._fileFolder = sender;
      obj._uniqueId = raw.UniqueId;
      l = _.find(raw.Links, {
        Rel: "Contents"
      });
      if (l == null) {
        l = _.find(raw.Links, {
          Rel: "Self"
        });
      }
      obj._downloadUrl = magisterObj.magisterSchool.url + l.Href;
      return obj;
    };

    return File;

  })();

  root = (_ref5 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref5 : this;


  /**
   * A Grade (ex. 1,0)
   *
   * @class Grade
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this Grade is child of.
   */

  root.Grade = (function() {
    function Grade(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property grade
      		 * @final
      		 * @type String
       */
      this.grade = root._getset("_grade");

      /**
      		 * @property passed
      		 * @final
      		 * @type Boolean
       */
      this.passed = root._getset("_passed");

      /**
      		 * @property dateFilledIn
      		 * @final
      		 * @type Date
       */
      this.dateFilledIn = root._getset("_dateFilledIn");

      /**
      		 * @property gradePeriod
      		 * @final
      		 * @type Object
       */
      this.gradePeriod = root._getset("_gradePeriod");

      /**
      		 * @property class
      		 * @final
      		 * @type Object
       */
      this["class"] = root._getset("_class");

      /**
      		 * @property atLaterDate
      		 * @final
      		 * @type Boolean
       */
      this.atLaterDate = root._getset("_atLaterDate");

      /**
      		 * @property exemption
      		 * @final
      		 * @type Boolean
       */
      this.exemption = root._getset("_exemption");

      /**
      		 * @property counts
      		 * @final
      		 * @type Boolean
       */
      this.counts = root._getset("_counts");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property teacher
      		 * @final
      		 * @type Person
       */
      this.teacher = root._getset("_teacher");

      /**
      		 * @property classExemption
      		 * @final
      		 * @type Boolean
       */
      this.classExemption = root._getset("_classExemption");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property weight
      		 * @final
      		 * @type Number
       */
      this.weight = root._getset("_weight");
    }


    /**
    	 * Downloads extra info, if it's not downloaded yet and fills the current grade with it.
    	 *
    	 * @method fillGrade
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Grade} The current grade filled with the newely downloaded info.
     */

    Grade.prototype.fillGrade = function(callback) {
      if (!this._filled) {
        return this._magisterObj.http.get(this._columnUrl, {}, (function(_this) {
          return function(error, result) {
            if (error != null) {
              return typeof callback === "function" ? callback(error, null) : void 0;
            } else {
              result = JSON.parse(result.content);
              _this._description = result.WerkInformatieOmschrijving;
              _this._weight = result.Weging;
              _this._type._level = result.KolomNiveau;
              _this._type._description = result.KolomOmschrijving;
              _this._filled = true;
              return typeof callback === "function" ? callback(null, _this) : void 0;
            }
          };
        })(this));
      } else {
        return typeof callback === "function" ? callback(null, this) : void 0;
      }
    };

    Grade._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.Grade(magisterObj);
      obj._id = raw.CijferId;
      obj._grade = raw.CijferStr;
      obj._passed = raw.IsVoldoende;
      obj._dateFilledIn = new Date(Date.parse(raw.DatumIngevoerd));
      obj._gradePeriod = {
        id: function() {
          return raw.CijferPeriode.Id;
        },
        name: function() {
          return raw.CijferPeriode.Naam;
        }
      };
      obj._class = {
        id: function() {
          return raw.Vak.Id;
        },
        abbreviation: function() {
          return raw.Vak.Afkorting;
        },
        description: function() {
          return raw.Vak.Omschrijving;
        }
      };
      obj._atLaterDate = raw.Inhalen;
      obj._exemption = raw.Vrijstelling;
      obj._counts = raw.TeltMee;
      if (raw.CijferKolom != null) {
        obj._type = root.GradeType._convertRaw(magisterObj, raw.CijferKolom);
      }
      obj._assignmentId = raw.CijferKolomIdEloOpdracht;
      obj._teacher = root.Person._convertRaw(magisterObj, {
        Docentcode: raw.Docent
      });
      obj._teacher._type = 3;
      obj._classExemption = raw.VakDispensatie || raw.VakVrijstelling;
      obj._description = "";
      obj._weight = 0;
      return obj;
    };

    return Grade;

  })();


  /**
   * A Type of a Grade object.
   *
   * @class GradeType
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this GradeType is child of.
   */

  root.GradeType = (function() {
    function GradeType(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = root._getset("_number");

      /**
      		 * @property header
      		 * @final
      		 * @type String
       */
      this.header = root._getset("_header");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");

      /**
      		 * @property isAtLaterDate
      		 * @final
      		 * @type Boolean
       */
      this.isAtLaterDate = root._getset("_isAtLaterDate");

      /**
      		 * @property isTeacher
      		 * @final
      		 * @type Boolean
       */
      this.isTeacher = root._getset("_isTeacher");

      /**
      		 * @property hasNestedTypes
      		 * @final
      		 * @type Boolean
       */
      this.hasNestedTypes = root._getset("_hasNestedTypes");

      /**
      		 * @property isPTA
      		 * @final
      		 * @type Boolean
       */
      this.isPTA = root._getset("_isPTA");

      /**
      		 * Have no idea what this is. If anybody has an idea, tell me please so we can make this doc at least a bit useful.
      		 * @property level
      		 * @final
       */
      this.level = root._getset("_level");
    }

    GradeType._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.GradeType(magisterObj);
      obj._id = raw.Id;
      obj._name = raw.KolomNaam;
      obj._number = raw.KolomNummer;
      obj._header = raw.KolomKop;
      obj._type = raw.KolomSoort;
      obj._isAtLaterDate = raw.IsHerkansingKolom;
      obj._isTeacher = raw.IsDocentKolom;
      obj._hasNestedTypes = raw.HeeftOndeliggendeKolommen;
      obj._isPTA = raw.IsPTAKolom;
      obj._level = null;
      obj._description = "";
      return obj;
    };

    return GradeType;

  })();

  root = (_ref6 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref6 : this;

  if (typeof Meteor !== "undefined" && Meteor !== null) {
    this._ = _ = lodash;
  } else {
    if (_ == null) {
      this._ = _ = require("lodash");
    }
  }


  /**
   * A JavaScript implementation of the Magister 6 API.
   * @author Lieuwe Rooijakkers
   * @module Magister
   */


  /**
   * Class to communicate with Magister.
   *
   * @class Magister
   * @param magisterSchool {MagisterSchool|String} A MagisterSchool to logon to. If this is a String it will use that String as a query to search for a possible school.
   * @param username {String} The username of the user to login to.
   * @param password {String} The password of the user to login to.
   * @param [_keepLoggedIn=true] {Boolean} Whether or not to keep the user logged in.
   * @constructor
   */

  root.Magister = (function() {
    function Magister(magisterSchool, username, password, _keepLoggedIn) {
      this.magisterSchool = magisterSchool;
      this.username = username;
      this.password = password;
      this._keepLoggedIn = _keepLoggedIn != null ? _keepLoggedIn : true;
      if (!(arguments.length === 3 || arguments.length === 4)) {
        throw new Error("Expected 3 or 4 arguments, got " + arguments.length);
      }
      this._readyCallbacks = [];
      this.http = new root.MagisterHttp();
      if (_.isString(this.magisterSchool)) {
        MagisterSchool.getSchools(this.magisterSchool, (function(_this) {
          return function(e, r) {
            if (e != null) {
              throw e;
            } else if (r.length === 0) {
              throw new Error("No school with the query " + _this.magisterSchool + " found.");
            } else {
              _this.magisterSchool = r[0];
              return _this.reLogin();
            }
          };
        })(this));
      } else {
        this.reLogin();
      }
    }


    /**
    	 * Get the appoinments of the current User between the two given Dates.
    	 *
    	 * @method appointments
    	 * @async
    	 * @param from {Date} The start date for the Appointments, you won't get appointments from before this date.
    	 * @param [to] {Date} The end date for the Appointments, you won't get appointments from after this date.
    	 * @param [fillPersons=true] {Boolean} Whether or not to download the full user objects from the server.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Appointment[]} An array containing the Appointments.
     */

    Magister.prototype.appointments = function() {
      var callback, dateConvert, fillPersons, from, to, url, _ref7, _ref8;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      fillPersons = (_ref7 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref7 : true;
      _ref8 = _.where(arguments, function(a) {
        return _.isDate(a);
      }), from = _ref8[0], to = _ref8[1];
      if (!_.isDate(to)) {
        to = from;
      }
      from = root._helpers.date(from);
      to = root._helpers.date(to);
      this._forceReady();
      dateConvert = root._helpers.urlDateConvert;
      url = "" + this._personUrl + "/afspraken?tot=" + (dateConvert(to)) + "&van=" + (dateConvert(from));
      return this.http.get(url, {}, (function(_this) {
        return function(error, result) {
          var a, absenceInfo, appointments, changedAppointments, finish, pushResult, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content);
            appointments = (function() {
              var _i, _len, _ref9, _results;
              _ref9 = result.Items;
              _results = [];
              for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
                a = _ref9[_i];
                _results.push(root.Appointment._convertRaw(this, a));
              }
              return _results;
            }).call(_this);
            absenceInfo = [];
            changedAppointments = [];
            finish = root._helpers.asyncResultWaiter(3, function(r) {
              _.each(appointments, function(a) {
                return a._absenceInfo = _.find(absenceInfo, function(absence) {
                  return absence.appointmentId === a.id();
                });
              });
              appointments = _(appointments).reject(function(a) {
                return _.contains(changedAppointments, function(changedAppointment) {
                  return changedAppointment.id() === a.id();
                });
              }).concat(changedAppointments).filter(function(a) {
                return root._helpers.date(a.begin()) >= from && (root._helpers.date(a.end()) <= to || a.fullDay());
              }).sortBy("_begin").value();
              return callback(null, appointments);
            });
            _this.http.get("" + _this._personUrl + "/roosterwijzigingen?tot=" + (dateConvert(to)) + "&van=" + (dateConvert(from)), {}, function(error, result) {
              result = JSON.parse(result.content);
              changedAppointments.concat((function() {
                var _i, _len, _ref9, _results;
                _ref9 = result.Items;
                _results = [];
                for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
                  a = _ref9[_i];
                  _results.push(root.Appointment._convertRaw(this, a));
                }
                return _results;
              }).call(_this));
              return finish();
            });
            _this.http.get("" + _this._personUrl + "/absenties?tot=" + (dateConvert(to)) + "&van=" + (dateConvert(from)), {}, function(error, result) {
              var _i, _len;
              result = JSON.parse(result.content).Items;
              for (_i = 0, _len = result.length; _i < _len; _i++) {
                a = result[_i];
                absenceInfo.push({
                  id: a.Id,
                  begin: new Date(Date.parse(a.Start)),
                  end: new Date(Date.parse(a.Eind)),
                  schoolHour: a.Lesuur,
                  permitted: a.Geoorloofd,
                  appointmentId: a.AfspraakId,
                  description: root._helpers.trim(a.Omschrijving),
                  type: a.VerantwoordingType,
                  code: a.Code
                });
              }
              return finish();
            });
            if (fillPersons) {
              pushResult = root._helpers.asyncResultWaiter(appointments.length, finish);
              _results = [];
              for (_i = 0, _len = appointments.length; _i < _len; _i++) {
                a = appointments[_i];
                _results.push((function(a) {
                  var teachers, _ref9;
                  teachers = (_ref9 = a.teachers()) != null ? _ref9 : [];
                  return _this.fillPersons(teachers, (function(e, r) {
                    a._teachers = r;
                    return pushResult();
                  }), 3);
                })(a));
              }
              return _results;
            } else {
              return finish();
            }
          }
        };
      })(this));
    };


    /**
    	 * Gets the MessageFolders that matches the given query. Or if no query is given, all MessageFolders
    	 *
    	 * @method messageFolders
    	 * @param [query] {String} A case insensetive query the MessageFolder need to match.
    	 * @param [callback] {Function} Not useful at all, just here to prevent possible mistakes.
    	 *	@param [callback.error] {null} Will always be null
    	 *	@param [callback.result] {MessageFolder[]} An array containing the matching MessageFolders.
    	 * @return {MessageFolder[]} An array containing the matching messageFolders.
     */

    Magister.prototype.messageFolders = function(query, callback) {
      var result;
      if (callback == null) {
        callback = function() {};
      }
      this._forceReady();
      if (_.isString(query) && query !== "") {
        result = _.where(this._messageFolders, function(mF) {
          return root._helpers.contains(mF.name(), query, true);
        });
      } else {
        result = this._messageFolders;
      }
      callback(null, result);
      return result;
    };


    /**
    	 * @method inbox
    	 * @return {MessageFolder} The inbox of the current user.
     */

    Magister.prototype.inbox = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("postvak in", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * @method sentItems
    	 * @return {MessageFolder} The sent items folder of the current user.
     */

    Magister.prototype.sentItems = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("verzonden items", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * @method bin
    	 * @return {MessageFolder} The bin of the current user.
     */

    Magister.prototype.bin = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("verwijderde items", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * @method alerts
    	 * @return {MessageFolder} The alerts folder of the current user.
     */

    Magister.prototype.alerts = function(callback) {
      if (callback == null) {
        callback = function() {};
      }
      return this.messageFolders("mededelingen", function(e, r) {
        return callback(null, r[0]);
      })[0];
    };


    /**
    	 * Gets the courses of the current User.
    	 *
    	 * @method courses
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Course[]} An array containing the Courses.
     */

    Magister.prototype.courses = function(callback) {
      var url;
      this._forceReady();
      url = "" + this._personUrl + "/aanmeldingen";
      return this.http.get(url, {}, (function(_this) {
        return function(error, result) {
          var c;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content);
            return callback(null, _.sortBy((function() {
              var _i, _len, _ref7, _results;
              _ref7 = result.Items;
              _results = [];
              for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
                c = _ref7[_i];
                _results.push(root.Course._convertRaw(this, c));
              }
              return _results;
            }).call(_this), function(c) {
              return c.begin();
            }).reverse());
          }
        };
      })(this));
    };


    /**
    	 * Gets limited course info for the current Course for the current User.
    	 *
    	 * This is quicker than `courses`, however it's not as consistent and
    	 * doesn't really fit in Magister.js's style, however if you know what
    	 * you're doing and you're willing to use this, go ahead.
    	 *
    	 * @method getLimitedCurrentCourseInfo
    	 * @async
    	 * @deprecated `courses` is prefered.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Object} The limited course info.
     */

    Magister.prototype.getLimitedCurrentCourseInfo = function(callback) {
      var url;
      this._forceReady();
      url = "" + this._personUrl + "/opleidinggegevensprofiel";
      return this.http.get(url, {}, function(error, result) {
        var parsed;
        if (error != null) {
          return callback(error, null);
        } else {
          parsed = JSON.parse(result.content);
          return callback(null, {
            group: parsed.Klas,
            profile: pared.Profielen,
            pupilId: pared.StamNr,
            type: {
              year: +/\d+/.exec(Parsed.Studie)[0],
              schoolVariant: /[^\d\s]+/.exec(Parsed.Studie)[0]
            }
          });
        }
      });
    };

    Magister._cachedPersons = {};


    /**
    	 * Gets an Array of Persons that matches the given profile.
    	 *
    	 * @method getPersons
    	 * @async
    	 * @param query {String} The query the persons must match to (e.g: Surname, Name, ...). Should at least be 3 chars long.
    	 * @param [type] {String|Number} The type the person must have. If none is given it will search for both Teachers and Pupils.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person[]} An array containing the Persons.
     */

    Magister.prototype.getPersons = function() {
      var callback, query, type, url, val;
      this._forceReady();
      query = root._helpers.trim(arguments[0]);
      callback = arguments.length === 2 ? arguments[1] : arguments[2];
      if (arguments.length === 3) {
        type = arguments[1];
      }
      if (!((query != null) && (callback != null) && query.length >= 3)) {
        callback(null, []);
        return void 0;
      }
      if (type == null) {
        this.getPersons(query, 3, (function(_this) {
          return function(e, r) {
            var teachers;
            if (e != null) {
              return callback(e, null);
            } else {
              teachers = r;
              return _this.getPersons(query, 4, function(e, r) {
                if (e != null) {
                  return callback(e, null);
                } else {
                  return callback(null, root._helpers.pushMore(r, teachers));
                }
              });
            }
          };
        })(this));
        return void 0;
      }
      type = (function() {
        switch (root.Person._convertType(type)) {
          case 3:
            return "Personeel";
          case 4:
            return "Leerling";
          case 8:
            return "Project";
          default:
            return "Overig";
        }
      })();
      url = "" + this._personUrl + "/contactpersonen?contactPersoonType=" + type + "&q=" + (query.replace(/\ +/g, "+"));
      if ((val = Magister._cachedPersons["" + this._id + type + query]) != null) {
        return callback(null, val);
      } else {
        return this.http.get(url, {}, (function(_this) {
          return function(error, result) {
            var p;
            if (error != null) {
              return callback(error, null);
            } else {
              result = (function() {
                var _i, _len, _ref7, _results;
                _ref7 = JSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
                  p = _ref7[_i];
                  _results.push(root.Person._convertRaw(this, p));
                }
                return _results;
              }).call(_this);
              Magister._cachedPersons["" + _this._id + type + query] = result;
              return callback(null, result);
            }
          };
        })(this));
      }
    };


    /**
    	 * Fills the given person(s) by downloading the person from Magister and replacing the local instance.
    	 *
    	 * @method fillPersons
    	 * @async
    	 * @param persons {Person|Person[]} A Person or an Array of Persons to fetch more information for.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Person|Person[]} A fetched person or an array containing the fetched Persons, according to the type of the given persons parameter.
    	 * @param [overwriteType] {Number|String} Not recommended. Forces the type used to search the persons for.
     */

    Magister.prototype.fillPersons = function(persons, callback, overwriteType) {
      var p, pushResult, _i, _len, _ref7, _ref8;
      this._forceReady();
      if (_.isArray(persons)) {
        if (persons.length === 0) {
          callback(null, []);
          return void 0;
        }
        pushResult = root._helpers.asyncResultWaiter(persons.length, function(r) {
          return callback(null, r);
        });
        for (_i = 0, _len = persons.length; _i < _len; _i++) {
          p = persons[_i];
          try {
            this.getPersons(_.last(p.fullName().split(" ")), (_ref7 = p._type) != null ? _ref7 : overwriteType, function(e, r) {
              var _ref8;
              if ((e != null) || (r == null)) {
                throw e;
              } else {
                return pushResult((_ref8 = r[0]) != null ? _ref8 : p);
              }
            });
          } catch (_error) {
            pushResult(p);
          }
        }
      } else if (_.isObject(persons)) {
        try {
          this.getPersons(_.last(persons.fullName().split(" ")), (_ref8 = persons._type) != null ? _ref8 : overwriteType, function(e, r) {
            var _ref9;
            if ((e != null) || (r == null)) {
              throw e;
            } else {
              return callback(null, (_ref9 = r[0]) != null ? _ref9 : persons);
            }
          });
        } catch (_error) {
          callback(persons);
        }
      } else {
        throw new Error("Expected persons to be an Array or an Object, got a(n) " + (typeof persons));
      }
      return void 0;
    };


    /**
    	 * Shortcut for composing and sending a Message.
    	 *
    	 * @method composeAndSendMessage
    	 * @param subject {String} The subject of the message
    	 * @param [body] {String} The body of the message, if none is given the body will be empty.
    	 * @param recipients {Person[]|String[]|Person|String} The recipient(s) the message will be sent to.
     */

    Magister.prototype.composeAndSendMessage = function() {
      var body, m, recipients, subject, _ref7;
      this._forceReady();
      _ref7 = _.filter(arguments, function(a) {
        return _.isString(a);
      }), subject = _ref7[0], body = _ref7[1];
      recipients = _.last(arguments);
      if (arguments.length === 2) {
        body = "";
      }
      m = new root.Message(this);
      m.subject(subject);
      m.body(body != null ? body : "");
      m.addRecipient(recipients);
      return m.send();
    };


    /**
    	 * Gets the FileFolders of the current user.
    	 *
    	 * @method fileFolders
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {FileFolder[]} An array containing FileFolders.
     */

    Magister.prototype.fileFolders = function(callback) {
      this._forceReady();
      return this.http.get("" + this._personUrl + "/bronnen?soort=0", {}, (function(_this) {
        return function(error, result) {
          var f;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref7, _results;
              _ref7 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
                f = _ref7[_i];
                _results.push(root.FileFolder._convertRaw(this, f));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };


    /**
    	 * Gets the StudyGuides of the current user.
    	 *
    	 * @method studyGuides
    	 * @async
    	 * @param [fillClass=true] {Boolean} Whether or not to download the full class objects from the server. If this is false StudyGuide.class() will return null.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {StudyGuide[]} An array containing StudyGuides.
     */

    Magister.prototype.studyGuides = function(callback) {
      var cb, fillClass, _ref7;
      this._forceReady();
      fillClass = (_ref7 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref7 : true;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      cb = (function(_this) {
        return function(classes) {
          return _this.http.get("" + _this._pupilUrl + "/studiewijzers?peildatum=" + (root._helpers.urlDateConvert(new Date)), {}, function(error, result) {
            var s, studyGuide, _fn, _i, _len;
            if (error != null) {
              return callback(error, null);
            } else {
              result = (function() {
                var _i, _len, _ref8, _results;
                _ref8 = JSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
                  s = _ref8[_i];
                  _results.push(root.StudyGuide._convertRaw(this, s));
                }
                return _results;
              }).call(_this);
              _fn = function(studyGuide) {
                if (classes != null) {
                  return studyGuide._class = _.find(classes, function(c) {
                    return c.abbreviation() === studyGuide._class;
                  });
                } else {
                  return studyGuide._class = null;
                }
              };
              for (_i = 0, _len = result.length; _i < _len; _i++) {
                studyGuide = result[_i];
                _fn(studyGuide);
              }
              return callback(null, result);
            }
          });
        };
      })(this);
      if (fillClass) {
        return this.courses(function(e, r) {
          if ((r != null) && r.length !== 0) {
            return r[0].classes(function(e, r) {
              if ((r != null) && r.length !== 0) {
                return cb(r);
              } else {
                return cb();
              }
            });
          } else {
            return cb();
          }
        });
      } else {
        return cb();
      }
    };


    /**
    	 * Gets the Assignments for the current user.
    	 *
    	 * @method assignments
    	 * @async
    	 * @param [amount=50] {Number} The amount of Assignments to fetch from the server.
    	 * @param [skip=0] {Number} The amount of Assignments to skip.
    	 * @param [fillPersons=true] {Boolean} Whether or not to download the full user objects from the server.
    	 * @param [fillClass=true] {Boolean} Whether or not to download the full class objects from the server. If this is false Assignment.class() will return null.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Assignment[]} An array containing Assignments.
     */

    Magister.prototype.assignments = function() {
      var amount, callback, cb, fillClass, fillPersons, skip, _ref7, _ref8;
      this._forceReady();
      _ref7 = _.filter(arguments, function(a) {
        return _.isNumber(a);
      }), amount = _ref7[0], skip = _ref7[1];
      _ref8 = _.filter(arguments, function(a) {
        return _.isBoolean(a);
      }), fillPersons = _ref8[0], fillClass = _ref8[1];
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        return;
      }
      if (fillPersons == null) {
        fillPersons = true;
      }
      if (fillClass == null) {
        fillClass = true;
      }
      if (amount == null) {
        amount = 50;
      }
      if (skip == null) {
        skip = 0;
      }
      cb = (function(_this) {
        return function(classes) {
          return _this.http.get("" + _this._personUrl + "/opdrachten?skip=" + skip + "&top=" + amount + "&status=alle", {}, function(error, result) {
            var e, id, pushResult, _i, _len, _results;
            if (error != null) {
              return callback(error, null);
            } else {
              result = (function() {
                var _i, _len, _ref9, _results;
                _ref9 = JSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref9.length; _i < _len; _i++) {
                  e = _ref9[_i];
                  _results.push(e.Id);
                }
                return _results;
              })();
              pushResult = root._helpers.asyncResultWaiter(result.length, function(r) {
                return callback(null, r);
              });
              _results = [];
              for (_i = 0, _len = result.length; _i < _len; _i++) {
                id = result[_i];
                _results.push(_this.http.get("" + _this._personUrl + "/opdrachten/" + id, {}, function(error, result) {
                  var assignment, teachers, _ref9;
                  assignment = root.Assignment._convertRaw(_this, JSON.parse(result.content));
                  if (classes != null) {
                    assignment._class = _.find(classes, function(c) {
                      return c.abbreviation() === assignment._class;
                    });
                  } else {
                    assignment._class = null;
                  }
                  if (fillPersons) {
                    teachers = (_ref9 = assignment.teachers()) != null ? _ref9 : [];
                    return _this.fillPersons(teachers, (function(e, r) {
                      assignment._teachers = r;
                      return pushResult(assignment);
                    }), 3);
                  } else {
                    return pushResult(assignment);
                  }
                }));
              }
              return _results;
            }
          });
        };
      })(this);
      if (fillClass) {
        return this.courses(function(e, r) {
          if ((r != null) && r.length !== 0) {
            return r[0].classes(function(e, r) {
              if ((r != null) && r.length !== 0) {
                return cb(r);
              } else {
                return cb();
              }
            });
          } else {
            return cb();
          }
        });
      } else {
        return cb();
      }
    };


    /**
    	 * Gets the Digital school utilities for the current user.
    	 *
    	 * @method digitalSchoolUtilities
    	 * @async
    	 * @param [fillClass=true] {Boolean} Whether or not to download the full class objects from the server. If this is false .class() will return a limited class object.
    	 * @fixme /NOT WORKING/ (Weird ID mismatch) @param [class] {Class|Number} The class or ID of a class to get the Digital school utitlities for. If none is given it will return every DigitalSchoolUtility.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {DigitalSchoolUtility[]} An array containing DigitalSchoolUtilities.
     */

    Magister.prototype.digitalSchoolUtilities = function() {
      var callback, cb, fillClass, url, _class, _ref7;
      this._forceReady();
      fillClass = (_ref7 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref7 : true;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        return;
      }
      if (_.isObject(_class)) {
        _class = _class.id();
      }
      url = _class != null ? "" + this._personUrl + "/lesmateriaal?vakken=" + _class : "" + this._personUrl + "/lesmateriaal";
      cb = (function(_this) {
        return function(classes) {
          return _this.http.get(url, {}, function(error, result) {
            var u, utilities, _fn, _fn1, _i, _j, _len, _len1;
            if (error != null) {
              return callback(error, null);
            } else {
              utilities = (function() {
                var _i, _len, _ref8, _results;
                _ref8 = JSON.parse(result.content).Items;
                _results = [];
                for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
                  u = _ref8[_i];
                  _results.push(root.DigitalSchoolUtility._convertRaw(this, u));
                }
                return _results;
              }).call(_this);
              if (classes != null) {
                _fn = function(u) {
                  return u._class = _.find(classes, function(c) {
                    return c.abbreviation() === u._class.Afkorting && c.description() === u._class.Omschrijving;
                  });
                };
                for (_i = 0, _len = utilities.length; _i < _len; _i++) {
                  u = utilities[_i];
                  _fn(u);
                }
              } else {
                _fn1 = function(u) {
                  return u._class = root.Class._convertRaw(_this, u._class);
                };
                for (_j = 0, _len1 = utilities.length; _j < _len1; _j++) {
                  u = utilities[_j];
                  _fn1(u);
                }
              }
              return callback(null, utilities);
            }
          });
        };
      })(this);
      if (fillClass) {
        return this.courses(function(e, r) {
          if ((r != null) && r.length !== 0) {
            return _.last(r).classes(function(e, r) {
              return cb(r);
            });
          }
        });
      } else {
        return cb();
      }
    };


    /**
    	 * Returns the profile for the current logged in user.
    	 *
    	 * @method profileInfo
    	 * @param [callback] {Function} Not useful at all, just here to prevent possible mistakes.
    	 *	@param [callback.error] {Null} Will always be null
    	 *	@param [callback.result] {ProfileInfo} The profile of the current logged in user.
    	 * @return {ProfileInfo} The profile of the current logged in user.
     */

    Magister.prototype.profileInfo = function(callback) {
      this._forceReady();
      if (typeof callback === "function") {
        callback(null, this._profileInfo);
      }
      return this._profileInfo;
    };


    /**
    	 * Returns the children of the current user.
    	 *
    	 * @method children
    	 * @param callback
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {ProfileInfo[]} An array containing ProfileInfo instances.
     */

    Magister.prototype.children = function(callback) {
      return this.http.get("" + this._personUrl + "/kinderen", {}, (function(_this) {
        return function(error, result) {
          var c, parsed, raw, res, _i, _len, _ref7;
          if (error != null) {
            return callback(error, null);
          } else {
            parsed = JSON.parse(result.content);
            if ((parsed.ExceptionId != null) && parsed.Reason === 1) {
              callback(_.extend(parsed, {
                message: "User is not a parent."
              }), null);
              return;
            }
            res = [];
            _ref7 = parsed.Items;
            for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
              raw = _ref7[_i];
              c = root.ProfileInfo._convertRaw(_this, c);
              c._profilePicture = "" + _this.magisterSchool.url + "/api/personen/" + raw.Id + "/foto";
              c.magister(function(callback) {
                var r;
                r = _.clone(_this);
                r._id = raw.Id;
                r._personUrl = "" + _this.magisterSchool.url + "/api/personen/" + r._id;
                r._pupilUrl = "" + _this.magisterSchool.url + "/api/leerlingen/" + r._id;
                r._profileInfo = c;
                _this.http.get("" + r._personUrl + "/berichten/mappen", {}, function(error, result) {
                  var m;
                  r._messageFolders = (function() {
                    var _j, _len1, _ref8, _results;
                    _ref8 = JSON.parse(result.content).Items;
                    _results = [];
                    for (_j = 0, _len1 = _ref8.length; _j < _len1; _j++) {
                      m = _ref8[_j];
                      _results.push(root.MessageFolder._convertRaw(r, m));
                    }
                    return _results;
                  })();
                  return callback(r);
                });
                return void 0;
              });
              res.push(c);
            }
            return callback(null, res);
          }
        };
      })(this));
    };


    /**
    	 * Checks if this Magister instance is done logging in.
    	 *
    	 * You can also provide a callback, which will be called when this instance is done logging in.
    	 *
    	 * @method ready
    	 * @param [callback] {Function} The callback which will be called if the current instance is done logging in.
    	 * 	@param [callback.error] {Object} A error that occured when logging onto Magister, if it exists.
    	 *	@param callback.this {Magister} The current Magister object.
    	 * @return {Boolean} Whether or not the current Magister instance is done logging in.
     */

    Magister.prototype.ready = function(callback) {
      if (_.isFunction(callback)) {
        if (this._ready || (this._magisterLoadError != null)) {
          _.bind(callback, this)(this._magisterLoadError);
        } else {
          this._readyCallbacks.push(_.bind(callback, this));
        }
      }
      return this._ready === true;
    };

    Magister.prototype._forceReady = function() {
      if (!this._ready) {
        throw new Error("Not done with logging in! (use Magister.ready(callback) to be sure that logging in is done)");
      }
    };

    Magister.prototype._setReady = function() {
      var callback, _i, _len, _ref7;
      this._ready = true;
      _ref7 = this._readyCallbacks;
      for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
        callback = _ref7[_i];
        callback();
      }
      return this._readyCallbacks = [];
    };

    Magister.prototype._setErrored = function(e) {
      var callback, _i, _len, _ref7;
      this._magisterLoadError = e;
      _ref7 = this._readyCallbacks;
      for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
        callback = _ref7[_i];
        callback(this._magisterLoadError);
      }
      return this._readyCallbacks = [];
    };

    Magister.prototype._readyCallbacks = [];

    Magister.prototype._magisterLoadError = null;


    /**
    	 * (Re-)Login the current Magister instance.
    	 *
    	 * Usually not needed to call manually.
    	 *
    	 * @method reLogin
    	 * @deprecated
     */

    Magister.prototype.reLogin = function() {
      var url;
      this._ready = false;
      this._magisterLoadError = null;
      url = "" + this.magisterSchool.url + "/api/sessie";
      return this.http.post(url, {
        Gebruikersnaam: this.username,
        Wachtwoord: this.password,
        GebruikersnaamOnthouden: true,
        IngelogdBlijven: this._keepLoggedIn
      }, {
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        }
      }, (function(_this) {
        return function(error, result) {
          if (error != null) {
            return _this._setErrored(error);
          } else if (result.content != null) {
            return _this._setErrored(result.content);
          } else {
            _this._sessionId = /[a-z\d-]+/.exec(result.headers["set-cookie"][0])[0];
            _this.http._cookie = "SESSION_ID=" + _this._sessionId + "; M6UserName=" + _this.username;
            return _this.http.get("" + _this.magisterSchool.url + "/api/account", {}, function(error, result) {
              if (error != null) {
                _this._setErrored(error);
                return;
              }
              result = JSON.parse(result.content);
              _this._group = result.Groep[0];
              _this._id = result.Persoon.Id;
              _this._personUrl = "" + _this.magisterSchool.url + "/api/personen/" + _this._id;
              _this._pupilUrl = "" + _this.magisterSchool.url + "/api/leerlingen/" + _this._id;
              _this._profileInfo = root.ProfileInfo._convertRaw(_this, result);
              return _this.http.get("" + _this._personUrl + "/berichten/mappen", {}, function(error, result) {
                var m;
                if (error != null) {
                  _this._setErrored(error);
                  return;
                }
                _this._messageFolders = (function() {
                  var _i, _len, _ref7, _results;
                  _ref7 = JSON.parse(result.content).Items;
                  _results = [];
                  for (_i = 0, _len = _ref7.length; _i < _len; _i++) {
                    m = _ref7[_i];
                    _results.push(root.MessageFolder._convertRaw(this, m));
                  }
                  return _results;
                }).call(_this);
                return _this._setReady();
              });
            });
          }
        };
      })(this));
    };

    return Magister;

  })();

  root = (_ref7 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref7 : this;

  messageFolder = function(magisterObj, x) {
    switch (x) {
      case 1:
        return magisterObj.inbox();
      case 2:
        return magisterObj.sentItems();
      case 3:
        return magisterObj.bin();
      case 4:
        return magisterObj.alerts();
      default:
        return root.MessageFolder._convertRaw({
          Id: x
        });
    }
  };


  /**
   * A Magister message.
   *
   * @class Message
   * @param _magisterObj {Magister} A Magister object this Message is child of.
   * @constructor
   */

  root.Message = (function() {
    function Message(_magisterObj) {
      this._magisterObj = _magisterObj;
      if (this._magisterObj == null) {
        throw new Error("Magister instance is null!");
      }
      this._magisterObj._forceReady();
      this._canSend = true;
      this._sender = this._magisterObj.profileInfo();
      this._recipients = [];
      this._sendDate = new Date();
      this._isRead = false;
      this._type = 1;
      this._subject = "";
      this._body = "";

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property body
      		 * @type String
      		 * @default ""
       */
      this.body = root._getset("_body", ((function(_this) {
        return function(x) {
          return _this._body = x.replace("\n", "<br>");
        };
      })(this)), function(x) {
        if (x != null) {
          return x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "");
        } else {
          return "";
        }
      });

      /**
      		 * @property attachments
      		 * @final
      		 * @type File[]
       */
      this.attachments = root._getset("_attachments");

      /**
      		 * The MessageFolder this Message in, changing this will move the Message.
      		 * @property messageFolder
      		 * @type MessageFolder
       */
      this.messageFolder = root._getset("_folderId", ((function(_this) {
        return function(x) {
          return _this.move(x);
        };
      })(this)), (function(_this) {
        return function(x) {
          return messageFolder(_this._magisterObj, x);
        };
      })(this));

      /**
      		 * @property subject
      		 * @type String
      		 * @default ""
       */
      this.subject = root._getset("_subject", (function(_this) {
        return function(x) {
          return _this._subject = x;
        };
      })(this));

      /**
      		 * @property sender
      		 * @final
      		 * @type Person
       */
      this.sender = root._getset("_sender");

      /**
      		 * @property recipients
      		 * @final
      		 * @type Person[]
      		 * @default []
       */
      this.recipients = root._getset("_recipients");

      /**
      		 * @property sendDate
      		 * @final
      		 * @type Date
      		 * @default new Date()
       */
      this.sendDate = root._getset("_sendDate");

      /**
      		 * @property begin
      		 * @final
      		 * @type Date
       */
      this.begin = root._getset("_begin");

      /**
      		 * @property end
      		 * @final
      		 * @type Date
       */
      this.end = root._getset("_end");

      /**
      		 * @property isRead
      		 * @type Boolean
      		 * @default false
       */
      this.isRead = root._getset("_isRead", (function(_this) {
        return function(x) {
          if (_this._isRead === x || _this._canSend) {
            return;
          }
          _this._isRead = x;
          return _this._update();
        };
      })(this));

      /**
      		 * @property state
      		 * @final
      		 * @type Number
       */
      this.state = root._getset("_state");

      /**
      		 * @property isFlagged
      		 * @final
      		 * @type Boolean
       */
      this.isFlagged = root._getset("_isFlagged");

      /**
      		 * @property type
      		 * @final
      		 * @type Number
       */
      this.type = root._getset("_type");
    }

    Message.prototype._tasks = 0;

    Message.prototype._sendAfterFinished = false;

    Message.prototype._working = function() {
      return this._tasks !== 0;
    };

    Message.prototype._tickDown = function() {
      if (--this._tasks === 0 && this._sendAfterFinished) {
        return this.send();
      }
    };

    Message.prototype._reset = function() {
      this._tasks = 0;
      return this._sendAfterFinished = false;
    };


    /**
    	 * Adds (a) recipient(s) to the current Message.
    	 *
    	 * @method addRecipient
    	 * @param recipient {String|Person|String[]|Person[]} The recipient(s) to add.
    	 * @param [type] {String|Number} The type of the recipient, if none is provided and recipient is a String it will search for both Teachers and Pupils.
     */

    Message.prototype.addRecipient = function(recipient, type) {
      var p, _i, _len;
      if (_.isString(recipient)) {
        this._tasks++;
        this._magisterObj.getPersons(recipient, type, (function(_this) {
          return function(e, r) {
            if (r.length !== 0) {
              _this.recipients().push(r[0]);
              return _this._tickDown();
            } else if (type != null) {
              _this._reset();
              throw new Error("Couldn't find a person with the type: \"" + type + "\" and with the query: \"" + recipient + "\"");
            } else {
              _this._reset();
              throw new Error("Couldn't find a person with the query: \"" + recipient + "\"");
            }
          };
        })(this));
      } else if (_.isArray(recipient)) {
        for (_i = 0, _len = recipient.length; _i < _len; _i++) {
          p = recipient[_i];
          this.addRecipient(p, type);
        }
      } else if (_.isObject(recipient)) {
        this.recipients().push(recipient);
      } else {
        this._reset();
        throw new Error("Expected recipient to be a String or an Object, got a(n) " + (typeof recipient));
      }
      return void 0;
    };


    /**
    	 * Creates a new Message that replies to the sender of the current Message.
    	 *
    	 * @method createReplyMessage
    	 * @param [newContent] {String} The string to prepend the current message with.
    	 * @return {Message} The newely created Message.
     */

    Message.prototype.createReplyMessage = function(newContent) {
      var msg, subject;
      subject = this.subject().indexOf("RE: ") !== 0 ? "RE: " + (this.subject()) : subject();
      msg = new root.Message(this._magisterObj);
      msg._sender = this._sender;
      msg._folderId = this._folderId;
      msg._isFlagged = this._isFlagged;
      msg._id = this._id;
      msg._body = (newContent != null ? "" + newContent + "<br><br>---------------<br>" : "") + ("<b>Van:</b> " + (this.sender().description()) + "<br><b>Verzonden:</b> " + (this.sendDate().toLocaleString()) + "<br><b>Aan:</b> " + (this.recipients().map(function(x) {
        return x.fullName();
      }).join(", ")) + "<br><b>Onderwerp:</b> " + (this.subject()) + "<br><br>\"" + (this.body()) + "\"<br><br>");
      msg._subject = subject;
      msg._recipients = [this.sender()];
      return msg;
    };


    /**
    	 * Creates a new Message that replies to the sender and recipients of the current Message.
    	 *
    	 * @method createReplyToAllMessage
    	 * @param [newContent] {String} The string to prepend the current message with.
    	 * @return {Message} The newely created Message.
     */

    Message.prototype.createReplyToAllMessage = function(newContent) {
      var msg, subject;
      subject = this.subject().indexOf("RE: ") !== 0 ? "RE: " + (this.subject()) : subject();
      msg = new root.Message(this._magisterObj);
      msg._sender = this._sender;
      msg._folderId = this._folderId;
      msg._isFlagged = this._isFlagged;
      msg._id = this._id;
      msg._body = (newContent != null ? "" + newContent + "<br><br>---------------<br>" : "") + ("<b>Van:</b> " + (this.sender().description()) + "<br><b>Verzonden:</b> " + (this.sendDate().toLocaleString()) + "<br><b>Aan:</b> " + (this.recipients().map(function(x) {
        return x.fullName();
      }).join(", ")) + "<br><b>Onderwerp:</b> " + (this.subject()) + "<br><br>\"" + (this.body()) + "\"<br><br>");
      msg._subject = subject;
      msg._recipients = _.reject(this.recipients(), function(x) {
        return x.id() === this._magisterObj.profileInfo().id();
      }).concat([this.sender()]);
      return msg;
    };


    /**
    	 * Creates a new Message that forwards the current Message.
    	 *
    	 * @method createForwardMessage
    	 * @param [newContent] {String} The string to prepend the current message with.
    	 * @return {Message} The newely created Message.
     */

    Message.prototype.createForwardMessage = function(newContent) {
      var msg, subject;
      subject = this.subject().indexOf("FW: ") !== 0 ? "FW: " + (this.subject()) : subject();
      msg = new root.Message(this._magisterObj);
      msg._sender = this._sender;
      msg._folderId = this._folderId;
      msg._isFlagged = this._isFlagged;
      msg._id = this._id;
      msg._body = (newContent != null ? "" + newContent + "<br><br>---------------<br>" : "") + ("<b>Van:</b> " + (this.sender().description()) + "<br><b>Verzonden:</b> " + (this.sendDate().toLocaleString()) + "<br><b>Aan:</b> " + (this.recipients().map(function(x) {
        return x.fullName();
      }).join(", ")) + "<br><b>Onderwerp:</b> " + (this.subject()) + "<br><br>\"" + (this.body()) + "\"<br><br>");
      msg._subject = subject;
      return msg;
    };


    /**
    	 * Sends the current Message. Sending will be delayed if there are processes running in the background.
    	 *
    	 * @method send
    	 * @return {Boolean} False if the sending is delayed, otherwise true.
     */

    Message.prototype.send = function() {
      if (this._working()) {
        this._sendAfterFinished = true;
        return false;
      }
      if (!this._canSend) {
        throw new Error("This message is marked as unsendable");
      }
      if (!((this.recipients() != null) && (this.sender() != null))) {
        throw new Error("Sender and/or recipients cannot be null");
      }
      if (_.isEmpty(this.subject())) {
        throw new Error("Subject cannot be null or empty");
      }
      if (this.body() == null) {
        this.body("");
      }
      this._magisterObj.http.post("" + this._magisterObj._personUrl + "/berichten", this._toMagisterStyle(), {}, function(e, r) {
        if (e != null) {
          throw e;
        }
      });
      return true;
    };


    /**
    	 * Move the current message to the given position.
    	 *
    	 * @method move
    	 * @param destination {Number|MessageFolder} The MessageFolder of the ID of a MessageFolder or the MessageFolder itself where to move this Message to.
     */

    Message.prototype.move = function(destination) {
      if (_.isObject(destination)) {
        destination = destination.id();
      }
      if (!_.isNumber(destination)) {
        throw new Error("Could not resolve MessageFolder form the given destination.");
      }
      if (this._folderId === destination) {
        return;
      }
      this._folderId = destination;
      return this._update();
    };


    /**
    	 * WARNING. Removes the current Message.
    	 *
    	 * @method remove
     */

    Message.prototype.remove = function() {
      return this._magisterObj.http["delete"]("" + this._magisterObj._personUrl + "/berichten/" + (this.id()), {}, function(error, result) {
        if (error != null) {
          throw error;
        }
      });
    };

    Message.prototype._update = function() {
      return this._magisterObj.http.put("" + this._magisterObj._personUrl + "/berichten/" + (this.id()) + "?berichtSoort=" + (this.type()), this._toMagisterStyle(), {}, (function() {}));
    };

    Message.prototype._toMagisterStyle = function() {
      var obj, p;
      obj = {};
      obj.Id = this._id;
      obj.Inhoud = this._body;
      obj.MapId = this._folderId;
      obj.Onderwerp = this._subject;
      obj.Ontvangers = (function() {
        var _i, _len, _ref8, _results;
        _ref8 = this._recipients;
        _results = [];
        for (_i = 0, _len = _ref8.length; _i < _len; _i++) {
          p = _ref8[_i];
          _results.push(p._toMagisterStyle());
        }
        return _results;
      }).call(this);
      obj.VerstuurdOp = this._sendDate;
      obj.Begin = this._begin;
      obj.Einde = this._end;
      obj.IsGelezen = this._isRead;
      obj.Status = this._state;
      obj.HeeftPrioriteit = this._isFlagged;
      obj.Soort = this._type;
      return obj;
    };

    Message._convertRaw = function(magisterObj, raw) {
      var o, obj, _ref8;
      obj = new root.Message(magisterObj);
      obj._id = raw.Id;
      obj._body = (_ref8 = raw.Inhoud) != null ? _ref8 : "";
      obj._folderId = raw.MapId;
      obj._subject = raw.Onderwerp;
      obj._sender = root.Person._convertRaw(magisterObj, raw.Afzender);
      obj._recipients = (function() {
        var _i, _len, _ref10, _ref9, _results;
        _ref10 = (_ref9 = raw.Ontvangers) != null ? _ref9 : [];
        _results = [];
        for (_i = 0, _len = _ref10.length; _i < _len; _i++) {
          o = _ref10[_i];
          _results.push(root.Person._convertRaw(magisterObj, o));
        }
        return _results;
      })();
      obj._sendDate = new Date(Date.parse(raw.VerstuurdOp));
      obj._begin = new Date(Date.parse(raw.Begin));
      obj._end = new Date(Date.parse(raw.Einde));
      obj._isRead = raw.IsGelezen;
      obj._state = raw.Status;
      obj._isFlagged = raw.HeeftPrioriteit;
      obj._type = raw.Soort;
      obj._canSend = false;
      return obj;
    };

    return Message;

  })();

  root = (_ref8 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref8 : this;

  findQueries = function(queries) {
    var final, numbers, result;
    final = "";
    if (_.any(["unread", "ongelezen"], function(x) {
      return root._helpers.contains(queries, x, true);
    })) {
      final += "&gelezen=false";
    } else if (_.any(["read", "gelezen"], function(x) {
      return root._helpers.contains(queries, x, true);
    })) {
      final += "&gelezen=true";
    }
    if ((result = /(skip \d+)|(sla \d+ over)/ig.exec(queries)) != null) {
      numbers = /\d+/.exec(result[0])[0];
      final += "&skip=" + numbers;
    }
    return final;
  };


  /**
   * A MessageFolder.
   *
   * @class MessageFolder
   * @private
   * @param _magisterObj {Magister} A Magister object this MessageFolder is child of.
   * @constructor
   */

  root.MessageFolder = (function() {
    function MessageFolder(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property unreadMessagesCount
      		 * @final
      		 * @type Number
       */
      this.unreadMessagesCount = root._getset("_unreadMessagesCount");

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property parentId
      		 * @final
      		 * @type Number
       */
      this.parentId = root._getset("_parentId");
    }


    /**
    	 * Gets the Messages of this MessageFolder.
    	 *
    	 * @method messages
    	 * @async
    	 * @param [limit=10] {Number} The limit of the amount of Messages to fetch.
    	 * @param [queries=""] {String} Queries to do on the message (e.g: "unread, skip 5")
    	 * @param [download=true] {Boolean} Whether or not to download the users from the server.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {Message[]} An array containing the Messages.
     */

    MessageFolder.prototype.messages = function() {
      var callback, download, limit, queries, url, _ref10, _ref11, _ref9;
      limit = (_ref9 = _.find(arguments, function(a) {
        return _.isNumber(a);
      })) != null ? _ref9 : 10;
      queries = (_ref10 = _.find(arguments, function(a) {
        return _.isString(a);
      })) != null ? _ref10 : "";
      download = (_ref11 = _.find(arguments, function(a) {
        return _.isBoolean(a);
      })) != null ? _ref11 : true;
      callback = _.find(arguments, function(a) {
        return _.isFunction(a);
      });
      if (callback == null) {
        throw new Error("Callback is null");
      }
      if (limit === 0) {
        callback(null, []);
        return void 0;
      }
      url = "" + this._magisterObj._personUrl + "/berichten?mapId=" + (this.id()) + "&top=" + limit + (findQueries(queries));
      return this._magisterObj.http.get(url, {}, (function(_this) {
        return function(error, result) {
          var m, messages, pushMessage, _i, _len, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            messages = (function() {
              var _i, _len, _ref12, _results;
              _ref12 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref12.length; _i < _len; _i++) {
                m = _ref12[_i];
                _results.push(root.Message._convertRaw(this._magisterObj, m));
              }
              return _results;
            }).call(_this);
            pushMessage = root._helpers.asyncResultWaiter(messages.length, function(r) {
              return callback(null, _.sortBy(r, function(m) {
                return m.sendDate();
              }).reverse());
            });
            _results = [];
            for (_i = 0, _len = messages.length; _i < _len; _i++) {
              m = messages[_i];
              _results.push((function(m) {
                url = "" + _this._magisterObj._personUrl + "/berichten/" + (m.id()) + "?berichtSoort=" + (m.type());
                return _this._magisterObj.http.get(url, {}, function(error, result) {
                  var a, parsed, pushPeople;
                  parsed = JSON.parse(result.content);
                  m._body = parsed.Inhoud;
                  m._attachments = (function() {
                    var _j, _len1, _ref12, _ref13, _results1;
                    _ref13 = (_ref12 = parsed.Bijlagen) != null ? _ref12 : [];
                    _results1 = [];
                    for (_j = 0, _len1 = _ref13.length; _j < _len1; _j++) {
                      a = _ref13[_j];
                      _results1.push(root.File._convertRaw(this._magisterObj, void 0, a));
                    }
                    return _results1;
                  }).call(_this);
                  if (download) {
                    pushPeople = root._helpers.asyncResultWaiter(m.recipients().length + 1, function() {
                      return pushMessage(m);
                    });
                    _this._magisterObj.fillPersons(m.recipients(), function(e, r) {
                      m._recipients = r;
                      return pushPeople(r);
                    });
                    return _this._magisterObj.fillPersons(m.sender(), function(e, r) {
                      m._sender = r;
                      return pushPeople(r);
                    });
                  } else {
                    return pushMessage(m);
                  }
                });
              })(m));
            }
            return _results;
          }
        };
      })(this));
    };


    /**
    	 * Gets the MessageFolders in this MessageFolder that matches the given query. Or if no query is given, all MessageFolders
    	 *
    	 * @method messageFolders
    	 * @async
    	 * @param query {String} A case insensetive query the MessageFolder need to match.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 *	@param [callback.result] {MessageFolder[]} An array containing the matching MessageFolders.
    	 * @return {MessageFolder[]} An array containing the matching messageFolders.
     */

    MessageFolder.prototype.messageFolders = function(query, callback) {
      var _ref9;
      callback = (_ref9 = (callback != null ? callback : query)) != null ? _ref9 : (function() {});
      if (callback == null) {
        return;
      }
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/berichten/mappen?parentId=" + (this.id()), {}, (function(_this) {
        return function(error, result) {
          var mF, messageFolders;
          if (error != null) {
            return callback(error, null);
          } else {
            messageFolders = (function() {
              var _i, _len, _ref10, _results;
              _ref10 = JSON.parse(result.content).Items;
              _results = [];
              for (_i = 0, _len = _ref10.length; _i < _len; _i++) {
                mF = _ref10[_i];
                _results.push(root.MessageFolder._convertRaw(this._magisterObj, mF));
              }
              return _results;
            }).call(_this);
            if (_.isString(query) && query !== "") {
              result = _.where(messageFolders, function(mF) {
                return Helpers.contains(mF.name(), query, true);
              });
            } else {
              result = messageFolders;
            }
            return callback(null, result);
          }
        };
      })(this));
    };


    /**
    	 * DANGER. Removes ALL messages from the current MessageFolder.
    	 * @method removeAllMessages
     */

    MessageFolder.prototype.removeAllMessages = function() {
      return this._magisterObj.http["delete"]("" + this._magisterObj._personUrl + "/berichten/map/" + (this.id()), {}, function(e, r) {
        if (e != null) {
          throw e;
        }
      });
    };


    /**
    	 * Creates a new MessageFolder inside of this MessageFolder with the given name.
    	 *
    	 * @method createMessageFolder
    	 * @async
    	 * @param name {String} The name of the MessageFolder.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 *	@param [callback.result] {MessageFolder} The new MessageFolder.
     */

    MessageFolder.prototype.createMessageFolder = function(name, callback) {
      var folder;
      if (callback == null) {
        callback = function() {};
      }
      folder = {
        naam: name,
        parentId: this.id(),
        persoonId: this._magisterObj._id
      };
      return this._magisterObj.http.post("" + this._magisterObj._personUrl + "/berichten/mappen", folder, {}, (function(_this) {
        return function(error, result) {
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, root.MessageFolder._convertRaw(_this._magisterObj, JSON.parse(result.content)));
          }
        };
      })(this));
    };


    /**
    	 * DANGER. Removes the current MessageFolder.
    	 * @method remove
     */

    MessageFolder.prototype.remove = function() {
      return this._magisterObj.http.put("" + this._magisterObj._personUrl + "/berichten/mappen", this._toMagisterStyle(), {}, function(e, r) {
        if (e != null) {
          throw e;
        }
      });
    };

    MessageFolder.prototype._toMagisterStyle = function() {
      var obj;
      obj = {};
      obj.Naam = this._name;
      obj.OngelezenBerichten = this._unreadMessagesCount;
      obj.Id = this._id;
      obj.ParentId = this._parentId;
      return obj;
    };

    MessageFolder._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.MessageFolder(magisterObj);
      obj._name = raw.Naam;
      obj._unreadMessagesCount = raw.OngelezenBerichten;
      obj._id = raw.Id;
      obj._parentId = raw.ParentId;
      return obj;
    };

    return MessageFolder;

  })();

  root = (_ref9 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref9 : this;


  /**
   * A Person.
   *
   * @class Person
   * @private
   * @param _magisterObj {Magister} A Magister object this Person is child of.
   * @param _type {Number|String} The type of the Person.
   * @param _firstName {String} The first name of the Person.
   * @param _lastName {String} The last name of the Person.
   * @constructor
   */

  root.Person = (function() {
    function Person(_magisterObj, _type, _firstName, _lastName) {
      this._magisterObj = _magisterObj;
      this._type = _type;
      this._firstName = _firstName;
      this._lastName = _lastName;
      if ((this._firstName != null) && (this._lastName != null)) {
        if (_.any(_.toArray(arguments).slice(2), function(a) {
          return (a != null) && !_.isString(a);
        })) {
          throw new Error("One or more arguments is not a string.");
        }
      }

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property type
      		 * @type String
       */
      this.type = root._getset("_type", ((function(_this) {
        return function(val) {
          return _this._type = Person._convertType(val, true);
        };
      })(this)), Person._convertType);

      /**
      		 * @property firstName
      		 * @final
      		 * @type String
       */
      this.firstName = root._getset("_firstName");

      /**
      		 * @property lastName
      		 * @final
      		 * @type String
       */
      this.lastName = root._getset("_lastName");

      /**
      		 * @property namePrefix
      		 * @final
      		 * @type String
       */
      this.namePrefix = root._getset("_namePrefix");

      /**
      		 * @property fullName
      		 * @final
      		 * @type String
       */
      this.fullName = root._getset("_fullName");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description");

      /**
      		 * @property group
      		 * @final
      		 * @type String
       */
      this.group = root._getset("_group");

      /**
      		 * @property teacherCode
      		 * @final
      		 * @type String
       */
      this.teacherCode = root._getset("_teacherCode");

      /**
      		 * @property emailAddress
      		 * @final
      		 * @type String
       */
      this.emailAddress = root._getset("_emailAddress");
    }

    Person.prototype._toMagisterStyle = function() {
      var obj;
      obj = {};
      obj.Id = this._id;
      obj.Type = this._type;
      obj.Voornaam = this._firstName;
      obj.Achternaam = this._lastName;
      obj.Tussenvoegsel = this._namePrefix;
      obj.Naam = this._fullName;
      obj.Omschrijving = this._description;
      obj.Groep = this._group;
      obj.Docentcode = this._teacherCode;
      obj.Emailadres = this._emailAddress;
      return obj;
    };

    Person._convertRaw = function(magisterObj, raw) {
      var obj, _ref10, _ref11;
      obj = new root.Person(magisterObj, raw.Type, raw.Voornaam, raw.Achternaam);
      obj._id = raw.Id;
      obj._namePrefix = raw.Tussenvoegsel;
      obj._fullName = raw.Naam;
      obj._description = (_ref10 = (_ref11 = raw.Omschrijving) != null ? _ref11 : raw.Naam) != null ? _ref10 : raw.naam;
      obj._group = raw.Groep;
      obj._teacherCode = raw.Docentcode;
      obj._emailAddress = raw.Emailadres;
      return obj;
    };

    Person._convertType = function(original, setter) {
      if (setter == null) {
        setter = true;
      }
      if (setter) {
        if (_.isNumber(original)) {
          if (!_.contains([1, 3, 4, 8], original)) {
            throw new Error("Invalid value: \"" + original + "\".");
          }
          return original;
        } else {
          switch (original.toLowerCase()) {
            case "group":
              return 1;
            case "teacher" || "personnel":
              return 3;
            case "pupil":
              return 4;
            case "project":
              return 8;
            default:
              throw new Error("Invalid value: \"" + original + "\".");
          }
        }
      } else {
        switch (original) {
          case 1:
            return "group";
          case 3:
            return "teacher";
          case 4:
            return "pupil";
          case 8:
            return "project";
          default:
            return void 0;
        }
      }
    };

    return Person;

  })();

  root = (_ref10 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref10 : this;


  /**
   * Information of the logged in user. Or a child.
   *
   * @class ProfileInfo
   * @private
   * @param _magisterObj {Magister} A Magister object this ProfileInfo is child of.
   * @param _firstName {String} The first name of the user.
   * @param _lastName {String} The last name of the user.
   * @param _birthDate {Date} The date of birth of the user.
   * @constructor
   */

  root.ProfileInfo = (function() {
    function ProfileInfo(_magisterObj, _firstName, _lastName, _birthDate) {
      this._magisterObj = _magisterObj;
      this._firstName = _firstName;
      this._lastName = _lastName;
      this._birthDate = _birthDate;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property officialFirstNames
      		 * @final
      		 * @type String
       */
      this.officialFirstNames = root._getset("_officialFirstNames");

      /**
      		 * @property initials
      		 * @final
      		 * @type String
       */
      this.initials = root._getset("_initials");

      /**
      		 * @property namePrefix
      		 * @final
      		 * @type String
       */
      this.namePrefix = root._getset("_namePrefix");

      /**
      		 * @property officialSurname
      		 * @final
      		 * @type String
       */
      this.officialSurname = root._getset("_officialSurname");

      /**
      		 * @property birthSurname
      		 * @final
      		 * @type String
       */
      this.birthSurname = root._getset("_birthSurname");

      /**
      		 * @property birthNamePrefix
      		 * @final
      		 * @type String
       */
      this.birthNamePrefix = root._getset("_birthNamePrefix");

      /**
      		 * @property useBirthname
      		 * @final
      		 * @type Boolean
       */
      this.useBirthname = root._getset("_useBirthname");

      /**
      		 * @property firstName
      		 * @final
      		 * @type String
       */
      this.firstName = root._getset("_firstName");

      /**
      		 * @property lastName
      		 * @final
      		 * @type String
       */
      this.lastName = root._getset("_lastName");

      /**
      		 * Equal to firstName() + " " + lastName()
      		 * @property fullName
      		 * @final
      		 * @type String
       */
      this.fullName = function() {
        return this.firstName() + " " + this.lastName();
      };

      /**
      		 * @property birthDate
      		 * @final
      		 * @type Date
       */
      this.birthDate = root._getset("_birthDate");
    }


    /**
    	 * The profile picture of the current User.
    	 *
    	 * @method profilePicture
    	 * @param [width=640] The width of the picture.
    	 * @param [height=640] The height of the picture.
    	 * @param [crop=false] Whether or not to crop the image.
    	 * @return {String} The URL to the picture, including the given options.
     */

    ProfileInfo.prototype.profilePicture = function(width, height, crop) {
      if (width == null) {
        width = 640;
      }
      if (height == null) {
        height = 640;
      }
      if (crop == null) {
        crop = false;
      }
      return "" + this._magisterObj._personUrl + "/foto?width=" + width + "&height=" + height + "&crop=" + crop;
    };


    /**
    	 * Fetch more detailedInfo of the current User.
    	 *
    	 * @method detailedInfo
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {DetailedProfileInfo} The detailed profile info of the current User.
     */

    ProfileInfo.prototype.detailedInfo = function(callback) {
      var push;
      if (callback == null) {
        throw new Error("`callback` is required.");
      }
      push = root._helpers.asyncResultWaiter(2, function(r) {
        return callback(null, root.DetailedProfileInfo._convertRaw(_.extend(r[0], r[1])));
      });
      this._magisterObj.http.get("" + this._magisterObj._personUrl + "/profiel", {}, function(e, r) {
        if (e != null) {
          return callback(e, null);
        } else {
          return push(JSON.parse(r.content));
        }
      });
      return this._magisterObj.http.get("" + this._magisterObj._personUrl + "/adresprofiel", {}, function(e, r) {
        if (e != null) {
          return callback(e, null);
        } else {
          return push(JSON.parse(r.content));
        }
      });
    };

    ProfileInfo._convertRaw = function(magisterObj, raw) {
      var obj;
      raw = raw.Persoon;
      obj = new root.ProfileInfo(magisterObj, raw.Roepnaam, raw.Achternaam, new Date(Date.parse(raw.Geboortedatum)));
      obj._id = raw.Id;
      obj._officialFirstNames = raw.OfficieleVoornamen;
      obj._initials = raw.Voorletters;
      obj._namePrefix = raw.Tussenvoegsel;
      obj._officialSurname = raw.OfficieleAchternaam;
      obj._birthSurname = raw.GeboorteAchternaam;
      obj._birthNamePrefix = raw.GeboortenaamTussenvoegsel;
      obj._useBirthname = raw.GebruikGeboortenaam;
      return obj;
    };

    return ProfileInfo;

  })();


  /**
   * More detailed information of the logged in user. Or a child.
   *
   * @class DetailedProfileInfo
   * @private
   * @constructor
   */

  root.DetailedProfileInfo = (function() {
    function DetailedProfileInfo() {

      /**
      		 * @property redirectMagisterMessages
      		 * @final
      		 * @type Boolean
       */
      this.redirectMagisterMessages = root._getset("_redirectMagisterMessages");

      /**
      		 * @property emailAddress
      		 * @final
      		 * @type String
       */
      this.emailAddress = root._getset("_emailAddress");

      /**
      		 * @property mobileNumber
      		 * @final
      		 * @type String
       */
      this.mobileNumber = root._getset("_mobileNumber");

      /**
      		 * @property postalCode
      		 * @final
      		 * @type String
       */
      this.postalCode = root._getset("_postalCode");

      /**
      		 * @property street
      		 * @final
      		 * @type String
       */
      this.street = root._getset("_street");

      /**
      		 * @property houseNumber
      		 * @final
      		 * @type Number
       */
      this.houseNumber = root._getset("_houseNumber");

      /**
      		 * String behind the `houseNumber` (eg 'A')
      		 *
      		 * @property suffix
      		 * @final
      		 * @type String
       */
      this.suffix = root._getset("_suffix");

      /**
      		 * @property city
      		 * @final
      		 * @type String
       */
      this.city = root._getset("_city");
    }

    DetailedProfileInfo._convertRaw = function() {
      var obj, raw;
      raw = arguments[arguments.length === 2 ? 1 : 0];
      obj = new root.DetailedProfileInfo;
      obj._redirectMagisterMessages = raw.EloBerichtenDoorsturen;
      obj._emailAddress = raw.EmailAdres;
      obj._mobileNumber = raw.Mobiel;
      obj._postalCode = raw.Postcode;
      obj._street = raw.Straatnaam;
      obj._houseNumber = raw.Huisnummer;
      obj._suffix = raw.Toevoeging;
      obj._city = raw.Woonplaats;
      return obj;
    };

    return DetailedProfileInfo;

  })();

  root = (_ref11 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref11 : this;


  /**
   * A Magister school.
   *
   * @class MagisterSchool
   * @param name {String} The name of the school.
   * @param url {String} The URL of the school.
   * @constructor
   */

  root.MagisterSchool = (function() {

    /**
    	 * @property id
    	 * @final
    	 * @type String
     */

    /**
    	 * @property name
    	 * @final
    	 * @type String
     */

    /**
    	 * @property url
    	 * @final
    	 * @type String
     */
    function MagisterSchool(id, name, url) {
      this.id = id;
      this.name = name;
      this.url = url;
    }


    /**
    	 * Gets the schools that matches the given query.
    	 *
    	 * @method getSchools
    	 * @async
    	 * @static
    	 * @param query {String} The query the school should match to. Should be at least 3 chars long.
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 * 	@param [callback.result] {MagisterSchool[]} An array containing the MagisterSchools.
     */

    MagisterSchool.getSchools = function(query, callback) {
      if ((query == null) || root._helpers.trim(query).length < 3) {
        callback(null, []);
        return;
      }
      query = query.replace(/\d/g, "").trim();
      return new MagisterHttp().get("https://mijn.magister.net/api/schools?filter=" + query, {}, (function(_this) {
        return function(error, result) {
          var s;
          if (error != null) {
            return callback(error, null);
          } else {
            return callback(null, (function() {
              var _i, _len, _ref12, _results;
              _ref12 = JSON.parse(result.content);
              _results = [];
              for (_i = 0, _len = _ref12.length; _i < _len; _i++) {
                s = _ref12[_i];
                _results.push(this._convertRaw(s));
              }
              return _results;
            }).call(_this));
          }
        };
      })(this));
    };

    MagisterSchool._convertRaw = function(raw) {
      return new root.MagisterSchool(raw.Id, raw.Name, raw.Url);
    };

    return MagisterSchool;

  })();

  root = (_ref12 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref12 : this;


  /**
   * A StudyGuide, containing various Files and Links teachers can put on Magister.
   *
   * @class StudyGuide
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this StudyGuide is child of.
   */

  root.StudyGuide = (function() {
    function StudyGuide(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property from
      		 * @final
      		 * @type Date
       */
      this.from = root._getset("_from");

      /**
      		 * @property to
      		 * @final
      		 * @type Date
       */
      this.to = root._getset("_to");

      /**
      		 * @property classCodes
      		 * @final
      		 * @type String[]
       */
      this.classCodes = root._getset("_classCodes");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property archived
      		 * @final
      		 * @type Boolean
       */
      this.archived = root._getset("_archived");

      /**
      		 * @property class
      		 * @final
      		 * @type Class
       */
      this["class"] = root._getset("_class");
    }


    /**
    	 * Get the parts of this StudyGuide.
    	 *
    	 * @method parts
    	 * @async
    	 * @param callback {Function} A standard callback.
    	 * 	@param [callback.error] {Object} The error, if it exists.
    	 *	@param [callback.result] {StudyGuidePart[]} The parts of this StudyGuide of the current logged in user.
     */

    StudyGuide.prototype.parts = function(callback) {
      if (callback == null) {
        return;
      }
      return this._magisterObj.http.get("" + this._magisterObj._pupilUrl + "/studiewijzers/" + (this.id()), {}, (function(_this) {
        return function(error, result) {
          var id, p, pushResult, _i, _len, _ref13, _results;
          if (error != null) {
            return callback(error, null);
          } else {
            result = JSON.parse(result.content).Onderdelen.Items;
            pushResult = root._helpers.asyncResultWaiter(result.length, function(r) {
              return callback(null, r);
            });
            _ref13 = (function() {
              var _j, _len, _results1;
              _results1 = [];
              for (_j = 0, _len = result.length; _j < _len; _j++) {
                p = result[_j];
                _results1.push(p.Id);
              }
              return _results1;
            })();
            _results = [];
            for (_i = 0, _len = _ref13.length; _i < _len; _i++) {
              id = _ref13[_i];
              _results.push(_this._magisterObj.http.get("" + _this._magisterObj._pupilUrl + "/studiewijzers/" + (_this.id()) + "/onderdelen/" + id, {}, function(error, result) {
                return pushResult(root.StudyGuidePart._convertRaw(_this._magisterObj, JSON.parse(result.content)));
              }));
            }
            return _results;
          }
        };
      })(this));
    };

    StudyGuide._convertRaw = function(magisterObj, raw) {
      var obj;
      obj = new root.StudyGuide(magisterObj);
      obj._id = raw.Id;
      obj._from = new Date(Date.parse(raw.Van));
      obj._to = new Date(Date.parse(raw.TotEnMet));
      obj._classCodes = raw.VakCodes;
      obj._class = raw.VakCodes[0];
      obj._name = raw.Titel;
      obj._archived = raw.InLeerlingArchief;
      return obj;
    };

    return StudyGuide;

  })();


  /**
   * A part of a StudyGuide.
   *
   * @class StudyGuidePart
   * @private
   * @constructor
   * @param _magisterObj {Magister} A Magister object this StudyGuidePart is child of.
   */

  root.StudyGuidePart = (function() {
    function StudyGuidePart(_magisterObj) {
      this._magisterObj = _magisterObj;

      /**
      		 * @property id
      		 * @final
      		 * @type Number
       */
      this.id = root._getset("_id");

      /**
      		 * @property from
      		 * @final
      		 * @type Date
       */
      this.from = root._getset("_from");

      /**
      		 * @property to
      		 * @final
      		 * @type Date
       */
      this.to = root._getset("_to");

      /**
      		 * @property name
      		 * @final
      		 * @type String
       */
      this.name = root._getset("_name");

      /**
      		 * @property description
      		 * @final
      		 * @type String
       */
      this.description = root._getset("_description", null, function(x) {
        if (x != null) {
          return x.replace(/<br ?\/?>/g, "\n").replace(/(<[^>]*>)|(&nbsp;)/g, "").replace(/&amp;/ig, "&");
        } else {
          return x;
        }
      });

      /**
      		 * @property visible
      		 * @final
      		 * @type Boolean
       */
      this.visible = root._getset("_visible");

      /**
      		 * @property number
      		 * @final
      		 * @type Number
       */
      this.number = root._getset("_number");

      /**
      		 * @property files
      		 * @final
      		 * @type File[]
       */
      this.files = root._getset("_files");
    }

    StudyGuidePart._convertRaw = function(magisterObj, raw) {
      var f, obj;
      obj = new root.StudyGuidePart(magisterObj);
      obj._id = raw.Id;
      obj._from = new Date(Date.parse(raw.Van));
      obj._to = new Date(Date.parse(raw.TotEnMet));
      obj._name = raw.Titel;
      obj._description = raw.Omschrijving;
      obj._visible = raw.IsZichtbaar;
      obj._number = raw.Volgnummer;
      obj._files = (function() {
        var _i, _len, _ref13, _results;
        _ref13 = raw.Bronnen;
        _results = [];
        for (_i = 0, _len = _ref13.length; _i < _len; _i++) {
          f = _ref13[_i];
          _results.push(root.File._convertRaw(magisterObj, void 0, f));
        }
        return _results;
      })();
      return obj;
    };

    return StudyGuidePart;

  })();

  root = (_ref13 = typeof module !== "undefined" && module !== null ? module.exports : void 0) != null ? _ref13 : this;


  /**
   * A utility class containing various helper methods.
   *
   * @static
   * @private
   * @class _helpers
   */

  root._helpers = (function() {
    function _helpers() {}


    /**
    	 * Adds a zero in front of the original number if it doesn't yet.
    	 *
    	 * @method addZero
    	 * @param original {Number} The number to add a zero in front to.
    	 * @return {String} The number as string with a zero in front of it.
     */

    _helpers.addZero = function(original) {
      if (original < 10) {
        return "0" + original;
      } else {
        return original.toString();
      }
    };

    _helpers.toUtcString = function(d) {
      return "" + (_helpers.addZero(d.getUTCFullYear())) + "-" + (_helpers.addZero(d.getMonth() + 1)) + "-" + (_helpers.addZero(d.getDate())) + "T" + (_helpers.addZero(d.getHours())) + ":" + (_helpers.addZero(d.getMinutes())) + ":" + (_helpers.addZero(d.getSeconds())) + ".0000000Z";
    };

    _helpers.pushMore = function(arr, items) {
      [].push.apply(arr, items);
      return arr;
    };


    /**
    	 * Checks if the given original string contains the given query string.
    	 *
    	 * @method contains
    	 * @param original {String} The original string to search in.
    	 * @param query {String} The string to search for.
    	 * @param ignoreCasing {Boolean} Whether to ignore the casing of the search.
    	 * @return {Boolean} Whether the original string contains the query string.
     */

    _helpers.contains = function(original, query, ignoreCasing) {
      if (ignoreCasing == null) {
        ignoreCasing = false;
      }
      if (ignoreCasing) {
        return original.toUpperCase().indexOf(query.toUpperCase()) >= 0;
      } else {
        return original.indexOf(query) >= 0;
      }
    };


    /**
    	 * Returns a function which requires a result, when all results are pushed the callback is called with the result.
    	 *
    	 * @method asyncResultWaiter
    	 * @param amount {Number} The amount of results needed before the callback is called.
    	 * @param callback {Function} The callback which will be called when all the results are pushed.
    	 * @return {Function} The function which should be called with the reuslts.
     */

    _helpers.asyncResultWaiter = function(amount, callback) {
      var left, results;
      if (amount === 0) {
        callback([]);
      }
      results = [];
      left = amount;
      return function(result) {
        if (_.isArray(result)) {
          _helpers.pushMore(results, result);
          left -= result.length;
        } else {
          results.push(result);
          left--;
        }
        if (left === 0) {
          return callback(results);
        }
      };
    };

    _helpers.trim = function(original) {
      if (!((original != null) && original.length !== 0)) {
        return "";
      }
      if (_.isFunction(String.prototype.trim)) {
        return original.trim();
      } else {
        return original.replace(/^\s+|\s+$/g, "");
      }
    };

    _helpers.saveFile = function(rawData, mime, name) {
      try {
        return saveAs(new Blob([rawData], {
          type: mime
        }), name);
      } catch (_error) {}
    };

    _helpers.urlDateConvert = function(date) {
      return "" + (date.getUTCFullYear()) + "-" + (_helpers.addZero(date.getMonth() + 1)) + "-" + (_helpers.addZero(date.getDate()));
    };

    _helpers.date = function(date) {
      return new Date(date.getUTCFullYear(), date.getMonth(), date.getDate());
    };

    return _helpers;

  })();

  root._getset = function(varName, setter, getter) {
    return function(newVar) {
      if (newVar != null) {
        if (_.isFunction(setter)) {
          setter(newVar, true);
        } else {
          throw new Error("Changes on this property aren't allowed");
        }
      }
      if (_.isFunction(getter)) {
        return getter(this[varName], false);
      } else {
        return this[varName];
      }
    };
  };

  if (Array.isArray == null) {
    _.isArray = jQuery.isArray = Array.isArray = function(x) {
      return Object.prototype.toString.call(x === "[object Array]");
    };
  }

  /*! @source https://github.com/eligrey/Blob.js */
!function(a){"use strict";if(a.URL=a.URL||a.webkitURL,a.Blob&&a.URL)try{return new Blob,void 0}catch(b){}var c=a.BlobBuilder||a.WebKitBlobBuilder||a.MozBlobBuilder||function(a){var b=function(a){return Object.prototype.toString.call(a).match(/^\[object\s(.*)\]$/)[1]},c=function(){this.data=[]},d=function(a,b,c){this.data=a,this.size=a.length,this.type=b,this.encoding=c},e=c.prototype,f=d.prototype,g=a.FileReaderSync,h=function(a){this.code=this[this.name=a]},i="NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR".split(" "),j=i.length,k=a.URL||a.webkitURL||a,l=k.createObjectURL,m=k.revokeObjectURL,n=k,o=a.btoa,p=a.atob,q=a.ArrayBuffer,r=a.Uint8Array,s=/^[\w-]+:\/*\[?[\w\.:-]+\]?(?::[0-9]+)?/;for(d.fake=f.fake=!0;j--;)h.prototype[i[j]]=j+1;return k.createObjectURL||(n=a.URL=function(a){var c,b=document.createElementNS("http://www.w3.org/1999/xhtml","a");return b.href=a,"origin"in b||("data:"===b.protocol.toLowerCase()?b.origin=null:(c=a.match(s),b.origin=c&&c[1])),b}),n.createObjectURL=function(a){var c,b=a.type;return null===b&&(b="application/octet-stream"),a instanceof d?(c="data:"+b,"base64"===a.encoding?c+";base64,"+a.data:"URI"===a.encoding?c+","+decodeURIComponent(a.data):o?c+";base64,"+o(a.data):c+","+encodeURIComponent(a.data)):l?l.call(k,a):void 0},n.revokeObjectURL=function(a){"data:"!==a.substring(0,5)&&m&&m.call(k,a)},e.append=function(a){var c=this.data;if(r&&(a instanceof q||a instanceof r)){for(var e="",f=new r(a),i=0,j=f.length;j>i;i++)e+=String.fromCharCode(f[i]);c.push(e)}else if("Blob"===b(a)||"File"===b(a)){if(!g)throw new h("NOT_READABLE_ERR");var k=new g;c.push(k.readAsBinaryString(a))}else a instanceof d?"base64"===a.encoding&&p?c.push(p(a.data)):"URI"===a.encoding?c.push(decodeURIComponent(a.data)):"raw"===a.encoding&&c.push(a.data):("string"!=typeof a&&(a+=""),c.push(unescape(encodeURIComponent(a))))},e.getBlob=function(a){return arguments.length||(a=null),new d(this.data.join(""),a,"raw")},e.toString=function(){return"[object BlobBuilder]"},f.slice=function(a,b,c){var e=arguments.length;return 3>e&&(c=null),new d(this.data.slice(a,e>1?b:this.data.length),c,this.encoding)},f.toString=function(){return"[object Blob]"},f.close=function(){this.size=0,delete this.data},c}(a);a.Blob=function(a,b){var d=b?b.type||"":"",e=new c;if(a)for(var f=0,g=a.length;g>f;f++)e.append(a[f]);return e.getBlob(d)}}("undefined"!=typeof self&&self||"undefined"!=typeof window&&window||this.content||this);

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */
saveAs = void 0;
try{
saveAs=saveAs||"undefined"!==typeof navigator&&navigator.msSaveOrOpenBlob&&navigator.msSaveOrOpenBlob.bind(navigator)||function(a){"use strict";if("undefined"===typeof navigator||!/MSIE [1-9]\./.test(navigator.userAgent)){var k=a.document,n=k.createElementNS("http://www.w3.org/1999/xhtml","a"),w="download"in n,x=function(c){var e=k.createEvent("MouseEvents");e.initMouseEvent("click",!0,!1,a,0,0,0,0,0,!1,!1,!1,!1,0,null);c.dispatchEvent(e)},q=a.webkitRequestFileSystem,u=a.requestFileSystem||q||a.mozRequestFileSystem,
y=function(c){(a.setImmediate||a.setTimeout)(function(){throw c;},0)},r=0,s=function(c){var e=function(){"string"===typeof c?(a.URL||a.webkitURL||a).revokeObjectURL(c):c.remove()};a.chrome?e():setTimeout(e,10)},t=function(c,a,d){a=[].concat(a);for(var b=a.length;b--;){var l=c["on"+a[b]];if("function"===typeof l)try{l.call(c,d||c)}catch(f){y(f)}}},m=function(c,e){var d=this,b=c.type,l=!1,f,p,k=function(){t(d,["writestart","progress","write","writeend"])},g=function(){if(l||!f)f=(a.URL||a.webkitURL||
a).createObjectURL(c);p?p.location.href=f:void 0==a.open(f,"_blank")&&"undefined"!==typeof safari&&(a.location.href=f);d.readyState=d.DONE;k();s(f)},h=function(a){return function(){if(d.readyState!==d.DONE)return a.apply(this,arguments)}},m={create:!0,exclusive:!1},v;d.readyState=d.INIT;e||(e="download");if(w)f=(a.URL||a.webkitURL||a).createObjectURL(c),n.href=f,n.download=e,x(n),d.readyState=d.DONE,k(),s(f);else{a.chrome&&b&&"application/octet-stream"!==b&&(v=c.slice||c.webkitSlice,c=v.call(c,0,
c.size,"application/octet-stream"),l=!0);q&&"download"!==e&&(e+=".download");if("application/octet-stream"===b||q)p=a;u?(r+=c.size,u(a.TEMPORARY,r,h(function(a){a.root.getDirectory("saved",m,h(function(a){var b=function(){a.getFile(e,m,h(function(a){a.createWriter(h(function(b){b.onwriteend=function(b){p.location.href=a.toURL();d.readyState=d.DONE;t(d,"writeend",b);s(a)};b.onerror=function(){var a=b.error;a.code!==a.ABORT_ERR&&g()};["writestart","progress","write","abort"].forEach(function(a){b["on"+
a]=d["on"+a]});b.write(c);d.abort=function(){b.abort();d.readyState=d.DONE};d.readyState=d.WRITING}),g)}),g)};a.getFile(e,{create:!1},h(function(a){a.remove();b()}),h(function(a){a.code===a.NOT_FOUND_ERR?b():g()}))}),g)}),g)):g()}},b=m.prototype;b.abort=function(){this.readyState=this.DONE;t(this,"abort")};b.readyState=b.INIT=0;b.WRITING=1;b.DONE=2;b.error=b.onwritestart=b.onprogress=b.onwrite=b.onabort=b.onerror=b.onwriteend=null;return function(a,b){return new m(a,b)}}}("undefined"!==typeof self&&
self||"undefined"!==typeof window&&window||this.content);"undefined"!==typeof module&&null!==module?module.exports=saveAs:"undefined"!==typeof define&&null!==define&&null!=define.amd&&define([],function(){return saveAs});}catch(e){};

}).call(this);

if (typeof module === "undefined" || !module.exports) { // Export stuff to keep inline with Node.
	Magister = {
		Appointment: this.Appointment,
		Assignment: this.Assignment,
		AssignmentVersion: this.AssignmentVersion,
		Class: this.Class,
		Course: this.Course,
		DetailedProfileInfo: this.DetailedProfileInfo,
		DigitalSchoolUtility: this.DigitalSchoolUtility,
		File: this.File,
		FileFolder: this.FileFolder,
		Grade: this.Grade,
		GradeType: this.GradeType,
		Magister: this.Magister,
		MagisterSchool: this.MagisterSchool,
		Message: this.Message,
		MessageFolder: this.MessageFolder,
		Person: this.Person,
		ProfileInfo: this.ProfileInfo,
		StudyGuide: this.StudyGuide,
		StudyGuidePart: this.StudyGuidePart
	};
}
