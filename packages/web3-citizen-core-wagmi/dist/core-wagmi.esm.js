import { utils } from 'ethers';
import React__default, { createElement, useState, useEffect } from 'react';
import classNames from 'classnames';
import { useContractRead, useContractWrite, useContract, useSigner, useAccount, useProvider } from 'wagmi';
import CitizenAlpha from '@web3-citizen/core-sol/abis/contracts/CitizenAlpha.sol/CitizenAlpha.json';
import { Address } from '@turbo-eth/core-wagmi';
import { useForm } from 'react-hook-form';
import { useResolverContract, useResolverContractWrite, parseAvatarString } from '@turbo-eth/ens-wagmi';
import Notary from '@web3-citizen/core-sol/abis/contracts/Notary/Notary.sol/Notary.json';
import Nation from '@web3-citizen/core-sol/abis/contracts/Nation/Nation.sol/Nation.json';
import NotaryServiceDelegatable from '@web3-citizen/core-sol/abis/contracts/Notary/NotaryServiceDelegatable.sol/NotaryServiceDelegatable.json';
import TrustToken from '@web3-citizen/core-sol/abis/contracts/experiments/TrustToken.sol/TrustToken.json';

function styleInject(css, ref) {
  if (ref === void 0) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') {
    return;
  }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = "/*  */\n/*  ! tailwindcss v3.1.6 | MIT License | https://tailwindcss.com*/\n/*\n1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)\n2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)\n*/\n*,\n::before,\n::after {\n  box-sizing: border-box; /* 1 */\n  border-width: 0; /* 2 */\n  border-style: solid; /* 2 */\n  border-color: #e5e7eb; /* 2 */\n}\n::before,\n::after {\n  --tw-content: '';\n}\n/*\n1. Use a consistent sensible line-height in all browsers.\n2. Prevent adjustments of font size after orientation changes in iOS.\n3. Use a more readable tab size.\n4. Use the user's configured `sans` font-family by default.\n*/\nhtml {\n  line-height: 1.5; /* 1 */\n  -webkit-text-size-adjust: 100%; /* 2 */\n  -moz-tab-size: 4; /* 3 */\n  -o-tab-size: 4;\n     tab-size: 4; /* 3 */\n  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, \"Noto Sans\", sans-serif, \"Apple Color Emoji\", \"Segoe UI Emoji\", \"Segoe UI Symbol\", \"Noto Color Emoji\"; /* 4 */\n}\n/*\n1. Remove the margin in all browsers.\n2. Inherit line-height from `html` so users can set them as a class directly on the `html` element.\n*/\nbody {\n  margin: 0; /* 1 */\n  line-height: inherit; /* 2 */\n}\n/*\n1. Add the correct height in Firefox.\n2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)\n3. Ensure horizontal rules are visible by default.\n*/\nhr {\n  height: 0; /* 1 */\n  color: inherit; /* 2 */\n  border-top-width: 1px; /* 3 */\n}\n/*\nAdd the correct text decoration in Chrome, Edge, and Safari.\n*/\nabbr:where([title]) {\n  -webkit-text-decoration: underline dotted;\n          text-decoration: underline dotted;\n}\n/*\nRemove the default font size and weight for headings.\n*/\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n  font-size: inherit;\n  font-weight: inherit;\n}\n/*\nReset links to optimize for opt-in styling instead of opt-out.\n*/\na {\n  color: inherit;\n  text-decoration: inherit;\n}\n/*\nAdd the correct font weight in Edge and Safari.\n*/\nb,\nstrong {\n  font-weight: bolder;\n}\n/*\n1. Use the user's configured `mono` font family by default.\n2. Correct the odd `em` font sizing in all browsers.\n*/\ncode,\nkbd,\nsamp,\npre {\n  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n/*\nAdd the correct font size in all browsers.\n*/\nsmall {\n  font-size: 80%;\n}\n/*\nPrevent `sub` and `sup` elements from affecting the line height in all browsers.\n*/\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\nsub {\n  bottom: -0.25em;\n}\nsup {\n  top: -0.5em;\n}\n/*\n1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)\n2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)\n3. Remove gaps between table borders by default.\n*/\ntable {\n  text-indent: 0; /* 1 */\n  border-color: inherit; /* 2 */\n  border-collapse: collapse; /* 3 */\n}\n/*\n1. Change the font styles in all browsers.\n2. Remove the margin in Firefox and Safari.\n3. Remove default padding in all browsers.\n*/\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: inherit; /* 1 */\n  font-size: 100%; /* 1 */\n  font-weight: inherit; /* 1 */\n  line-height: inherit; /* 1 */\n  color: inherit; /* 1 */\n  margin: 0; /* 2 */\n  padding: 0; /* 3 */\n}\n/*\nRemove the inheritance of text transform in Edge and Firefox.\n*/\nbutton,\nselect {\n  text-transform: none;\n}\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Remove default button styles.\n*/\nbutton,\n[type='button'],\n[type='reset'],\n[type='submit'] {\n  -webkit-appearance: button; /* 1 */\n  background-color: transparent; /* 2 */\n  background-image: none; /* 2 */\n}\n/*\nUse the modern Firefox focus style for all focusable elements.\n*/\n:-moz-focusring {\n  outline: auto;\n}\n/*\nRemove the additional `:invalid` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)\n*/\n:-moz-ui-invalid {\n  box-shadow: none;\n}\n/*\nAdd the correct vertical alignment in Chrome and Firefox.\n*/\nprogress {\n  vertical-align: baseline;\n}\n/*\nCorrect the cursor style of increment and decrement buttons in Safari.\n*/\n::-webkit-inner-spin-button,\n::-webkit-outer-spin-button {\n  height: auto;\n}\n/*\n1. Correct the odd appearance in Chrome and Safari.\n2. Correct the outline style in Safari.\n*/\n[type='search'] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n/*\nRemove the inner padding in Chrome and Safari on macOS.\n*/\n::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n/*\n1. Correct the inability to style clickable types in iOS and Safari.\n2. Change font properties to `inherit` in Safari.\n*/\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n/*\nAdd the correct display in Chrome and Safari.\n*/\nsummary {\n  display: list-item;\n}\n/*\nRemoves the default spacing and border for appropriate elements.\n*/\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhr,\nfigure,\np,\npre {\n  margin: 0;\n}\nfieldset {\n  margin: 0;\n  padding: 0;\n}\nlegend {\n  padding: 0;\n}\nol,\nul,\nmenu {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n/*\nPrevent resizing textareas horizontally by default.\n*/\ntextarea {\n  resize: vertical;\n}\n/*\n1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)\n2. Set the default placeholder color to the user's configured gray 400 color.\n*/\ninput::-moz-placeholder, textarea::-moz-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\ninput:-ms-input-placeholder, textarea:-ms-input-placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\ninput::placeholder,\ntextarea::placeholder {\n  opacity: 1; /* 1 */\n  color: #9ca3af; /* 2 */\n}\n/*\nSet the default cursor for buttons.\n*/\nbutton,\n[role=\"button\"] {\n  cursor: pointer;\n}\n/*\nMake sure disabled buttons don't get the pointer cursor.\n*/\n:disabled {\n  cursor: default;\n}\n/*\n1. Make replaced elements `display: block` by default. (https://github.com/mozdevs/cssremedy/issues/14)\n2. Add `vertical-align: middle` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)\n   This can trigger a poorly considered lint error in some tools but is included by design.\n*/\nimg,\nsvg,\nvideo,\ncanvas,\naudio,\niframe,\nembed,\nobject {\n  display: block; /* 1 */\n  vertical-align: middle; /* 2 */\n}\n/*\nConstrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)\n*/\nimg,\nvideo {\n  max-width: 100%;\n  height: auto;\n}\n*, ::before, ::after {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n::-webkit-backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n::backdrop {\n  --tw-border-spacing-x: 0;\n  --tw-border-spacing-y: 0;\n  --tw-translate-x: 0;\n  --tw-translate-y: 0;\n  --tw-rotate: 0;\n  --tw-skew-x: 0;\n  --tw-skew-y: 0;\n  --tw-scale-x: 1;\n  --tw-scale-y: 1;\n  --tw-pan-x:  ;\n  --tw-pan-y:  ;\n  --tw-pinch-zoom:  ;\n  --tw-scroll-snap-strictness: proximity;\n  --tw-ordinal:  ;\n  --tw-slashed-zero:  ;\n  --tw-numeric-figure:  ;\n  --tw-numeric-spacing:  ;\n  --tw-numeric-fraction:  ;\n  --tw-ring-inset:  ;\n  --tw-ring-offset-width: 0px;\n  --tw-ring-offset-color: #fff;\n  --tw-ring-color: rgb(59 130 246 / 0.5);\n  --tw-ring-offset-shadow: 0 0 #0000;\n  --tw-ring-shadow: 0 0 #0000;\n  --tw-shadow: 0 0 #0000;\n  --tw-shadow-colored: 0 0 #0000;\n  --tw-blur:  ;\n  --tw-brightness:  ;\n  --tw-contrast:  ;\n  --tw-grayscale:  ;\n  --tw-hue-rotate:  ;\n  --tw-invert:  ;\n  --tw-saturate:  ;\n  --tw-sepia:  ;\n  --tw-drop-shadow:  ;\n  --tw-backdrop-blur:  ;\n  --tw-backdrop-brightness:  ;\n  --tw-backdrop-contrast:  ;\n  --tw-backdrop-grayscale:  ;\n  --tw-backdrop-hue-rotate:  ;\n  --tw-backdrop-invert:  ;\n  --tw-backdrop-opacity:  ;\n  --tw-backdrop-saturate:  ;\n  --tw-backdrop-sepia:  ;\n}\n.col-span-8 {\n  grid-column: span 8 / span 8;\n}\n.col-span-4 {\n  grid-column: span 4 / span 4;\n}\n.my-3 {\n  margin-top: 0.75rem;\n  margin-bottom: 0.75rem;\n}\n.my-6 {\n  margin-top: 1.5rem;\n  margin-bottom: 1.5rem;\n}\n.my-2 {\n  margin-top: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n.mt-2 {\n  margin-top: 0.5rem;\n}\n.mb-4 {\n  margin-bottom: 1rem;\n}\n.mt-6 {\n  margin-top: 1.5rem;\n}\n.mt-4 {\n  margin-top: 1rem;\n}\n.mt-3 {\n  margin-top: 0.75rem;\n}\n.block {\n  display: block;\n}\n.inline-block {\n  display: inline-block;\n}\n.flex {\n  display: flex;\n}\n.grid {\n  display: grid;\n}\n.w-full {\n  width: 100%;\n}\n.grid-cols-12 {\n  grid-template-columns: repeat(12, minmax(0, 1fr));\n}\n.items-center {\n  align-items: center;\n}\n.justify-center {\n  justify-content: center;\n}\n.gap-x-4 {\n  -moz-column-gap: 1rem;\n       column-gap: 1rem;\n}\n.self-stretch {\n  align-self: stretch;\n}\n.truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.break-all {\n  word-break: break-all;\n}\n.rounded-md {\n  border-radius: 0.375rem;\n}\n.rounded-r-lg {\n  border-top-right-radius: 0.5rem;\n  border-bottom-right-radius: 0.5rem;\n}\n.bg-neutral-300 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(212 212 212 / var(--tw-bg-opacity));\n}\n.bg-slate-700 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n}\n.bg-slate-800 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(30 41 59 / var(--tw-bg-opacity));\n}\n.bg-neutral-900 {\n  --tw-bg-opacity: 1;\n  background-color: rgb(23 23 23 / var(--tw-bg-opacity));\n}\n.p-2 {\n  padding: 0.5rem;\n}\n.px-4 {\n  padding-left: 1rem;\n  padding-right: 1rem;\n}\n.text-sm {\n  font-size: 0.875rem;\n  line-height: 1.25rem;\n}\n.text-xl {\n  font-size: 1.25rem;\n  line-height: 1.75rem;\n}\n.font-semibold {\n  font-weight: 600;\n}\n.font-normal {\n  font-weight: 400;\n}\n.font-bold {\n  font-weight: 700;\n}\n.text-white {\n  --tw-text-opacity: 1;\n  color: rgb(255 255 255 / var(--tw-text-opacity));\n}\n.opacity-5 {\n  opacity: 0.05;\n}\n\n.btn {\n  border-radius: 0.375rem;\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  padding-left: 1rem;\n  padding-right: 1rem;\n  font-weight: 600;\n  transition-duration: 200ms;\n}\n\n.btn:focus {\n  outline: 2px solid transparent;\n  outline-offset: 2px;\n  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);\n  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);\n  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);\n  --tw-ring-opacity: 0.75;\n}\n\n.btn-default {\n  border-width: 0px;\n  --tw-border-opacity: 1;\n  border-color: rgb(250 250 250 / var(--tw-border-opacity));\n  --tw-bg-opacity: 1;\n  background-color: rgb(250 250 250 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(75 85 99 / var(--tw-text-opacity));\n  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n  transition-duration: 100ms;\n}\n\n.btn-default:hover {\n  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);\n  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);\n}\n\n@media (prefers-color-scheme: dark) {\n  .btn-default {\n    --tw-bg-opacity: 1;\n    background-color: rgb(51 65 85 / var(--tw-bg-opacity));\n    --tw-text-opacity: 1;\n    color: rgb(255 255 255 / var(--tw-text-opacity));\n  }\n  .btn-default:hover {\n    --tw-bg-opacity: 1;\n    background-color: rgb(30 41 59 / var(--tw-bg-opacity));\n  }\n}\n\n.btn-white {\n  --tw-bg-opacity: 1;\n  background-color: rgb(255 255 255 / var(--tw-bg-opacity));\n  --tw-text-opacity: 1;\n  color: rgb(75 85 99 / var(--tw-text-opacity));\n}\n\n.btn-white:hover {\n  --tw-bg-opacity: 1;\n  background-color: rgb(249 250 251 / var(--tw-bg-opacity));\n}\n\n.btn-white:focus {\n  --tw-ring-opacity: 1;\n  --tw-ring-color: rgb(156 163 175 / var(--tw-ring-opacity));\n}\n\n@media (prefers-color-scheme: dark) {\n  .dark\\:bg-slate-800 {\n    --tw-bg-opacity: 1;\n    background-color: rgb(30 41 59 / var(--tw-bg-opacity));\n  }\n  .dark\\:text-neutral-100 {\n    --tw-text-opacity: 1;\n    color: rgb(245 245 245 / var(--tw-text-opacity));\n  }\n}\n";
