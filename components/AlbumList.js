import React from 'react';
import {FlatList} from 'react-native';
import { Card, Text, Button, Image, Icon } from 'react-native-elements';

export default class AlbumList extends React.PureComponent {
  render() {
    const {albums, artists, buttonText} = this.props;
    if (albums && albums.length > 0) {
      // return albums.map((album, index) => {
      //   return (
      //     <Card
      //       key={index}
      //       title={album.title}
      //       image={{uri: album.cover}}>
      //       {this.props.bottomView ? this.props.bottomView(album, artists[index]): null}
      //     </Card>
      //   );
      // });
      return (
        <FlatList 
          data={albums}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({item, index}) => {
            return (
              <Card
                title={item.title}
                image={{uri: item.cover}}>
                {this.props.bottomView ? this.props.bottomView(item, artists[index]): null}
              </Card>
            );
          }}
        />
      )
    } else {
      return null;
    }
  }
}
