import React, { Component } from 'react';
import axios from 'axios';
import { properties } from '../config/properties.js';
export default class ProblemTitleForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      content: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({content: event.target.value});
  }
  handleChangeTitle(event) {
    this.setState({title: event.target.value});
  }


  handleSubmit(event) {

    event.preventDefault();



      var apiBaseUrl = properties.createTitle;


      var data=   {
        "id": 0,
          "name": "",
          "text": this.state.content,
          "title": {
        "contents": [
          null
        ],
            "id": 0,
            "name": this.state.title
      }
      }


      var headers = {

        'Content-Type': 'application/json',

      }



      axios.post(apiBaseUrl, data, {headers: headers}).then(function (response) {



        if(response.data){



          window.location.href = "/";



        }else{

          alert(response.data.message);

        }

      }).catch(function (error) {

        console.log(error);

      });


  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>

          <label>
            Problem Title:
            <br/>
            <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />
          </label>
          <br/>
          <label>
            Content:
            <br/>
            <textarea value={this.state.content} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
    );
  }
}