styleInject(css_248z);

var _reverseLookup;
var NOTARY = /*#__PURE__*/utils.keccak256( /*#__PURE__*/utils.toUtf8Bytes('NOTARY'));
var FOUNDER = /*#__PURE__*/utils.keccak256( /*#__PURE__*/utils.toUtf8Bytes('FOUNDER'));
var TREASURY = /*#__PURE__*/utils.keccak256( /*#__PURE__*/utils.toUtf8Bytes('TREASURY'));
var LABS = /*#__PURE__*/utils.keccak256( /*#__PURE__*/utils.toUtf8Bytes('LABS'));
var lookup = {
  NOTARY: NOTARY,
  FOUNDER: FOUNDER,
  TREASURY: TREASURY,
  LABS: LABS
};
var reverseLookup = (_reverseLookup = {
  '0x0000000000000000000000000000000000000000000000000000000000000000': 'ADMIN'
}, _reverseLookup[NOTARY] = 'NOTARY', _reverseLookup[FOUNDER] = 'FOUNDER', _reverseLookup[TREASURY] = 'TREASURY', _reverseLookup[LABS] = 'LABS', _reverseLookup);
var constants = {
  NOTARY: NOTARY,
  FOUNDER: FOUNDER
};

function useCitizenAlphaRead(address, method, args) {
  return useContractRead({
    addressOrName: address,
    contractInterface: CitizenAlpha
  }, method, {
    args: args
  });
}

