import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {View, Button} from 'react-native';

export default class SettingsScreen extends React.PureComponent {
  /**
   * Go ahead and delete ExpoConfigView and replace it with your content;
   * we just wanted to give you a quick view of your config.
   */
  render() {
    return (
      <View>
        <Button title='Go to Storage' onPress={() => this.props.navigation.navigate('Storage')} />
        <ExpoConfigView />
      </View>
    );
  };
}

SettingsScreen.navigationOptions = {
  title: 'app.json',
};
