<%
Dim accessdb
Dim strconn

accessdb=server.mappath(" \zonedata\panobot.mdb")
strconn="PROVIDER=Microsoft.Jet.OLEDB.4.0;DATA SOURCE=" & accessdb & ";"
set rs = Server.CreateObject("ADODB.Connection") 
rs.Open strconn 


  SQLQuery = "SELECT * FROM motclefr WHERE motcle='" &phr&"'"
  Set RS = strconn.Execute(SQLQuery)

response.write(rs.eof)
%>