var CitizenLink = function CitizenLink(_ref) {
  var className = _ref.className,
      contractAddress = _ref.contractAddress,
      address = _ref.address;
  var classes = classNames(className, 'CitizenLink');

  var _useCitizenAlphaContr = useCitizenAlphaRead(contractAddress, 'getLink', [address]),
      data = _useCitizenAlphaContr.data,
      isError = _useCitizenAlphaContr.isError,
      isLoading = _useCitizenAlphaContr.isLoading;

  if (isError || isLoading) return null;
  return createElement(Address, {
    className: classes,
    address: data,
    truncate: true
  });
};

function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) keys.push(key);

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };
  return _extends.apply(this, arguments);
}

function _objectDestructuringEmpty(obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
}

var InputWithLabel = function InputWithLabel(_ref) {
  var className = _ref.className,
      name = _ref.name,
      label = _ref.label,
      register = _ref.register,
      _ref$required = _ref.required,
      required = _ref$required === void 0 ? false : _ref$required,
      placeholder = _ref.placeholder,
      type = _ref.type;
  var containerClassName = classNames(className, 'InputWithLabel');
  return createElement("div", {
    className: containerClassName
  }, createElement("label", null, createElement("span", {
    className: "text-sm font-semibold"
  }, label)), createElement("input", Object.assign({
    className: "input",
    type: type,
    placeholder: placeholder
  }, register(name, {
    required: required
  }))));
};

