# Guest Maps

![Logo](http://u.cubeupload.com/kikokiko/LogotypePrimary.png)

* App detects users location (from browser or IP)
* Guests of the website can elave a message
* A pin will be added to the map with the users location and message 

## TODO

* [ x ] create-react-app
* [ x ] Install react-leaflet: https://github.com/PaulLeCam/react-leaflet
* [ x ] Get a map on the page 
* [ x ] Get the users location
  * [ x ] with the browser
  * [ x ] with their IP using an API
* [ x ] Show a pin at the users location
* [ x ] Show a form to submit a message
  * when form is submitted - POST /message
* [ x ] Setup server with create-express-api: https://www.npmjs.com
* [ x ] Add monk and joi
* [ x ] POST /messages
  * latitude
  * longitude
  * name
  * message
  * datetime
* [ X ] When the page loads get all messages
  * [ X ] GET /messages
* [ x ] Add pins to the map
* [ x ] Click a pin to send the message
* DEPLOY! 
  * https://guestmaps.netlify.com
* Refactor React app
  * seperate componets
  * seperate file for API requests
  * seperate file for Location requests 

## Stretch
* [ ] Allow user to drag pin
* [ ] Login
* [ ] Users have their own guest map with their own markers and unique URL
