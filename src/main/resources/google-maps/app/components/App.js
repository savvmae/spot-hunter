import React, { Component } from 'react';
import { connect } from 'react-redux'
import { render } from 'react-dom';
import GMap from './GMap';
import LandingModal from './LandingModal';
import MarkerModal from './MarkerModal';

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.state.markers)
        return (
            <div>
                {this.props.state.showLandingModal
                    ?
                    <LandingModal />
                    : null}
                <div className="mapContainer">
                    {this.props.state.showMarkerModal
                        ?
                        <MarkerModal />
                        : null}
                    <GMap />

                </div>
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
        toggleLanding: () => {
            return dispatch(toggleLanding())
        },
        toggleRegister: () => {
            return dispatch(toggleRegister())
        },
        toggleLogin: () => {
            return dispatch(toggleLogin())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)



