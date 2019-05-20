<%bottime = Request.Cookies("botquand")
botqui= Request.Cookies("botqui")
on error resume next
Randomize()
n = Replace(Now()," ","")&Int(rnd()*100000000)
Response.Cookies("botquand") = Now()
' on error resume next
if botqui <> "" then
   Set OBJdbConnection = Server.CreateObject("ADODB.Connection")
   OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
   sq1="select * from usersfr where code='"&botqui&"'"
   Set RS = OBJdbConnection.Execute(sq1)
   if not rs.eof then
      nomuser=rs("nomuser")
   else
      bottime = ""
      Response.Cookies("botqui") = n
      Set OBJdbConnection = Server.CreateObject("ADODB.Connection")
   OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
   SQLQuery= "insert INTO usersfr (code) "
   SQLQuery= SQLQuery & "VALUES( '" &n&"' )"
   Set RS = OBJdbConnection.Execute(SQLQuery)
   end if
   bottime=nomuser
   if nomuser <> "" then
      nbvis=rs("nbvis")+1
      SQLQuery ="update usersfr SET nbvis="&nbvis&" where code='"&botqui&"'"
      Set RS = OBJdbConnection.Execute(SQLQuery)
   end if

else
  Response.Cookies("botqui") = n
   Set OBJdbConnection = Server.CreateObject("ADODB.Connection")
   OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery= "insert INTO usersfr (code) "
SQLQuery= SQLQuery & "VALUES( '" &n&"' )"
Set RS = OBJdbConnection.Execute(SQLQuery)
end if
%><HTML>
<HEAD>
<TITLE>PANABOT</TITLE>
</HEAD>
<BODY bgcolor="#564651">
<div align="center">
  <table width="400" border="0" height="100%">    <tr>
      <td height="404">

<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
 codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=5,0,0,0"
 WIDTH=400 HEIGHT=400>
 <PARAM NAME=movie VALUE="loader.swf?bot=<%response.write(bottime)%>&botv=<%response.write(nbvis)%>&botq=<%response.write(botqui)%>&nrnd=<%response.write(n)%>&fin=ok">
<PARAM NAME=quality VALUE=low>
 <PARAM NAME=bgcolor VALUE=#FFFFFF>
 <EMBED src="loader.swf?bot=<%response.write(bottime)%>&botv=<%response.write(nbvis)%>&botq=<%response.write(botqui)%>&nrnd=<%response.write(n)%>&fin=ok" quality=low bgcolor=#FFFFFF  WIDTH=400 HEIGHT=400 TYPE="application/x-shockwave-flash" PLUGINSPAGE="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=ShockwaveFlash"></EMBED>
</OBJECT>
</td>
    </tr>
  </table>
</div>

</BODY>
</HTML>
