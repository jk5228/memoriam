f = open("memorials.json", 'w')
memorials = open("Memorials.txt", 'r')

f.write('{ "memorials" : [\n')

for i in range(70):
	line = memorials.readline() #Get name
	if line == "":
		break
	lineSpaced = line.split(' ')
	print line

	#print "Blank"
	line = memorials.readline() #Skip blank
	#print line
	line = memorials.readline()

	memorialTx = ""
	while line != "\n":
		memorialTx += line
		line = memorials.readline()

	#print "Blank"
	#print line

	f.write('{ "firstName":"')
	f.write(lineSpaced[0])
	f.write('" , "lastName":"')
	f.write(lineSpaced[1][:-1])
	f.write('", "memorial":"')
	f.write(memorialTx[:-1])
	f.write('" },\n')


f.write("]}")
f.close()
