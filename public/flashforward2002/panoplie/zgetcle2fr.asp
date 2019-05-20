<%j=Request("nidc")
ms = Request.form("mes")
re = Request.form("rea")
ca = Request.form("cat")

z1="éèçàâêûîôäëïöù"
z2="eecaaeuioaeiou"
on error resume next
ms = Replace(Replace(Replace(Replace(Replace(ms,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
for x=1 to len(z1)
  ms=Replace(ms,mid(z1,x,1),mid(z2,x,1))
next
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery ="update motclefr SET motcle= '"& ms & "',reac='"&re&"',cat='"&ca&"' where nidc="&j
Set RS = OBJdbConnection.Execute(SQLQuery)
repon="&nidc="&j&"&mes="&ms&"&cat="&ca
caa="ca"&ca
sq1="select * from reponsefr where num='"&caa&"'"
Set RS = OBJdbConnection.Execute(sq1)
if rs.eof then
  repon=repon &"&r1=&r2=&r3=&r4=&r5="
else
r1=Replace(rs("resp1"),"@1",ms)
r2=Replace(rs("resp2"),"@1",ms)
r3=Replace(rs("resp3"),"@1",ms)
r4=Replace(rs("resp4"),"@1",ms)
r5=Replace(rs("resp5"),"@1",ms)
  repon=repon & "&r1="&r1&"&r2="&r2&"&r3="&r3&"&r4="&r4&"&r5="&r5
end if


caa=re
sq1="select * from reponsefr where num='"&caa&"'"
Set RS = OBJdbConnection.Execute(sq1)
if rs.eof then
  repon=repon &"&ra1=&ra2=&ra3=&ra4=&ra5="
else
on error resume next
r1=Replace(rs("resp1"),"@1",ms)
r2=Replace(rs("resp2"),"@1",ms)
r3=Replace(rs("resp3"),"@1",ms)
r4=Replace(rs("resp4"),"@1",ms)
r5=Replace(rs("resp5"),"@1",ms)
  repon=repon & "&ra1="&r1&"&ra2="&r2&"&ra3="&r3&"&ra4="&r4&"&ra5="&r5
end if



Rs.Close
response.write(repon&"&oke=ok")
%>
