import React, { Component } from 'react';
import { Alert, Button, StyleSheet, View, TouchableOpacity } from 'react-native';
// import { Ionicons, FontAwesome } from '@expo/vector-icons';
import colors from '../../styles/colors';
import Icon from "@expo/vector-icons/Ionicons";

export default class SaveButton extends Component {
    constructor(props) {
        super(props);
        this.state = { pressStatus: false };
    }
    _onPressButton = () => {
        if (this.state.pressStatus) {
            Alert.alert('Remove')

        } else {
            Alert.alert('Save')
        }
        this.setState({ pressStatus: !this.state.pressStatus })
    }

    render() {
        const addRestaurant = <Icon if name="ios-add" color={colors.midgrey} size={32} style={{
            width: 30,
            height: 30,
            textAlign: 'center',
            marginBottom: 3,
            marginLeft: 1,
        }} />

        const removeRestaurant = <Icon if name="ios-remove" color={colors.midgrey} size={32} style={{
            width: 30,
            height: 30,
            textAlign: 'center',
            marginBottom: 3,
            marginLeft: 1,
        }} />

        let iconDisplay = this.state.pressStatus === true ? removeRestaurant : addRestaurant




        return (
            <View style={styles.container}>
                <View >
                    <TouchableOpacity onPress={this._onPressButton}
                        style={this.state.pressStatus ? styles.buttonPress : styles.button}
                    >

                        {iconDisplay}


                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,




        height: 30,
        width: 30,
        marginTop: 8,
        marginLeft: 8,


    },
    button: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        width: 25,
        borderColor: colors.midgrey,
        borderWidth: 2,
        borderRadius: 50,





    },

    buttonPress: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        width: 25,
        backgroundColor: colors.warmgrey,
        borderRadius: 50,




    },
});


