<%
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery = "SELECT * FROM motclefr ORDER BY cat,reac,motcle"
Set RS = OBJdbConnection.Execute(SQLQuery)%>
<html>
<%do while not  RS.eof
ca=rs("cat")
re=rs("reac")
mc=rs("motcle")
mc=Replace(mc,"%2b","+")
mc=Replace(mc,"%26","&")
mc=Replace(mc,"%27","'")
mc=Replace(mc,"%0d","<br>")
nu=Right("00000"&rs("nidc"),5)
response.write(ca&" "&re&" "&mc&" "&nu&"<br>")
RS.Movenext
Loop


Rs.Close
%>

</html>
