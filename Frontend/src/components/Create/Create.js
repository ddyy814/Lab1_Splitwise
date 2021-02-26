import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

class Create extends Component{

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            bookId : "",
            bookTitle : "",
            bookAuthor : ""
        }
        //Bind the handlers to this class
        this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
        this.bookTitleChangeHandler = this.bookTitleChangeHandler.bind(this);
        this.bookAuthorChangeHandler = this.bookAuthorChangeHandler.bind(this);
        this.create = this.create.bind(this);
    }
    bookIdChangeHandler = (e) => {
        this.setState({
            bookId : e.target.value
        })
    }
    bookTitleChangeHandler = (e) => {
        this.setState({
            bookTitle : e.target.value
        })
    }
    bookAuthorChangeHandler = (e) => {
        this.setState({
            bookAuthor : e.target.value
        })
    }
    create = (e) => {
        //prevent page from refresh
        e.preventDefault();
        const data = {
            bookId : parseInt(this.state.bookId, 10),
            bookTitle : this.state.bookTitle,
            bookAuthor: this.state.bookAuthor
        }
        console.log(data);
        //make a post request with the user data
        axios.post('create',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                if(response.status === 201){
                   console.log("Redirecting");
                   window.location.href="http://localhost:3000/home"; 
                }
            })
            .catch(error => {
                console.log(error.response);
            });
    }
    render(){
        let redirectVar = null;
        if(!cookie.load('cookie')){
            redirectVar = <Redirect to= "/login"/>
        }
        return(
            <div>
                {redirectVar}
                <div className="container">
                        <div style={{width: '30%'}} className="form-group">
                            <input  onChange={this.bookIdChangeHandler} type="number" className="form-control"
                                    name="BookID" placeholder="Book ID" required={true}
                                    oninput="this.setCustomValidity('')"
                                    oninvalid="this.setCustomValidity('Please enter Book ID')"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} className="form-group">
                                <input  onChange={this.bookTitleChangeHandler} type="text" className="form-control"
                                        name="Title" placeholder="Book Title" required={true}
                                        oninput="this.setCustomValidity('')"
                                        oninvalid="this.setCustomValidity('Please enter Book Title')"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}} className="form-group">
                                <input  onChange={this.bookAuthorChangeHandler} type="text" className="form-control"
                                        name="Author" placeholder="Book Author" required={true}
                                        oninput="this.setCustomValidity('')"
                                        oninvalid="this.setCustomValidity('Please enter Book Author')"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick={this.create} className="btn btn-success" type="submit">Create</button>
                        </div>
                </div>
            </div>
        )
    }
}

export default Create;