/*
const freeze = () => {
	let d = document;
	let w = window;
	let scrollTop = w.pageYOffset || d.documentElement.scrollTop || d.body.scrollTop;
	let scrollLeft = w.pageXOffset || d.documentElement.scrollLeft || d.body.scrollLeft;
	window.onscroll = () => {
		window.scrollTo(scrollLeft, scrollTop);
	};
	document.documentElement.style.overflowY = 'hidden';
	document.body.classList.add('active');
};
const unfreeze = () => {
	window.onscroll = () => {};
	document.documentElement.style.overflowY = 'auto';
	document.body.classList.remove('active');
};
*/

function freeze() {
    let htmlPos = document.documentElement.style.position
    if (htmlPos !== 'fixed') {
        let scrollPos = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop
        document.documentElement.style.cssText = "position: fixed; width: 100%; height: 100%"
        document.documentElement.style.top = '-' + scrollPos + 'px'
        document.documentElement.style.overflowY = 'scroll' 
    }
}

function unfreeze() {  
    let htmlPos = document.documentElement.style.position
    if (htmlPos === 'fixed') {
        document.documentElement.style.position = 'static'
        document.documentElement.scrollTop = -parseInt(document.documentElement.style.top)
        document.body.scrollTop = -parseInt(document.documentElement.style.top)
        document.documentElement.style.cssText = "position: ''; width: ''; height: ''"
        document.documentElement.style.overflowY = 'auto'
    }
}



export { freeze, unfreeze };
