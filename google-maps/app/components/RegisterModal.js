import React, { Component } from 'react';
import ReactModal from 'react-modal';
import { Row, Input, Link, Card, Col, Button, Icon  } from 'react-materialize'
import { connect } from 'react-redux'

import {toggleRegister, register} from '../actions';


class RegisterModal extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            confirmPassword: '',
            username: ''
        }
    }
    updateState = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.register(this.state);
    }

    render() {
        return (
            <ReactModal header='register Header'
                isOpen={this.props.state.showRegisterModal}
                contentLabel="Minimal Modal Example">
                <Button onClick={this.props.toggleRegister} floating icon='close' className='red' large style={{ top: '0px', left: '45%' }}/>
                <div className="container container-fifty">
                    <Col m={6} s={12}>
                        <Card>
                            <div className="card-image">
                                <img src="./register.jpeg" />
                            </div>
                            <div className="row">
                                <form onSubmit={this.handleSubmit} className="col s12">
                                    <div className="row">

                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">mail</i>
                                            <input onChange={this.updateState} id="icon_telephone" type="email" name="email" className="validate" />
                                            <label htmlFor="icon_telephone" >Email</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">textsms</i>
                                            <input onChange={this.updateState} id="icon_telephone" type="text" name="username" className="validate" />
                                            <label htmlFor="icon_telephone" >Username</label>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">lock</i>
                                            <input onChange={this.updateState} id="icon_prefix" type="password" name="password" className="validate" />
                                            <label htmlFor="icon_prefix">Password</label>
                                        </div>
                                        <div className="input-field col s6">
                                            <i className="material-icons prefix">lock</i>
                                            <input onChange={this.updateState} id="icon_prefix" type="password" name="confirmPassword" className="validate" />
                                            <label htmlFor="icon_prefix">Confirm Password</label>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                                        <i className="material-icons right">send</i>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </Col>
                </div>
                
            </ReactModal>
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
        register: (user) => {
            return dispatch(register(user))
        },
        toggleRegister: () => {
            return dispatch(toggleRegister())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)