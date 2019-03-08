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
            restaurantNames: ['Leave Rochelle Out Of It', 'Carthage Must Be Destroyed', 'Here’s Looking At You', 'The Whale Wins'],
            location: "",
            review: "This is a fake review filled with lorem ipsum. The last time you had a cheeseburger was too long ago. Try not to drool when you think about the slightly charred, medium-rare meat nestled between soft brioche, cradled in crisp iceberg lettuce and flavour amplifying condiments. Why are you still reading this- go get a cheeseburger.",
            order: "",
            avoid: "",
            photos: [],
            timeSinceReview: "",//this will be calculated based on the save date of the review post
            profilePic: "",
            ratings: null,
            reviews: null,




        }
    }
    render() {


        const ratingObj = {
            ratings: this.props.ratings,
            views: this.props.reviews
        }



        return (

            <View>
                {this.state.restaurantNames.length > 0 ? this.state.restaurantNames.map((name) => (
                    <View style={styles.container}>
                        <SaveButton />
                        <View>
                            <Text style={styles.displayRestaurant}>{name}</Text>
                        </View>
                        <View style={styles.stars} >
                            <GeneralStarExample ratingObj={ratingObj} />
                        </View>
                        <Text style={styles.displayReview}>{this.state.review}</Text>
                    </View>
                )) : null
                }
            </View>
        )




    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        height: 250,
        backgroundColor: colors.white,
        padding: 10,
        marginBottom: 10,




    },
    title: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    activeTitle: {
        color: 'red',
    },


    displayRestaurant: {

        flexDirection: 'row',
        height: 25,
        width: 350,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: 1,
        paddingLeft: 10,
        borderWidth: 0,
        textAlign: 'left',
        color: colors.warmgrey,




    },
    stars: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        borderWidth: 0,
        width: 350,
        padding: 10,



    },
    displayReview: {

        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 150,
        width: 350,
        borderWidth: 0,
        paddingLeft: 10,
        paddingTop: 10,
        color: colors.warmgrey,

    },
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

