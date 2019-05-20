<%
// Registra matrice ANN
	TempPath=Server.MapPath("ANN.asp")
	TempPath = Left(TempPath,Len(TempPath)-7)
	TempStr = ""
	if 1 = 1 Then
		Set fs = CreateObject("Scripting.FileSystemObject") 
		Set fANN = fs.CreateTextFile(TempPath & "ANN_MATRIX.txt", True) 
		TempStr = "?"
		For n = 1 To Request.Form("DimGriglia")
			For m = 1 to Request.Form("DimGriglia")
				TempStr = TempStr & "J"& n & "[" & m & "]=" & Request.Form("J"& n & "[" & m & "]") & "&"
//				fANN.WriteLine("J"& n & "[" & m & "]=" & Request.Form("J"& n & "[" & m & "]"))
			Next
		Next 
		TempStr = Left(TempStr,Len(TempStr)-1)
		fANN.WriteLine(TempStr)
		fANN.Close
		Set fs = Nothing 
	else
		TempStr = "?"
		For n = 1 To Request.Form("DimGriglia") 
			For m = 1 to Request.Form("DimGriglia")
				TempStr = TempStr & "J"& n & "[" & m & "]=" & Request.Form("J"& n & "[" & m & "]") & "&"
//				Response.Write("J"& n & "[" & m & "]=" & Request.Form("J"& n & "[" & m & "]") & "<BR>")
			Next
		Next 
		TempStr = Left(TempStr,Len(TempStr)-1)
		Response.Write(TempStr)
	end if
// Registra Pattern
	if 1 = 1 Then
		Set fs = CreateObject("Scripting.FileSystemObject")
		Set fANN = fs.CreateTextFile(TempPath & "ANN_PATTERN.txt", True) 
		TempStr = "?NPattern=" & Request.Form("NPattern") & "&"
		For n = 1 To Request.Form("NPattern")
			For m = 1 to Request.Form("DimGriglia")
				TempStr = TempStr & "Pattern"& n & "[" & m & "]=" & Request.Form("Pattern"& n & "[" & m & "]") & "&"
//				fANN.WriteLine("J"& n & "[" & m & "]=" & Request.Form("J"& n & "[" & m & "]"))
			Next
		Next 
		TempStr = Left(TempStr,Len(TempStr)-1)
		fANN.WriteLine(TempStr)
		fANN.Close
		Set fs = Nothing 
	else
		TempStr = "?"
		For n = 1 To Request.Form("NPattern") 
			For m = 1 to Request.Form("DimGriglia")
				TempStr = TempStr & "Pattern"& n & "[" & m & "]=" & Request.Form("Pattern"& n & "[" & m & "]") & "&"
				Response.Write(TempStr & "<BR>")
			Next
		Next 
		TempStr = Left(TempStr,Len(TempStr)-1)
		Response.Write(TempStr)
	end if
	
		
%>