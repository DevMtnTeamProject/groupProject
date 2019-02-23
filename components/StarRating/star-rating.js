import React, { Component } from 'React';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import {
    StyleSheet,
    View,
    Text,
    Icon,

} from 'react-native';
import StarRating from 'react-native-star-rating';
// import FontAwesome, { Icons } from "react-native-fontawesome";


class GeneralStarExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            starCount: ''
        };
    }

    onStarRatingPress(rating) {
        //something needs to go here to send the data to the backend
        this.setState({
            starCount: rating
        });
    }

    render() {
        return (
            <StarRating
                disabled={false}
                maxStars={5}
                rating={this.state.starCount}
                selectedStar={(rating) => this.onStarRatingPress(rating)}
            />
        );
    }
}

export default GeneralStarExample

//we don't want the stars actually clickable on the review card from someone else.

























