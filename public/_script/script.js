var oldGall;
var oldNews;
function showNews(divid){
	if (oldNews != divid) {
		$(divid).style.display = "block";
		if (oldNews) {
			$(oldNews).style.display = "none";
		} 
		oldNews = divid;
	}
}
function showHide(id1,id2) { //v3.0
	window.document.getElementById(id1).style.display="block";
	window.document.getElementById(id2).style.display="none";
	if (id2!=undefined){
	}
}
var oldGall;
function divFiller2(divid,pid,url){
	if (oldGall == divid && $(divid).style.display=="block") {
		$(divid).style.display = "none";
	} else {
		$(divid).style.display="block";
		if($(divid).innerHTML.blank()) {
			$(divid).innerHTML='<div class="loading"><img src="/_images/loading.gif" alt="Loading" /></div>';
			var elms=$$(".galleryCnt");
			for(var i=0; i<elms.length; i++){
				$(elms[i].id).setStyle({display: 'none'});
				$("p_"+elms[i].id).setStyle({backgroundImage: 'url(/_images/freccia_close.gif)'});
			}
			$(divid).style.display="block";
			$(pid).setStyle({backgroundImage: 'url(/_images/freccia_open.gif)'});
			urlCnt = document.location.href;
			if (urlCnt.indexOf('img=')>0){
				p = urlCnt.substring(urlCnt.indexOf('img=')+4,urlCnt.length);
				if (p.indexOf('&')>0){
					p = p.substring(0, p.indexOf('&'));
				}
			}
			new Ajax.Request(url, {method: 'get',onSuccess: function(transport) {
				$(divid).innerHTML=transport.responseText;
				Shadowbox.setup();
				status = "";
				cells = $(divid).getElementsByTagName("a");
				if (p) openSB(cells,p);
			}});		
		}
	}
	oldGall = divid;
}

function checkGall(){
	url = document.location.href;
	if (url.indexOf('g=')>0){
		gal = url.substring(url.indexOf('g=')+2,url.length);
		if (gal.indexOf('&')>0){
			gal = gal.substring(0, gal.indexOf('&'));
		}
		cells = $('cnt_'+gal).getElementsByTagName('a');
		if (cells.length>0){
			p = url.substring(url.indexOf('img=')+4,url.length);
			if (p.indexOf('&')>0){
				p = p.substring(0, p.indexOf('&'));
			}
			if (p) openSB(cells,p);
		} else {
			divFiller2('cnt_'+gal,'p_cnt_'+gal,'gallery.php?id='+gal+'&div=1');
		}
	}
}

function openSB(cells,p) {
	for (var i = 0; i < cells.length; i++) {
		if (cells[i].getAttribute("href")=='/warehouse'+p) {
			rel = cells[i].getAttribute("rel");
			relA = rel.split(";");
			if (relA.length>1) {
				w = relA[1].split("=")[1];
				h = relA[2].split("=")[1];
				Shadowbox.open({
					content:    '/warehouse'+p,
					player:     "flv",
					title:      cells[i].getAttribute("title"),
					width:		w,
					height:		h
				});
			} else {
				Shadowbox.open({
					content:    '/warehouse'+p,
					player:     "img",
					title:      cells[i].getAttribute("title")
				});
			}
		}
	}
}


function writeButton(cnt){
	flashWriter('slideshowPuls',106,22,urlPlayer+cnt,'window');
}

// GLOBAL FUNCTION
if (window.XMLHttpRequest) {// try to create XMLHttpRequest
	xmlRequestObjectSetSess = new XMLHttpRequest();
	xmlRequestObject = new XMLHttpRequest();
}
if (window.ActiveXObject)	{// if ActiveXObject use the Microsoft.XMLHTTP
	xmlRequestObjectSetSess = new ActiveXObject("Microsoft.XMLHTTP");
	xmlRequestObject = new ActiveXObject("Microsoft.XMLHTTP");
}

function setSession(name,value,callback){
	if(xmlRequestObjectSetSess){		
		if(callback==""){
			xmlRequestObjectSetSess.onreadystatechange = setSessionComplite;
		}else{
		 	xmlRequestObjectSetSess.onreadystatechange = eval(callback);
		}	
		xmlRequestObjectSetSess.open("GET", "/_php/setSession.php?"+name+"="+value , true);
		xmlRequestObjectSetSess.send(null);
		ajaxComplite=false;
	}	
}

function getSession(name,fnc){
	if(xmlRequestObject){
		function_get_session_complete=fnc;
		xmlRequestObject.open("GET", "/_php/getSession.php?name="+name, true);
		xmlRequestObject.onreadystatechange = getSessionComplite;
		xmlRequestObject.send(null);
	}	
}

function setSessionComplite(){
	if (xmlRequestObjectSetSess.readyState==4) {
		ajaxComplite=true;
	}
}

function getSessionComplite(){
	if (xmlRequestObject.readyState==4) {
		if (xmlRequestObject.responseText.indexOf('invalid') == -1){
			var node = xmlRequestObject.responseXML.documentElement;
			var items = node.getElementsByTagName('session');
			if(items[0].firstChild){
				sessionVal=items[0].firstChild.data;
			}else{
				sessionVal="";
			}
			eval(function_get_session_complete)(sessionVal);
		}
	}
}

function popupwindow(LarghezzaCont,AltezzaCont,Pagina,nome,scrol,stat) {
	var lsBrowser = navigator.appName;
	var navInfo = navigator.userAgent;
	if (scrol == "yes") {
		if (navInfo == "Mac" && lsBrowser.indexOf("Microsoft") >= 0) {
				aw = 0;
		} else {
		aw = 17;
		}		
	} else {
	aw = 0;
	}		
    var iMyWidth;
    var iMyHeight;
    var LarghezzaPagina;
    var AltezzaPagina;
    LarghezzaPagina = screen.availWidth;
    AltezzaPagina = screen.availHeight;
    LarghezzaCont=LarghezzaCont.toUpperCase()
    AltezzaCont=AltezzaCont.toUpperCase()
				
    if (LarghezzaCont == "FULL") {
            LarghezzaWindow = screen.availWidth;
        } else {
            LarghezzaWindow = parseInt(LarghezzaCont) + aw;
        }
    if (AltezzaCont == "FULL") {
            AltezzaWindow = screen.availHeight;
        } else {
            AltezzaWindow = AltezzaCont;
        }
    iMyWidth = (LarghezzaPagina/2) - (LarghezzaWindow/2);
    iMyHeight = (AltezzaPagina/2) - (AltezzaWindow/2);
    win = window.open(Pagina,nome,"height=" + AltezzaWindow + ",width="	+ LarghezzaWindow 
	+ ",menubar=0,resizable=yes,scrollbars=" + scrol + ",status=" + stat + ",titlebar=0,toolbar=0,left="
	+ iMyWidth + ",top=" + iMyHeight + ",screenX=" + iMyWidth + ",screenY=" + iMyHeight + "");
    win.focus();
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_goToURL() { //v3.0
  var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
  for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}

window.onload = onLoad;

function onLoad() {
	checkGall();
	caricaFlashAvvio();
}



