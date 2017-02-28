export function fetchData( url, cb ) {
	window.myJsonpCallback = function(data) {
	    cb( data )
	    scriptEl.remove()
	};
	var scriptEl = document.createElement('script');
	scriptEl.setAttribute( 'src',url );
	document.body.appendChild(scriptEl)
};