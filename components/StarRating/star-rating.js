import React, { Component } from 'React';
import {
    StyleSheet,
    View,
    Image,
    Text,

} from 'react-native';

type Props = {
    ratingObj: {
        ratings: number;
        views: number;
    }

};

export default class StarRating extends Component<Props>{
    render() {
        //Receive the ratings object from the props
        let ratingObj = this.props.ratingObj

        //This array will contain our star tags. We will include this
        //array between the view tag
        let stars = [];
        //Loop 5 times
        for (var i = 1; i <= 5; i++) {
            //set path to filled stars
            let path = require('./star-filled.png');
            //If ratings is lower, set path to unfilled stars
            if (i > ratingObj.ratings) {
                path = require('./star-unfilled.png');
            }
            //Push the Image tag in the stars array
            stars.push((<Image style={styles.image} source={path} />))


        }

        return (
            <View style={styles.container}>
                {stars}
                <Text style={styles.text}>({ratingObj.views})</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FF00FF",
        flexDirection: 'row',
    },
    image: {
        width: 25,
        height: 25,
    },
    text: {
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10
    },


});

//be sure to edit app.js to include the Star Rating component
