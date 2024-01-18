(function() {
	function detectBrowser() {
		var browser = (function() {
			var test = function(regexp) {
				return regexp.test(window.navigator.userAgent);
			};
			switch (true) {
				case test(/edg/i):
					return 'edge';
				case test(/opr/i) && (!!window.opr || !!window.opera):
					return 'opera';
				case test(/chrome/i) && !!window.chrome:
					return 'chrome';
				case test(/trident/i):
					return 'ie';
				case test(/firefox/i):
					return 'firefox';
				case test(/safari/i):
					return 'safari';
				default:
					return 'other';
			}
		})();
		document.documentElement.setAttribute('browser-name', browser);
	}
	function detectIEorEdgeBrowser() {
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf('MSIE ');
		if (msie > 0) {
			return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
		}
		var trident = ua.indexOf('Trident/');
		if (trident > 0) {
			var rv = ua.indexOf('rv:');
			return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
		}
		var edge = ua.indexOf('Edge/');
		if (edge > 0) {
			return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
		}
		return false;
	}
	function redirectToFallback() {
		var browserOutdated = detectIEorEdgeBrowser();
		var locationPath = window.location.origin;

		if (browserOutdated) {
			window.location.href = locationPath + '/fallback.html';
		}
	}
	detectBrowser();
	redirectToFallback();
}.call(this));
