import React from 'react';
import { BrowserRouter as Router, Link } from "react-router-dom"

import EventModal from './EventModal.js'

export default class EventListing extends React.Component {
    
    openModal(){
        this.child.openModal()
    }
    
    render(){
        console.log(this.props.id)
        return (
            <div id = "event-listing">
                <EventModal onRef={ref => this.child = ref} data = {this.props.data} />
                <h2 className = "event-name-listing event-name" onClick = {() => this.openModal()} > {this.props.data.title} </h2>
                <h4 className = "event-info-listing"> {this.props.data.date} @ {this.props.data.venue}</h4>
                <div className = "rsvp-container">
                    
                </div>
                <br/>
                <div className = "event-going-container">
                    <h5 className = "listing-event-going">{this.props.data.going} Going </h5>
                </div>
            </div>


        );
    }
}

