!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.querySelector("body");t.addEventListener("click",(function(){console.log("hi"),t.disabled=!0,o=setInterval((function(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}),1e3)})),e.addEventListener("click",(function(){clearInterval(o),t.disabled=!1}));var o=null}();
//# sourceMappingURL=01-color-switcher.de438975.js.map