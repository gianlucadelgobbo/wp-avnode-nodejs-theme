<%j=Request("nidc")
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery = "SELECT * FROM motclefr WHERE nidc=" &j
Set RS = OBJdbConnection.Execute(SQLQuery)
ca=rs("cat")
rea=rs("reac")
ms=rs("motcle")
mes="&mes="&ms&"&rea="&rea&"&cat="&ca&"&uti="&rs("nbuse")

caa="ca"&ca
sq1="select * from reponsefr where num='"&caa&"'"
Set RS = OBJdbConnection.Execute(sq1)
if rs.eof then
  mes=mes &"&r1=&r2=&r3=&r4=&r5=&l0="
else
on error resume next
r1=Replace(rs("resp1"),"@1",ms)
r2=Replace(rs("resp2"),"@1",ms)
r3=Replace(rs("resp3"),"@1",ms)
r4=Replace(rs("resp4"),"@1",ms)
r5=Replace(rs("resp5"),"@1",ms)
l0=rs("resp0")
  mes=mes & "&l0="&l0&"&r1="&r1&"&r2="&r2&"&r3="&r3&"&r4="&r4&"&r5="&r5
end if


caa=Right("00000"&j,5)
sq1="select * from reponsefr where num='"&caa&"'"
Set RS = OBJdbConnection.Execute(sq1)
if rs.eof then
  mes=mes &"&la0="&l0&"&ra1=&ra2=&ra3=&ra4=&ra5=&re1=&re2=&re3=&re4=&re5=&numreponse="
else
 on error resume next
r1=Replace(rs("resp1"),"@1",ms)
r2=Replace(rs("resp2"),"@1",ms)
r3=Replace(rs("resp3"),"@1",ms)
r4=Replace(rs("resp4"),"@1",ms)
r5=Replace(rs("resp5"),"@1",ms)
re1=rs("caa1")
re2=rs("caa2")
re3=rs("caa3")
re4=rs("caa4")
re5=rs("caa5")
la0=rs("resp0")

  mes=mes & "&la0="&la0&"&ra1="&r1&"&ra2="&r2&"&ra3="&r3&"&ra4="&r4&"&ra5="&r5&"&re1="&re1&"&re2="&re2&"&re3="&re3&"&re4="&re4&"&re5="&re5&"&numreponse="&caa
end if

Rs.Close

response.write(mes)
%>
