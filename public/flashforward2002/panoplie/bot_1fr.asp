<%j=Right(Time(),2)
Randomize()
n = Int(rnd()*9)+1
if j="PM" then
   decal = 10+(Int(n)+1)
else
   decal = (Int(n)+1)
end if
vis=Request.form("bot")
bot = vis
botv=Request.form("botv")
if vis <> "" then
   vis = 20
else
   vis = 0
end if
decal=decal+vis
dim rea(100)
rea(1)="120"
rea(2)="116"
rea(3)="115"
rea(4)="146"
rea(5)="056"
rea(6)="145"
rea(7)="077"

Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery = "SELECT * FROM mesinfr WHERE nid=" &decal
Set RS = OBJdbConnection.Execute(SQLQuery)
mes=Replace(Replace(rs("message"),"@3",bot),"@4",botv)
Rs.Close
rep = mes
fza = 0
rep1=""
za=instr(1,rep,"%0d",0)
if za > 0 then
   fza = 1
   rep1=Mid(rep,za+3)
   rep = Left(rep,za-1)
end if
if fza = 0 and len(rep)>65 then
   za=instr(65,rep," ")
   rep1=Mid(rep,za+1)
   rep = Left(rep,za-1)
end if
Randomize()
n = Int(rnd()*(6))+1
botrea = rea(n)

response.write("&rep="&rep&"&rep1="& rep1&"&botrea=" & botrea  &"&okbot=ok")
%>
