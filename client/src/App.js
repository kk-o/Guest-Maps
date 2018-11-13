import React, {
  Component
} from 'react';

import Joi from 'joi';

import { 
  Card,
  Form,
  Input,
  Label, 
  Button, 
  CardTitle, 
  CardText } from 'reactstrap';

import userLocationURL from './user_location.svg';
import messageLocationURL from './message_location.svg';

import {
  Map,
  TileLayer,
  Marker,
  Popup
} from 'react-leaflet';

import L from 'leaflet';

import './App.css';

const myIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [50, 82],
  iconAnchor: [0, 82],
  popupAnchor: [25, -82]
});

const messageIcon = L.icon({
  iconUrl: messageLocationURL,
  iconSize: [50, 82],
  iconAnchor: [25, 82],
  popupAnchor: [0, -82]
});

const schema = Joi.object().keys({
  name: Joi.string().min(1).max(500).required(),
  message: Joi.string().min(1).max(500).required(),
});

const API_URL = window.location.hostname === 'localhost' ? 'https://localhost:5000/api/v1/messages' : 'production-url-here'


class App extends Component {
  state = {
    location: { // set default map position is in london
      lat: 51.505,
      lng: -0.09,
    },
    haveUsersLocation: false,
    zoom: 2, // start map zoomed very far out
    userMessage: {
      name: '',
      message: ''
    },
    sendingMessage: false,
    sentMessage,
    messages: []
  }

  // here we ask the user's permission to retrieve their location
  // we then save their lat + lng into our state 
  componentDidMount() { 
    fetch(API_URL)
      .then(res => res.json())
      .then(messages => {
        const messagesByLocation = {};
        messages = messages.reduce((all, message) => {
          
        }, []);

        this.setState({
          messages,
        });
      });

    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        location: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        },
        haveUsersLocation: true,
        zoom: 13
      });
    }, 
      // if the user denies us permission to access their location
      // then, fall back to finding the users location via IP address
      () => {
      console.log('uh oh.. no location permissions were given');
      fetch('https://ipapi.co/json')
        .then(res => res.json())
        .then(location => {
          console.log(location);
          this.setState({
            location: {
              lat: location.latitude,
              lng: location.longitude
            }
          })
        })
    });
  }

  formIsValid = () => {
    const userMessage = {
      name: this.state.userMessage.name,
      message: this.state.userMessage.message
    };
    const result = Joi.validate(userMessage, schema);

    return !result.error && this.state.haveUsersLocation ? true : false;
  }

  // when user submits form, prevent page from refreshing
  // and also 
  formSubmitted = (event) => {
      event.preventDefault();
      
      if (this.formIsValid()) {
        this.setState({
          sendingMessage: true
        });
        fetch(API_URL, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            name: this.state.userMessage.name,
            message: this.state.userMessage.message,
            latitude: this.state.location.lat,
            longitude: this.state.location.lng,
          })
        }).then(res => res.json())
        .then(message => {
          console.log(message);
          setTimeout(() => {
            this.setState({
              sendingMessage: false,
              sentMessage: true
          });
        }, 4000);
      });
    }
  }
  

  valueChanged = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      userMessage: {
        ...prevState.userMessage,
        [name]: value
      }
    }))
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng];

    return (
    <div className="map">
      <Map className="map" center = { position } zoom = { this.state.zoom }>
        <TileLayer url = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution = "&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors" 
        />
        { 
          this.state.haveUsersLocation ? 
          <Marker 
            position = { position }
            icon = { myIcon } >
            <Popup>
              This is your location! <br/> 
            </Popup> 
          </Marker> : ''
        }
        {this.state.message.map(message => (
          <Marker 
            key = {message._id}
            position = { [message.latitude, message.longitude] }
            icon = { messageIcon } >
          <Popup>
            <em>{message.name}:</em> {message.message}
          </Popup> 
        </Marker>
        ))}   
      </Map>
      <Card body className="message-form">
      <CardTitle>Welcome to Guest Map</CardTitle>
      <CardText>Leave a message with your location</CardText>
      <CardText>Thanks for stopping by!</CardText>
      {
        !this.state.sendingMessage && !this.state.sentMessage && this.state.haveUsersLocation ?
      <Form onSubmit={this.formSubmitted}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input 
            onChange={this.valueChanged}
            type="text" 
            name="name"
            id="name" 
            placeholder="Enter your name here" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleMessage">Message</Label>
          <Input 
            onChange={this.valueChanged}
            type="textarea" 
            name="message" 
            id="message" 
            placeholder="Enter your message here" />
        </FormGroup>
        <Button type="submit" color="info" disabled={!this.formIsValid()}>Send</Button>
      </Form> : 
        this.state.sendingMessage || !this.haveUsersLocation ? 
        <video 
         autoPlay
         loop 
         src="https://i.giphy.com/media/BCIRKxED2Y2JO/giphy.mp4"></video> :
        <CardText>Thanks for submitting a message!</CardText>
      }
      </Card>
    </div>
    );
  }
}

export default App;