<%
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery = "SELECT * FROM motclefr ORDER BY cat,reac,motcle"
' SQLQuery = "SELECT * FROM motclefr "
Set RS = OBJdbConnection.Execute(SQLQuery)
tt="a=0"
ca=""
ca1=""
n=1
do while not  RS.eof
tt=tt & "&n"&n&"="&rs("nidc")
ca=rs("cat")
if ca <> cat then
  tt=tt & "&c"&n&"="&ca
  cat = ca
end if
n=n+1
RS.Movenext
Loop
Rs.Close
response.write(tt&"&finf=ok")
%>
