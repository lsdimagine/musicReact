import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Button,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  Divider,
} from 'react-native-elements';
import * as actions from '../actions';

export default class StorageScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Storage'
  };

  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  async storeData() {
    const data = {
      value: 'value'
    };
    const value = await actions.storeData('key', data);
    if (value !== null) {
      console.log(value);
    }
  }

  async retrieveData() {
    this.setState({
      value: ''
    });
    const value = await actions.retrieveData('key');
    if (value !== null) {
      console.log(value);
      this.setState({
        value: value.value,
      });
    }
  }

  async removeData() {
    await actions.clearData();
  }

  render() {
    return (
      <View>
        <Text> Storage </Text>
        <Button title='Store Data' onPress={this.storeData.bind(this)}/>
        <Button title='Retrieve Data' onPress={this.retrieveData.bind(this)}/>
        <Button title='Remove Data' onPress={this.removeData.bind(this)}/>
        <Text> {this.state.value} </Text>

        <Divider style={{backgroundColor: 'black',}} />

        <TouchableHighlight
         style={styles.button}
         onPress={this.storeData.bind(this)}
        >
          <Text> Store Data </Text>
        </TouchableHighlight>
        <TouchableHighlight
         style={styles.button}
         onPress={this.retrieveData.bind(this)}
        >
          <Text> Retrieve Data </Text>
        </TouchableHighlight>
        <TouchableHighlight
         style={styles.button}
         onPress={this.removeData.bind(this)}
        >
          <Text> Remove Data </Text>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  },
  countContainer: {
    alignItems: 'center',
    padding: 10
  },
  countText: {
    color: '#FF00FF'
  }
})
