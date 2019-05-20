<%j=Request("nidr")
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery = "SELECT * FROM reponsefr WHERE nidr=" &j
Set RS = OBJdbConnection.Execute(SQLQuery)
mes="&rea="&rs("num")&"&l1="&rs("resp0")&"&r1="&rs("resp1")&"&r2="&rs("resp2")&"&r3="&rs("resp3")&"&r4="&rs("resp4")&"&r5="&rs("resp5")
mes=mes & "&re1="&rs("caa1")& "&re2="&rs("caa2")& "&re3="&rs("caa3")& "&re4="&rs("caa4")& "&re5="&rs("caa5")
mes=mes&"&uti="&rs("uti")
Rs.Close
response.write(mes)
%>
