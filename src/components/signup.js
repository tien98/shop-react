import React from 'react';
import FetchData from '../components/fetchData';
import Auth from '../components/authService';
import { Redirect} from 'react-router-dom';

class signup extends React.Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.state = {
            email: '',
            password: '',
            firstName: ' ',
            logined: false,
            notifyRegister: ''
        }
        this.fetchData = new FetchData();
        this.Auth = new Auth();
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmitForm(e) {
        e.preventDefault();
        this.fetchData.postWithoutAuth(`${this.Auth.apiHome}/user/signup`, {
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName
        })
            .then(res => {
                if(res.login === true){
                    this.setState({
                        logined: true
                    })
                }else{
                    this.setState({
                        logined: false
                    })
                }
                this.setState({
                    notifyRegister: res.message
                })
            })
            .catch(err => {
                this.setState({
                    notifyRegister: err.message
                })
            })
    }
    login = () => {
        if(this.state.logined){
            return <Redirect to='/login' />
        }
    }
render() {
    return (
        <div>
            {this.login()}
           <h2> {this.state.notifyRegister}</h2>
            <form onSubmit={this.handleSubmitForm}>
                
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                    required autoComplete='off'
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    required autoComplete='off'
                />
                <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={this.handleChange}
                    required autoComplete='off'
                />
                <input
                    type="submit"
                    value="Sign Up"
                />
            </form>
        </div>
    );
}
}
export default signup;
