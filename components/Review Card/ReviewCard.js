import React from "react";
import { StyleSheet, Text, View, Image, Button, Dimensions } from "react-native";
import { AuthSession } from "expo";
import StarRating from '../StarRating/star-rating';
import { TextInput } from "react-native-gesture-handler";



export default class ReviewCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantName: '',
            date: '',


        }
    }
    render() {

        const ratingObj = {
            ratings: 3,
            views: 34000
        }

        return (
            <View style={styles.container}>
                <StarRating ratingObj={ratingObj} />
                <TextInput
                    onChangeText={text => this.setState({ restaurantName: text })}
                    value={this.state.restaurantName}
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
});

