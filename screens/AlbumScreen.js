import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Card, Text, Button, Image } from 'react-native-elements';
import AlbumList from '../components/AlbumList';
import SearchText from '../components/SearchText';
import * as actions from '../actions';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class AlbumScreen extends React.PureComponent {
  constructor() {
    super()
    this.state = {
      albums: [],
      isLoading: false,
      artists: [],
    }
  }

  submitSearch(artist) {
    actions.SearchTracks(artist)
    .then((response) => {
      const dataArray = response.data.data;
      const uniqData = _.uniqBy(dataArray, 'album.title');
      const albums = uniqData.map(item => item.album);
      const artists = uniqData.map(item => item.artist);
      this.setState({
        albums,
        artists,
      });
    });
  }

  async saveFavoriteAlbum(album) {
    const albums = await actions.retrieveData('favoriteAlbums') || {};
    if (albums[album.id]) {
      return;
    }
    albums[album.id] = album;
    const success = await actions.storeData('favoriteAlbums', albums);
    if (success) {
      Alert.alert(
        'Album added',
        `${album.title} has been added to favorite`,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  }

  renderCardBottomNavigation(album, artist) {
    return (
      <View style={styles.albumMenu}>
        <Icon 
          onPress={() => {}}
          raised
          name='music'
          type='font-awesome'
          color='#f50'
          size={30}
        />
        <Icon 
          onPress={() => {
            this.saveFavoriteAlbum(album);
          }}
          raised
          name='play'
          type='font-awesome'
          color='#f50'
          size={30}
        />
        <Icon 
          onPress={() => {
            this.props.navigation.navigate('AlbumDetailsScreen', {album, artist})
          }}
          raised
          name='info'
          type='font-awesome'
          color='#f50'
          size={30}
        />
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        <SearchText submitSearch={this.submitSearch.bind(this)} />
        <AlbumList albums={this.state.albums} artists={this.state.artists} buttonText={'See details'} bottomView={this.renderCardBottomNavigation.bind(this)} />
      </ScrollView>
    );
  }
}

AlbumScreen.navigationOptions = {
  title: 'Album'
};

const styles = StyleSheet.create({
  albumMenu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
