import { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation.js'
import Logo from './components/Logo/Logo.js'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm.js';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn.js'
import Register from './components/Register/Register.js'

const particlesOptions = {
  particles: {
    number: {
      value: 120,
      density: {
        enable: true, 
        value_area: 800
      } 
    }
  }
}

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signIn',
  isSignedIn: false,
  user: {
    id:'',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component{
  
  constructor(){
    super();
    this.state = initialState;
    
  }

  loadUser = (data) => {
    this.setState( {user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      joined: data.joined
      } 
    })
  } 

  calculateFaceLocation = (data) => {
    const clariFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width, height);
    return{
      left_col: clariFace.left_col * width,
      top_row: clariFace.top_row * height,
      right_col: width - clariFace.right_col * width,
      bottom_row: height- clariFace.bottom_row * height
    }
  }

  displayFaceBox = (box) => {
    this.setState({box})
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('http://localhost:3000/imageurl', {
          method: 'post',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            id:this.state.input
          })
        })
    .then(response => response.json())    
    .then(response => {
      if(response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({
            id:this.state.user.id
          })
        })
        .then(response => response.json)
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count }))
        }).catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signOut') {
      this.setState(initialState)
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render(){
    const { imageUrl, isSignedIn, box, route } = this.state
    return (
      <div className="App">
        <Particles className='particles' params={ particlesOptions }/>
        <Navigation isSignedIn = { isSignedIn } onRouteChange = { this.onRouteChange }/>
        { route === 'home' 
        ? <div>
            <Logo />
            <Rank name = { this.state.user.name }  entries = { this.state.user.entries }/>
            <ImageLinkForm onInputChange = { this.onInputChange } onButtonSubmit = { this.onButtonSubmit }/>
            <FaceRecognition box = { box } imageUrl = { imageUrl }/>
          </div> 
        : (
          route === 'signIn'
          ? <SignIn onRouteChange = { this.onRouteChange } loadUser = { this.loadUser } />
          : <Register loadUser = { this.loadUser } onRouteChange = { this.onRouteChange }/>
        )
        }
      </div>
    );
  }
}

export default App;
