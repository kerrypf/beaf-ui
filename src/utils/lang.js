export  const isMobile = (function(){
	return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
})()

export const isMac = (function() {
        return /macintosh|mac os x/i.test(navigator.userAgent);
})();

export const isWindows = (function() {
        return /windows|win32/i.test(navigator.userAgent);
})();

export const isLinux = (function() {
        return /linux/i.test(navigator.userAgent);
})();

export const isChrome =  (function() {
        return navigator.userAgent.indexOf('Chrome') > -1
})();
export const isSafari =  (function() {
       	return navigator.userAgent.indexOf('Safari') > -1
})();