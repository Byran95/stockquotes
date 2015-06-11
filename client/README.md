Document all concepts and your implementation decisions.

#Flow of the program

The program starts with app.init(). There's test data, live data with WebSockets and the application can use Ajax to get it's data with JSON. 
By default the app uses test data.

To use WebSockets:
- Comment app.generateTestData() in the app.loop method;
- Uncomment //app.retrieveData( in the app.init method);

To use AJAX:
- Comment app.generateTestData() in the app.loop method;
- Uncomment //app.getDataFromAjax() in the app.loop method;

#Concepts
For every concept the following items:
- short description
- code example
- reference to mandatory documentation
- reference to alternative documentation (authoritive and authentic)

###Objects, including object creation and inheritance

#####Objects in Javascript
This code assigns a simple value (Fiat) to a variable named car:

    var car = "Fiat";

Objects are variables too. But objects can contain many values. This code assigns many values (Fiat, 500, white) to a variable named car:

    var car = {type:"Fiat", model:500, color:"white"};
    
The name:values pairs (in JavaScript objects) are called properties.

    var person = {firstName:"John", lastName:"Doe", age:50, eyeColor:"blue"};
    
Source: http://www.w3schools.com/js/js_objects.asp   

#####OO in Javascript

JavaScript is object-oriented to its core, with powerful, flexible OOP capabilities. JavaScript uses Prototypes to be able to use inheritance. 

    // Define the Person constructor
    var Person = function(firstName) {
      this.firstName = firstName;
    };
    
    // Add a couple of methods to Person.prototype
    Person.prototype.walk = function(){
      console.log("I am walking!");
    };
    
    Person.prototype.sayHello = function(){
      console.log("Hello, I'm " + this.firstName);
    };
    
    // Define the Student constructor
    function Student(firstName, subject) {
      // Call the parent constructor, making sure (using Function#call)
      // that "this" is set correctly during the call
      Person.call(this, firstName);
    
      // Initialize our Student-specific properties
      this.subject = subject;
    };
    
    // Create a Student.prototype object that inherits from Person.prototype.
    // Note: A common error here is to use "new Person()" to create the
    // Student.prototype. That's incorrect for several reasons, not least 
    // that we don't have anything to give Person for the "firstName" 
    // argument. The correct place to call Person is above, where we call 
    // it from Student.
    Student.prototype = Object.create(Person.prototype); // See note below
    
    // Set the "constructor" property to refer to Student
    Student.prototype.constructor = Student;
    
    // Replace the "sayHello" method
    Student.prototype.sayHello = function(){
      console.log("Hello, I'm " + this.firstName + ". I'm studying "
                  + this.subject + ".");
    };
    
    // Add a "sayGoodBye" method
    Student.prototype.sayGoodBye = function(){
      console.log("Goodbye!");
    };
    
    // Example usage:
    var student1 = new Student("Janet", "Applied Physics");
    student1.sayHello();   // "Hello, I'm Janet. I'm studying Applied Physics."
    student1.walk();       // "I am walking!"
    student1.sayGoodBye(); // "Goodbye!"
    
    // Check that instanceof works correctly
    console.log(student1 instanceof Person);  // true 
    console.log(student1 instanceof Student); // true

Source: MDN - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript

###WebSockets
WebSockets is a technology, based on the ws protocol, that makes it possible to establish a continuous full-duplex connection stream between a client and a server.  A typical websocket client would be a user's browser, but the protocol is platform independent. 

This simple example creates a new WebSocket, connecting to the server at ws://www.example.com/socketserver.

    var exampleSocket = new WebSocket("ws://www.example.com/socketserver", "protocolOne");
    
Sending a message to the server can be done once the connection is opened:
    
    exampleSocket.onopen = function (event) {
      exampleSocket.send("Here's some text that the server is urgently awaiting!"); 
    };
    
Messages can be received by onmessage:

    exampleSocket.onmessage = function (event) {
      console.log(event.data);
    }
    
Source: https://developer.mozilla.org/en-US/docs/WebSockets/Writing_WebSocket_client_applications
    
In the stockquotes app we use socket.io to manage our WebSockets connection. The code is in app.retrieveData(). Socket.io makes the use of
websockets a lot easier with a Node server and a javascript client.
    

###XMLHttpRequest
The XMLHttpRequest object is used to exchange data with a server behind the scenes.

It is used while retrieving data from AJAX. In my code this is this part:

     var xhr;
     xhr = new XMLHttpRequest();
     xhr.open("GET", app.settings.ajaxUrl); //url to open a connection to
     xhr.addEventListener("load", app.retrieveJSON); //callback function which handles the data
     xhr.send();
     
Source: http://www.w3schools.com/xml/xml_http.asp     

###AJAX

AJAX = Asynchronous JavaScript and XML.

AJAX is a technique for creating fast and dynamic web pages.

AJAX allows web pages to be updated asynchronously by exchanging small amounts of data with the server behind the scenes. This means that it is possible to update parts of a web page, without reloading the whole page.

Here's a image how AJAX works while sending a XMLHttpRequest:

![alt tag](http://www.w3schools.com/ajax/ajax.gif)

Source: http://www.w3schools.com/ajax/ajax_intro.asp

Here's a example of AJAX: This JavaScript will request an HTML document, test.html, which contains the text "I'm a test." and then we'll alert() the contents of the test.html file.

    <span id="ajaxButton" style="cursor: pointer; text-decoration: underline">
      Make a request
    </span>
    <script type="text/javascript">
    (function() {
      var httpRequest;
      document.getElementById("ajaxButton").onclick = function() { makeRequest('test.html'); };
    
      function makeRequest(url) {
        if (window.XMLHttpRequest) { // Mozilla, Safari, ...
          httpRequest = new XMLHttpRequest();
        } else if (window.ActiveXObject) { // IE
          try {
            httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
          } 
          catch (e) {
            try {
              httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } 
            catch (e) {}
          }
        }
    
        if (!httpRequest) {
          alert('Giving up :( Cannot create an XMLHTTP instance');
          return false;
        }
        httpRequest.onreadystatechange = alertContents;
        httpRequest.open('GET', url);
        httpRequest.send();
      }
    
      function alertContents() {
        if (httpRequest.readyState === 4) {
          if (httpRequest.status === 200) {
            alert(httpRequest.responseText);
          } else {
            alert('There was a problem with the request.');
          }
        }
      }
    })();
    </script>

###Callbacks

A callback is a reference to executable code, or a piece of executable code, that is passed as an argument to other code.

In my stockquotes app I used this to handle the data retrieved with AJAX:

    var xhr;
    xhr = new XMLHttpRequest();
    xhr.open("GET", app.settings.ajaxUrl); //url to open a connection to
    xhr.addEventListener("load", app.retrieveJSON); //callback function which handles the data
    xhr.send();
    
The callback function is this example is app.retrieveJSON:

    retrieveJSON: function (response) {
                var data;
                data = JSON.parse(response.target.responseText);
                app.parseData(data.query.results.row);
            },
            
This parses the JSON string to a JSON object and then parses it to the parseData method.
        
Source: http://recurial.com/programming/understanding-callback-functions-in-javascript/        

###How to write testable code for unit-tests

When writing testable code, which is testable you should take the following into account:

- Write the code cohesive. Because cohesive code creates strong test fixtures and short, simple tests.
- Creating loosely coupled code because classes can more easely be tested in isolation.
- Refactoring an un-testable piece of code to something testable
- Have functions return data so you can test this.
- Using dependency injections where it is appropriate.

Source: http://alistapart.com/article/writing-testable-javascript

