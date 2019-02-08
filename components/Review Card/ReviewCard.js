import React from "react";
import { StyleSheet, Text, View, Image, Button, Dimensions } from "react-native";
import { AuthSession } from "expo";
import StarRating from '../StarRating/star-rating';
import { TextInput } from "react-native-gesture-handler";
import SaveButton from '../SaveButton/save-button';



export default class ReviewCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantName: "",
            location: "",
            review: "",
            order: "",
            avoid: "",
            photos: [],
            timeSinceReview: "",//this will be calculated based on the save date of the review post
            profilePic: "",
            ratings: null,
            reviews: null


        }
    }
    render() {

        const ratingObj = {
            ratings: this.props.ratings,
            views: this.props.reviews
        }

        return (
            <View style={styles.container}>
                <Text style={styles.displayRestaurant}
                    value={this.props.restaurantName}
                />
                <StarRating ratingObj={ratingObj} />
                <Text style={styles.displayTime}
                    value={this.props.timeSinceReview}
                />
                <Text style={styles.displayDistance}
                    value={this.props.location}
                />
                <Text style={styles.displayReview}
                    value={this.props.review}
                />
                <Text style={styles.displayRecommended}
                    value={this.props.order}
                />
                <Text style={styles.displayAvoid}
                    value={this.props.avoid}
                />
                <SaveButton
                />


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    displayRestaurant: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    displayTime: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    displayDistance: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    displayReview: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    displayRecommended: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    displayAvoid: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    }
});

