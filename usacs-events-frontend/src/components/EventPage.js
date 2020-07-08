import React from 'react'
import { BrowserRouter as Redirect } from "react-router-dom"

import '../App.css'

export default class EventPage extends React.Component {
    constructor(){
        super()
        this.state = { data: {}, redirect: null }
        this.redirectEvent = this.redirectEvent.bind(this)
    }

    UNSAFE_componentWillMount() { 
        const routeProp = this.props.match
        if(routeProp){ 
            fetch(`https://4c49788e115d.ngrok.io/${routeProp.params.id}`)
                .then(res => res.json())
                .then(body => {
                    this.setState({data: body})
                })
        }
        else{
            this.setState({ data: this.props.data })
        }
    }

    redirectEvent(){
        this.setState({redirect: true})
    }
    
    render(){
        if(this.state.redirect){
            return <Redirect to="/register" />
        }

        return (
            <div className="event-page">
                <div className = "banner-container">
                    <img src = {this.state.data.img} className = "event-banner"/>
                </div>
                <div className = "page-rsvp-container">
                    <form className="rsvp-form">
                        <label htmlFor="netid">
                            <h5>🎉 {this.state.data.going} Going. To RSVP, use your event RSVP code. (New here? <span className="rsvp-register-link" onClick={this.redirectEvent}>Click here to register.</span>)</h5>
                        </label>
                        <input type="text" name="netid" placeholder="NetID" className="event-code-textbox"/>
                        <input type="submit" value="🔖 Submit" className="event-code-submit"/>
                        <label></label>
                    </form>
                </div>
                <div className = "event-page-content">
                    <h2 className = "event-name">{this.state.data.title} </h2>
                    <h4 className = "event-info">{this.state.data.date} @ {this.state.data.venue}</h4>
                    <br/>
                    <h4 className = "event-description"> {this.state.data.description} </h4>
                </div>
        </div>
        );
    }
}