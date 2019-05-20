<%j=Request("nidm")
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery = "SELECT * FROM mesinfr WHERE nid=" &j
Set RS = OBJdbConnection.Execute(SQLQuery)
mes=rs("message")
Rs.Close
response.write("&mes="&mes)
%>
