<%j=Request("nidm")
ms = Request.form("mes")
' on error resume next
ms = Replace(Replace(Replace(Replace(Replace(ms,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery ="update mesinfr SET message= '"&ms&"' where nid="&j
Set RS = OBJdbConnection.Execute(SQLQuery)
Rs.Close
response.write("&oke=ok")
%>
