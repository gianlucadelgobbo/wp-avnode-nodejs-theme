<%mot = request.form("mesuser")
bot=request.form("bot")
 on error resume next
dim difmot(100)
dim difmoto(100)
dim conmot(100)
dim difcle (100)
dim difcleo(100)
famcomp = ""
nbmot=0
nbcle=0
clecomp=0
do
  if left(mot,1)=" " then
     mot = mid(mot,2)
  else
     exit do
   end if
loop
phr = replace(phr,"?"," ?")
z1="éèçàâêûîôäëïöù"
z2="eecaaeuioaeiou"
phr=mot
for x=1 to len(z1)
  phr=Replace(phr,mid(z1,x,1),mid(z2,x,1))
next
do
  if Instr(1,phr,"  ",0)= 0 then
     exit do
  else
     phr = replace(phr,"  "," ")
  end if
loop
  phr = Replace(Replace(Replace(Replace(Replace(phr,"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
Set OBJdbConnection = Server.CreateObject("ADODB.Connection") 
OBJdbConnection.Open "Driver={Microsoft Access Driver (*.mdb)}; DBQ=" & Server.MapPath("zonedata") & "\panobot.mdb;"

  SQLQuery = "SELECT * FROM motclefr WHERE motcle='" &phr&"'"
  Set RS = OBJdbConnection.Execute(SQLQuery)
  if rs.eof then
  else
     clecomp=Instr(1,phr," ",0)
     nbcle = nbcle+1
     difcle(nbcle)= phr
  end if
mot = Replace(Replace(Replace(Replace(mot,"."," "),","," "),"?"," "),"'"," ")
do
  if Instr(1,mot,"  ",0)= 0 then
     exit do
  else
     mot = replace(mot,"  "," ")
  end if
loop
do
  if right(mot,1)=" " then
     mot = Left(mot,Len(mot)-1)
  else
     exit do
   end if
loop
phrase = Replace(Replace(Replace(mot,"."," "),","," "),"?"," ")
do
  x= Instr(1,phrase," ",0)
  if x = 0 then
     nbmot=nbmot +1
     difmot(nbmot) = phrase
     exit do
  end if
  if instr(1,"tu je ne pas ne", Left(phrase,x-1)) = 0 then
     nbmot=nbmot +1
     difmot(nbmot)= Left(phrase,x-1)
  end if
  phrase = mid(phrase,x+1)
loop
if nbcle = 0 and nbmot >2 then
   depl = nbmot
  do
   prh =  Replace(Replace(Replace(Replace(Replace(difmot(depl-1),"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
   prh = prh & " " & Replace(Replace(Replace(Replace(Replace(difmot(depl),"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
  SQLQuery = "SELECT * FROM motclefr where motcle ='" &prh&"'"
  Set RS = OBJdbConnection.Execute(SQLQuery)
  if rs.eof then
  else
     clecomp=Instr(1,prh," ",0)

     nbcle = nbcle+1
     difcle(nbcle)= prh
     exit do
  end if
  depl = depl-1
  if depl < 2 then
     exit do
  end if
 loop
end if

if nbcle = 0 and nbmot >3 then
   depl = nbmot
  do
   prh =  Replace(Replace(Replace(Replace(Replace(difmot(depl-2),"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
   prh =  prh & " " & Replace(Replace(Replace(Replace(Replace(difmot(depl-1),"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
   prh = prh & " " & Replace(Replace(Replace(Replace(Replace(difmot(depl),"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
  SQLQuery = "SELECT * FROM motclefr where motcle ='" &prh&"'"
  Set RS = OBJdbConnection.Execute(SQLQuery)
  if rs.eof then
  else
     clecomp=Instr(1,prh," ",0)

     nbcle = nbcle+1
     difcle(nbcle)= prh
     exit do
  end if
  depl = depl-1
  if depl < 3 then
     exit do
  end if
 loop
end if

nbmotc=nbmot
for x = 1 to nbmot
    if  right(difmot(x),1)="s" then
       nbmotc=nbmotc+1
      difmot(nbmotc)= left(difmot(x),Len(difmot(x))-1)
   end if
next
nbmot=nbmotc
for x=1 to nbmot
   difmot(x) = Replace(Replace(Replace(difmot(x),".",""),",",""),"?","")
   difmoto(x)=difmot(x)
   difmot(x) = Replace(Replace(Replace(Replace(Replace(difmot(x),"%","%25"),"+","%2b"),"&","%26"),"'","%27"),chr(13),"%0d")
   for y=1 to len(z1)
     difmot(x)=Replace(difmot(x),mid(z1,y,1),mid(z2,y,1))
   next
'   if right(difmot(x),1)="s" then
'      difmot(x)= left(difmot(x),Len(difmot(x))-1)
'   end if
   SQLQuery = "SELECT * FROM motclefr WHERE motcle='" &difmot(x)&"'"
   Set RS = OBJdbConnection.Execute(SQLQuery)
  if rs.eof then
     SQLQuery = "SELECT * FROM inconnufr WHERE mot='" &difmot(x)&"'"
     Set RS = OBJdbConnection.Execute(SQLQuery)
     if rs.eof then
        SQLQuery= "insert INTO inconnufr (mot) "
        SQLQuery= SQLQuery & "VALUES( '" &difmot(x)&"')"
        Set RS = OBJdbConnection.Execute(SQLQuery)
     else
        nvuss=rs("nbdis")+1
        SQLQuery ="update inconnufr SET nbdis="&nvuss&" where mot='"&difmot(x)&"'"
        Set RS = OBJdbConnection.Execute(SQLQuery)
     end if        
  else
     nbcle = nbcle+1
     difcle(nbcle)= difmot(x)
     difcleo(nbcle)=difmoto(x)
  end if
next


bot_2=difmoto(1)
if nbcle >= 1 then
   if instr(1,difcle(1)," ",0) <> 0 then
      motd=difcle(1)
   else
     Randomize()
     n = int(rnd()*(nbcle-1))+1
     motd=difcle(n)
     bot_2=difcleo(n)
   end if
end if
if nbcle<1 then
   motd="inconnu au bataillon"
end if
mott=motd

dim re(500)
dim rea(500)
SQLQuery = "SELECT * FROM motclefr WHERE motcle='" &mott&"'"
Set RS = OBJdbConnection.Execute(SQLQuery)
' Recherche simple du mot
'
if not rs.eof then
famille=rs("cat")
j="ca"&famille
jj=right("00000"&rs("nidc"),5)
v=rs("nbuse")+1
SQLQuery ="update motclefr SET nbuse="&v&" where motcle='" &mott&"'"
Set RS = OBJdbConnection.Execute(SQLQuery)

SQLQuery = "SELECT * FROM reponsefr WHERE num='" &j&"'"
Set RS = OBJdbConnection.Execute(SQLQuery)
nbr = 0
znidr=rs("nidr")
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

SQLQuery = "SELECT * FROM reponsefr WHERE num='" &jj&"'"
Set RS = OBJdbConnection.Execute(SQLQuery)
if not rs.eof then
nbr = 0
famcomp="_"&jj
znidr=rs("nidr")
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

' Rs.Close
zrndt=request.form("_b"&znidr)
if zrndt <1  then
  Randomize()
 zrnd = Int(rnd()*(nbr-1))+1
else
zrnd=zrndt+1
end if
if zrnd>nbr then
   zrnd = 1
end if
n=zrnd
' rep=Replace(re(n),"@3",bot)
rep=Replace(Replace(re(n),"@3",bot),"@2",bot_2)
botrea=rea(n)
valrea="vrea"&famille&famcomp
valreaction=request.form(valrea)+1
if Instr(1,"090 091 240 300 310 320",famille,0) >0 or clecomp> 0 then
   valreaction=0
end if
if nbr <> 0 then
   maxrea = nbr
end if
if valreaction > nbr+3 then
   valreaction = 1
end if
if valreaction > nbr then
jj="re"&famille
SQLQuery = "SELECT * FROM reponsefr WHERE num='" &jj&"'"
Set RS = OBJdbConnection.Execute(SQLQuery)
if not rs.eof then
   znidr=rs("nidr")
   zrnd=request.form("_b"&znidr)+1
nbr = 0
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
else

nbr=0
for x=1 to 9
jj="re"&right("000"&x,3)
SQLQuery = "SELECT * FROM reponsefr WHERE num='" &jj&"'"
Set RS = OBJdbConnection.Execute(SQLQuery)
if not rs.eof then
   znidr=rs("nidr")
   zrnd=request.form("_b"&znidr)+1
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

end if
Randomize()
zrndt=request.form("_b"&znidr)
if zrndt <1  then
  Randomize()
 zrnd = Int(rnd()*(nbr-1))+1
else
zrnd=zrndt+1
end if
if zrnd>nbr then
   zrnd = 1
end if
n=zrnd
'n = Int(rnd()*(nbr-1))+1
' rep=Replace(re(n),"@3",bot)
rep=Replace(Replace(re(n),"@3",bot),"@2",bot_2)
botrea=rea(n)
end if
else

nbr = 0
for x=1 to 99
j="al"&right("000"&x,3)
SQLQuery = "SELECT * FROM reponsefr WHERE num='" &j&"'"
Set RS = OBJdbConnection.Execute(SQLQuery)
if not rs.eof then
if nbr = 0 then
   znidr=rs("nidr")
   zrnd=request.form("_b"&znidr)+1
end if

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
' rs.close
next
zrndt=request.form("_b"&znidr)
if zrndt <1  then
  Randomize()
 zrnd = Int(rnd()*(nbr-1))+1
else
zrnd=zrndt+1
end if
if zrnd>nbr then
   zrnd = 1
end if
n=zrnd
rep=Replace(Replace(re(n),"@3",bot),"@2",bot_2)
botrea=rea(n)

end if ' fin recherche mot
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
   if za<> 0 then
   rep1=Mid(rep,za+1)
   rep = Left(rep,za-1)
   end if
end if
response.write("&_b"&znidr&"="&zrnd&"&rep=" & rep&"&rep1="& rep1 & "&botrea=" & botrea & "&"&valrea&"="&valreaction & "&bot=" & bot & "&okbot=ok"&n)
rs.close
%>
