import React from 'react';

import AdminEvent from './AdminEvent.js';

export default class AdminListing extends React.Component {
    
    constructor(){
        super()
        this.state = {
            request: null
        }
    }

    openModal(){
        this.child.openModal()
    }

    setToShow(){
        this.setState({request: "showEvent"})
        this.openModal()
    }
   
    setToEdit(){
        this.setState({request: "editEvent"})
        this.openModal()
    }

    setToRemove(){
        this.setState({request: "removeEvent"})
        this.openModal()
    }

    render(){
        return (
            <div id = "event-listing">
                <AdminEvent request = {this.state.request} id = {this.props.id} data = {this.props.data} onRef={ref => this.child = ref}/>
                <h2 className = "event-name-listing event-name" onClick = {() => this.setToShow()}> {this.props.data.title} </h2>
                <h4 className = "event-info-listing"> {this.props.data.date} @ {this.props.data.venue}</h4>
                <br/>
                <div className = "rsvp-container">
                    <h5 className = "admin-event" onClick = {() => this.setToEdit()} > Edit Event </h5>
                    <h5 className = "admin-event" onClick = {() => this.setToRemove()} > Remove Event </h5>
                </div>
                <div className = "event-going-container">
                    <h5 className = "listing-event-going">{this.props.data.going} Going </h5>
                </div>
            </div>


        );
    }
}

