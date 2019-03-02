import React, { Component } from 'react';
import { Alert, Button, StyleSheet, View, TouchableOpacity } from 'react-native';
// import { Ionicons, FontAwesome } from '@expo/vector-icons';
import colors from '../../styles/colors';
import Icon from "@expo/vector-icons/EvilIcons";

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
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={this._onPressButton}
                        style={this.state.pressStatus ? styles.buttonPress : styles.button}
                    >
                        <Icon name="checkmark-circle" color={colors.yellow} size={32} />


                    </TouchableOpacity>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,



        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        height: 30,
        width: 30,

    },
    button: {
        margin: 30,
        flexDirection: 'row',
        height: 30,
        width: 30,
        backgroundColor: colors.yellow,
        justifyContent: 'center',



    },

    buttonPress: {
        margin: 30,
        flexDirection: 'row',
        height: 30,
        width: 30,
        backgroundColor: colors.eggshell,
        justifyContent: 'center',



    },
});


