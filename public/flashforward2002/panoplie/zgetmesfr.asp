<%j=Right(Time(),2)
Randomize()
n = rnd()*10
if j="PM" then
   decal = 10+(Int(n)+1)
else
   decal = (Int(n)+1)
end if
vis=Request("vis")
decal=decal+vis
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery = "SELECT * FROM mesinfr WHERE nid=" &decal
Set RS = OBJdbConnection.Execute(SQLQuery)
mes=rs("message")
Rs.Close
response.write("&mes="&mes)
%>
