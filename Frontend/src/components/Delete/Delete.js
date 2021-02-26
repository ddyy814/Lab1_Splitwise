import React, {Component} from 'react';
import axios from "axios";
import {Redirect} from "react-router";
import cookie from "react-cookies";

class Delete extends Component{

    constructor(props){
        //Call the constrictor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            bookId : -1
        }
        //Bind the handlers to this class
        this.bookIdChangeHandler = this.bookIdChangeHandler.bind(this);
        this.delete = this.delete.bind(this);
    }
    bookIdChangeHandler = (e) => {
        this.setState({
            bookId : e.target.value
        })
    }
    delete = (e) => {
        e.preventDefault();
        //make a delete request with the book ID
        let url = "http://localhost:3001/delete/" + this.state.bookId;
        axios.delete(url)
            .then(response => {
                console.log("Status Code : ", "" + response.status);
                if(response.status === 200){
                   // console.log("Redirecting");
                    window.location.href="http://localhost:3000/home"; 
                 }
            //  })
            //  .catch(error => {
            //      console.log(error.response);
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
                    <form>
                        <div style={{width: "50%",float: "left"}} className="form-group">
                            <input  onChange={this.bookIdChangeHandler} type="number" className="form-control" name="BookID" placeholder="Search a Book by Book ID"/>
                        </div>
                        <div style={{width: "50%", float: "right"}}>
                            <button onClick={this.delete} className="btn btn-success" type="submit">Delete</button>
                        </div>
                    </form>
                </div>
            </div>

        )
    }
}

export default Delete;