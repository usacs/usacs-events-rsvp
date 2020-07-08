import React from 'react';

export default class EventListing extends React.Component {
    
    registerUser(event){
        event.preventDefault()
        let name = event.target.name.value
        let netid = event.target.netid.value
        let graduation = event.target.graduation.value

        let body = {
            name: name,
            netid: netid, 
            email: netid + "@scarletmail.rutgers.edu",
            graduation: graduation,
        }

        console.log(body)

        /*
        fetch("https://rsvp_service/newUser", {
            method: "POST",
            mode: "cors",
            headers: {
            Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        }).then(res => console.log(res));
        */
    }

    render(){
        return (
            <div className = "event-page-content">
                <form onSubmit={this.registerUser}>
                    <h4>Welcome to USACS! After registering, we'll send you a unique code you can RSVP for all our events with. No login necessary.</h4>
                    <input className="form-field" type="text" name="name" placeholder="Your Name"/>
                    <input className="form-field" type="text" name="netid" placeholder="Your NetID"/>
                    <input className="form-field" type="text" name="graduation" placeholder="Your Graduation Year"/>
                    <input className="submit" type="submit" value=" 🎉 Submit"/>
                </form>
            </div>


        );
    }
}

