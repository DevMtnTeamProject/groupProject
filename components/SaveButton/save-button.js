import React, { Component } from 'react';
import { Alert, Button, StyleSheet, View, TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';

export default class SaveButton extends Component {
    _onPressButton() {
        Alert.alert('Save')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={this._onPressButton} style={{ margin: 0, flex: 1, height: 30, backgroundColor: colors.yellow, justifyContent: 'center' }}>
                        {/* onPress={this._onPressButton} */}

                    </TouchableOpacity>
                </View>
                {/* <View style={styles.buttonContainer}>
                    <Button
                        onPress={this._onPressButton}
                        title="Save"
                        color="#F4C900"
                    />
                </View> */}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,


        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30,
        width: 30,

    },
    buttonContainer: {



        // backgroundColor: '#000000'

    },
    // alternativeLayoutButtonContainer: {
    //     margin: 20,
    //     flex: 2,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     backgroundColor: '#000000'

    // }
});


