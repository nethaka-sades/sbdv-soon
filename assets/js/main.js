/*
	Eventually by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)

	#modified by Nethaka De Saram for SBDV
*/

(function () {

	"use strict";

	var $body = document.querySelector('body');

	window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
	window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };

	// Methods/polyfills.

	// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
	!function () { function t(t) { this.el = t; for (var n = t.className.replace(/^\s+|\s+$/g, "").split(/\s+/), i = 0; i < n.length; i++)e.call(this, n[i]) } function n(t, n, i) { Object.defineProperty ? Object.defineProperty(t, n, { get: i }) : t.__defineGetter__(n, i) } if (!("undefined" == typeof window.Element || "classList" in document.documentElement)) { var i = Array.prototype, e = i.push, s = i.splice, o = i.join; t.prototype = { add: function (t) { this.contains(t) || (e.call(this, t), this.el.className = this.toString()) }, contains: function (t) { return -1 != this.el.className.indexOf(t) }, item: function (t) { return this[t] || null }, remove: function (t) { if (this.contains(t)) { for (var n = 0; n < this.length && this[n] != t; n++); s.call(this, n, 1), this.el.className = this.toString() } }, toString: function () { return o.call(this, " ") }, toggle: function (t) { return this.contains(t) ? this.remove(t) : this.add(t), this.contains(t) } }, window.DOMTokenList = t, n(Element.prototype, "classList", function () { return new t(this) }) } }();

	// canUse
	window.canUse = function (p) { if (!window._canUse) window._canUse = document.createElement("div"); var e = window._canUse.style, up = p.charAt(0).toUpperCase() + p.slice(1); return p in e || "Moz" + up in e || "Webkit" + up in e || "O" + up in e || "ms" + up in e };

	// window.addEventListener
	(function () { if ("addEventListener" in window) return; window.addEventListener = function (type, f) { window.attachEvent("on" + type, f) } })();

	// Play initial animations on page load.
	window.addEventListener('load', function () {
		window.setTimeout(function () {
			$body.classList.remove('is-preload');
		}, 100);
	});

	// Slideshow Background.
	(function () {

		// Settings.
		var settings = {

			// Images (in the format of 'url': 'alignment').
			images: {
				'images/1.webp': 'center',
				'images/2.webp': 'center',
				'images/3.webp': 'center',
				'images/4.webp': 'center'
			},

			// Delay.
			delay: 6000

		};

		// Vars.
		var pos = 0, lastPos = 0,
			$wrapper, $bgs = [], $bg;

		// Create BG wrapper, BGs.
		$wrapper = document.createElement('div');
		$wrapper.id = 'bg';
		$body.appendChild($wrapper);

		for (var k in settings.images) {

			// Create BG.
			$bg = document.createElement('div');
			$bg.dataset.src = k;
			//$bg.style.backgroundImage = 'url("' + k + '")';
			$bg.style.backgroundPosition = settings.images[k];
			$bg.classList.add('bg-image');
			$wrapper.appendChild($bg);
			$bgs.push($bg);

		}

		//lazy load image loader
		function loadImage(element){
			if(!element.style.backgroundImage){
				element.style.backgroundImage = `url("${element.dataset.src}")`;
			}
		}

		//initialize first image
		loadImage($bgs[pos]);
		$bgs[pos].classList.add('visible', 'top');

		// Bail if we only have a single BG or the client doesn't support transitions.
		//if ($bgs.length == 1
			//|| !canUse('transition'))
			//return;

		window.setInterval(function () {
			lastPos = pos;
			pos = (pos + 1) % $bgs.length;

			loadImage($bgs[pos]); //load the next image only when needed

			// Wrap to beginning if necessary.
			//if (pos >= $bgs.length)
				//pos = 0;

			// Swap top images.
			$bgs[lastPos].classList.remove('top');
			$bgs[pos].classList.add('visible', 'top');

			// Hide last image after a short delay.
			window.setTimeout(function () {
				$bgs[lastPos].classList.remove('visible');
			}, settings.delay / 2);

		}, settings.delay);

	})();

})();