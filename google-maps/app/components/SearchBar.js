import React, { Component } from 'react'
import { Row, Input, Link, Card, Col } from 'react-materialize'


export default class SearchBar extends Component {
    constructor() {
        super()

        this.state = {
            searchCity: ''
        }
    }


    render() {
        return (
            <div className="container container-fifty">
                <Col m={6} s={12}>
                    <div className="row">
                        <form onSubmit={this.props.handleSearchSubmit.bind(this)}>
                            <input type="text" onChange={this.props.handleChange.bind(this)} placeholder="Search for a location:" value={this.props.searchCity} />
                            <button className="btn waves-effect waves-light z-zero" type="submit">Search</button>
                        </form>
                    </div>
                </Col>
            </div>
        )
    }

}