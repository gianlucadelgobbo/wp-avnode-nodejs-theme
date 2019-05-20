<%
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery = "SELECT * FROM reponsefr ORDER BY num"
Set RS = OBJdbConnection.Execute(SQLQuery)%>
<html>
<%on error resume next
do while not  RS.eof
id=rs("nidr")
re=rs("num")
l0=rs("resp0")
r1=rs("resp1")
r1=Replace(r1,"%2b","+")
r1=Replace(r1,"%26","&")
r1=Replace(r1,"%27","'")
r1=Replace("<b>* </b>"&r1,"%0d","<br>")
ra=rs("caa1")
response.write("<b>"&re&"</b>"&" "&l0&" <b><i>"&id&"</i></b><br>"&r1&" "&ra&"<br>")
r1=rs("resp2")
rr=len(r1)
if rr>0 then
r1=Replace(r1,"%2b","+")
r1=Replace(r1,"%26","&")
r1=Replace(r1,"%27","'")
r1=Replace(r1,"%0d","<br>")
ra=rs("caa2")
response.write("<b>* </b>"&r1&" "&ra&"<br>")
end if
r1=rs("resp3")
rr=len(r1)
if rr>0 then
r1=Replace(r1,"%2b","+")
r1=Replace(r1,"%26","&")
r1=Replace(r1,"%27","'")
r1=Replace(r1,"%0d","<br>")
ra=rs("caa3")
response.write("<b>* </b>"&r1&" "&ra&"<br>")
end if
r1=rs("resp4")
rr=len(r1)
if rr>0 then
r1=Replace(r1,"%2b","+")
r1=Replace(r1,"%26","&")
r1=Replace(r1,"%27","'")
r1=Replace(r1,"%0d","<br>")
ra=rs("caa4")
response.write("<b>* </b>"&r1&" "&ra&"<br>")
end if
r1=rs("resp5")
rr=len(r1)
if rr>0 then
r1=Replace(r1,"%2b","+")
r1=Replace(r1,"%26","&")
r1=Replace(r1,"%27","'")
r1=Replace(r1,"%0d","<br>")
ra=rs("caa5")
response.write("<b>* </b>"&r1&" "&ra&"<br>")
end if

RS.Movenext
Loop


Rs.Close
%>

</html>
