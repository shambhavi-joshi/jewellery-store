import React, { Component } from 'react';
import axios from 'axios';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleClick(e) {
        e.preventDefault();
        var apiBaseUrl = window.location.origin + '/api/';
        var self = this;
        var payload = {
            "username": this.state.username,
            "password": this.state.password
        }
        axios.post(apiBaseUrl + 'account/login', payload)
            .then(function (response) {
                if (response.status == 200) {
                    console.log("Login successful.");
                    localStorage.setItem('user_id', response.data.id);
                    localStorage.setItem('user_type', response.data.type);
                    window.location = '/estimate';
                }
                else if (response.status == 500) {
                    alert("Something went wrong.")
                }
                else {
                    alert("User does not exist.");
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    handleCancelClick(e) {
        this.setState({ username: '' });
        this.setState({ password: '' });
    }

    render() {
        return (
            <div>
                <h3>Login</h3>
                <form>
                    <div className="form-group">
                        <label>User Name</label>
                        <input type="text" className="form-control" placeholder="User Name" onChange={this.handleUsernameChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" placeholder="Password" onChange={this.handlePasswordChange} required />
                    </div>
                    <button className="btn btn-primary" onClick={(event) => this.handleClick(event)}>Login</button>
                    <button className="btn btn-secondary" onClick={(event) => this.handleCancelClick(event)}>Cancel</button>
                </form>
            </div>
        );
    }
}