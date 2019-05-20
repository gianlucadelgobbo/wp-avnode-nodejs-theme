<%
Sub SetDataBaseFolder(Path)
'Setta la directory del DataBase a "Path" in Session('DataBaseFolder')
	Session("DataBaseFolder") = Path
End Sub

Function ConvertiScrivi(strStringa)
'Converte i caratteri intrattabili per scrivere su DB
	Dim strStringaTemp
    if (Trim(strStringa) <> "") Then
        strStringaTemp = Replace(strStringa,"'","{")
        strStringaTemp = Replace(strStringaTemp,vbCr,"<BR>")
		strStringaTemp = Replace(strStringaTemp,vbLf,"<BR>")
        strStringaTemp = Replace(strStringaTemp,"|"," ")
        ConvertiScrivi = Trim(strStringaTemp)
    Else
        ConvertiScrivi = Trim(strStringa)
    End If
End Function

Function ConvertiLeggi(strStringa)
'Converte i caratteri intrattabili quando legge da DB
	Dim strStringaTemp
    if (Trim(strStringa) <> "") Then
        strStringaTemp = Replace(strStringa,"{","'")
        strStringaTemp = Replace(strStringaTemp,"<BR>",vbCr)
		strStringaTemp = Replace(strStringaTemp,"&","-")
		strStringaTemp = Replace(strStringaTemp,"<br>",vbCr)
		strStringaTemp = Replace(strStringaTemp,"<Br>",vbCr)
		strStringaTemp = Replace(strStringaTemp,"<bR>",vbCr)
        ConvertiLeggi = Trim(strStringaTemp)
    Else
        ConvertiLeggi = Trim(strStringa)
    End If
End Function

Function CreaArrayDaRecord(NomeDataBase, NomeTabella)
'Restituisce un Array(Campi,Record) dei dati della tabella "NomeTabella" nel Database "NomeDataBase"
	Dim objConn
	Dim strConn
	Dim objRstL
	Dim SQL
	Dim Item
	Dim ContaCampi
	Dim ContaRecord
	Dim Record()
	Dim J
	Dim K
	ContaCampi = 0
	Set objConn  = Server.CreateObject("ADODB.Connection")
	strConn ="DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=" & Session("DataBaseFolder") & NomeDataBase
	objConn.Open strConn
		Set objRstL = Server.CreateObject("ADODB.Recordset")
		SQL = "SELECT * FROM " & NomeTabella & " WHERE lancia <> '' ORDER BY OrdinamentoPulsanti, OrdinamentoAree ;"
		objRstL.Open SQL,objConn,1,2
			ContaRecord = objRstL.RecordCount
			For Each Item in objRstL.Fields
				ContaCampi = 1 + ContaCampi
			Next
			ContaCampi = ContaCampi - 1
			ReDim Record(ContaCampi,ContaRecord)
			objRstL.MoveFirst		
			For J =  0 To ContaRecord - 1
				For K = 0 To ContaCampi
					Record(K,J) = ConvertiLeggi(objRstL.Fields(K).Value)
				Next
				objRstL.MoveNext
			Next
		objRstL.Close
		set objRstL = Nothing
	objConn.Close
	Set objConn = Nothing
	CreaArrayDaRecord = Record
End Function

