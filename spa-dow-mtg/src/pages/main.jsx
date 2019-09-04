import React, { Component } from 'react';
import { connect } from 'react-redux';

/* Action */
import { cardActions } from '../actions';

/* Components */
import {Cards} from '../modules/Cards'
class Main extends Component {
    constructor(props) {
        super(props);

        this.props = props;
    }

    componentDidMount() {
        this.getCards();
    }

    getCards() {
        const { dispatch } = this.props;

        dispatch(cardActions.getCard());
    }

    render() {
        return (
            <div>
                oi
            </div>
        );
    }
}

/* Map State to Props/Childrens */
function mapStateToProps(state) {
	return state;
}

// the way to connect a component to redux is
// to return its connected proxy
export default connect(mapStateToProps)(Main);
