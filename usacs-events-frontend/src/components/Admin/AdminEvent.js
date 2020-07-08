import React from 'react'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'

export default class AdminEvent extends React.Component {
    constructor(props){
        super(props)
        this.state = { 
            modalIsOpen: false, 
            modalStyle: {backgroundColor: "#F6F6F6"}, 
            edit: this.props.data,
            removeEventValid: "hidden" 
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.editEvent = this.editEvent.bind(this)
        this.editField = this.editField.bind(this)
        this.removeEventValid = this.removeEventValid.bind(this)
    }
    
    openModal(){ this.setState({modalIsOpen: true}) }
    
    closeModal(){ this.setState({modalIsOpen: false}) }
    
    componentWillUnmount() { this.props.onRef(undefined) }    
    
    componentDidMount() { 
        Modal.setAppElement('body')
        this.props.onRef(this) 
    }

    addEvent(event){
        event.preventDefault()
        let title = event.target.title.value
        let date = event.target.date.value
        let venue = event.target.venue.value
        let description = event.target.description.value
        let img = event.target.img.value

        let body = {
            title: title,
            date: date, 
            venue: venue,
            description: description,
            img: img,
            going: 0,
            attendees: []
        }

        console.log(body)

    
        fetch("https://46e82bc68f5e.ngrok.io/new_event", {
            method: "POST",
            mode: "cors",
            headers: {
            Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => console.log(res));
    }

    editEvent(event){
        event.preventDefault()
        let title = event.target.title.value
        let date = event.target.date.value
        let venue = event.target.venue.value
        let description = event.target.description.value
        let eventId = event.target.eventId.value
        let img = event.target.img.value

        let body = {
            eventId: eventId,
            content: {
                title: title,
                date: date, 
                venue: venue,
                description: description,
                img: img,
                going: this.props.data.going,
                attendees: this.props.data.attendees
            }
        }

        console.log(body)

        fetch("https://46e82bc68f5e.ngrok.io/edit_event", {
            method: "POST",
            mode: "cors",
            headers: {
            Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => res.json()).then(resBody => console.log(resBody));

    }

    editField(event){
        let state = {edit:{}}
        state.edit[event.target.name] = event.target.value
        console.log(state)
        this.setState(state)
        console.log(this.state)
    }

    removeEvent(event){
        event.preventDefault()
        let eventId = event.target.eventId.value;

        fetch("https://46e82bc68f5e.ngrok.io/remove_event", {
            method: "POST",
            mode: "cors",
            headers: {
            Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({eventId: eventId})
        }).then(res => console.log(res)); 

    }

    removeEventValid(event){
        let name = event.target.value
        if(name === this.props.data.title){ this.setState({removeEventValid: "submit"}) }
        else{ this.setState({removeEventValid: "hidden"}) }
    }

    requestedView(){

        if(this.props.request === "showEvent"){  // Build + Render lis from event entry.
            let attendeesList = []
            this.props.data.attendees.forEach(attendee => {
                attendeesList.push(<li key = {attendee} style={{listStyleType: "none"}}>{attendee}</li>)
            })
            return(
                <div>
                    <h4>RSVP List - {this.props.data.title}</h4>
                    <ul>
                        <h5>{attendeesList}</h5>
                    </ul>
                </div>
            )
        }

        if(this.props.request === "addEvent"){
            return (
                <form className="admin-form" onSubmit={this.addEvent}>
                    <h4>Add Event</h4>
                    <input className="form-field" type="text" name="title" placeholder="Event Name"/>
                    <input className="form-field" type="text" name="date" placeholder="Date"/>
                    <input className="form-field" type="text" name="venue" placeholder="Venue"/>
                    <input className="form-field" type="text" name="description" placeholder="Description"/>
                    <input className="form-field" type="text" name="img" placeholder="Thumbnail URL"/>
                    <input className="submit" type="submit" value=" 🎉 Submit"/>
                </form>
              );
        }

        else if(this.props.request === "editEvent"){
            return (
                <form onSubmit={this.editEvent}>
                    <h4>Edit Event: {this.props.data.title}</h4>
                    <input className="form-field" type="text" name="title" onChange={this.editField} value = {this.state.edit.title} placeholder="Event Name"/>
                    <input className="form-field" type="text" name="date" onChange={this.editField} value = {this.state.edit.date} placeholder="Date"/>
                    <input className="form-field" type="text" name="venue" onChange={this.editField} value =  {this.state.edit.venue} placeholder="Venue"/>
                    <input className="form-field" type="text" name="description" onChange={this.editField} value =  {this.state.edit.description} placeholder="Description"/>
                    <input className="form-field" type="text" name="img" onChange={this.editField} value =  {this.state.edit.img} placeholder="Thumbnail URL"/>
                    <input type="hidden" name="eventId" value = {this.props.id} />
                    <input className="submit" type="submit" value=" 🎉 Submit"/>
                </form>
            );
        }
  
        else if(this.props.request === "removeEvent"){
            return ( 
                <form onSubmit={this.removeEvent}>
                    <h4>Remove Event: {this.props.data.title}</h4>
                    <input className="form-field" type="text" name="name" placeholder="Type the event name to delete it." onChange={this.removeEventValid}/>
                    <input type="hidden" name="eventId" value = {this.props.id} />
                    <input className="submit" type={this.state.removeEventValid} value=" 🎉 Submit"/>
                </form>
            );
        }
        

    }

      render(){
        return (
            <div id = "event-page-modal">
                <Modal
                    isOpen = {this.state.modalIsOpen}
                    onRequestClose = {this.closeModal}
                    style = {this.state.modalStyle}
                >
                    <button className = "close-modal-button" onClick = {this.closeModal} ><FontAwesomeIcon icon = {faTimes} /></button>
                    <div className="event-page-content">
                        {this.requestedView()}
                    </div>

                </Modal>
            </div>
        );
    }
}