var FormCitizenEnsUpdate = function FormCitizenEnsUpdate(_ref) {
  var _ref2;

  var className = _ref.className,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress,
      ensNode = _ref.ensNode,
      _ref$defaultValues = _ref.defaultValues,
      defaultValues = _ref$defaultValues === void 0 ? (_ref2 = {
    url: '',
    description: '',
    did: ''
  }, _ref2['com.twitter'] = '', _ref2['com.github'] = '', _ref2) : _ref$defaultValues;
  var styleForm = classNames(className, 'FormCitizenEnsUpdate');

  var _useForm = useForm({
    defaultValues: defaultValues
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();
  var contractResolver = useResolverContract(contractAddress);

  var _React$useState = useState(),
      inputs = _React$useState[0],
      setInputs = _React$useState[1];

  var _useResolverContractW = useResolverContractWrite(contractAddress, 'multicall', [inputs]),
      write = _useResolverContractW.write;

  var onSubmit = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(_data) {
      var url_, avatar_, did_, description_;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return contractResolver.populateTransaction.setText(ensNode, 'url', watchAllFields.description);

            case 2:
              url_ = _context.sent;
              _context.next = 5;
              return contractResolver.populateTransaction.setText(ensNode, 'avatar', watchAllFields.description);

            case 5:
              avatar_ = _context.sent;
              _context.next = 8;
              return contractResolver.populateTransaction.setText(ensNode, 'did', watchAllFields.description);

            case 8:
              did_ = _context.sent;
              _context.next = 11;
              return contractResolver.populateTransaction.setText(ensNode, 'description', watchAllFields.description);

            case 11:
              description_ = _context.sent;
              setInputs([url_.data, avatar_.data, did_.data, description_.data]);
              if (onUpdate) onUpdate(_data);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function onSubmit(_x) {
      return _ref3.apply(this, arguments);
    };
  }();

  useEffect(function () {
    if (inputs) {
      write();
    }
  }, [inputs]);
  return createElement("div", {
    className: styleForm
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: "mb-4"
  }, createElement(InputWithLabel, {
    name: "url",
    label: "URL",
    placeholder: "www.site.me",
    register: register
  }), createElement(InputWithLabel, {
    name: "avatar",
    label: "Avatar",
    placeholder: "ipfs://",
    register: register
  }), createElement(InputWithLabel, {
    name: "did",
    label: "Decentralized Identifier (DID)",
    placeholder: "did:eth:0x000...000",
    register: register
  }), createElement(InputWithLabel, {
    name: "description",
    label: "Description",
    placeholder: "I am...",
    register: register
  }), createElement(InputWithLabel, {
    name: "com.twitter",
    label: "Twitter",
    placeholder: "",
    register: register
  }), createElement(InputWithLabel, {
    name: "com.github",
    label: "Github",
    placeholder: "",
    register: register
  }), createElement(InputWithLabel, {
    name: "notice",
    label: "Notice",
    placeholder: "",
    register: register
  })), createElement("button", {
    className: "btn btn-blue btn-sm w-full mt-6",
    type: "submit"
  }, "Update")));
};

function useNotaryWrite(address, method, args) {
  return useContractWrite({
    addressOrName: address,
    contractInterface: Notary
  }, method, {
    args: args
  });
}

function useLogError(error) {
  useEffect(function () {// console.log(error);
  }, [error]);
}

function useLogTransactionWrite(data) {
  useEffect(function () {// console.log(data);
  }, [data]);
}

