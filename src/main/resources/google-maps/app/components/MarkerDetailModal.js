import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactModal from 'react-modal';
import { Row, Input, Link, Card, Col, Button, Icon } from 'react-materialize'

import { toggleMarkerDetailModal, submitNewSpot } from '../actions';


class MarkerDetailModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            spotType: null,
            isSpotTaken: false,
            spotNotes: null,
            lat: this.props.state.spotDetails.lat,
            lng: this.props.state.spotDetails.lng
        }
    }
    updateState = (event) => {
        if (event.target.checked) {
            this.setState({ [event.target.name]: event.target.checked })
        } else {
            this.setState({ [event.target.name]: event.target.value })
        }
    }
    handleSubmit = (event) => {
        event.preventDefault();
        let d
        this.props.submitNewSpot(this.state);
    }

    render() {
        return (
            <div>
                <ReactModal header='Marker Info Header'
                    isOpen={this.props.state.showMarkerDetailModal}
                    contentLabel="Minimal Modal Example">
                        <Button onClick={this.props.toggleMarkerDetailModal} floating icon='close' className='red' large style={{ bottom: '0px', left: '45%' }}/>
                   
                    <p>  Details about the spot! </p>
                    <div className="row">
                        <form onSubmit={this.handleSubmit} className="col s12">
                            <div className="row">

                                <div className="input-field col s6">
                                    <input onChange={this.updateState} type="text" name="spotType" className="validate" />
                                    <label htmlFor="icon_telephone" >Type of Spot:</label>
                                </div>
                                <div className="input-field col s6">
                                    <input onChange={this.updateState} type="text" name="spotNotes" className="validate" />
                                    <label htmlFor="icon_telephone" >Any Notes?</label>
                                </div>
                                <Input onChange={this.updateState} name='group1' type='checkbox' label='Taken?' />
                            </div>
                            <div className="row">
                                <button className="btn waves-effect waves-light" type="submit">Add Spot!
                                <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </form>
                    </div>
                </ReactModal>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

function mapDispatchToProps(dispatch) {
    return {
        toggleMarkerDetailModal: () => {
            return dispatch(toggleMarkerDetailModal())
        },
        submitNewSpot: (details) => {
            return dispatch(submitNewSpot(details))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerDetailModal)