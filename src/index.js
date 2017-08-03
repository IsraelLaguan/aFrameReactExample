import 'aframe';
import 'aframe-animation-component';
import 'aframe-particle-system-component';
import 'babel-polyfill';
import 'aframe-lerp-component';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
require('aframe-speech-command-component');
var sunrise = require('../assets/sunrise.jpg');
var extras = require('aframe-extras');
//var drone = require('../assets/busterDrone.gltf'); //still needs to be implemented
extras.registerAll();

var annyang = require("../annyang.min.js");


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'red',
      xcord: 0,
      scene: 'home',
    };
  }

  startDictation() {
    console.log(this.state);
    if (annyang) {
    // Let's define a command.
    var command = {
      "hello": function() {
        alert('hello WATs up');
      },
      "Iron Islands": function() {
        console.log('theon greyjoy is a bitch');
      },
    };
    annyang.addCommands(command);
    annyang.addCallback('result', function(phrases) {
      console.log("I think the user said: ", phrases[0]);
      console.log("But then again, it could be any of the following: ", phrases);
    });
    // Start listening.
    annyang.start();


  }
}


  checkSky() {
    if(this.state.scene === 'puerto Rico'){
      return <Entity primitive="a-sky" src="#puertoRicanSkyTexture" rotation="0 -130 0" theta-length="180" radius="5000" phi-length="360" />;
    } else {
      return <Entity primitive="a-sky" height="1024" radius="30" src="#skyTexture" rotation="0 -130 0" theta-length="90" width="1024" />;
    }

  }

  checkPlane(){
    if(this.state.scene === 'puerto Rico'){
      return;
    } else {
      return <Entity primitive="a-plane" src="#groundTexture" rotation="-90 0 0" height="100" width="100"/>;
    }
  }


  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    const shapes = ['box', 'cone', 'cylinder', 'dodecahedron', 'torusKnot'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)]
    });
  }

  setSky() {
    console.log('setting sky...');
    if(this.state.scene === 'home'){
      this.setState({
        scene: 'puerto Rico',
      });
    } else {
      this.setState({
        scene: 'home',
      });
    }
  }

//LIST of Locales that is selectable || just a list for easy voice commands
//selecting a locale brings you to a gallery? where you can flip through listings
//render a version of the listings

  render() {
    return (
      <Scene>
        <a-assets>
          <img id="groundTexture" src="https://cdn.aframe.io/a-painter/images/floor.jpg" />
          <img id="skyTexture" src="https://cdn.aframe.io/a-painter/images/sky.jpg" />
          <img id="earthTexture" src="https://raw.githubusercontent.com/aframevr/sample-assets/master/assets/images/space/earth_atmos_4096.jpg" />
          <img id="rentalSpotLogo" src="https://raw.githubusercontent.com/willowtreeapps/rentalspot-v2-frontend/develop/client/src/images/logos/logo-rentalspot-504x192-redbg.png?token=AOpCta3LjUonj37TyqFNP1K_MshOR4nWks5ZfKDjwA%3D%3D" />
          <img id="puertoRicanSkyTexture" src={sunrise} />
        </a-assets>
        <Entity primitive="a-light" type="ambient" color="#445451" />
        <Entity primitive="a-light" type="point" intensity="1" position="2 4 4" />
        {this.checkPlane()}
        {this.checkSky()}
        <Entity
          geometry={{primitive: 'box', width: 2}}
          material={{src: "#rentalSpotLogo"}}
          position={{x: 0, y: 3, z:-3}}
          events={{click: this.startDictation.bind(this)}}>
        </Entity>

        <Entity id="sphere"
          geometry={{primitive: 'sphere'}}
          material={{src: "#earthTexture"}}
          animation__rotate={{property: 'rotation', dur:60000, loop: true, to:'0 1080 0'}}
          position={{x:0, y:1, z:-3}}
          events={{click: this.setSky.bind(this)}}>
        </Entity>
        <Entity primitive="a-camera">
          <Entity primitive="a-cursor" animation__click={{property: 'scale', startEvents: 'click', from: '0.1 0.1 0.1', to: '1 1 1', dur: 150}} />
        </Entity>
      </Scene>
    );
  }
}

ReactDOM.render(<App/>, document.querySelector('#sceneContainer'));
