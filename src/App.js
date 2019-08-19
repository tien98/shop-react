import React from 'react';
import './App.css';
import AuthService from './components/authService';
import withAuth from './components/withAuth';
const Auth = new AuthService();

class App extends React.Component {
  constructor(){
    super();
    this.state ={
      name: ' '
    }
  }
  hanldeLogout(){
    Auth.logout();
    this.props.history.replace('/login');
  }
  
  // componentWillMount() {
  //       this.Auth.fetch(`http://localhost:5000/user/${this.props.user.userId}`, 
  //       {
  //         method: 'GET'
  //       }).then(result =>{
  //         this.setState({
  //           name: result.firstName
  //       })
  //       })
  //   }
  
  render(){
    return (
      <div className="App">
        <header className="App-header">
            <h2>Welcome to {this.props.user.email}</h2>
            <button 
              type="button"
              onClick={this.hanldeLogout.bind(this)}
              >Logout</button>
        </header>
      </div>
    );
  }
}

export default withAuth(App);
