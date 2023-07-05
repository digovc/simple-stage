import{i,a as p,b as w,o as y,c as S,d as m,e as v,O as u,r as _,f as I,g as k,h as g,n as x}from"./music.repository-3056144a.js";import{d as O,f as A,c as L,a as h,h as T}from"./index-bfed1039.js";function U(e){return i(e==null?void 0:e.lift)}function E(e){return function(t){if(U(t))return t.lift(function(r){try{return e(r,this)}catch(n){this.error(n)}});throw new TypeError("Unable to lift unknown Observable type")}}function R(e,t,r,n,o){return new F(e,t,r,n,o)}var F=function(e){p(t,e);function t(r,n,o,s,c,l){var a=e.call(this,r)||this;return a.onFinalize=c,a.shouldUnsubscribe=l,a._next=n?function(f){try{n(f)}catch(d){r.error(d)}}:e.prototype._next,a._error=s?function(f){try{s(f)}catch(d){r.error(d)}finally{this.unsubscribe()}}:e.prototype._error,a._complete=o?function(){try{o()}catch(f){r.error(f)}finally{this.unsubscribe()}}:e.prototype._complete,a}return t.prototype.unsubscribe=function(){var r;if(!this.shouldUnsubscribe||this.shouldUnsubscribe()){var n=this.closed;e.prototype.unsubscribe.call(this),!n&&((r=this.onFinalize)===null||r===void 0||r.call(this))}},t}(w),P=function(e){return e&&typeof e.length=="number"&&typeof e!="function"};function z(e){return i(e==null?void 0:e.then)}function B(e){return i(e[y])}function C(e){return Symbol.asyncIterator&&i(e==null?void 0:e[Symbol.asyncIterator])}function G(e){return new TypeError("You provided "+(e!==null&&typeof e=="object"?"an invalid object":"'"+e+"'")+" where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.")}function V(){return typeof Symbol!="function"||!Symbol.iterator?"@@iterator":Symbol.iterator}var Y=V();function $(e){return i(e==null?void 0:e[Y])}function D(e){return S(this,arguments,function(){var r,n,o,s;return m(this,function(c){switch(c.label){case 0:r=e.getReader(),c.label=1;case 1:c.trys.push([1,,9,10]),c.label=2;case 2:return[4,v(r.read())];case 3:return n=c.sent(),o=n.value,s=n.done,s?[4,v(void 0)]:[3,5];case 4:return[2,c.sent()];case 5:return[4,v(o)];case 6:return[4,c.sent()];case 7:return c.sent(),[3,2];case 8:return[3,10];case 9:return r.releaseLock(),[7];case 10:return[2]}})})}function q(e){return i(e==null?void 0:e.getReader)}function H(e){if(e instanceof u)return e;if(e!=null){if(B(e))return J(e);if(P(e))return K(e);if(z(e))return M(e);if(C(e))return b(e);if($(e))return N(e);if(q(e))return Q(e)}throw G(e)}function J(e){return new u(function(t){var r=e[y]();if(i(r.subscribe))return r.subscribe(t);throw new TypeError("Provided object does not correctly implement Symbol.observable")})}function K(e){return new u(function(t){for(var r=0;r<e.length&&!t.closed;r++)t.next(e[r]);t.complete()})}function M(e){return new u(function(t){e.then(function(r){t.closed||(t.next(r),t.complete())},function(r){return t.error(r)}).then(null,_)})}function N(e){return new u(function(t){var r,n;try{for(var o=I(e),s=o.next();!s.done;s=o.next()){var c=s.value;if(t.next(c),t.closed)return}}catch(l){r={error:l}}finally{try{s&&!s.done&&(n=o.return)&&n.call(o)}finally{if(r)throw r.error}}t.complete()})}function b(e){return new u(function(t){W(e,t).catch(function(r){return t.error(r)})})}function Q(e){return b(D(e))}function W(e,t){var r,n,o,s;return k(this,void 0,void 0,function(){var c,l;return m(this,function(a){switch(a.label){case 0:a.trys.push([0,5,6,11]),r=g(e),a.label=1;case 1:return[4,r.next()];case 2:if(n=a.sent(),!!n.done)return[3,4];if(c=n.value,t.next(c),t.closed)return[2];a.label=3;case 3:return[3,1];case 4:return[3,11];case 5:return l=a.sent(),o={error:l},[3,11];case 6:return a.trys.push([6,,9,10]),n&&!n.done&&(s=r.return)?[4,s.call(r)]:[3,8];case 7:a.sent(),a.label=8;case 8:return[3,10];case 9:if(o)throw o.error;return[7];case 10:return[7];case 11:return t.complete(),[2]}})})}function te(e){return E(function(t,r){H(e).subscribe(R(r,function(){return r.complete()},x)),!r.closed&&t.subscribe(r)})}const X={class:"fixed inset-0"},Z={class:"flex place-content-center place-items-center h-full"},j={class:"rounded bg-white z-10 p-4"},ne=O({__name:"Dialog",emits:{onClose:()=>!0},setup(e,{emit:t}){return(r,n)=>(A(),L("div",X,[h("div",{class:"absolute inset-0 bg-black opacity-20",onClick:n[0]||(n[0]=o=>t("onClose"))}),h("div",Z,[h("div",j,[T(r.$slots,"default")])])]))}});export{ne as _,te as t};
