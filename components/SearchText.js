import React from 'react';
import { View } from 'react-native';
import { Input, Button } from 'react-native-elements';

export default class SearchText extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      value: ''
    };
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focus();
    this.textInput.current.errorMessage = 'AHHHHHH';
  }

  onChange(value) {
    this.setState({
      value,
    });
  }

  submitSearch() {
    if (this.props.submitSearch) {
      this.props.submitSearch(this.state.value);
    }
  }

  render() {
    return (
      <View>
        <Input
          ref={this.textInput}
          placeholder='Search Singer'
          onChangeText={(event) => this.onChange(event)}
          errorStyle={{ color: 'red' }}
        />
        <Button title='Search' onPress={() => this.submitSearch()} />
      </View>
    );
  }
}
