import React, { Component } from 'react';
import { connect } from 'react-redux'
import ReactModal from 'react-modal';
import { Row, Input, Link, Card, Col, Button, Icon } from 'react-materialize'

import { toggleLogin, login } from '../actions';

class LoginModal extends Component {
    constructor() {
        super()

        this.state = {
            email: '',
            password: ''
        }
    }
    updateState = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleSubmit = (event) => {
        this.props.login(this.state);
    }
    render() {
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        };
        return (
            <ReactModal style={customStyles} header='login Header'
                isOpen={this.props.state.showLoginModal}
                contentLabel="Minimal Modal Example">
                <Button onClick={this.props.toggleLogin} floating icon='close' className='red' large style={{ bottom: '0px', left: '45%' }} />
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
                                            <i className="material-icons prefix">lock</i>
                                            <input onChange={this.updateState} id="icon_prefix" type="password" name="password" className="validate" />
                                            <label htmlFor="icon_prefix">Password</label>
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
        login: (user) => {
            return dispatch(login(user))
        },
        toggleLogin: () => {
            return dispatch(toggleLogin())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)