function e(e,n,s,t){Object.defineProperty(e,n,{get:s,set:t,enumerable:!0,configurable:!0})}var n="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s={},t={},r=n.parcelRequired7c6;null==r&&((r=function(e){if(e in s)return s[e].exports;if(e in t){var n=t[e];delete t[e];var r={id:e,exports:{}};return s[e]=r,n.call(r.exports,r,r.exports),r.exports}var a=new Error("Cannot find module '"+e+"'");throw a.code="MODULE_NOT_FOUND",a}).register=function(e,n){t[e]=n},n.parcelRequired7c6=r),r.register("kyEFX",(function(n,s){var t,r;e(n.exports,"register",(function(){return t}),(function(e){return t=e})),e(n.exports,"resolve",(function(){return r}),(function(e){return r=e}));var a={};t=function(e){for(var n=Object.keys(e),s=0;s<n.length;s++)a[n[s]]=e[n[s]]},r=function(e){var n=a[e];if(null==n)throw new Error("Could not resolve bundle with id "+e);return n}})),r("kyEFX").register(JSON.parse('{"jewIc":"read.ceba279f.js","8OQ7p":"icons.ded6028e.svg","jTqm9":"read.65a11dd0.js"}')),r("bUb57"),r("4QsFx"),r("8FnLx");const a={readNewsGallery:document.querySelector(".news-gallery")};var i;i=new URL(r("kyEFX").resolve("8OQ7p"),import.meta.url).toString();const o=new URL(i),l=JSON.parse(localStorage.getItem("add-read-more"));function c({currentTarget:e}){e.classList.toggle("isOpen")}function d(e){return`<li class="news__item">\n    <div class="news__images-container">\n      <a class="news__link" target="_blank" href="${e.url}"\n        ><img class="news__foto" src="${e.foto}" alt=""\n      /></a>\n  \n      <div class="news__category">\n        <div class="news__category-text">${e.section}</div>\n      </div>\n  \n      <div class="news__favorite">\n        <button class="news__favorite-button">\n          <span class="news-box-content">Add to favorite</span>\n          <svg class="news__favorite-icon" width="16" height="16">\n            <use href="${o}#icon-Vector"></use>\n          </svg>\n        </button>\n      </div>\n    </div>\n  \n    <h2 class="news__title">${e.title}</h2>\n  \n    <div class="box">\n      <p class="news__abstruct">${e.abstract}</p>\n  \n      <div class="news-card--position">\n        <div class="news__data">${e.publishDate}</div>\n        <div class="news__read-more">\n          <a class="news__link" target="_blank" href="${e.url}">Read more</a>\n        </div>\n      </div>\n    </div>\n  \n  <div class="news-box--overlay">\n      <span class="news-box-text"> Already read \n      <svg class="news__favorite-icon" width="16" height="16">\n            <use href="${o}#icon-icons8--1"></use>\n          </svg>\n      </span>\n    </div>\n  </li>\n  `}!function(){const e=function(){let e="";const n=l.map((({date:e})=>e)),s=n.filter((e=>void 0!==e)).filter(((e,n,s)=>s.indexOf(e)===n)).sort(((e,n)=>n.localeCompare(e)));for(let n=0;n<s.length;n+=1){const t=l.filter((e=>e.date===s[n])).map((e=>d(e))).join("");e+=`<div class="read-news__list">\n      <button class="read-news__btn js-read-news-btn">\n        <span>${s[n]}</span>\n        <svg><use href="${o}#icon-arrow-down" width="14" height="14"></use></svg>\n      </button>\n      <ul class="news__list">\n      ${t}\n      </ul>\n    </div>`}return e}();a.readNewsGallery.innerHTML=e}(),document.querySelectorAll(".js-read-news-btn").forEach((e=>e.addEventListener("click",c))),r("iyLi5");
//# sourceMappingURL=read.ceba279f.js.map