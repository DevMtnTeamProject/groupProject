import React, { Component } from 'React';
import {
    StyleSheet,
    View,
    Image,
    Text,

} from 'react-native';
import FontAwesome, { Icon } from 'react-native-fontawesome';

type Props = {
    ratingObj: {
        ratings: number;
        views: "number";
    }

};

export default class StarRating extends Component<Props>{
    render() {
        //Receive the ratings object from the props
        let ratingObj = this.props.ratingObj

        //This array will contain our star tags. We will include this
        //array between the view tag
        // let stars = [];
        //Loop 5 times
        for (var i = 1; i <= 5; i++) {
            //set path to filled stars
            <Icon name="star" />
            //If ratings is lower, set path to unfilled stars
            if (i > ratingObj.ratings) {
                <Icon name="star" />
            }
            //Push the Image tag in the stars array
            // Icon.push((<Image style={styles.image} source={path} />))


        }

        return (
            <View style={styles.container}>
                {/* {stars} */}
                <Text style={styles.text}>({ratingObj.views})</Text>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {

        backgroundColor: "#FF00FF",
        flexDirection: 'row',
        width: 100,
        height: 25,
    },
    image: {
        width: 25,
        height: 300,
    },
    text: {
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10
    },


});

//be sure to edit app.js to include the Star Rating component
