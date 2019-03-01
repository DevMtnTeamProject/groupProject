import React from "react";
import { StyleSheet, Text, View, Image, Button, Dimensions } from "react-native";
import { AuthSession } from "expo";
import GeneralStarExample from '../StarRating/star-rating';
import { TextInput } from "react-native-gesture-handler";
import SaveButton from '../SaveButton/save-button';
import colors from '../../styles/colors';



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
                <SaveButton style={styles.SaveButton}
                />

                {/* <View style={styles.displayRestaurant} /> */}
                {/* <GeneralStarExample ratingObj={ratingObj} style={styles.stars} /> */}
                {/* <Text style={styles.displayTime}
                    value={this.props.timeSinceReview}
                /> */}
                {/* <Text style={styles.displayDistance}
                    value={this.props.location}
                /> */}
                {/* <Text style={styles.displayReview}
                    value={this.props.review}
                /> */}
                {/* <Text style={styles.displayRecommended}
                    value={this.props.order}
                /> */}
                {/* <Text style={styles.displayAvoid}
                    value={this.props.avoid}
                /> */}


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: colors.eggshell,

    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    activeTitle: {
        color: 'red',
    },
    saveButton: {
        flexDirection: 'column',
        backgroundColor: colors.eggshell,
        alignItems: 'center',
        justifyContent: 'center',

    },

    // displayRestaurant: {

    //     // flex: 2,
    //     backgroundColor: colors.yellow,
    //     alignItems: 'flex-start',
    //     justifyContent: 'center',

    // },
    // stars: {
    //     flexDirection: 'row',
    //     backgroundColor: '#fff',
    //     alignItems: 'flex-start',
    //     justifyContent: 'center',

    // },
    // displayReview: {
    //     // flex: 5,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',

    // },
    // displayRecommended: {
    //     // flex: 6,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',

    // },
    // displayAvoid: {
    //     // flex: 7,
    //     backgroundColor: '#fff',
    //     alignItems: 'center',
    //     justifyContent: 'center',

    // }
});