Function CreaArrayDaTabella(NomeDataBase, NomeTabella)
'Restituisce un Array(Campi,Record) della tabella con i nomi dei Campi in Array(NomeCampi,0)
	Dim objConn
	Dim strConn
	Dim objRstL
	Dim SQL
	Dim Item
	Dim ContaCampi
	Dim ContaRecord
	Dim Record()
	Dim J
	Dim K
	ContaCampi = 0
	Set objConn  = Server.CreateObject("ADODB.Connection")
	strConn ="DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=" & Session("DataBaseFolder") & NomeDataBase
	objConn.Open strConn
		Set objRstL = Server.CreateObject("ADODB.Recordset")
		SQL = "SELECT * FROM " & NomeTabella & " WHERE lancia <> '' ORDER BY Opera;"
		objRstL.Open SQL,objConn,1,2
			ContaRecord = objRstL.RecordCount
			For Each Item in objRstL.Fields
				ContaCampi = 1 + ContaCampi
			Next
			ContaCampi = ContaCampi - 1
			ReDim Record(ContaCampi,ContaRecord)
			ContaCampi = 0
			For Each Item in objRstL.Fields
				Record(ContaCampi,0) = ConvertiLeggi(objRstL.Fields(ContaCampi).Name)
				ContaCampi = 1 + ContaCampi
			Next
			objRstL.MoveFirst		
			For J =  1 To ContaRecord
				For K = 0 To ContaCampi - 1
					Record(K,J) = ConvertiLeggi(objRstL.Fields(K).Value)
				Next
				objRstL.MoveNext
			Next
		objRstL.Close
		set objRstL = Nothing
	objConn.Close
	Set objConn = Nothing
	CreaArrayDaTabella = Record
End Function

Function CreaArrayDaQueryID(NomeDataBase, NomeTabella, ID)
'Restituisce un Array(Campi,Record) della tabella con i nomi dei Campi in Array(NomeCampi,0) filtrati sul campo "Societa"
	Dim objConn
	Dim strConn
	Dim objRstL
	Dim SQL
	Dim Item
	Dim ContaCampi
	Dim ContaRecord
	Dim Record()
	Dim J
	Dim K	
	ContaCampi = 0
	Set objConn  = Server.CreateObject("ADODB.Connection")
	strConn ="DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=" & Session("DataBaseFolder") & NomeDataBase
	objConn.Open strConn
		Set objRstL = Server.CreateObject("ADODB.Recordset")
		SQL = "SELECT * FROM " & NomeTabella & " WHERE ID=" & ID & " ORDER BY OrdinamentoPulsanti, OrdinamentoAree ;"
		objRstL.Open SQL,objConn,1,2
			ContaRecord = objRstL.RecordCount
			For Each Item in objRstL.Fields
				ContaCampi = 1 + ContaCampi
			Next
			ContaCampi = ContaCampi - 1
			ReDim Record(ContaCampi,ContaRecord)
			ContaCampi = 0
			For Each Item in objRstL.Fields
				Record(ContaCampi,0) = ConvertiLeggi(objRstL.Fields(ContaCampi).Name)
				ContaCampi = 1 + ContaCampi
			Next		
			objRstL.MoveFirst		
			For J =  1 To ContaRecord
				For K = 0 To ContaCampi - 1
					Record(K,J) = ConvertiLeggi(objRstL.Fields(K).Value)
				Next
				objRstL.MoveNext
			Next
		objRstL.Close
		set objRstL = Nothing
	objConn.Close
	Set objConn = Nothing
	CreaArrayDaQueryID= Record
End Function

Sub EliminaRecord(NomeDataBase, NomeTabella, ID)
'Elimina Il Record Con ID = ID
	Dim objConn
	Dim strConn
	Dim objRstL
	Dim SQL
	Set objConn  = Server.CreateObject("ADODB.Connection")
	strConn ="DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=" & Session("DataBaseFolder") & NomeDataBase
	objConn.Open strConn
		Set objRstL = Server.CreateObject("ADODB.Recordset")
		SQL = "DELETE FROM " & NomeTabella & " WHERE ID=" & ID & ";"
		objRstL.Open SQL,objConn,1,2
		set objRstL = Nothing
	objConn.Close
	Set objConn = Nothing
End Sub

