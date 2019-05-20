<%j=Request("nidc")
ms = Request.form("mes")
re = Request.form("rea")
ca = Request.form("cat")
on error resume next
ms = Replace(Replace(Replace(Replace(Replace(ms,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
ms=Lcase(ms)
Set OBJdbConnection = Server.CreateObject("ADODB.Connection")
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
sq1="select * from motclefr where motcle='"&ms&"'" 
Set RS = OBJdbConnection.Execute(sq1)
if rs.eof then
SQLQuery= "insert INTO motclefr (motcle,reac,cat) "
SQLQuery= SQLQuery & "VALUES( '" & ms & "','"&re& "','"&ca&"')"
Set RS = OBJdbConnection.Execute(SQLQuery)
sq1="select * from motclefr where motcle='"&ms&"'" 
Set RS = OBJdbConnection.Execute(sq1)
j=rs("nidc")
else
j=rs("nidc")
end if
 Rs.Close
response.write("&nidc="&j&"&mes="&ms&"&cat="&ca&"&oke=ok")
%>
