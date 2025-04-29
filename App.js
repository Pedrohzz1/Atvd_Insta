import React, { Component } from 'react';
import { StyleSheet, View, Text, FlatList, SafeAreaView, Image } from 'react-native';
import Post from './Post';

let postsData = [
  {
    id: '1',
    username: 'travisscott',
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOiNwkyTMbgS3xl5h6UObBa0f1_2NKF0-xrg&s',
    postImage: 'https://s2.glbimg.com/8jeowAGqbQL6_duZU2Yr33tVAnQ=/e.glbimg.com/og/ed/f/original/2020/03/13/gettyimages-1151992775.jpg',
    likes: 1255039,
    caption: 'La Flame 🔥',
    timeAgo: 'há 5 minutos',
  },
  {
    id: '2',
    username: 'gustavo_lima_roma',
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9co88_x_xXI26PWWVBVXMvoIhcmCR4MTRDw&s',
    postImage: 'https://www.jwave.com.br/wp-content/uploads/2024/05/Kleine.Media-23bk247-AnimeFriends-scaled.jpg',
    likes: 117,
    caption: 'Participando do cantadas enfadonhas do Muca, #melhorevento',
    timeAgo: 'há 2 horas',
  },
  {
    id: '3',
    username: 'lamineyamal',
    profilePic: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzyzYrYAdqUDdIwtEKFLsL45i4b-CXfmGZmw&s',
    postImage: 'https://images2.thanhnien.vn/528068263637045248/2025/3/12/lamine-yamal-ma-thuat-1741745417204312798095.jpg',
    likes: 428269,
    caption: 'Gracias al equipo por el partido, visca Barça!',
    timeAgo: 'há 5 horas',
  },
];

export default class App extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <FlatList
          data={postsData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Post
              username={item.username}
              profilePic={item.profilePic}
              postImage={item.postImage}
              likes={item.likes}
              caption={item.caption}
              timeAgo={item.timeAgo}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  }
}

let styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#fafafa',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  logo: {
    height: 40,
    width: 120,
  },
});
