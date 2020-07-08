import React from 'react'
import { faPlus} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import AdminListing from './AdminListing.js'
import AdminEvent from './AdminEvent.js'

export default class AdminDashboard extends React.Component {
    
    constructor(){
        super()
        this.state = {events: {} }
    }

    UNSAFE_componentWillMount(){
        fetch("https://4c49788e115d.ngrok.io/")
            .then(res => res.json())
            .then(body => {
                this.setState({events: body})
            })
    }
    
    openModal(){
        this.child.openModal()
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
            let listing = (<AdminListing key = {event.id} id = {event.id} data = {event.body} />)
            eventListings.push(listing)
        })
            
        return eventListings
    }

    render(){
        return(
            <div id = "events-list">
                <AdminEvent request = "addEvent" data = {this.props.data} onRef={ref => this.child = ref}/>
                <h1 onClick = {() => this.openModal()}><FontAwesomeIcon icon = {faPlus} /> Add New Event</h1>
                {this.buildList()}
            </div>
        );
    }
}