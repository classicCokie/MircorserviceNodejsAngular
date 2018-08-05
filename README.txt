##DIRECTORY STRUCTURE
 - Find all Frontend Code in folder Frontend.
 - Find all Services in Backend folder
 - Gatewayservice inside Gateway folder

##IMPORTANT FILES 

###FOR THE GATEWAY
---------------
 Backend -> Gateway -> api-gateway_routes -> here the two files condition_routes.js and condition_websockets.js
    -> they are the REST and WebSocket setup.
 Backend -> Gateway -> api-gateway_routes -> modules -> here EventWebSocket.js and measured_request.js
    -> they are the classes used by the the two files mentioned above.

###FOR THE SERVICES
---------------
  Backend -> TextService1 -> conditions ->here the two files condition_routes.js and condition_websockets.js
  Backend -> TextService1 -> conditions -> modules -> here EventWebSocket.js and measured_request.js
      -> they are the classes used by the the two files mentioned above.

  The structure repeats itself for every service except the third one, which is the last instance in the forwarding chain of services.
  In this service there is no module folder as it is not needed.

##NEEDED CUSTOMIZATIONS
In order for the application to work properly please not that you have to change the URLs to values that match you system.

Backend/Gateway/api-gateway_routes/condition_routes.js
-> line 10 to 12
-> line 44
Backend/Gateway/api-gateway_routes/condition_websocket.js
-> line 8 to 10
Backend/TextService1/conditions/condition_routes.js
-> line 23
Backend/TextService1/conditions/condition_websocket.js
-> line 8
Backend/TextService2/conditions/condition_routes.js
-> line 23
Backend/TextService2/conditions/condition_websocket.js
-> line 8

Also every main index.js file holds the address of the mongoDB database which the service connects to.
Please alter the url to point to your respective database.

##STARTING THE FRONTEND
(assuming you have node.js and npm installed)
switch into the Frontend directory and type:

npm install

After installing finished type:

npm start


##STARTING THE Backend
(assuming you have node.js and npm installed)
The setps are the same for every service.
Switch into the Service Folder and type

node index.js
