import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class AccountsUIWrapper extends Component {
  componentDidMount(){
    // use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons, ReactDOM.findDOMNode(this.refs.container));
  }

  componentWillUnmount(){
    // CleanUp up Blaze view
    Blaze.remove(this.view);
  }

  render(){
    // this is a placeholder container that is replaced by teh Blaze UI component
    return <span ref="container"/>
  }
}
