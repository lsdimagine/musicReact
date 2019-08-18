import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import {Button, Card, Icon, ListItem} from 'react-native-elements';
import * as actions from '../actions';
import _ from 'lodash';

export default class FavoriteScreen extends React.PureComponent {
  static navigationOptions = {
    title: 'Favorites'
  };

  constructor() {
    super();
    this.state = {
      albums: {},
    };
  }

  componentDidMount() {
    this.getFavoriteAlbums();
  }

  async getFavoriteAlbums() {
    const albums = await actions.retrieveData('favoriteAlbums');
    this.setState({
      albums,
    });
  }

  async deleteAlbum(albumId) {
    const albums = this.state.albums;
    delete albums[albumId];
    await actions.storeData('favoriteAlbums', albums);
    this.setState({
      albums,
    });
    this.forceUpdate();
  }

  renderTracks(tracks) {
    if (tracks) {
      return _.map(tracks, (track, id) => {
        return (
          <ListItem
            key={id}
            title={track.title}
            leftIcon={<Icon 
              raised
              name='music'
              type='font-awesome'
              color='#f50'
              onPress={() => {}}
            />}
            rightIcon={
              <Icon 
                raised
                name='glass'
                type='font-awesome'
                color='#f50'
                onPress={() => {}}
              />
            }
            topDivider
            bottomDivider
          />
        );
      })
    }
  }

  render() {
    if (this.state.albums) {
      return (
        <ScrollView style={styles.container}>
          {
            _.map(this.state.albums, (album, id) => {
              if (album.title) {
                return (
                  <Card
                    key={id}
                    title={album.title}
                    image={{uri: album.cover}}>
                    {this.renderTracks(album.tracks)}
                    <Button title='Delete' onPress={() => this.deleteAlbum(id)} />
                  </Card>
                );
              } else {
                return null;
              }
            })
          }
        </ScrollView>
      );
    } else {
      return (
        <ScrollView>
          <Text> Loading... </Text>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eaeaea',
  },
});
