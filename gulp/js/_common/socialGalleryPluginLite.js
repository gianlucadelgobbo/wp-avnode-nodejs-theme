/*!
 * Social Gallery Lite - The Free Version of The Ultimate WordPress Social Lightbox
 * http://www.socialGalleryplugin.com
 * V2.1
 *
 * Copyright 2012, Mike Stott, Epic Plugins
 *
 * Date: 12/01/2012 */
 
 
 var sgCurrind=-1;
 var sgpDisFire=false;
 var sgpDiR=0;
 var sgpTwR=0;
 var sgpFbR=0;
 var sgpPinR=0;
 var sgpGogR=0;
 var sgpSuR=0;
 var sgpTumR=0;
 var sgselector="#nothinghere";
 var sgp2883f7a=false;
 var sgpDomW=0;
 var sgpDomH=0;
 var sgpa33b=false;
 var sgExcludeElements=".noSocialGallery, .noLightBox, .pin-it-button, .jig-customLink";
 var sgptheme=[];
 
 switch(parseInt(window.sgp_config.sgp_selT)){
     case 1:sgselector=".entry a:has(img), .entry-content a:has(img), .entry_content a:has(img), .content a:has(img), #content a:has(img)";
     break;
     case 10:sgselector=".post a:has(img), .post-content a:has(img), .postcontent a:has(img), .post-data a:has(img), .single-post a:has(img)";
     break;
     case 2:sgselector=window.sgp_config.sgp_sel;
     break;
     case 3:sgselector=".page a:has(img), .page-content a:has(img), .page-data a:has(img), .pagecontent a:has(img)";
     break;
     case 4:sgselector=".entry a:has(img), .entry-content a:has(img), .entry_content a:has(img), .entry-image a:has(img), .content a:has(img), #content a:has(img), #contentwide  a:has(img), article a:has(img), .page a:has(img), .page-content a:has(img), .post a:has(img), .post-content a:has(img), .post-data a:has(img), .postcontent a:has(img), .gallery a:has(img), .gallery-item a:has(img), .blog-content a:has(img), .thumb a:has(img), .single-post a:has(img), .block-content a:has(img), .gallery-icon";
     break;
     default:sgselector=".entry a:has(img), .entry-content a:has(img), .entry_content a:has(img), .content a:has(img), #content a:has(img)";
     break
 }
 
 if(!jQuery.isFunction(window.sgp4ebd1c2)){
     function sgp4ebd1c2(a){
         return typeof a==="number"&&a%1==0
     }
 }
 
 if(!jQuery.isFunction(jQuery.fn.wExists)){
     jQuery.fn.wExists=function(){
         return this.length>0
     }
 }
 
 jQuery(function(b){
     initVar()
     if (jQuery('.thumbnails .current').length) {
         window.sgCurrind=parseInt(sgGetElements().index(jQuery('.thumbnails .current')));
         loadItem();
     }
 }
 
 );
 function sgShow(){
     jQuery("#sgPluginBg").animate({opacity:window.sgp_config.sgp_bgo},300,"linear");
     jQuery("#sgPluginBox").animate({opacity:"1.00"},300,"linear");
     jQuery("#sgPluginBg, #sgPluginBox").css("display","block")
 }
 
 jQuery(function(b){
     /*
     jQuery("#sgSide").bind('hide', function(){
         console.log('asdasda')
     });
     */
     jQuery("body").append('<div id="sgPluginBg"></div><div id="sgPluginBox"><div id="sgCont"></div><div id="sgSide" class="hidden-xs hidden-sm"><div id="sgSideWrap"></div></div><div id="sgPluginBoxClose">x</div></div><div id="sgPluginLoader"></div><div id="sgDisqusHold" style="display:none"><div id="disqus_thread"></div></div>');
     if(window.sgp_config.sgp_bg!="" && window.sgp_config.sgp_bg!="000000"){
         jQuery("#sgPluginBg").css("background-color","#"+window.sgp_config.sgp_bg)
     }
     
     if(window.sgp_config.sgp_bgo!=""){
         jQuery("#sgPluginBg").css("opacity",window.sgp_config.sgp_bgo)
     }
     
     var e=+new Date();
     sgGetElements().unbind("click").click(function(g){
         g.preventDefault();
         if(!window.sgpa33b){
             window.sgCurrind=parseInt(sgGetElements().index(this));
             loadItem();
         }
     });
 
     var f=+new Date();
     jQuery("#sgPluginBoxClose").click(function(){
         sgClose()
     });
     jQuery("#sgPluginBg").click(function(){
         sgClose()
     });
     jQuery(window).resize(function(){
         if(jQuery("#sgPluginBg").css("display")=="block"){
             sgResizer();
             sgpde65()
         }
     });
     initKeyboard()
 });
 
 function sgBaseBar(){
     if(window.sgp_config.sgp_bb=="1"){
         var c=getThumb(window.sgCurrind,true);
         var a=document.title;
         if(a=="undefined"||a=="null"||typeof a=="undefined"){
             var a=""
         }
         
         var f='<div id="sgBaseBarBg"></div><div id="sgBaseBar">'+a+"</div>";
         jQuery("#sgCont").append(f);
         jQuery("#sgCont").mouseenter(function(){
             jQuery("#sgBaseBarBg").fadeIn(100);
             jQuery("#sgBaseBar").fadeIn(100)
         }).mouseleave(function(){
             jQuery("#sgBaseBarBg").fadeOut(100);
             jQuery("#sgBaseBar").fadeOut(100)
         });
         jQuery("#sgBaseBarBg").fadeIn(100);
         jQuery("#sgBaseBar").fadeIn(100)
     }
 }
     
 function getThumb(a,b){
     var d=jQuery("#sgCont img.sgpI").attr("src");
     if(d==""||typeof d==="undefined"||d=="undefined"){
         if(jQuery("#sgPluginLoader img").attr("src")!=""){
             d=jQuery("#sgPluginLoader img").attr("src")
         }
     }
     return d
 }
 
 function sgpd94a795(){
     return false
 }
 
 function updateSideWrap(share){
     var h=getThumb(window.sgCurrind,false);
     //alert(window.sgCurrind);
     //alert(window.glink);
     //alert(window.glink[window.sgCurrind]);
     jQuery("#sgSideWrap").html("");
     /*
     if(typeof h!=undefined&&h!=""){
         var f=h
     }else{
         var f=sgp5ad6f()
     }
     */
     //var share = jQuery(l).attr("href");
     //alert(f);
 
     var e="";
     if(window.sgp_config.sgp_hb=="1"){
         if(window.sgp_config.sgp_hbt=="1"){
         e='<div id="sgBlogTitle"><img src="'+window.sgp_config.sgp_hbi+'" align="left">';
         e+='<a href="'+window.sgp_config.sgp_bU+'" title="'+window.sgp_config.sgp_bT+'">'+window.sgp_config.sgp_bT+"</a><br />"+window.sgp_config.sgp_bL+"</div>"
     }
     
     if(window.sgp_config.sgp_hbt=="2"){
         e='<div id="sgBlogTitle"><a href="'+window.sgp_config.sgp_bU+'" title="'+window.sgp_config.sgp_bT+'">'+window.sgp_config.sgp_bT+"</a><br />"+window.sgp_config.sgp_bL+"</div>"
     }
     
     if(window.sgp_config.sgp_hbt=="3"){
         var g=jQuery("<textarea/>").html(window.sgp_config.sgp_ch).val();
         e='<div id="sgBlogTitle">'+g+"</div>"
     }
     
     
     }
     
     if(window.sgp_config.sgp_desc=="1"){
         var k="";
         if(jQuery("#sgCont img.sgpI").attr("title")!="null"&&typeof jQuery("#sgCont img.sgpI").attr("title")!="undefined"){
             k=jQuery("#sgCont img.sgpI").attr("title")
         }
         
         if(jQuery("#sgCont img.sgpI").attr("alt")!="null"&&typeof jQuery("#sgCont img.sgpI").attr("alt")!="undefined"&&k==""){
             k=jQuery("#sgCont img.sgpI").attr("alt")
         }
         
         if(jQuery("#sgPluginLoader img").attr("title")!="null"&&typeof jQuery("#sgPluginLoader img").attr("title")!="undefined"&&k==""){
             k=jQuery("#sgPluginLoader img").attr("title")
         }
         
         if(jQuery("#sgPluginLoader img").attr("alt")!="null"&&typeof jQuery("#sgPluginLoader img").attr("alt")!="undefined"&&k==""){
             k=jQuery("#sgPluginLoader img").attr("alt")
         }
         
         if(k==""||typeof k==="undefined"||k=="undefined"||k=="null"){
             k=""
         }
         e+='<div id="sgBlogDesc">'+k+"</div>"
     }
     
     var j="";
     if(window.sgp_config.sgp_fb=="1"){
         j+='<div id="sgFB"><div class="fb-like" data-href="'+share+'" data-send="false" data-width="320" data-show-faces="';
         if(window.sgp_config.sgp_fbf=="1"){
             j+="true"
         } else {
             j+="false"
         }
         
         j+='"></div></div>'
     }
     
     e+='<div id="sgSocial">'+j+"</div>";
     if(window.sgp_config.sgp_fbc=="1"){
         e+='<div id="sgComments"><div class="fb-comments" data-href="'+share+'" data-num-posts="5" data-width="320"></div></div>'
     }
     
     //var i='http://www.socialgalleryplugin.com"';
     //e+='<div id="sgHonest"><a href="'+i+'" title="Powered by the Social Gallery Wordpress Plugin"><img src="http://www.socialgalleryplugin.com/social-gallery-wordpress-plugin.png" alt="Social Gallery WordPress Plugin" border="0" /></a></div>';
     jQuery("#sgSideWrap").html('<div id="sgScrollbox">'+e+"</div>");
     loadFacebook();
     sgpde65()
 }
 
 function loadFacebook(){
     if(window.sgp_config.sgp_fb=="1"||window.sgp_config.sgp_fbc=="1"){
         loadFacebookCrone()
     }
 }
 
 function loadFacebookCrone(){
     if(typeof(FB)!=="undefined"&&window.sgpFbR<5){
         if(window.sgp_config.sgp_fb=="1"){
             FB.XFBML.parse(jQuery("#sgSocial").get(0))
         }
         if(window.sgp_config.sgp_fbc=="1"){
             FB.XFBML.parse(jQuery("#sgComments").get(0))
         }
     }else{
         window.sgpFbR++;
         setTimeout(function(){loadFacebookCrone},500)
     }
 }
 
 function initNavVideo(){
     if(window.sgp_config.sgp_nav=="1"){
         var k=jQuery("#sgCont").height();
         var g=jQuery("#sgCont").width();
         var m=22;
         var i=(k-39)/2;
         var l=(g*0.7)-m-10;
         if(window.sgp_ie){
             var j=' style="background:#FFF;opacity:0"'
         } else {
             var j=''
         }
         
         var h='<div id="sgControls"><div id="sgLeftVideo"'+j+"></div>";
         h+='<div id="sgRightVideo"'+j+"></div></div>";
         jQuery("#sgControls").remove();
         jQuery("#sgCont").append(h);
         console.log(jQuery("#sgLeftVideo").height());
         console.log(jQuery("#sgPluginBox").height());
         var posY = (jQuery("#sgPluginBox").height()-jQuery("#sgLeftVideo").height())/2;
         jQuery("#sgLeftVideo").css("top",posY+"px");
         jQuery("#sgRightVideo").css("top",posY+"px");
         if(window.sgp_ie){
             jQuery("#sgLeftVideo").css("background","#FFF").css("opacity",0)
         }
         
         if(window.sgp_ie){
             jQuery("#sgRightVideo").css("background","#FFF").css("opacity",0)
         }
         
         jQuery("#sgRightVideo").mouseenter(function(){
             jQuery(this).css("background","url("+window.sgptheme.iRi+") 40px 30px no-repeat").css("opacity",1)
         })/*.mouseleave(function(){
             if(!window.sgp_ie){
                 jQuery(this).css("background","transparent")
             } else {
                 jQuery(this).css("background","#FFF").css("opacity",0)
             }
         })*/;
         jQuery("#sgLeftVideo").mouseenter(function(){
             jQuery(this).css("background","url("+window.sgptheme.iLe+") 30px 30px no-repeat").css("opacity",1)
         })/*.mouseleave(function(){
             if(!window.sgp_ie){
                 jQuery(this).css("background","transparent")
             }else{
                 jQuery(this).css("background","#FFF").css("opacity",0)
             }
         })*/;
         jQuery("#sgRightVideo").click(function(){
             sgRightAct()
         });
         jQuery("#sgLeftVideo").click(function(){
             sgLeftAct()
         });
     }
 }
 
 function initNav(){
     if(window.sgp_config.sgp_nav=="1"){
         var k=jQuery("#sgCont").height();
         var g=jQuery("#sgCont").width();
         var m=22;
         var i=(k-39)/2;
         var l=(g*0.7)-m-10;
         if(window.sgp_ie){
             var j=' style="background:#FFF;opacity:0"'
         } else {
             var j=""
         }
         
         var h='<div id="sgControls"><div id="sgLeft"'+j+"></div>";
         h+='<div id="sgRight"'+j+"></div></div>";
         jQuery("#sgControls").remove();
         jQuery("#sgCont").append(h);
         if(window.sgp_ie){
             jQuery("#sgLeft").css("background","#FFF").css("opacity",0)
         }
         
         if(window.sgp_ie){
             jQuery("#sgRight").css("background","#FFF").css("opacity",0)
         }
         
         jQuery("#sgRight").mouseenter(function(){
             jQuery(this).css("background","url("+window.sgptheme.iRi+") "+l+"px "+i+"px no-repeat").css("opacity",1)
         })/*.mouseleave(function(){
             if(!window.sgp_ie){
                 jQuery(this).css("background","transparent")
             } else {
                 jQuery(this).css("background","#FFF").css("opacity",0)
             }
         })*/;
         jQuery("#sgLeft").mouseenter(function(){
             jQuery(this).css("background","url("+window.sgptheme.iLe+") 10px "+i+"px no-repeat").css("opacity",1)
         })/*.mouseleave(function(){
             if(!window.sgp_ie){
                 jQuery(this).css("background","transparent")
             }else{
                 jQuery(this).css("background","#FFF").css("opacity",0)
             }
         })*/;
         jQuery("#sgRight").click(function(){
             sgRightAct()
         });
         jQuery("#sgLeft").click(function(){
             sgLeftAct()
         });
     }
 }
 
 function initKeyboard(){
     if(window.sgp_config.sgp_nav=="1"){
         jQuery(document).keyup(function(b){
             if(b.keyCode==37&&jQuery("#sgPluginBox").css("display")=="block" && sgGetElements().length>1){
                 sgLeftAct();
                 return false
             }
     
             if(b.keyCode==39&&jQuery("#sgPluginBox").css("display")=="block" && sgGetElements().length>1){
                 sgRightAct();
                 return false
             }
             
             if(b.keyCode==27&&jQuery("#sgPluginBox").css("display")=="block"){
                 sgClose();
                 return false
             }
         
         
         });
     }
 }
 
 function loadItem(){
     //window.sgCurrind=parseInt(sgGetElements().index(this));
     var a=jQuery(sgGetElements().get(window.sgCurrind)).attr("href");
     var b=jQuery(sgGetElements().get(window.sgCurrind)).attr("title");
     history.pushState({ foo: "bar" }, b, a);
     //var h=jQuery(sgGetElements().get(window.sgCurrind)).target.parentNode;
     if(typeof a!="undefined"&&a!=""){
 
         window.sgpa33b=true;
         var l=jQuery("img",this).attr("title");
         var c=jQuery(".jig-caption-title",this).html();
         if((c!=""||typeof c!="undefined")&&(l==""||typeof l==="undefined")){
             l=c
         }
         
         if(a!=""){
             callLoading();
             var img = (typeof window.glink!=="undefined" && window.glink[window.sgCurrind] ? window.glink[window.sgCurrind] : a);
             if (window.sgCurrind>=0 && window.glink && window.glink[window.sgCurrind] && window.glink[window.sgCurrind].media && window.glink[window.sgCurrind].media.file) {
                 htmlstr = '<iframe id="sgpILoading" width="980" height="551" frameborder="0" src="https://avnode.net/videos/'+window.glink[window.sgCurrind].slug+'?oembed=1"></iframe>';	
                 jQuery("#sgCont").html(htmlstr);
                 sgResizer();
                 if(sgGetElements().length>1){
                     initNavVideo();
                     jQuery("#sgControls").css('pointer-events','none');
                 }
             } else {
                 htmlstr = '<img src="'+window.glink[window.sgCurrind]+'" title="'+l+'" alt="" class="sgpI" id="sgpILoading" />';	
                 jQuery("#sgPluginLoader").html(htmlstr);
                 jQuery("#sgPluginLoader img").unbind("load").load(function(i){
                     if(jQuery("#sgpILoading").wExists()){
                         if(document.getElementById("sgpILoading").width>0){
                             window.sgpDomW=document.getElementById("sgpILoading").width
                         }
                 
                         if(document.getElementById("sgpILoading").height>0){
                             window.sgpDomH=document.getElementById("sgpILoading").height
                         }
                     }
                 
                     jQuery("#sgCont").html("");
                     if(jQuery("#sgPluginLoader img").attr("title")=="undefined"){
                         jQuery("#sgPluginLoader img").removeAttr("title")
                     }
                     
                     jQuery("#sgPluginLoader img").appendTo("#sgCont");
                     sgResizer();
                     if(sgGetElements().length>1){
                         initNav()
                         jQuery("#sgControls").css('pointer-events','auto');
                     }
                     sgBaseBar();
                     sgpde65()
                 }).bind("error",function(i){
                     jQuery(sgGetElements().get(window.sgCurrind)).parent().addClass("noSocialGallery").unbind("click");
                     sgClose()
                 });
             }
             //alert(img);
         }
         
         sgShow();
         updateSideWrap(a);
         window.sgpa33b=false
     } else {
         item.addClass("noSocialGallery")
     }
 }
 
 function sgRightAct(){
     console.log(window.sgCurrind);
     window.sgCurrind++;
     var items = sgGetElements();
     if (window.sgCurrind>=items.length) window.sgCurrind = 0;
     loadItem();
 }
 
 /*
 function sgRightActOLD(){
     if(window.sgpa33b){
             
     } else {
         var j=window.sgCurrind;
         if(sgGetElements().length==j){
             j=0
         }
         
         var l=sgGetElements().get(j);
         var g=jQuery(l).attr("href");
         var n=10;
         var i=0;
         while((typeof g=="undefined"||g=="")&&i<n){
             j++;
             if(sgGetElements().length==j){
                 j=0
             }
             
             var l=sgGetElements().get(j);
             var g=jQuery(l).attr("href");
             i++
         }
         
         if(typeof g!="undefined"&&g!=""){
             window.sgpa33b=true;
             var f=jQuery("img",l).attr("title");
             var h=jQuery(".jig-caption-title",l).html();
             if((h!=""||typeof h!="undefined")&&(f==""||typeof f==="undefined")){
                 f=h
             }
             
             var m=parseInt(sgGetElements().index(l))+1;
             if(g!=""){
                 callLoading();
                 jQuery("#sgPluginLoader").html('<img src="'+g+'" title="'+f+'" alt="" class="sgpI" />')
             }
             
             jQuery("#sgPluginLoader img").unbind("load").load(function(){
                 jQuery("#sgCont").html("");
                 if(jQuery("#sgPluginLoader img").attr("title")=="undefined"){
                     jQuery("#sgPluginLoader img").removeAttr("title")
                 }
                 
                 jQuery("#sgPluginLoader img").appendTo("#sgCont");
                 sgResizer();
                 if(sgGetElements().length>1){
                     initNav()
                 }
                 sgBaseBar(m);
                 sgpde65()
             }).bind("error",function(a){
                 jQuery(this).addClass("noSocialGallery")
             });
             updateSideWrap(m);
             window.sgCurrind=j+1;
             window.sgpa33b=false
         }
         
         else{
             jQuery(this).addClass("noSocialGallery")
         }
         
         
         }
         
 
 }
 */
 function sgLeftAct(){
     if(!window.sgpa33b){
     var j=window.sgCurrind-2;
 if(j<0){
     j=sgGetElements().length-1
 }
 
 var l=sgGetElements().get(j);
 var g=jQuery(l).attr("href");
 var n=10;
 var i=0;
 while((typeof g=="undefined"||g=="")&&i<n){
     j--;
 if(j<0){
     j=sgGetElements().length-1
 }
 
 var l=sgGetElements().get(j);
 var g=jQuery(l).attr("href");
 i++
 }
 
 if(typeof g!="undefined"&&g!=""){
     window.sgpa33b=true;
 var f=jQuery("img",l).attr("title");
 var h=jQuery(".jig-caption-title",l).html();
 if((h!=""||typeof h!="undefined")&&(f==""||typeof f==="undefined")){
     f=h
 }
 
 var m=parseInt(sgGetElements().index(l))+1;
 if(g!=""){
     callLoading();
 jQuery("#sgPluginLoader").html('<img src="'+g+'" title="'+f+'" alt="" class="sgpI" />')
 }
 
 jQuery("#sgPluginLoader img").unbind("load").load(function(){
     jQuery("#sgCont").html("");
 if(jQuery("#sgPluginLoader img").attr("title")=="undefined"){
     jQuery("#sgPluginLoader img").removeAttr("title")
 }
 
 jQuery("#sgPluginLoader img").appendTo("#sgCont");
 sgResizer();
 if(sgGetElements().length>1){
     initNav()
 }
 
 sgBaseBar(m);
 sgpde65()
 }
 
 ).bind("error",function(a){
     jQuery(this).addClass("noSocialGallery")
 }
 
 );
 updateSideWrap(m);
 window.sgCurrind=j+1;
 window.sgpa33b=false
 }
 
 else{
     jQuery(this).addClass("noSocialGallery")
 }
 
 
 }
 
 
 }
 
 function sgpde65(){
     if(window.sgp_config.sgp_fbc=="1"){
         var g=jQuery("#sgSideWrap").height();
         var e=jQuery("#sgSocial").outerHeight(true);
         var f=jQuery("#sgBlogDesc").outerHeight(true);
         var h=g-e-f-80-20;
         if(h<300){
             h=300
         }
         jQuery("#sgScrollbox").css("height",(jQuery("#sgSideWrap").height()-30)+"px")
     }
 }
 
 function callLoading(){
     var window_width=jQuery(window).width();
     var window_height=jQuery(window).height();
     var start_width=window_width>880 ? 880 : window_width;
     var start_height=window_height>530 ? 530 : window_height;
     //var sgContW = start_width-(window_width>880 ? jQuery("#sgSide").width() : 0);
     /*if(window.sgp2883f7a){
         var b=jQuery("#sgCont").height();
         var a=(b-39)/2;
         jQuery("#sgCont").html('<div style="margin-left:auto;margin-right:auto;width:100%;height:40px;position:relative;top:'+a+'px"><img id="sgpLoadr" src="'+window.sgptheme.iLo+'" style="top:0;" alt="" title="Loading" /></div>')
     }else{*/
         jQuery("#sgPluginBox").css("width",start_width+"px").css("left",((window_width-start_width)/2)+"px");
         jQuery("#sgPluginBox").css("height",start_height+"px").css("top",((window_height-start_height)/2)+"px");
         jQuery("#sgCont").css("width",(window_width>880 ? 530 : window_width)+"px").html('<div style="width:100%;height:'+start_height+'px;margin-top:'+parseFloat(start_height/2) +'px;"><img id="sgpLoadr" src="'+window.sgptheme.iLo+'" alt="Loading" /></div>')
         jQuery("#sgScrollbox").css("height",(start_height-30)+"px");
         jQuery("#sgSide").css("height",start_height+"px");
     //}
 }
 
 function sgResizer(b){
     var S=100;
     var Q=100;
     if(typeof window.sgp_config.sgp_mb!="undefined"){
         S=window.sgp_config.sgp_mb;
         Q=window.sgp_config.sgp_mb
     }
     var z=0;
     var h=7;
     var e=Q/100;
     var C=S/100;
     var window_width=jQuery(window).width();
     var window_height=jQuery(window).height();
     var sgSideW = window_width>990 ? 350 : 0;
     console.log();
     if (jQuery("#sgCont iframe").length) {
         var cnt_width=jQuery("#sgCont iframe").width();
         var cnt_height=jQuery("#sgCont iframe").height();
     } else {
         var cnt_width=jQuery("#sgCont img.sgpI").width();
         var cnt_height=jQuery("#sgCont img.sgpI").height();
     }
     var T="img.sgpI";
     var W="img.sgpI";
     /*
     var V=false;
     var L=sgpd94a795();
     if(L){
         if(typeof L[0]!="undefined"){
             var P=L[1];
             if(sgp4ebd1c2(L[0][0])){
                 cnt_width=parseInt(L[0][0]);
                 T="dims Array"
             }else{
                 V=true
             }
             if(sgp4ebd1c2(L[0][1])){
                 cnt_height=parseInt(L[0][1]);
                 W="dims Array"
             }
         }
     }
     if(V){
         if(cnt_width>window.sgi[P][2][0]){
             window.sgi[P][2][0]=cnt_width
         }
         if(cnt_height>window.sgi[P][2][1]){
             window.sgi[P][2][1]=cnt_height
         }
     }
     
     */
     if(sgp4ebd1c2(window.sgpDomW)){
         if(window.sgpDomW>cnt_width){
             cnt_width=window.sgpDomW;
             T="dom img"
         }
     }
     
     if(sgp4ebd1c2(window.sgpDomH)){
         if(window.sgpDomH>cnt_height){
             cnt_height=window.sgpDomH;
             W="dom img"
         }
     }
     
     window.sgpDomW=false;
     window.sgpDomH=false;
     var k=cnt_width*1.2;
     var s=cnt_height*1.2;
     if(cnt_width>250||cnt_height>250){
         var N=(window_width-sgSideW)*C;
         /*
         if(N<34){
             N=34
         }
         */
         var I=e*window_height;
         /*
         if(I<34){
             I=34
         }
         */
         if(I<N){
             N=I
         } else {
             I=N
         }
         var d=window_width;
         if (window_width>990) {
             var available_w=window_width-N-N-sgSideW;
             var available_h=window_height-I-I;
         } else {
             var available_w=window_width-sgSideW;
             var available_h=window_height;
         }
         /*
         if(w<530){
             w=530
         }
         
         if(O<530){
             O=530
         }
         */
         var c=true;
         var R=1.1;
         if(typeof window.sgp_config.sgp_usf!="undefined"){
             if(parseFloat(window.sgp_config.sgp_usf)>1){
                 R=window.sgp_config.sgp_usf
             }
         }
         
         var a=getFinalSize(available_w,available_h,cnt_width,cnt_height,c,R);
         /*
         if(w<530){
             w=530
         }
         
         if(O<530){
             O=530
         }
         */
         var final_w_cnt=a[0];
         var final_h_cnt=a[1];
         //var available_h=final_h;
         //w=final_w_cnt;
         /*
         if(w<530){
             w=530
         }
         */
         final_w=final_w_cnt+sgSideW;
         final_h=final_h_cnt;
         console.log(available_w);
         console.log(a);
         console.log(final_w_cnt);
         console.log(final_w);
         console.log(sgSideW);
         /*
         if(O>(o*1.1)){
             O=o*1.1
         }
         
         if(O<530){
             O=530
         }
         */
         var leftPos=(window_width*0.5)-(final_w*0.5);
         var topPos=(window_height-available_h)/2;
         var cntTopPos=(available_h-final_h)/2;
         console.log();
         //var I=(window_height*0)-(O*0);
         //var N=(window_width*0)-(d*0);
         jQuery("#sgPluginBox").css("top",topPos+"px").css("left",leftPos+"px").css("width",final_w+"px").css("height",available_h+"px");
         jQuery("#sgCont").css("width",final_w_cnt+"px");
         if (jQuery("#sgCont iframe").length) {
             jQuery("#sgCont iframe").css("margin-top",cntTopPos+"px");
             jQuery("#sgCont iframe").width(final_w_cnt);
             jQuery("#sgCont iframe").height(final_h_cnt);
         } else {
             jQuery("#sgCont img.sgpI").css("width",final_w_cnt+"px");
             jQuery("#sgCont img.sgpI").css("height",final_h_cnt+"px");
             jQuery("#sgCont img.sgpI").css("margin-top",cntTopPos+"px");
         }
         jQuery("#sgScrollbox").css("height",(available_h-30)+"px");
         jQuery("#sgSide").css("height",available_h+"px");
     } else {
         var w=530;
         var d=530+sgSideW;
         var O=530;
         var N=(window_width/2)-440;
         if(N<34){
             N=34
         }
         
         var I=(window_height/2)-260;
         if(I<34){
             I=34
         }
         jQuery("#sgPluginBox").css("top",I+"px").css("left",N+"px").css("width",d+"px").css("height",O+"px");
         jQuery("#sgCont").css("width",w+"px");
         jQuery("#sgSideWrap").css("height",(O-h)+"px");
         jQuery("#sgScrollbox").css("height",(O-h-30)+"px");
         //jQuery(trgt).css("margin-top",D+"px")
     }
     //jQuery("body").fitVids();
 }
 
 function sgClose(){
     jQuery("#sgPluginBg, #sgPluginBox").animate({opacity:"0"},300,"linear",function(){
        jQuery("#sgCont").html("");
        jQuery("#sgPluginBg, #sgPluginBox").css("display","none")
     });
     /*
     if(window.location.hash.substr(0,3)=="#sg"){
         window.location.hash="_"
     }
     */
 }
 /*
 function sgpa855(){
     return window.location.pathname
 }
 
 function sgp5ad6f(){
     var c=window.location.href;
     var b=window.location.hash;
     var a=c.indexOf(b)||c.length;
     return c.substr(0,a)
 }
 */
 function getFinalSize(h,d,l,i,c,g){
     if(typeof c=="undefined"){
         var c=false
     }
     
     if(typeof g=="undefined"){
         var g=1.1
     }
     
     var k=Math.min(h/l,d/i);
     var f=l*k;
     var a=i*k;
     if(!c){
         if(f>l||a>i){
         f=l;
     a=i
     }
     
     
     } else {
         if(f>(l*g)||a>(i*g)){
             var k=Math.min((l*g)/l,(i*g)/i);
             var f=l*k;
             var a=i*k
         }
     
     
     }
     
     var b=(h*0.5)-(f*0.5);
     var e=(d*0.5)-(a*0.5);
     var j=new Array();
     j[0]=f;
     j[1]=a;
     j[2]=b;
     j[3]=e;
     return j
 }
 
 function sgGetElements(){
     return jQuery(window.sgselector).not(window.sgExcludeElements)
 }
 
 function initVar(){
     window.sgptheme.themename= window.sgp_config.sgp_theme ? window.sgp_config.sgp_theme : "classic";
     window.sgptheme.themedir=window.sgp_config.sgp_theme_root+window.sgptheme.themename+"/";
     window.sgptheme.iLe=window.sgptheme.themedir+"social-gallery-l.png";
     window.sgptheme.iRi=window.sgptheme.themedir+"social-gallery-r.png";
     window.sgptheme.iLo=window.sgptheme.themedir+"social-gallery-loading.gif";
     window.sgptheme.iFs=window.sgptheme.themedir+"social-gallery-fullscreen.png"
 }
 