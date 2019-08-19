import React, {Component} from 'react';
import AuthService from './authService';
class login extends Component {
    constructor(){
        super();
        this.hanldeChange = this.hanldeChange.bind(this);
        this.hanldeFormSubmit = this.hanldeFormSubmit.bind(this);
        this.Auth = new AuthService();
        this.state = {
            email: '',
            password: ''
        }
    }
    componentWillMount() {
        if(this.Auth.loggedIn())
            this.props.history.replace('/')
    }
    
    hanldeChange(e){
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    hanldeFormSubmit(e){
        e.preventDefault();
        this.Auth.login(this.state.email, this.state.password)
            .then(res => {
                this.props.history.replace('/');
            })
            .catch(err => {
                alert(err);
            })
    }
    render() {
        return (
            <div>
                <h1>Login</h1>
                <form onSubmit = {this.hanldeFormSubmit}>
                    <input 
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={this.state.email}
                        onChange={this.hanldeChange}
                        required autoComplete='off'
                    />
                    <input 
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={this.state.password}
                        onChange={this.hanldeChange}
                        required autoComplete='off'
                    />
                    <input 
                        type="submit"
                        value="Submit"
                    />
                </form>
            </div>
        );
    }
}
export default login;
