<%j=Request("nidc")
l0 = Request.form("la0")
r1 = Request.form("ra1")
r2 = Request.form("ra2")
r3 = Request.form("ra3")
r4 = Request.form("ra4")
r5 = Request.form("ra5")

re1 = Request.form("re1")
re2 = Request.form("re2")
re3 = Request.form("re3")
re4 = Request.form("re4")
re5 = Request.form("re5")

re = right("00000"&j,5)
on error resume next
l0 = Replace(Replace(Replace(Replace(Replace(l0,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
r1 = Replace(Replace(Replace(Replace(Replace(r1,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
r2 = Replace(Replace(Replace(Replace(Replace(r2,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
r3 = Replace(Replace(Replace(Replace(Replace(r3,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
r4 = Replace(Replace(Replace(Replace(Replace(r4,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
r5 = Replace(Replace(Replace(Replace(Replace(r5,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
re=Lcase(re)

Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery ="update reponsefr SET resp0='"&l0&"', resp1='"&r1&"',resp2='"&r2&"',resp3='"&r3&"',resp4='"&r4&"',resp5='"&r5&"',caa1='"&re1&"',caa2='"&re2&"',caa3='"&re3&"',caa4='"&re4&"',caa5='"&re5&"'  where num='"&re&"'"
Set RS = OBJdbConnection.Execute(SQLQuery)
Rs.Close
response.write("&oke=ok")
%>
