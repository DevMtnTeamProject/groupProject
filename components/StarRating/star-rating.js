import React, { Component } from 'React';
import { Ionicons } from '@expo/vector-icons';
import {
    StyleSheet,
    View,
    Text,
    Icon

} from 'react-native';
// import FontAwesome, { Icons } from "react-native-fontawesome";


// const icon = <FontAwesome name={'star'} />;


export default class Stars extends Component {
    get stars() {
        const { votes } = this.props;
        const starsNumber = parseInt(votes);
        const starElements = [];
        for (let i = 0; i < 5; i++) {
            starElements.push(
                <Ionicons
                    name="ios-star"
                    size={32}
                    color={"grey"}
                />

            )
        }
    }
    render() {
        return (
            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "center" }}>
                {this.stars}
                <Ionicons
                    name="ios-star"
                    size={32}
                    color={"grey"}
                />
                <Ionicons
                    name="ios-star"
                    size={32}
                    color={"grey"}
                />
                <Ionicons
                    name="ios-star"
                    size={32}
                    color={"grey"}
                />
                <Ionicons
                    name="ios-star"
                    size={32}
                    color={"grey"}
                />
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