var FormCitizenIssue = function FormCitizenIssue(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var styleForm = classNames(className, 'FormCitizenIssue');

  var _useForm = useForm({
    defaultValues: {
      to: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNotaryWrite = useNotaryWrite(contractAddress, 'issue', [watchAllFields == null ? void 0 : watchAllFields.to]),
      write = _useNotaryWrite.write,
      error = _useNotaryWrite.error;

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  useLogError(error);
  return createElement("div", {
    className: styleForm
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: "mt-4"
  }, createElement(InputWithLabel, {
    name: "to",
    label: "Citizen",
    placeholder: "vitalik.eth",
    register: register
  })), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
FormCitizenIssue.defaultProps = {
  label: 'Issue Citizenship'
};

function useNationWrite(address, method, args) {
  return useContractWrite({
    addressOrName: address,
    contractInterface: Nation
  }, method, {
    args: args
  });
}

var FormCitizenRevoke = function FormCitizenRevoke(_ref) {
  var className = _ref.className,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var styleForm = classNames(className, 'FormCitizenRevoke');

  var _useForm = useForm({
    defaultValues: {
      from: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNationWrite = useNationWrite(contractAddress, 'revoke', [watchAllFields == null ? void 0 : watchAllFields.from]),
      write = _useNationWrite.write;

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: styleForm
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: "mt-4"
  }, createElement(InputWithLabel, {
    name: "from",
    label: "Citizen",
    placeholder: "vitalik.eth",
    register: register
  })), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, "Revoke Citizenship")));
};

var NationFormDisableRole = function NationFormDisableRole(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NationFormDisableRole');

  var _useForm = useForm({
    defaultValues: {
      role: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNationWrite = useNationWrite(contractAddress, 'disableRole', [utils.keccak256(utils.toUtf8Bytes(watchAllFields.role))]),
      write = _useNationWrite.write,
      error = _useNationWrite.error,
      data = _useNationWrite.data;

  useLogError(error);
  useLogTransactionWrite(data);

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("label", {
    className: "label my-2 block"
  }, "Role"), createElement("input", Object.assign({
    className: "input",
    placeholder: "LABS"
  }, register('role', {
    required: true
  }))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
NationFormDisableRole.defaultProps = {
  label: 'Disable Role'
};

var NationFormEnableRole = function NationFormEnableRole(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NationFormEnableRole');

  var _useForm = useForm({
    defaultValues: {
      role: '',
      adminRole: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNationWrite = useNationWrite(contractAddress, 'enableRole', [utils.keccak256(utils.toUtf8Bytes(watchAllFields.role)), utils.keccak256(utils.toUtf8Bytes(watchAllFields.adminRole))]),
      write = _useNationWrite.write,
      error = _useNationWrite.error,
      data = _useNationWrite.data;

  useLogError(error);
  useLogTransactionWrite(data);

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("label", {
    className: "label my-2 block"
  }, "Role"), createElement("input", Object.assign({
    className: "input",
    placeholder: "TREASURY"
  }, register('role', {
    required: true
  }))), createElement("label", {
    className: "label my-2 block"
  }, "Admin Role"), createElement("input", Object.assign({
    className: "input",
    placeholder: "FOUNDER"
  }, register('adminRole', {
    required: true
  }))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
NationFormEnableRole.defaultProps = {
  label: 'Enable Role'
};

var InputWithSideLabel = function InputWithSideLabel(_ref) {
  var className = _ref.className,
      name = _ref.name,
      label = _ref.label,
      register = _ref.register,
      _ref$required = _ref.required,
      required = _ref$required === void 0 ? false : _ref$required,
      placeholder = _ref.placeholder,
      type = _ref.type;
  var containerClassName = classNames(className, 'InputWithSideLabel flex items-center justify-center');
  return createElement("div", {
    className: containerClassName
  }, createElement("input", Object.assign({
    className: "input col-span-8",
    type: type,
    placeholder: placeholder
  }, register(name, {
    required: required
  }))), createElement("label", {
    className: "bg-neutral-300 px-4 rounded-r-lg text-white dark:text-neutral-100 dark:bg-slate-800 self-stretch flex items-center justify-center"
  }, createElement("span", {
    className: "text-sm font-semibold p-2"
  }, label)));
};

var NationFormHasRole = function NationFormHasRole(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NationFormHasRole');

  var _useForm = useForm({
    defaultValues: {
      citizen: '',
      role: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNationWrite = useNationWrite(contractAddress, 'hasRole', [utils.keccak256(utils.toUtf8Bytes(watchAllFields.role)), watchAllFields == null ? void 0 : watchAllFields.citizen]),
      write = _useNationWrite.write,
      error = _useNationWrite.error,
      data = _useNationWrite.data;

  useLogError(error);

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: "grid grid-cols-12 gap-x-4 w-full"
  }, createElement("div", {
    className: "col-span-8"
  }, createElement(InputWithSideLabel, {
    name: "role",
    placeholder: "FOUNDER",
    label: "Role",
    register: register
  }), createElement(InputWithSideLabel, {
    name: "citizen",
    className: "mt-3",
    placeholder: "vitalik.eth",
    label: "Citizen",
    register: register
  })), createElement("div", {
    className: "col-span-4 bg-slate-700 rounded-md text-white flex items-center justify-center p-2"
  }, createElement("span", {
    className: ""
  }, createElement("span", {
    className: "font-semibold"
  }, "Status:"), ' ', data ? 'Yes' : 'No'))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
NationFormHasRole.defaultProps = {
  label: 'Check Status'
};

var NationFormRoleGrant = function NationFormRoleGrant(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NationFormRoleGrant');

  var _useForm = useForm({
    defaultValues: {
      citizen: '',
      role: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNationWrite = useNationWrite(contractAddress, 'grantRole', [utils.keccak256(utils.toUtf8Bytes(watchAllFields.role)), watchAllFields.citizen]),
      write = _useNationWrite.write,
      error = _useNationWrite.error,
      data = _useNationWrite.data;

  useLogError(error);
  useLogTransactionWrite(data);

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("input", Object.assign({
    className: "input",
    placeholder: "Nation"
  }, register('role', {
    required: true
  }))), createElement("input", Object.assign({
    className: "input mt-2",
    placeholder: "web3oftrust.eth"
  }, register('citizen', {
    required: true
  }))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
NationFormRoleGrant.defaultProps = {
  label: 'Grant Role'
};

var NationFormRoleRevoke = function NationFormRoleRevoke(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NationFormRoleRevoke');

  var _useForm = useForm({
    defaultValues: {
      citizen: '',
      role: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNationWrite = useNationWrite(contractAddress, 'revokeRole', [utils.keccak256(utils.toUtf8Bytes(watchAllFields.role)), watchAllFields.citizen]),
      write = _useNationWrite.write,
      error = _useNationWrite.error,
      data = _useNationWrite.data;

  useLogError(error);
  useLogTransactionWrite(data);

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("input", Object.assign({
    className: "input",
    placeholder: "Nation"
  }, register('role', {
    required: true
  }))), createElement("input", Object.assign({
    className: "input mt-2",
    placeholder: "web3oftrust.eth"
  }, register('citizen', {
    required: true
  }))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
NationFormRoleRevoke.defaultProps = {
  label: 'Revoke Role'
};

function useNationRead(address, method, args) {
  return useContractRead({
    addressOrName: address,
    contractInterface: Nation
  }, method, {
    args: args
  });
}

var NationRoleAdminRole = function NationRoleAdminRole(_ref) {
  var className = _ref.className,
      contractAddress = _ref.contractAddress,
      role = _ref.role,
      classNameLabel = _ref.classNameLabel,
      label = _ref.label,
      labelActive = _ref.labelActive;
  var classes_ = classNames(className, 'NationRoleAdminRole');

  var _useNationRead = useNationRead(contractAddress || '', 'getRoleAdmin', [utils.keccak256(utils.toUtf8Bytes(role))]),
      data = _useNationRead.data,
      isError = _useNationRead.isError,
      error = _useNationRead.error;

  useLogError(error);

  var _useState = useState(''),
      roleReverseLookup = _useState[0],
      setRoleReverseLookup = _useState[1];

  useEffect(function () {
    // @ts-ignore
    setRoleReverseLookup(reverseLookup[data || '']);
  }, [data]);
  if (isError) return null;
  return React__default.createElement("span", {
    className: classes_
  }, React__default.createElement("span", {
    className: ""
  }, labelActive && React__default.createElement("span", {
    className: classNameLabel
  }, label), React__default.createElement("span", {
    className: ""
  }, roleReverseLookup)));
};
NationRoleAdminRole.defaultProps = {
  labelActive: false,
  label: 'AdminRole: '
};

var NationFormIsFounder = function NationFormIsFounder(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NationFormIsFounder');

  var _useForm = useForm({
    defaultValues: {
      citizen: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNationWrite = useNationWrite(contractAddress, 'hasRole', [FOUNDER, watchAllFields == null ? void 0 : watchAllFields.citizen]),
      write = _useNationWrite.write,
      error = _useNationWrite.error,
      data = _useNationWrite.data;

  useLogError(error);

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: "grid grid-cols-12 gap-x-4 w-full"
  }, createElement("div", {
    className: "col-span-8"
  }, createElement(InputWithSideLabel, {
    name: "citizen",
    placeholder: "vitalik.eth",
    label: "Citizen",
    register: register
  })), createElement("div", {
    className: "col-span-4 bg-slate-800 rounded-md text-white flex items-center justify-center p-2"
  }, createElement("span", {
    className: ""
  }, createElement("span", {
    className: "font-semibold"
  }, "Status:"), ' ', data ? 'Yes' : 'No'))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
NationFormIsFounder.defaultProps = {
  label: 'Check Status'
};

var NationHasRole = function NationHasRole(_ref) {
  var className = _ref.className,
      contractAddress = _ref.contractAddress,
      userAddress = _ref.userAddress,
      role = _ref.role;
  var containerClassName = classNames(className, 'NationHasRole');

  var _useNationRead = useNationRead(contractAddress || '', 'hasRole', [role, userAddress]),
      data = _useNationRead.data,
      isError = _useNationRead.isError;

  if (isError) return null;
  return React__default.createElement("div", {
    className: containerClassName
  }, data);
};

var NationRoleStatus = function NationRoleStatus(_ref) {
  var className = _ref.className,
      contractAddress = _ref.contractAddress,
      role = _ref.role,
      classNameLabel = _ref.classNameLabel,
      roleActive = _ref.roleActive,
      label = _ref.label,
      labelActive = _ref.labelActive,
      labelTrue = _ref.labelTrue,
      labelFalse = _ref.labelFalse;
  var classes_ = classNames(className, 'NationRoleStatus');

  var _useNationRead = useNationRead(contractAddress || '', 'roleStatus', [utils.keccak256(utils.toUtf8Bytes(role || ''))]),
      data = _useNationRead.data,
      isError = _useNationRead.isError;

  if (isError) return null;
  return React__default.createElement("span", {
    className: classes_
  }, React__default.createElement("span", {
    className: ""
  }, roleActive && React__default.createElement("span", {
    className: ""
  }, "role"), ' ', labelActive && React__default.createElement("span", {
    className: classNameLabel
  }, label), ' '), data ? labelTrue : labelFalse);
};
NationRoleStatus.defaultProps = {
  labelActive: false,
  label: 'Status: ',
  labelTrue: 'Enabled',
  labelFalse: 'Disabled'
};

var NationIsFounder = function NationIsFounder(_ref) {
  var className = _ref.className,
      classNameLabel = _ref.classNameLabel,
      contractAddress = _ref.contractAddress,
      userAddress = _ref.userAddress,
      label = _ref.label,
      labelActive = _ref.labelActive,
      labelTrue = _ref.labelTrue,
      labelFalse = _ref.labelFalse;
  var classes_ = classNames(className, 'NationIsFounder');

  var _useNationRead = useNationRead(contractAddress || '', 'hasRole', [FOUNDER, userAddress]),
      data = _useNationRead.data,
      isError = _useNationRead.isError;

  if (isError) return null;
  return React__default.createElement("span", {
    className: classes_
  }, labelActive && React__default.createElement("span", {
    className: classNameLabel
  }, label), ' ', data ? labelTrue : labelFalse);
};
NationIsFounder.defaultProps = {
  labelActive: false,
  label: 'Founder: ',
  labelTrue: 'true',
  labelFalse: 'false'
};

function useNotaryRead(address, method, args) {
  return useContractRead({
    addressOrName: address,
    contractInterface: Notary
  }, method, {
    args: args
  });
}

var NotaryIsNotary = function NotaryIsNotary(_ref) {
  var className = _ref.className,
      contractAddress = _ref.contractAddress,
      userAddress = _ref.userAddress,
      labelTrue = _ref.labelTrue,
      labelFalse = _ref.labelFalse;
  var containerClassName = classNames(className, 'NotaryHasRole');

  var _useNotaryRead = useNotaryRead(contractAddress || '', 'hasRole', [NOTARY, userAddress]),
      data = _useNotaryRead.data,
      isError = _useNotaryRead.isError;

  if (isError) return null;
  return React__default.createElement("div", {
    className: containerClassName
  }, "Notary: ", data ? labelTrue : labelFalse);
};
NotaryIsNotary.defaultProps = {
  labelTrue: 'Yes',
  labelFalse: 'No'
};

var NotaryFormIsNotary = function NotaryFormIsNotary(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NotaryFormIsNotary');

  var _useForm = useForm({
    defaultValues: {
      citizen: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNationWrite = useNationWrite(contractAddress, 'hasRole', [NOTARY, watchAllFields == null ? void 0 : watchAllFields.citizen]),
      write = _useNationWrite.write,
      error = _useNationWrite.error,
      data = _useNationWrite.data;

  useLogError(error);

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("div", {
    className: "grid grid-cols-12 gap-x-4 w-full"
  }, createElement("div", {
    className: "col-span-8"
  }, createElement("input", Object.assign({
    className: "input",
    placeholder: "weboftrust.eth"
  }, register('citizen', {
    required: true
  })))), createElement("div", {
    className: "col-span-4 bg-neutral-900 flex items-center justify-center p-2"
  }, createElement("span", {
    className: ""
  }, createElement("span", {
    className: "font-semibold"
  }, "Status:"), ' ', data ? 'Yes' : 'No'))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
NotaryFormIsNotary.defaultProps = {
  label: 'Check Status'
};

var NotaryFormGrantPermissions = function NotaryFormGrantPermissions(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NotaryFormGrantPermissions');

  var _useForm = useForm({
    defaultValues: {
      citizen: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNationWrite = useNationWrite(contractAddress, 'grantRole', [NOTARY, watchAllFields == null ? void 0 : watchAllFields.citizen]),
      write = _useNationWrite.write,
      error = _useNationWrite.error;

  useLogError(error);

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("input", Object.assign({
    className: "input",
    placeholder: "weboftrust.eth"
  }, register('citizen', {
    required: true
  }))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
NotaryFormGrantPermissions.defaultProps = {
  label: 'Grant Notary Status'
};

var NotaryFormRevokePermissions = function NotaryFormRevokePermissions(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NotaryFormRevokePermissions');

  var _useForm = useForm({
    defaultValues: {
      citizen: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit,
      watch = _useForm.watch;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNationWrite = useNationWrite(contractAddress, 'revokeRole', [NOTARY, watchAllFields == null ? void 0 : watchAllFields.citizen]),
      write = _useNationWrite.write,
      error = _useNationWrite.error;

  useLogError(error);

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("input", Object.assign({
    className: "input",
    placeholder: "weboftrust.eth"
  }, register('citizen', {
    required: true
  }))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
NotaryFormRevokePermissions.defaultProps = {
  label: 'Revoke Notary Status'
};

function useNotaryServiceDelegatableWrite(address, method, args) {
  return useContractWrite({
    addressOrName: address,
    contractInterface: NotaryServiceDelegatable
  }, method, {
    args: args
  });
}

var NotaryServiceDelegatableFormClaim = function NotaryServiceDelegatableFormClaim(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NotaryServiceDelegatableFormClaim');

  var _useForm = useForm({
    defaultValues: {
      to: ''
    }
  }),
      watch = _useForm.watch,
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNotaryServiceDele = useNotaryServiceDelegatableWrite(contractAddress, 'claim', [watchAllFields.to]),
      write = _useNotaryServiceDele.write;

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("input", Object.assign({
    className: "input",
    placeholder: "0x0"
  }, register('to', {
    required: true
  }))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
NotaryServiceDelegatableFormClaim.defaultProps = {
  label: 'Issue Claim'
};

function useNotaryServiceDelegatableContract(address) {
  return useContract({
    addressOrName: address,
    contractInterface: NotaryServiceDelegatable
  });
}

var domain = {
  name: 'NotaryServiceDelegatable',
  version: '1',
  chainId: 1
};
var types = {
  EIP712Domain: [{
    name: 'name',
    type: 'string'
  }, {
    name: 'version',
    type: 'string'
  }, {
    name: 'chainId',
    type: 'uint256'
  }, {
    name: 'verifyingContract',
    type: 'address'
  }],
  Invocation: [{
    name: 'transaction',
    type: 'Transaction'
  }, {
    name: 'authority',
    type: 'SignedDelegation[]'
  }],
  Invocations: [{
    name: 'batch',
    type: 'Invocation[]'
  }, {
    name: 'replayProtection',
    type: 'ReplayProtection'
  }],
  SignedInvocation: [{
    name: 'invocations',
    type: 'Invocations'
  }, {
    name: 'signature',
    type: 'bytes'
  }],
  Transaction: [{
    name: 'to',
    type: 'address'
  }, {
    name: 'gasLimit',
    type: 'uint256'
  }, {
    name: 'data',
    type: 'bytes'
  }],
  ReplayProtection: [{
    name: 'nonce',
    type: 'uint'
  }, {
    name: 'queue',
    type: 'uint'
  }],
  Delegation: [{
    name: 'delegate',
    type: 'address'
  }, {
    name: 'authority',
    type: 'bytes32'
  }, {
    name: 'caveats',
    type: 'Caveat[]'
  }],
  Caveat: [{
    name: 'enforcer',
    type: 'address'
  }, {
    name: 'terms',
    type: 'bytes'
  }],
  SignedDelegation: [{
    name: 'delegation',
    type: 'Delegation'
  }, {
    name: 'signature',
    type: 'bytes'
  }],
  IntentionToRevoke: [{
    name: 'delegationHash',
    type: 'bytes32'
  }],
  SignedIntentionToRevoke: [{
    name: 'signature',
    type: 'bytes'
  }, {
    name: 'intentionToRevoke',
    type: 'IntentionToRevoke'
  }]
};

function createDelegation(to, verifyingContract) {
  var delegation = {
    delegate: to,
    authority: '0x0000000000000000000000000000000000000000000000000000000000000000',
    caveats: []
  };
  var delegationString = JSON.stringify({
    domain: _extends({}, domain, {
      verifyingContract: verifyingContract
    }),
    message: delegation,
    primaryType: 'Delegation',
    types: types
  });
  return {
    delegation: delegation,
    string: delegationString
  };
}

function createIntention(delegation, signedDelegation, verifyingContract, tx) {
  var intention = {
    replayProtection: {
      nonce: '0x01',
      queue: '0x00'
    },
    batch: [{
      authority: [{
        delegation: delegation,
        signature: signedDelegation
      }],
      transaction: {
        to: verifyingContract,
        gasLimit: '10000000000000000',
        data: tx
      }
    }]
  };
  var intentionString = JSON.stringify({
    domain: _extends({}, domain, {
      verifyingContract: verifyingContract
    }),
    message: intention,
    primaryType: 'Invocations',
    types: types
  });
  return {
    intention: intention,
    string: intentionString
  };
}

var NotaryServiceDelegatableFormClaimDelegate = function NotaryServiceDelegatableFormClaimDelegate(_ref) {
  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NotaryServiceDelegatableFormClaimDelegate');
  var signer = useSigner();

  var _useForm = useForm({
    defaultValues: {
      to: ''
    }
  }),
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit;

  _objectDestructuringEmpty(_useForm.formState); //   const watchAllFields = watch();


  var contract = useNotaryServiceDelegatableContract(contractAddress); //   useLogError(error);

  var _React$useState = useState(),
      signatures = _React$useState[0],
      setSignatures = _React$useState[1];

  var onSubmit = function onSubmit(_data) {
    _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var _signer$data, _signer$data2, _signer$data2$provide, _signer$data3;

      var method, txPopulated, me, delegation, signedDelegation1, intention, signedDelegation2;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              method = 'eth_signTypedData_v4';
              _context.next = 3;
              return contract.populateTransaction.issue(_data.to);

            case 3:
              txPopulated = _context.sent;
              _context.next = 6;
              return (_signer$data = signer.data) == null ? void 0 : _signer$data.getAddress();

            case 6:
              me = _context.sent;
              delegation = createDelegation(_data.to, contractAddress); // @ts-ignore

              _context.next = 10;
              return (_signer$data2 = signer.data) == null ? void 0 : (_signer$data2$provide = _signer$data2.provider) == null ? void 0 : _signer$data2$provide.send(method, [me, delegation.string]);

            case 10:
              signedDelegation1 = _context.sent;
              intention = createIntention(delegation.delegation, signedDelegation1, contractAddress, txPopulated.data); // @ts-ignore

              _context.next = 14;
              return (_signer$data3 = signer.data) == null ? void 0 : _signer$data3.provider.send(method, [me, intention.string]);

            case 14:
              signedDelegation2 = _context.sent;
              setSignatures({
                delegation: signedDelegation1,
                invocation: signedDelegation2
              });

            case 16:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();

    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("input", Object.assign({
    className: "input",
    placeholder: "weboftrust.eth"
  }, register('to', {
    required: true
  }))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)), signatures && createElement("div", {
    className: "text-sm"
  }, createElement("span", {
    className: "block break-all"
  }, "Delegation: ", createElement("br", null), " ", signatures.delegation), createElement("span", {
    className: "block break-all"
  }, "Invocation: ", createElement("br", null), " ", signatures.invocation)));
};
NotaryServiceDelegatableFormClaimDelegate.defaultProps = {
  label: 'Sign Delegation & Invocations'
};

var NotaryServiceDelegatableFormClaimInvocation = function NotaryServiceDelegatableFormClaimInvocation(_ref) {
  var _account$data, _account$data2, _account$data2$addres;

  var className = _ref.className,
      label = _ref.label,
      onUpdate = _ref.onUpdate,
      contractAddress = _ref.contractAddress;
  var classes_ = classNames(className, 'NotaryServiceDelegatableFormClaimInvocation');
  var account = useAccount();

  var _useForm = useForm({
    defaultValues: {
      delegation: '',
      invocation: ''
    }
  }),
      watch = _useForm.watch,
      register = _useForm.register,
      handleSubmit = _useForm.handleSubmit;

  _objectDestructuringEmpty(_useForm.formState);

  var watchAllFields = watch();

  var _useNotaryServiceDele = useNotaryServiceDelegatableWrite(contractAddress, 'invoke', [[{
    invocations: {
      replayProtection: {
        nonce: '0x01',
        queue: '0x00'
      },
      batch: [{
        authority: [{
          delegation: {
            delegate: (_account$data = account.data) == null ? void 0 : _account$data.address,
            authority: '0x0000000000000000000000000000000000000000000000000000000000000000',
            caveats: []
          },
          signature: watchAllFields.delegation
        }],
        transaction: {
          to: contractAddress,
          gasLimit: '10000000000000000',
          data: "0x71e928af000000000000000000000000" + ((_account$data2 = account.data) == null ? void 0 : (_account$data2$addres = _account$data2.address) == null ? void 0 : _account$data2$addres.substring(2))
        }
      }]
    },
    signature: watchAllFields == null ? void 0 : watchAllFields.invocation
  }]]),
      write = _useNotaryServiceDele.write;

  var onSubmit = function onSubmit(_data) {
    write();
    if (onUpdate) onUpdate(_data);
  };

  return createElement("div", {
    className: classes_
  }, createElement("form", {
    onSubmit: handleSubmit(onSubmit)
  }, createElement("label", {
    className: "text-sm font-semibold my-2"
  }, "Delegation"), createElement("input", Object.assign({
    className: "input",
    placeholder: "0x0"
  }, register('delegation', {
    required: true
  }))), createElement("label", {
    className: "text-sm font-semibold my-2"
  }, "Invocation"), createElement("input", Object.assign({
    className: "input",
    placeholder: "0x0"
  }, register('invocation', {
    required: true
  }))), createElement("button", {
    className: "btn btn-default my-3 w-full",
    type: "submit"
  }, label)));
};
NotaryServiceDelegatableFormClaimInvocation.defaultProps = {
  label: 'Claim Citizenship'
};

function useTrustTokenWrite(address, method, args) {
  return useContractWrite({
    addressOrName: address,
    contractInterface: TrustToken
  }, method, {
    args: args
  });
}

var TrustTokenClaim = function TrustTokenClaim(_ref) {
  var className = _ref.className,
      contractAddress = _ref.contractAddress;
  var classes = classNames(className, 'TrustTokenClaim');

  var _useTrustTokenContrac = useTrustTokenWrite(contractAddress, 'claim', []),
      write = _useTrustTokenContrac.write;

  return createElement("span", {
    onClick: write,
    className: classes
  }, "Claim PGP.alpha");
};

function useCitizenGetMetadata(address, walletAddress, tokenId) {
  var provider = useProvider();

  var _useContractRead = useContractRead({
    addressOrName: address,
    contractInterface: CitizenAlpha
  }, 'tokenURI', {
    args: [tokenId]
  }),
      data = _useContractRead.data;

  var _useState = useState(),
      citizenData = _useState[0],
      setCitizenData = _useState[1];

  useEffect(function () {
    if (data) {
      _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var json, result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                json = Buffer.from(data.substring(29), 'base64').toString();
                result = JSON.parse(json);

                if (!result.image) {
                  _context.next = 6;
                  break;
                }

                _context.next = 5;
                return parseAvatarString(walletAddress, result.image, provider);

              case 5:
                result.img = _context.sent;

              case 6:
                result.traits = {};
                result.attributes.forEach(function (element) {
                  var _extends2;

                  result.traits = _extends({}, result.traits, (_extends2 = {}, _extends2[element.trait_type] = element.value, _extends2));
                });
                setCitizenData(result);

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }))();
    }
  }, [data]);
  return citizenData;
}

function useCitizenAlphaWrite(address, method, args) {
  return useContractWrite({
    addressOrName: address,
    contractInterface: CitizenAlpha
  }, method, {
    args: args
  });
}

function useNotaryContract(address) {
  return useContract({
    addressOrName: address,
    contractInterface: Notary
  });
}

function useNationContract(address) {
  return useContract({
    addressOrName: address,
    contractInterface: Nation
  });
}

function useTrustTokenRead(address, method, args) {
  return useContractRead({
    addressOrName: address,
    contractInterface: TrustToken
  }, method, {
    args: args
  });
}

function useTrustTokenContract(address) {
  return useContract({
    addressOrName: address,
    contractInterface: TrustToken
  });
}

function useNotaryServiceDelegatableRead(address, method, args) {
  return useContractRead({
    addressOrName: address,
    contractInterface: NotaryServiceDelegatable
  }, method, {
    args: args
  });
}

export { CitizenLink, FormCitizenEnsUpdate, FormCitizenIssue, FormCitizenRevoke, NationFormDisableRole, NationFormEnableRole, NationFormHasRole, NationFormIsFounder, NationFormRoleGrant, NationFormRoleRevoke, NationHasRole, NationIsFounder, NationRoleAdminRole, NationRoleStatus, NotaryFormGrantPermissions, NotaryFormIsNotary, NotaryFormRevokePermissions, NotaryIsNotary, NotaryServiceDelegatableFormClaim, NotaryServiceDelegatableFormClaimDelegate, NotaryServiceDelegatableFormClaimInvocation, TrustTokenClaim, constants, lookup, reverseLookup, useCitizenAlphaRead, useCitizenAlphaWrite, useCitizenGetMetadata, useNationContract, useNationRead, useNationWrite, useNotaryContract, useNotaryRead, useNotaryServiceDelegatableContract, useNotaryServiceDelegatableRead, useNotaryServiceDelegatableWrite, useNotaryWrite, useTrustTokenContract, useTrustTokenRead, useTrustTokenWrite };
//# sourceMappingURL=core-wagmi.esm.js.map
