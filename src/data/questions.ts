export interface Question {
	type: 'IMAGE' | 'TEXT' | 'CODE' | 'CODEMULTIPLE' | 'IMAGEBIG';
	data: string;
    data1?:string;
    data2?:string;
	imagePath?: string;
	code?: string;
	code1?: string;
	code2?: string;
	answers: string[];
	questions: {
		[key: string]: string;
	};
}

export default [
	{
		type: 'CODE',
		data: `In ceea ce priveste comunicarea IPC (Inter Process Communication for Multi-tenancy), specificati ce se intampla in urmatorul cod sursa in C++?`,
		code: `
        #include <iostream>
        #include <string>
        #include <stdio.h>
        #include <sys/types.h>
        #include <unistd.h>
        using namespace std;
        int globalVariable = 2;
        int main()
        {
            string sIdentifier;
            int iStackVariable = 20;
            pid_t pID = fork();
            if (pID == 0)
            {
                sIdentifier = "Child Process: ";
                globalVariable++;
                iStackVariable++;
            }
            else if (pID < 0)
            {
                cerr << "Failed to fork" << endl;
                return 1;
            }
            else
            {
                sIdentifier = "Parent Process: ";
            }
            cout << sIdentifier << endl;
            cout << "Global variable: " << globalVariable;
            cout << "Stack variable: " << iStackVariable << endl;
            return 0;
        }`,
		answers: ['a'],
		questions: {
			a: 'Programul compileaza cu g++ si ruleaza sub Linux in doua procese si afiseaza:\nParent Process:\nGlobal variable: 2 Stack variable: 20\nChild Process:\nGlobal variable 3: Stack variable 21',
			b: "Programul nu compileaza cu g++ sub Linux, dar nu ruleaza – 'segmentation fault'",
			c: 'Programul nu compileaza cu g++ sub Linux',
			d: 'Niciun raspuns corect',
			e: 'Programul compileaza cu g++ si ruleaza sub Linux intr-un singur proces si afiseaza:\nParent Process:\nGlobal variable: 2 Stack variable: 20\nChild Process:\nGlobal variable 3: Stack variable 21'
		}
	},
	{
		type: 'IMAGE',
		data: `Care este afirmatia adevarate pentru Java RMI 1.1 in cee ace priveste ordinea actiunilor?`,
		imagePath: `question2.png`,
		answers: ['d'],
		questions: {
			a: '1. lookup, 2. bind, 3. call, 4. Return',
			b: '1. call, 2. return, 3. bind, 4. Lookup',
			c: '1. lookup, 2. call, 3. bind, 4. Return',
			d: '1. bind, 2. lookup, 3. call, 4. Return',
			e: '1. call, 2. lookup, 3. bind, 4. return'
		}
	},
	{
		type: 'CODE',
		data: `In OpenMPI, ce afiseaza procesorul 0?`,
		code: 
        `
#include "mpi.h"
#include <stdio.h>
 
int main(int argc, char *argv[]) {
    int rank, sendbuf, recvbuf, numtasks;
    MPI_Status status;
    MPI_Request request;
    
    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM_WORLD, &rank);
    MPI_Comm_size(MPI_COMM_WORLD, &numtasks);
    sendbuf = rank;
    
    if (rank) {
        MPI_Isend(&sendbuf, 1, MPI_INT, 0, 32766, MPI_COMM_WORLD, &request);
        sendbuf = 4;
        MPI_Recv(&recvbuf, 1, MPI_INT, 0, MPI_ANY_TAG, MPI_COMM_WORLD, &status);
    } else {
        MPI_Isend(&sendbuf, 1, MPI_INT, 1, 32766, MPI_COMM_WORLD, &request);
        sendbuf = 8;
        MPI_Recv(&recvbuf, 1, MPI_INT, 1, MPI_ANY_TAG, MPI_COMM_WORLD, &status);
    }
    
    printf("me: %d, them: %d\n", rank, recvbuf);
    MPI_Finalize();
}
        `,
		answers: ['c'],
		questions: {
			a: 'me: 1 them: 0',
			b: 'me: 0, them: 1 SAU me: 0, them: 8',
			c: 'me: 0, them: 1',
			d: 'me: 0, them: 8',
			e: 'me: 1, them: 0 SAU me: 0, them: 8'
		}
	},
	{
		type: 'CODE',
		data: `Pentru Java/Jakarta EE, ce afiramtie este adevarata tinand cont de urmatorul cod sursa in ceea ce priveste JMS – Java Messaging Service API?`,
		code: 
        `
package eu.ase.jms;
 
import javax.jms.*;
import javax.naming.*;
 
public class QueueReceiver {
    public static void main(String[] args) {
 
        String queueName = null;
        Context jndiContext = null;
        QueueConnectionFactory queueConnectionFactory = null;
        QueueConnection queueConnection = null;
        QueueSession queueSession = null;
        Queue queue = null;
        QueueReceiver queueReceiver = null;
        TextMessage message = null;
 
        queueName = new String("queue/testQueue");
 
        try {
            jndiContext = new InitialContext();
        } catch (NamingException e) {
            System.out.println("Could not create JNDI APT " + "context:" + e.toString());
            System.exit(1);
        }
 
        try {
            queueConnectionFactory 
                = (QueueConnectionFactory)jndiContext.lookup("UILConnect ionFactory") ;
            queue = (Queue) jndiContext.lookup(queueName);
        } catch (NamingException e) {
            System.out.println("JNDI APT lookup failed: " + e.toString());
            System.exit(1);
        }
 
        try {
            queueConnection = queueConnectionFactory. createQueueConnection();
            queueSession = queueConnection.createQueueSession(false, Session.AUTO_ACKNOWLEDGE);
            queueReceiver = queueSession.createReceiver(queue);
            queueConnection.start();
 
            while (true) {
                Message m = queueReceiver.receive(1);
                if (m != null) {
                    if (m instanceof TextMessage) {
                        message = (TextMessage) m;
                        System.out.println("Reading message: " + message.getText());
                    } else {
                        break;
                    }
                }
            }
        } catch (JMSException e) {
            System.out.println("Exception occurred: " + e.toString());
        } finally {
            if (queueConnection != null) {
                try {
                    queueConnection.close();
                } catch (JMSException e) {}
            }
        }
    }
}
        `,
		answers: ['a', 'd'],
		questions: {
			a: 'Programul client consuma/primeste mesaje de al o coada de server Java EE si intrerupe bucla infinita daca si numai daca primeste un mesaj non-text',
			b: 'Niciun raspuns',
			c: 'Programul client consuma/primeste mesaje de la o coada de server Java EE si intrerupe bucla pentru totdeauna',
			d: 'Codul sursa este compatibil cu API-ul JMS',
			e: 'Programul client consuma/primeste mesaje de la o coada de server Java EE si intrerupe bucla infinita daca si numai daca primeste un mesaj text'
		}
	},
	{
		type: 'CODE',
		data: `Cu privire la JS, va rugam sa indicati care declaratie este corecta pentru urmatorul cod sursa`,
		code: 
        `
var http = require('http');
var options = {
    hostname: '172.22.14.90',
    port: '8080',
    path: '/S09/ShowSession',
    method: 'GET',
    headers: {'Cookie': 'JSESSIONID=5E4C30AA307BA81ABBE5859612E12FA5', },
};
var results = '';
var req = http.request(options, function(res) {
    res.on('data', function (chunk) {
        results = results + chunk;
        console.log(results);
    });
    res.on('end', function () {
        console.log('end response result');
    });
});
 
req.on('error', function(e) {
    console.log('error:' + e);
 
});
req.end();
        `,
		answers: ['e'],
		questions: {
			a: 'Acest cod sursă JavaScript/ECMAScript/nodejs nu este o functionalitate de deturnare a sesiunii pentru cookie-ul "JSESSIONID" cu valoarea: 5E4C30AA307BA81ABBE5859612E12FA5 pentru sendetul ShowSession din contextul URI S09',
			b: 'Acest cod sursă JavaScript/ECMAScript/node.js este o funcționalitate de deturnare a sesiunii pentru cookie-ul "JSESSIONID" cu valoarea: 5E4C38AA3078481885859612E12FAS',
			c: 'Acest cod are erori specifice JavaScript/ECMAScript/node.js',
			d: 'Niciun raspuns corect',
			e: 'Acest cod sursă JavaScript/ECMAScript/node.js este o functionalitate de deturnare a sesiunii pentru cookie-ul "JSESSIONID" cu valoarea: 5E4C30AA307BA81ABBE5859612E12FA5 pentru servletul ShowSession din contextul URI S09'
		}
	},
	{
		type: 'TEXT',
		data: `Pentru OpenMP, care este răspunsul cel mai corect despre trimiterea pachetelor in mod neblocant, adică MPI_Isend(...)?`,
		answers: ['d'],
		questions: {
			a: 'MPI_test poate fi folosit pentru a bloca procesul până la finalizarea trimiterii.',
			b: 'Niciun raspuns.',
			c: 'MPI_init poate fi folosit pentru a bloca procesul până la finalizarea trimiterii.',
			d: 'MPI_wait poate fi folosit pentru a bloca procesul până la finalizarea trimiterii.',
			e: 'De îndată ce trimiterea este finalizata, datele trimise pot fi modificate de catre procesul expeditor.'
		}
	},
	{
		type: 'CODEMULTIPLE',
		data: `Indicati care afirmatie este corecta tinand cont de analiza comunicatiei dint raficul de retea HTTP dintre Internet Web Browser - Mozilla Firefox/Chrome si servletul care ruleaza in containerul de servlet al serverlului web Apache Tomcat`,
        code: 
        `
GET /S09/ShowSession HTTP/1.1 
Accept: */*
Accept-Language: ro
UA-CPU: x86
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0
Host: 192.168.100.19:8080 
Connection: Keep-Alive
Cookie: CookieIon=IONIONION
 
HTTP/1.1 200 OK
Server: Apache-Coyote/1.1
Set-Cookie: JSESSIONID=CBC58386A4014F02F2C3F4F0895BB9E3; Path=/S09
Content-Type: text/html
Content-Length: 547
Date: Tue, 07 Apr 2009 11:42:32 GMT
 
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
<HEAD><TITLE>Show Session</TITLE></HEAD>

        `,
        data1: `Stiindu-se ca sursa Java a servletului pentru tratarea metodei HTTP GET sau POST este:`,
        code1: 
        `
public void processRequest (HttpServletRequest request, HttpServletResponse response) {
    HttpSession session request.getSession(true);
    response.setContentType("text/html");
    Printwriter out = response.getwriter();
    string title = "show Session";
    String heading;
    Integer accessCount = new Integer(0);
} if (session.isNew()) {
    heading = "Welcome, Newcomer";
    session.setAttribute("accessCount", accesscount);
} else {
    console.log("something something");
}
        `,
        data2: `Să se specifice in acest context care afirmație este cea mai complet adevărată:`,
		answers: ['b'],
		questions: {
			a: 'Servletul cu numele SHowSession din contextul S09 expus de server cu IP: 192.168.100.19 si portul: 8080, a procesat ramura "else" in cadrul metodei "processRequest"',
			b: 'Servletul cu numele ShowSession din contextul S09 expus de server cu IP: 192.168.100.19 si portul: 8080, a executat ramura TRUE a instructiunii "if(session.isNew())" din metoda "processRequest" si stabilit "cookie": JSESSIONID=CBC5... pentru stocarea atributului "accessCount" in cadrul sesiunii de conexiune asociata cookie-ului HTTP JSESSIONID. Atributul "accessCount" este vizibil numai pentru clientul care creeaza cererea initiala HTTP GET catre servlet.',
			c: 'Servletul cu numele ShowSession din contextul S09 expus de server cu IP: 192.168.100.19 si portul: 8080, a executat ramura TRUE a instructiunii "if(session.isNew())" din metoda "processRequest" si stabilit "cookie": JSESSIONID=CBC5... pentru stocarea atributului "accessCount" in cadrul sesiunii de conexiune asociata cookie-ului HTTP JSESSIONID. Atributul "accessCount" este vizibil numai pentru toti clientii care se conecteaza folosind cereri HTTP GET si POST la servlet.',
			d: 'Servletul cu numele ShowSession din contextul S09 expus de server cu IP: 192.168.100.19 si portul: 8080, a executat ramura TRUE a instructiunii "if(session.isNew())" din metoda "processRequest" si aceasta setati "cookie": CookieIon=IONIONION pentru stocarea variabilei "accessCount" in cadrul sesiunii de conectare. Variabila "accesCount" este vizibila pentru fiecare client care efectueaza o solicitare HTTP GET catre servlet.',
			e: 'Servletul cu numele ShowSession din contextul S09 expus de server cu IP: 192.168.100.19 si portul: 8080, a executat ramura TRUE a instructiunii "if(session.isNew())" din metoda "processRequest" si stabilit "cookie": JSESSIONID=CBC5... pentru stocarea atributului "accessCount" in cadrul sesiunii de conexiune asociata cookie-ului HTTP JSESSIONID. Atributul "accessCount" este vizibil numai pentru toti clientii care se conecteaza folosind cereri HTTP GET la servlet.'
		}
	},
	{
		type: 'CODE',
		data: `Cu privire la JS pentru aplicatii de tip server, va rugam sa indicati care declaratie este corecta?`,
        code: 
        ` 
var http = require("http"),
  url = require("url"),
  path = require("path"),
  fs = require("fs"),
  port = process.argv[2] || 8888;
 
const requestHandler = (request, response) => {
  console.log(request.url);
  var uri = url.parse(request.url).pathname,
    filename = path.join(process.cwd(), uri);
 
  fs.exists(filename, function (exists) {
    if (!exists) {
      response.writeHead(404, { "Content-Type": "text/plain" });
      response.write("404 Not Found\\n");
      response.end();
      return;
    }
 
    if (fs.statSync(filename).isDirectory()) filename += "/index.html";
 
    fs.readFile(filename, "binary", function (err, file) {
      if (err) {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.write(err + "\\n");
        response.end();
        return;
      }
 
      response.writeHead(200);
      response.write(file, "binary");
      response.end();
    });
  });
};
 
const server = http.createServer(requestHandler);
 
server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
 
    console.log("server is listening on \${port}")
    console.log("Static file Node.js Server running at\\n http://localhost:" + port + "/\\nCTRL + C to shutdown");
 
});
        `,
		answers: ['a'],
		questions: {
			a: 'Programul JavaScript/ECMAScript/nodejs este un HTTP-TCP web server minimalist.',
			b: 'Programul JavaScript/ECMAScript/nodejs este un HTTP-TCP web server minimalist ce este capabil sa ruleze bytecode Java.',
			c: 'Programul JavaScript/ECMAScript/nodejs este un HTTP-UDP web server minimalist.',
			d: 'Programul prezinta erori specifice JavaScript/ECMAScript/node.js',
			e: 'Programul JavaScript/ECMAScript/nodejs deschide un socket TCP sau UDP.'
		}
	},
	{
		type: 'CODE',
		data: `Pentru OpenMPI, alegeti raspunsul cel mai complet atunci cand functia MPI_Recv unde if(rank == 2) este executata:`,
        code:
        `
#include "mpi.h"
#include <stdio.h>
int main(int argc, char *argv[])
{
    int rank, sendbuf, recvbuf, numtasks;
    MPI_Status *status;
    MPI_Request *request;
    MPI_Init(&argc, &argv);
    MPI_Comm_rank(MPI_COMM WORLD, &rank);
    MPI_Comm_size(MPI_COMM WORLD, &numtasks);
    sendbuf = rank;
    if (rank == 0)
    {
        MPI_Send(&sendbuf, 1, MPI_INTEGER, 2, 0, MPI_COMM_WORLD);
        MPI_Send(&sendbuf, 1, MPI_INTEGER, 2, 10, MPI_COMM_WORLD);
    }
    else if (rank == 1)
    {
        MPI_Send(&sendbuf, 1, MPI_INTEGER, 1, 1, MPI_COMM_WORLD);
    }
    else if (rank == 2)
    {
        MPI_Recv(recvbuf, 1, MPI_INTEGER, 0, MPI_ANY_TAG, MPI_COMM_WORLD, status);
    }
    printf("me: %d, them: %d\n", rank, recvbuf);
    MPI_Finalize();
}
        `,
		answers: ['b'],
		questions: {
			a: 'Functia va primi primul mesaj cu eticheta (tag) "1" trimis de procesorul 1.',
			b: 'Functia va primi primul mesaj cu eticheta (tag) "0" trimis de procesorul 0.',
			c: 'Niciun raspuns.',
			d: 'Functia va primi primul mesaj cu eticheta (tag) "1" trimis de procesorul 0.',
			e: 'Functia va primi primul mesaj cu eticheta (tag) "10" trimis de procesorul 0'
		}
	},
	{
		type: 'CODE',
		data: `Cu privire la JS pentru aplicatii de tip server, va rugam sa indicati care declaratie este corecta?`,
        code:
        `
var express = require("express");
var app = express();
var fs = require("fs");
 
app.get("/listUsers", function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
        console.log(data);
        res.end(data);
    });
})
 
var user = {
    "user4" : {
        "name" : "u4",
        "password" : "password4",
        "profession" : "teacher",
        "id" : 4
    }
}
 
app.post("/addUser", function (req, res) {
    // First read existing users.
    fs.readFile(__dirname + "/" + "users.json", "utf8", function (err, data) {
        data = JSON.parse(data);
        data["user4"] = user["user4"];
        console.log(data);
        res.end(JSON.stringify(data));
    });
})
 
var server = app.listen(8081, function() {
    var host = server.address().address;
    var port = server.address().port;
 
    console.log("Example app listening at https://%s:%s", host, port);
})
        `,
		answers: ['a'],
		questions: {
			a: 'Acest cod sursă JavaScript / ECMAScript / node.js este pentru un server HTTP-TCP care se leagă la portul 8081 si raspunde la solicitările de serviciu REST.',
			b: 'Acest cod sursă JavaScript / ECMAScript / node.js este pentru un server HTTP-UDP care se leagă la portul 8081 si raspunde la solicitările de serviciu REST.',
			c: 'Acest cod sursă JavaScript / ECMAScript / node.js este pentru un server TCP care asculta in portul 8081 si raspunde la solicitarile de servicii web  - SOAP (Simple Objects Access Protocol).',
			d: 'Acest cod sursă JavaScript / ECMAScript / node.js este pentru un server UDP care asculta in portul 8081 si raspunde la solicitarile de servicii web  - SOAP (Simple Objects Access Protocol).',
			e: 'Codul prezinta erori specifice JavaScript / ECMAScript / node.js'
		}
	},
	{
		type: 'CODE',
		data: `In ceea ce priveste comunicarea IPC (Inter Process Communication for Multi-tenancy), specificati ce se intampla in urmatorul cod sursa in C (salvat in t1.c)? (compilat cu urmatoarea linie: gcc -o t1.elf64 t1.c - lpthread)`,
		code: 
        `
#include <stdio.h>
#include <stdlib.h>
#include <pthread.h>
 
void *functionC();
pthread_mutex_t mutex1 = PTHREAD_MUTEX_INITIALIZER;
int counter = 0;
int main()
{
    int rc1, rc2;
    pthread_t thread1, thread2;
 
    if ((rc1 = pthread_create(&thread1, NULL, &functionC, NULL)))
    {
        printf("Thread creation failed: %d\\n", rc1);
    }
 
    if ((rc2 = pthread_create(&thread2, NULL, &functionC, NULL)))
    {
        printf("Thread creation failed: %d\\n", rc2);
    }
 
    pthread_join(thread1, NULL);
    pthread_join(thread2, NULL);
 
    return 0;
}
 
void *functionC()
{
    pthread_mutex_lock(&mutex1);
    counter++;
    printf("Counter value: %d\\n", counter);
    pthread_mutex_unlock(&mutex1);
}  
        `,
		answers: ['d', 'e'],
		questions: {
			a: 'Programul compileaza cu gcc si ruleaza sub Linux si creeaza doua procese, fiecare cu cate un fir de executie ce afiseaza: Counter value: 1, Counter value: 2',
			b: 'Programul compileaza cu gcc si ruleaza sub Linux si creaza un proces cu doua fire de executie care nu sunt sincronizate ce afiseaza: Counter value: 1, Counter value: 2 SAU Counter value: 1, Counter value: 1',
			c: 'Niciun raspuns corect',
			d: 'Programul poate fi compilat cu gcc sub Linux',
			e: 'Programul poate rula sub Linux si creeaza un proces cu doua fire de executie ce afiseaza: Counter value: 1, Counter value: 2'
		}
	},
	{
		type: 'CODE',
		data: '-	In ceea ce priveste comunicarea IPC (Inter Process Communication for Multi-tenancy), specificati despre ce este orba in urmatorul cod sursa in C',
		code: 
        `
#include <stdio.h>
#include <stdlib.h>
#include <errno.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>
 
int main()
{
    pid_t pid;
    int rv;
 
    switch (pid = fork())
    {
    case -1:
        perror("fork"); /* something went wrong */
        exit(1);        /* parent exists */
 
    case 0:
        printf(" CHILD: This is the child process!\\n");
        printf(" CHILD: My PID is %d\\n", getpid());
        printf(" CHILD: My parent's PID is %d\\n", getppid());
        printf(" CHILD: Enter my exit status (make it small): ");
        scanf("%d", &rv);
        printf(" CHILD: I'm outta here!\\n");
        exit(rv);
 
    default:
        printf(" PARENT: This is the parent process!\\n");
        printf(" PARENT: My PID is %d\\n", getpid());
        printf(" PARENT: My child's PID is %d\\n", pid);
        printf(" PARENT: I'm now waiting for my child to exit()...\\n");
        wait(&rv);
        printf(" PARENT: My child's exit status is: %d\\n", WEXITSTATUS(rv));
        printf(" PARENT: I'm outta here!\\n");
    }
}
        `,
        answers: ['a'],
		questions: {
			a: 'Niciun raspuns din cele existente',
			b: 'Programul in C compileaza cu GCC si ruleaza pe Linux si creaza un singur proces',
			c: 'Programul in C compileaza cu GCC si ruleaza pe Linux, dar nu afiseaza nimic, se blocheaza',
			d: 'Programul in C nu compileaza cu GCC pe Linux',
			e: 'Programul in C compileaza cu GCC pe Linux, dar nu ruleaza'
		}
	},
	{
		type: 'TEXT',
		data: 'In ceea ce priveste comunicarea IPC(Inter Process Communication for Multi-tenancy) ce modele sunt utilizate?',
		answers: ['a'],
		questions: {
			a: 'Memorie partajata (shared memory) si trimitere de mesaje (message passing)',
			b: 'Niciun raspuns corect',
			c: 'Salvarea datelor in baza de date (database storage)',
			d: 'Doar trimiterea de mesaje (message passing)',
			e: 'Doar memorie partajata (shared memory)'
		}
	},
	{
		type: 'TEXT',
		data: 'In OpenMPI, cand este finalizata functia/rutina MPI_Recv()?',
		answers: ['d'],
		questions: {
			a: 'Dupa sosirea mesajului pe care rutina il asteapta, dar inainte ca datele sa fie colectate',
			b: 'Imediat',
			c: 'Niciodata',
			d: 'Dupa sosirea mesajului pe care rutina il asteapta si dupa ce datele sunt colectate',
			e: 'Dupa un timp specificat in rutina'
		}
	},
	{
		type: 'IMAGEBIG',
		data: 'Tinand cont de faptul ca la deplasament (offset) 0x44 in analiza traficului SNMP – Simple Network Management Protocol (pentru gestionarea nodurilor din cadrul sistemului distribuit) este identificatorul de obiect (OID) si stiind ca in ASN.1 DER tag-ul pentru definirea OID-urilor (Object Identifier) este 0x06, ce OID este monitorizat?',
		imagePath: `wireshark.png`,
        answers: ['d'],
		questions: {
			a: '1.3.6.1.2.1.1.3.5.0',
			b: 'Niciun raspuns',
			c: '1.3.6.1.2.1.1.3.5',
			d: '1.3.6.1.2.1.1.3',
            e: '1.3.6.1.2.1.1.5.0.0'
		}
	}
] as Question[];
