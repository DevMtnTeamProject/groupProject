import React, { Component } from 'react';
import { Alert, AppRegistry, Button, StyleSheet, View } from 'react-native';

export default class SaveButton extends Component {
    _onPressButton() {
        Alert.alert('Remove')
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                        onPress={this._onPressButton}
                        title="Save"
                    />
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
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
        height: 50,
        width: 200

    },
    buttonContainer: {

        flex: 1,
        margin: 1,
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


