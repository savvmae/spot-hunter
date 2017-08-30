import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactModal from 'react-modal';
import { Row, Input, Link, Card, Col, Button, Icon  } from 'react-materialize'

import {toggleLanding, toggleLogin, toggleMarkerModal, toggleMarkerDetailModal} from '../actions';

import MarkerDetailModal from './MarkerDetailModal';


class MarkerModal extends Component {
    constructor(props) {
        super(props)
    }

    handleToggleDetailModal = () => {
        this.props.toggleMarkerDetailModal()
    }


    render() {
        return (
            <div>
                <ReactModal header='New Spot'
                    isOpen={this.props.state.showMarkerModal}
                    contentLabel="Minimal Modal Example">
                    <p>  Would you like to add this location as a parking spot? </p>
                    <div className="row">
                        <button className="btn waves-effect waves-light z-zero" onClick={this.handleToggleDetailModal}>Yes</button>
                    </div><div className="row">
                        <button className="btn waves-effect waves-light z-zero" onClick={this.props.toggleMarkerModal}>No</button></div>
                </ReactModal>
                {this.props.state.showMarkerDetailModal

                    ? <MarkerDetailModal />
                    : null}
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
        toggleMarker: () => {
            return dispatch(toggleMarkerModal())
        },
        toggleMarkerDetailModal: () => {
            return dispatch(toggleMarkerDetailModal())
        },
        toggleMarkerModal: () => {
            return dispatch(toggleMarkerModal())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MarkerModal)