<%
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery = "SELECT * FROM inconnufr ORDER BY nbdis,mot"
Set RS = OBJdbConnection.Execute(SQLQuery)%>
<html>
<%do while not  RS.eof
ca=rs("mot")
re=rs("nbdis")
response.write(ca&" "&re&"<br>")
RS.Movenext
Loop


Rs.Close
%>

</html>
