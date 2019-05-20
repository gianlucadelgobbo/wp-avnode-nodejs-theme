<%j=Request("nidr")
r0 = Request.form("l1")
r1 = Request.form("r1")
r2 = Request.form("r2")
r3 = Request.form("r3")
r4 = Request.form("r4")
r5 = Request.form("r5")

re1 = Request.form("re1")
re2 = Request.form("re2")
re3 = Request.form("re3")
re4 = Request.form("re4")
re5 = Request.form("re5")

re = Request.form("rea")
on error resume next
r0 = Replace(Replace(Replace(Replace(Replace(r0,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
r1 = Replace(Replace(Replace(Replace(Replace(r1,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
r2 = Replace(Replace(Replace(Replace(Replace(r2,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
r3 = Replace(Replace(Replace(Replace(Replace(r3,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
r4 = Replace(Replace(Replace(Replace(Replace(r4,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
r5 = Replace(Replace(Replace(Replace(Replace(r5,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
re=Lcase(re)

Set OBJdbConnection = Server.CreateObject("ADODB.Connection")
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
sq1="select * from reponsefr where num='"&re&"'" 
Set RS = OBJdbConnection.Execute(sq1)
if rs.eof then
SQLQuery= "insert INTO reponsefr (num,resp0,resp1,caa1,resp2,caa2,resp3,caa3,resp4,caa4,resp5,caa5) "
SQLQuery= SQLQuery & "VALUES( '" &re &"','"&r0& "','"&r1& "','"&re1&"','"&r2& "','"&re2&"','"&r3& "','"&re3&"','"&r4& "','"&re4&"','"&r5& "','"&re5&"')"
Set RS = OBJdbConnection.Execute(SQLQuery)
 sq1="select * from reponsefr where num='"&re&"'" 
 Set RS = OBJdbConnection.Execute(sq1)
 j=rs("nidr")
end if
 Rs.Close
response.write("&nidr="&j&"&rea="&re&"&oke=ok")
%>
