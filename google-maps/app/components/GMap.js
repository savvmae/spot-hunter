import React from 'react';
import axios from 'axios';
import { Row, Col, ProgressBar } from 'react-materialize';
import { connect } from 'react-redux';
import MapStyles from './MapStyles';
import Script from 'react-load-script';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';


import { loading, searchCity, toggleMarkerModal } from '../actions';

class GMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            center: null,
            searchCityAuto: '',
            searchCity: '',
            hasLoaded: true
        };
        this.mapCenter.bind(this);
    }
    componentWillMount() {

    }
    loadMap() {
        const config = this.props.state;
        // create the map and markers after the component has
        // been rendered because we need to manipulate the DOM for Google =(
        this.map = this.createMap(config.initialCenter);
        if (config && config.markers) {

            this.markers = this.createMarkers(config.markers);
            if (config.legend) {
                this.createLegend(config.icons);
            }
        }
    }

    // clean up event listeners when component unmounts
    componentDidUnMount() {
        google.maps.event.clearListeners(map, 'click');
    }

    createLegend(icons) {
        const { legend } = this.refs;
        for (const key in icons) {
            const type = icons[key], name = type.name, icon = type.image;
            const div = document.createElement('div');
            div.innerHTML = `<img src="${icon}"> ${name}`;
            legend.appendChild(div);
        }
        this.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
    }

    createMap(center) {
        const config = this.props.state;
        const mapOptions = {
            zoom: config.initialZoom,
            center: center,
        }
        if (config) {
            mapOptions.styles = MapStyles(config.colors);
            mapOptions.mapTypeId = 'terrain';
        }
        let map = new google.maps.Map(this.refs.mapCanvas, mapOptions);
        map.setCenter(this.mapCenter(config.initialCenter.lat, config.initialCenter.lng));
        map.addListener('click', (e) => {
            this.setState({ lat: e.latLng.lat(), lng: e.latLng.lng() })
            let position = { lat: this.state.lat, lng: this.state.lng }
            this.props.toggleMarkerModal(position)
            // need actual response for this promise to work
            // .then(res => {
            //     this.newMarker(position)
            //     this.props.toggleMarkerModal()
            //     google.maps.event.addListener(thisMarker, 'click', () => this.handleMarkerClick(thisMarker, marker.details));
            // })
            // need to render new marker only if button cicked is "yes" and submit comes back sucessful
            // this.props.toggleMarkerModal()
            // this.newMarker(position)
        })
        return map
    }

    createMarkers(markers) {

        const markersArray = markers.map((marker) => {
            const config = this.props.state,
                icon = config.icons && config.icons[marker.icon].image,
                thisMarker = this.newMarker(marker.position, icon, marker.details);
            // have to define google maps event listeners here too
            // because we can't add listeners on the map until it's created
            thisMarker.infoWindowIsOpen = false;
            google.maps.event.addListener(thisMarker, 'click', () => this.handleMarkerClick(thisMarker, marker.details));
            return thisMarker;
        })
        return markersArray;
    }

    getUserLocation() {
        this.props.loading();
        this.setState({ hasLoaded: false })
        // lets map autocenter on user's location (if the user enables it)
        // which takes a while, so the map should get rendered with the initial center first
        navigator.geolocation.getCurrentPosition((position) => {
            this.props.loading();
            this.moveMap(position.coords.latitude, position.coords.longitude);
            this.newMarker(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
            this.props.toggleMarkerModal()
        }, () => alert("Couldn't find your location"))
    }

    handleMarkerClick(marker, details) {
        if (!marker.infoWindowIsOpen) {
            marker.infoWindowIsOpen = true;
            console.log(details)
            this.newInfoWindow(marker, details);
        } else {
            marker.infoWindowIsOpen = false;
            marker.infoWindow.close();
        }
    }

    handleScriptCreate() {
        this.setState({
            scriptLoaded: false
        })
    }

    handleScriptError() {
        this.setState({
            scriptError: true
        })
    }

    handleScriptLoad() {
        this.setState({
            scriptLoaded: true
        });
        this.loadMap();
    }

    deleteMarker = () => {
        console.log('working')
    }

    newInfoWindow(anchor, content) {

        let contentString =
            `
                <div>
                  <h6>Spot Details<h6>
                  <div class="small">
                    Type of Spot: ${content.spotType}
                  </div>
                  <div class="small">
                    Notes: ${content.spotNotes}
                  </div>
                  <div class="small">
                    Taken?: ${content.isSpotTaken}
                  </div>
                  <button className="delete spot" onClick={this.deleteMarker}> Delete spot </button>
                </div>
              `

        anchor.infoWindow = new google.maps.InfoWindow({
            map: this.map,
            anchor: anchor,
            content: contentString
        })
        console.log(anchor.infoWindow)
        google.maps.event.addListenerOnce(anchor.infoWindow, 'click', () => 
            console.log('i am deleting')
        )
        return anchor.infoWindow;
    }

    newMarker(position, image, details) {
        let thisMarker = new google.maps.Marker({
            position: position,
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            icon: image
        })

        return thisMarker
    }

    mapCenter(lat, lng) {
        return new google.maps.LatLng(lat, lng);
    }

    moveMap(lat, lng, message) {
        this.setState({
            center: this.mapCenter(lat, lng)
        });
        this.map.panTo(this.state.center);
        // if (!this.state.hasLoaded) {
        //     let thisMarker = this.newMarker(this.state.center);
        //     this.newInfoWindow(thisMarker, message);
        // }
    }

    handleChange = (e) => {
        this.setState({ searchCity: e.target.value })
        if (this.state.searchCity.length > 4) {
            let searchBox = new google.maps.places.Autocomplete(e.target);
            let that = this
            let hasDownBeenPressed = false;

            searchBox.addListener('keydown', (e) => {
                if (e.keyCode === 40) {
                    hasDownBeenPressed = true;
                }
            });
            google.maps.event.addDomListener(e.target, 'keydown', (e) => {
                e.cancelBubble = true;
                if (e.keyCode === 13 || e.keyCode === 9) {
                    if (!hasDownBeenPressed && !e.hasRanOnce) {
                        google.maps.event.trigger(e.target, 'keydown', {
                            keyCode: 40,
                            hasRanOnce: true,
                        });
                    }
                }
            });
            searchBox.addListener('focus', () => {
                hasDownBeenPressed = false;
                searchInput.value = '';
            });

            searchBox.addListener('place_changed', function () {
                that.props.loading()
                var places = searchBox.getPlace();
                that.setState({ searchCity: places.formatted_address })
                if (typeof places.address_components !== 'undefined') {
                    hasDownBeenPressed = false;
                }
                that.props.searchCity(places.formatted_address).then(res => {
                    that.moveMap(that.props.state.center.lat, that.props.state.center.lng);
                    that.setState({ searchCity: '' })
                })
            })
        }
    }
    render() {
        return (
            <div className="GMap">
                <Script
                    url={this.props.state.url}
                    onCreate={this.handleScriptCreate.bind(this)}
                    onError={this.handleScriptError.bind(this)}
                    onLoad={this.handleScriptLoad.bind(this)}
                />
                <div className='GMap-canvas' ref="mapCanvas"></div>
                {this.props.state.loading
                    ? <Row>
                        <Col s={12}>
                            <div className="fifty-w margy-a">
                                <ProgressBar />
                            </div>
                        </Col>
                    </Row>
                    : null}
                <SearchBar handleChange={this.handleChange.bind(this)} searchCity={this.state.searchCity} />
                <button className="btn waves-effect waves-light z-zero" onClick={this.getUserLocation.bind(this)}>Use current Location</button>

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
        loading: () => {
            return dispatch(loading())
        },
        searchCity: (location) => {
            return dispatch(searchCity(location))
        },
        toggleMarkerModal: (position) => {
            return dispatch(toggleMarkerModal(position))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GMap)