Function StringaPerFlash()
'Crea la stringa di variabili dal database per flash
	Dim Stringa
	Dim Record
	Dim i
	Dim j

	Stringa = ""
	Record = CreaArrayDaTabella("Selezione.mdb", "Selezione")
	For i = 1 To UBound(Record,2) ' Record
		For j = 0 To UBound(Record,1)
			if (j <> 4 and j <> 5) then
				Stringa = Stringa & "&" & Record(j,0) & i & "=" & Record(j,i)
			Else
				Stringa = Stringa & "&live" & i & "=" & Record(4,i) & ", " & Record(5,i)
				j = 5
			End If
		Next
	Next
	Stringa = Stringa & "&limite=" & UBound(Record,2)
	StringaPerFlash = Stringa & "&caricato=1"
End Function


Sub AggiungiRecordDaVettore(Vettore,NomeDataBase,NomeTabella)
'Aggiunge a NomeTabella di NomDatabase i dati di Vettore(Campi,Valori)
	Dim objConn
	Dim strConn
	Dim objRstL
	Dim SQL
	Dim SQL_Campi
	Dim SQL_Valori
	Dim SQL_Read
	Dim Item
	Dim i
	Dim j
	SQL_Read = "SELECT * FROM " & NomeTabella	
	Set objConn  = Server.CreateObject("ADODB.Connection")
	strConn ="DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=" & Session("DataBaseFolder") & NomeDataBase
	objConn.Open strConn
		Set objRstL = Server.CreateObject("ADODB.Recordset")	
		objRstL.Open SQL_Read,objConn,1,2
			SQL = "INSERT INTO " & NomeTabella
			SQL_Campi = ""
			SQL_Valori = ""
			For i = 0 to UBound(Vettore,1)		
				For j = 0 To objRstL.Fields.Count - 1
					If (Vettore(i,0) = objRstL.Fields(j).Name) Then
						SQL_Campi = SQL_Campi & " " & Vettore(i,0) & ","
						SQL_Valori = SQL_Valori & "'" & ConvertiScrivi(Vettore(i,1)) & "',"
						Exit For
					Else
					End If
				Next
			Next
			SQL_Campi = Left(SQL_Campi, (Len(SQL_Campi)-1))
			SQL_Valori = Left(SQL_Valori, (Len(SQL_Valori)-1))
		objRstL.Close
		SQL = SQL & " (" & SQL_Campi & " ) VALUES (" & SQL_Valori & " );"
		objRstL.Open SQL,objConn,1,2
	objConn.Close
	Set objConn = Nothing
	Session("Mandata") = 1	
End Sub

Sub AggiornaRecordDaVettore(Vettore,NomeDataBase,NomeTabella,ID)
'Aggiorna in NomeTabella di NomeDatabase i dati di Vettore(Campi,Valori)
	Dim objConn
	Dim strConn
	Dim objRstL
	Dim SQL
	Dim SQL_Campi
	Dim SQL_Read
	Dim Item
	Dim i
	Dim j
	SQL_Read = "SELECT * FROM " & NomeTabella	
	Set objConn  = Server.CreateObject("ADODB.Connection")
	strConn ="DRIVER={Microsoft Access Driver (*.mdb)}; DBQ=" & Session("DataBaseFolder") & NomeDataBase
	objConn.Open strConn
		Set objRstL = Server.CreateObject("ADODB.Recordset")	
		objRstL.Open SQL_Read,objConn,1,2
			SQL = "UPDATE " & NomeTabella & " SET "
			SQL_Campi = ""
			For i = 0 to UBound(Vettore,1)		
				For j = 0 To objRstL.Fields.Count - 1
					If (Vettore(i,0) = objRstL.Fields(j).Name) Then
						SQL_Campi = SQL_Campi & " " & Vettore(i,0) & "=" & "'" & ConvertiScrivi(Vettore(i,1)) & "',"
						Exit For
					Else
					End If
				Next
			Next
			SQL_Campi = Left(SQL_Campi, (Len(SQL_Campi)-1))
		objRstL.Close
		SQL = SQL & SQL_Campi & "WHERE ID=" & ID
		objRstL.Open SQL,objConn,1,2
	objConn.Close
	Set objConn = Nothing
End Sub
%>