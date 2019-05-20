<%dim emo(1000)
for x=1 to 1000
   emo(x)=0
next
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"
SQLQuery = "SELECT * FROM reponsefr ORDER BY num"
Set RS = OBJdbConnection.Execute(SQLQuery)%>
<html>
<% on error resume next
do while not  RS.eof
ra=0
ra=rs("caa1")+0
if ra > 0 then
   emo(ra)=emo(ra)+1
end if
ra=0
ra=rs("caa2")+0
if ra > 0 then
   emo(ra)=emo(ra)+1
end if
ra=0
ra=rs("caa3")+0
if ra > 0 then
   emo(ra)=emo(ra)+1
end if
ra=0
ra=rs("caa4")+0
if ra > 0 then
   emo(ra)=emo(ra)+1
end if
ra=0
ra=rs("caa5")+0
if ra > 0 then
   emo(ra)=emo(ra)+1
end if
RS.Movenext
Loop
Rs.Close
for x=1 to 1000
  if emo(x)>0 then
    response.write(right("000"&x,3) & " <b>" & emo(x) &"</b><br>")
 end if
next
%>

</html>
