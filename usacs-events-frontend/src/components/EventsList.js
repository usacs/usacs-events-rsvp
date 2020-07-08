import React from 'react';

import EventListing from './EventListing.js';
import "../App.css"

export default class EventsList extends React.Component {
    constructor(){
        super()
        this.state = {events: {
            
        }}
    }

    UNSAFE_componentWillMount(){
        fetch("https://4c49788e115d.ngrok.io/")
            .then(res => res.json())
            .then(body => {
                this.setState({events: body})
            })
    }

    buildList(){
        let eventListings = []
        let events = this.state.events
        let eventListingsRaw = []

        // PREP FOR SORT BY DATE
        for(let event in events){
            eventListingsRaw.push({id: event, body: events[event]})
        }

        // SORT BY DATE
        eventListingsRaw.sort((a,b) => a.body.date >= b.body.date ? 1 : -1)

        // BUILD LISTINGS FROM DATA, ADD TO LIST
        eventListingsRaw.forEach(event => {
            let listing = (<EventListing key = {event.id} id = {event.id} data = {event.body} />)
            eventListings.push(listing)
        })
            
        return eventListings
    }

    render(){
        return (
            <div id = "container">
                <header id="header">
                    <img id = "usacs-logo" src = {process.env.PUBLIC_URL + "/USACS.jpg"}/>
                    <h1 id = "title">USACS Events List</h1>
                    <h3 id = "tagline">Welcome to the USACS events list! This is where you can see all of our upcoming events and RSVP to attend.</h3>
                </header>
                <br/>
                <div id = "events-list">
                    {this.buildList()}
                </div>
            </div>
        );
    }
}