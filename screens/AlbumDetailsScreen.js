import React from 'react';
import {Alert, ScrollView, View, StyleSheet, Linking} from 'react-native';
import {Avatar, Text, Icon, Divider, ListItem} from 'react-native-elements';
import * as actions from '../actions';

export default class AlbumDetailsScreen extends React.PureComponent {
  static navigationOptions = ({ navigation }) => {
    const album = navigation.getParam('album', {});
    return {
      title: album ? album.title: 'Album details',
    };
  };

  constructor() {
    super();
    this.state = {
      tracks: [],
    };
  }

  componentDidMount() {
    const album = this.props.navigation.getParam('album', {});
    if (album.id) {
      actions.SearchAlbum(album.id)
      .then(response => {
        this.setState({
          tracks: response.data.tracks.data,
        });
      });
    }
  }

  async saveFavoriteTrack(album, track) {
    const albums = await actions.retrieveData('favoriteAlbums') || {};
    let albumData = albums[album.id];
    if (!albumData) {
      albumData = album;
    }
    if (!albumData['tracks']) {
      albumData['tracks'] = {};
    }
    albumData['tracks'][track.id] = track;
    albums[album.id] = albumData;
    const success = await actions.storeData('favoriteAlbums', albums);
    if (success) {
      Alert.alert(
        'Track added',
        `${track.title} in ${album.title} has been added to favorite`,
        [
          {text: 'OK', onPress: () => console.log('OK Pressed')},
        ],
        {cancelable: false},
      );
    }
  }

  render() {
    const album = this.props.navigation.getParam('album', {});
    const artist = this.props.navigation.getParam('artist', {});
    if (album.id && this.state.tracks && this.state.tracks.length > 0) {
      return (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <View style={styles.avatar}>
              <Avatar size="xlarge" rounded source={{uri: album.cover_medium}}> </Avatar>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.mainText}>{album.title}</Text>
              <Text style={styles.subText}>{artist.name}</Text>
              <Icon 
                raised
                name='play'
                type='font-awesome'
                size={30}
                color='#f50'
                onPress={() => Linking.openURL(album.tracklist)}
              />
            </View>
            {/* <Avatar size="xlarge" rounded source={{uri: artist.picture_medium}}> </Avatar> */}
          </View>
          <Divider style={{backgroundColor: 'black',}} />
          {this.state.tracks.map((track, index) => {
            return (
              <ListItem
                key={index}
                title={track.title}
                leftIcon={<Icon 
                  raised
                  name='music'
                  type='font-awesome'
                  color='#f50'
                  onPress={() => this.saveFavoriteTrack(album, track)}
                />}
                rightIcon={
                  <Icon 
                    raised
                    name='glass'
                    type='font-awesome'
                    color='#f50'
                    onPress={() => Linking.openURL(track.preview)}
                  />
                }
                topDivider
                bottomDivider
              />
            )
          })}
        </ScrollView>
      )
    } else {
      return (
        <Text>Loading...</Text>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'grey',
    padding: 20,
  },
  headerRight: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  avatar: {
    flex: 1,
    marginRight: 10,
  },
  mainText: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 17,
  },
});
