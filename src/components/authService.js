import decode from 'jwt-decode';
export default class authService{
    constructor(domain){
        this.domain = domain || `http://call-server-api.herokuapp.com`;
        this.login = this.login.bind(this);
        this.getProfile = this.getProfile.bind(this);
        this.fetch = this.fetch.bind(this);
        this.apiHome = 'http://call-server-api.herokuapp.com'
    }
    login(email, password){
        return this.fetch(`${this.domain}/user/login`,{
            method: 'POST',
            body: JSON.stringify({
                email,
                password
                })
            })
                .then(res => {
                this.setToken(res.token);
                return Promise.resolve(res);
            })
        // let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Accept', 'application/json');
        // headers.append('Access-Control-Allow-Credentials', 'true');
        // if (this.loggedIn()) {
        //     headers['Authorization'] = `Bearer ${this.getToken()}`;
        // }
        // return fetch(`${this.domain}/user/login`, {
        //     headers: headers,
        //     method: 'POST',
        //     body: JSON.stringify({
        //         email,
        //         password
        //     })
        // })
        //     .then(res => res.json())
        //     .then(res => {
        //         if (res.status === 200)
        //             this.setToken(res.token);
        //             return Promise.resolve(res);
        //     })
    }
    fetch(url, options){
        const headers = {
            'Access-Control-Allow-Credentials':'true',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
        if(this.loggedIn())
            headers['Authorization'] = `Bearer ${this.getToken()}`

        return fetch(url, {
            headers, 
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json())
    }
    getToken(){
        return localStorage.getItem('id_token');
    }
    setToken(idToken){
        return localStorage.setItem('id_token', idToken);
    }
    loggedIn(){
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }
    isTokenExpired(token){
        try{
            const decoded = decode(token);
            if(decoded.exp < Date.now() / 1000){
                return true;
            }else{
                return false;
            }
        }catch(e){
            return false;
        }
    }
    logout(){
        localStorage.removeItem('id_token')
    }
    getProfile(){
        return decode(this.getToken())
    }
    _checkStatus(response){
        if(response.status >= 200 && response.status < 300 ){
            return response
        }else{
            let error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }
}