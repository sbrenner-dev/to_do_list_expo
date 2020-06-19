import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';

/**
 * Width of device this application runs on
 */
const WIDTH = Dimensions.get('window').width;

export default class Task extends React.Component {

    /**
     * Constructs this task
     * @param {*} props props passed from App
     */
    constructor(props) {
        super(props);
    }

    /**
     * Deletes this task from the App internal list
     * Binded with => 
     */
    delete = () => {
        this.props.delete(this.props.task);
    }

    render() {
        return (
            <View style={styles.taskbox}>
                <View style={styles.title}>
                    <Text style={styles.textbox}>{this.props.task}</Text>
                    <TouchableOpacity
                        onPress={this.delete}
                        style={styles.overlap}
                    >
                        <Image
                            source={require('./assets/x.png')}
                            style={styles.button}
                        />
                    </TouchableOpacity>
                </View>
            </View>);
    }
}

/**
 * Stylesheet for this task
 */
const styles = StyleSheet.create({
    taskbox: {
        width: WIDTH / 2 + 40,
        borderWidth: 2,
        marginVertical: 8,
        marginHorizontal: 16,
        backgroundColor: 'whitesmoke'
    },
    title: {
        fontSize: 16,
        color: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
    },
    button: {
        marginHorizontal: 4,
        width: 15,
        height: 15,
    },
    textbox: {
        width: WIDTH / 2,
    },
    overlap: {
        justifyContent: 'center'
    }
});