# Guest Maps

![Logo](http://cubeupload.com/im/kikokiko/LogotypePrimary.png)

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
* [ ] Add monk and joi
* [ ] POST /messages


## Stretch
* [ ] Allow user to drag pin
* [ ] Login
* [ ] Users have their own guest map with their own markers and unique URL
