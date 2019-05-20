<%Randomize()
n = rnd()*1000000%>
<HTML>
<HEAD>
<TITLE>Maintenance Fichier PanoBot</TITLE>
</HEAD>
<BODY bgcolor="#FFFFFF">
<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
 codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0"
 WIDTH=100% HEIGHT=100%>
 <PARAM NAME=movie VALUE="main.swf?nrnd=<%response.write(n)%>&fin=ok">
 <PARAM NAME=quality VALUE=high>
 <PARAM NAME=bgcolor VALUE=#FFFFFF>
 <EMBED src="main.swf?nrnd=<%response.write(n)%>&fin=ok" quality=high bgcolor=#FFFFFF  WIDTH=100% HEIGHT=100% TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></EMBED>
</OBJECT>
</BODY>
</HTML>
