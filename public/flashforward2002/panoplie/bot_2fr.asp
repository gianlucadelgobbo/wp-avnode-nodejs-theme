<%bot = request.form("mesuser")
 on error resume next
bott=bot
do
  x= Instr(1,bott," ",0)
  if x = 0 then
     bot = Ucase(Left(bott,1)) & Lcase(Mid(bott,2))
     exit do
  end if
  bott = mid(bott,x+1)
loop
bot = Replace(Replace(Replace(bot,".",""),",",""),"?","")
bot = Replace(Replace(Replace(Replace(Replace(bot,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
user= request.form("botq")
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery ="update usersfr SET nomuser='"&bot&"' where code='"&user&"'"
Set RS = OBJdbConnection.Execute(SQLQuery)
nbr = 0
dim re(100)
dim rea(100)
' Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
' OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"

for x=1 to 99
j="de"&right("000"&x,3)
SQLQuery = "SELECT * FROM reponsefr WHERE num='" &j&"'"
Set RS = OBJdbConnection.Execute(SQLQuery)
if not rs.eof then
ree = rs("resp1")
reac = rs("caa1")
if ree <>"" then
   nbr=nbr+1
   re(nbr)=ree
   rea(nbr)=reac
end if
ree = rs("resp2")
reac = rs("caa2")
if ree <>"" then
   nbr=nbr+1
   re(nbr)=ree
   rea(nbr)=reac
end if
ree = rs("resp3")
reac = rs("caa3")
if ree <>"" then
   nbr=nbr+1
   re(nbr)=ree
   rea(nbr)=reac
end if
ree = rs("resp4")
reac = rs("caa4")
if ree <>"" then
   nbr=nbr+1
   re(nbr)=ree
   rea(nbr)=reac
end if
ree = rs("resp5")
reac = rs("caa5")
if ree <>"" then
   nbr=nbr+1
   re(nbr)=ree
   rea(nbr)=reac
end if
end if
next
Rs.Close
Randomize()
n = Int(rnd()*(nbr-1))+1
rep=Replace(re(n),"@3",bot)
botrea = rea(n)
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

response.write("&rep="&rep&"&rep1="& rep1&"&botrea=" & botrea &"&bot="&bot&"&okbot=ok"&n)
%>
