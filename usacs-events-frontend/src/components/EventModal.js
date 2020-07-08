import React from 'react'
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Modal from 'react-modal'

import EventPage from './EventPage.js'

export default class EventModal extends React.Component {
    constructor(){
        super()
        this.state = { modalIsOpen: false, modalStyle: {backgroundColor: "#F6F6F6"} }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }
    
    openModal(){ this.setState({modalIsOpen: true}) }
    
    closeModal(){ this.setState({modalIsOpen: false}) }
    
    componentWillUnmount() { this.props.onRef(undefined) }    
    
    componentDidMount() { 
        Modal.setAppElement('body')
        this.props.onRef(this) 
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
                    <EventPage data = {this.props.data} />
                </Modal>
            </div>
        );
    }
}

