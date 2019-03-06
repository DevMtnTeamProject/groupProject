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

        return (
            <View style={styles.container}>
                <View >
                    <TouchableOpacity onPress={this._onPressButton}
                        style={this.state.pressStatus ? styles.buttonPress : styles.button}
                    >
                        <Icon name="ios-close" color={colors.midgrey} size={32} />


                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,



        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'baseline',
        height: 30,
        width: 30,

    },
    button: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'baseline',
        height: 30,
        width: 30,
        borderColor: colors.midgrey,
        borderWidth: 2,
        borderRadius: 50,



    },

    buttonPress: {

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,
        backgroundColor: colors.warmgrey,
        borderRadius: 50,




    },
});


