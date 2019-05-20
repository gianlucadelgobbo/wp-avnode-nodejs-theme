function flashWriter(trgt,w,h,swfCurrPage,wmode) { //v3.0
	var hasRightVersion = DetectFlashVer(requiredMajorVersion, requiredMinorVersion, requiredRevision);
	if(hasRightVersion) {  // if we've detected an acceptable version
		swfCurrPage+='&r='+Math.floor(Math.random()*5000000);
		document.getElementById(trgt).style.display = 'block';
		var swfStr=AC_FL_RunContent(
			'codebase', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,45,0',
			'width',w,
			'height',h,
			'src',swfCurrPage,
			'quality','high',
			'pluginspage','http://www.macromedia.com/go/getflashplayer',
			'movie',swfCurrPage,
			'id',trgt+"swf",
			'name',trgt+"swf",
			'wmode',wmode,
			'allowFullScreen','true',
			'align', 'middle',
			'play', 'true',
			'loop', 'true',
			'scale', 'showall',
			'devicefont', 'false',
			'bgcolor', '#ffffff',
			'menu', 'true',
			'allowScriptAccess','always'
		);
		document.getElementById(trgt).innerHTML = swfStr;
		//shutterReloaded.ShowImg();
	} else {  // flash is too old or we can't detect the plugin
		document.getElementById(trgt).innerHTML = "<div class=\"flashAlt\">"+flashErrMess[currentLang]+"<\/div>";
	}
}
function setContentLoader(trgt,w,h,cnt,out,wmode){
	if (navigator.appName.indexOf("Microsoft") != -1) {
		var tmp = window[trgt];
	} else {
		var tmp = document[trgt];
	}
	if (tmp) {
		tmp.avviaJs(sitePath+cnt);
	} else {
		flashWriter(trgt,w,h,"/_fp/flxerPlayer4.swf?cnt="+sitePath+cnt,out,wmode)
	}
}
function caricaFlashAvvio() {
	for (var i=0;i<flashToLoad.length;i++){
		if (flashToLoad[i][6] == "true") {
			flashWriter(flashToLoad[i][0],flashToLoad[i][1],flashToLoad[i][2],siteOutPath+flashToLoad[i][3]+siteOutPath+flashToLoad[i][4],flashToLoad[i][5]);
		} else {
			flashWriter(flashToLoad[i][0],flashToLoad[i][1],flashToLoad[i][2],flashToLoad[i][3]+sitePath+flashToLoad[i][4],flashToLoad[i][5]);
		}
		window[flashToLoad[i][0]+"swf"] = document.getElementById(flashToLoad[i][0]+"swf");
	}
}

function showFlash() {
	for (i=0;i<flashToLoad.length;i++){
		document.getElementById(flashToLoad[i][0]).style.display = "block";
	}
}
function hideFlash() {
	for (i=0;i<flashToLoad.length;i++){
		document.getElementById(flashToLoad[i][0]).style.display = "none";
	}
}
