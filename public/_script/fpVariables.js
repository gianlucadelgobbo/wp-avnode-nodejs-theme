var AC_FL_RunContent = 0;
var DetectFlashVer = 0;
// Major version of Flash required
var requiredMajorVersion = 9;
// Minor version of Flash required
var requiredMinorVersion = 0;
// Revision of Flash required
var requiredRevision = 28;
// the version of javascript supported
var jsVersion = 1.0;
// GLOBAL FUNCTION
var flashToLoad = new Array();
//
var sitePath = window.location.href.substring(0, window.location.href.indexOf("/", 7));

var tmp;

var flashErrMess = new Array();
flashErrMess['it'] = "Questo contenuto richiede JAVASCRIPT abilitato e Adobe Flash Player.<br \/><br \/><a href=\"http://get.adobe.com/flashplayer/\">Scarica Adobe Flash Player<\/a>";
flashErrMess['en'] = "This content requires JAVASCRIPT enabled and the Adobe Flash Player.<br \/><br \/><a href=\"http://get.adobe.com/flashplayer/\">Get Adobe Flash Player<\/a>";
flashErrMess['es'] = "This content requires JAVASCRIPT enabled and the Adobe Flash Player.<br \/><br \/><a href=\"http://get.adobe.com/flashplayer/\">Get Adobe Flash Player<\/a>";
flashErrMess['fr'] = "This content requires JAVASCRIPT enabled and the Adobe Flash Player.<br \/><br \/><a href=\"http://get.adobe.com/flashplayer/\">Get Adobe Flash Player<\/a>";
flashErrMess['pl'] = "This content requires JAVASCRIPT enabled and the Adobe Flash Player.<br \/><br \/><a href=\"http://get.adobe.com/flashplayer/\">Get Adobe Flash Player<\/a>";

var langArray = new Array("it","en");
var langArrayLabel = new Array("italiano","english");

var defaultLang = "it";
var xmlPath = '/##lang##/gallery/dettXml_';
var urlPlayer = "/_fp/flxerPlayer4Int.swf?cnt=";
var currentLang = defaultLang;


var xmlID;
var divID;
var xmlRequestObjectDiv	= false; // XMLHttpRequest Object
var xmlRequestObject = false; // XMLHttpRequest Object
var xmlRequestObject1 = false; // XMLHttpRequest Object
var xmlRequestObjectSetSess = false; // XMLHttpRequest Object
var function_get_session_complete="";
var ajaxComplite;

if (window.XMLHttpRequest){ // try to create XMLHttpRequest
	xmlRequestObject = new XMLHttpRequest();
	xmlRequestObjectNL = new XMLHttpRequest();
	xmlRequestObjectSetSess = new XMLHttpRequest();
	xmlRequestObjectDiv = new XMLHttpRequest();
}
if (window.ActiveXObject && !(navigator.userAgent.indexOf("MSIE")!=-1 && navigator.userAgent.indexOf("Mac")!=-1 && navigator.appVersion.indexOf("MSIE 5")!=-1) ){	// if ActiveXObject use the Microsoft.XMLHTTP
	xmlRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
	xmlRequestObjectNL = new ActiveXObject("Microsoft.XMLHTTP");
	xmlRequestObjectSetSess = new ActiveXObject("Microsoft.XMLHTTP");
	xmlRequestObjectDiv = new ActiveXObject("Microsoft.XMLHTTP");
}
