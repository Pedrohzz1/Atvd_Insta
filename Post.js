import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';

const Post = ({ username, profilePic, postImage, likes, caption, timeAgo }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [showHeart, setShowHeart] = useState(false);
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const lastTap = useRef(null);

  const handleLike = () => {
    const updated = !isLiked;
    setIsLiked(updated);
    setCurrentLikes(prev => prev + (updated ? 1 : -1));
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      if (!isLiked) {
        setIsLiked(true);
        setCurrentLikes(prev => prev + 1);
      }
      setShowHeart(true);
      scaleAnim.setValue(0);
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          delay: 400,
          useNativeDriver: true,
        }),
      ]).start(() => setShowHeart(false));
    }
    lastTap.current = now;
  };

  const formatNumber = (num) => num.toLocaleString('pt-BR');

  return (
    <>

      <View style={styles.postWrapper}>
        <View style={styles.postHeader}>
          <View style={styles.profileInfo}>
            <Image source={{ uri: profilePic }} style={styles.profileImage} />
            <Text style={styles.username}>{username}</Text>
          </View>
          <Text style={styles.moreOptions}>⋯</Text>
        </View>

        <TouchableWithoutFeedback onPress={handleDoubleTap}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: postImage }} style={styles.postImage} />
            {showHeart && (
              <Animated.View style={[styles.animatedHeart, { transform: [{ scale: scaleAnim }] }]}>
                <Text style={styles.heartIcon}>❤️</Text>
              </Animated.View>
            )}
          </View>
        </TouchableWithoutFeedback>

        <View style={styles.iconWrapper}>
          <TouchableOpacity onPress={handleLike}>
            <Text style={[styles.icon, isLiked && { color: 'red' }]}>♥</Text>
          </TouchableOpacity>
          <Text style={styles.icon}>💬</Text>
          <Text style={styles.icon}>➤</Text>
        </View>

        <Text style={styles.likeCount}>{formatNumber(currentLikes)} curtidas</Text>
        <Text style={styles.caption}>
          <Text style={styles.username}>{username} </Text>
          {caption}
        </Text>
        <Text style={styles.time}>{timeAgo}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  logo: {
    height: 40,
    width: 120,
  },
  postWrapper: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 10,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  moreOptions: {
    fontSize: 20,
    color: '#555',
  },
  imageContainer: {
    position: 'relative',
    touchAction: 'manipulation',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  },
  postImage: {
    width: '100%',
    height: 300,
    pointerEvents: 'none',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  },
  animatedHeart: {
    position: 'absolute',
    top: '40%',
    left: '40%',
    zIndex: 10,
  },
  heartIcon: {
    fontSize: 100,
    color: 'red',
    opacity: 0.9,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  iconWrapper: {
    flexDirection: 'row',
    marginHorizontal: 10,
    marginTop: 8,
  },
  icon: {
    fontSize: 30,
    marginRight: 15,
    color: '#000',
  },
  likeCount: {
    marginLeft: 10,
    fontWeight: '600',
    marginTop: 5,
  },
  caption: {
    marginHorizontal: 10,
    marginTop: 5,
  },
  time: {
    marginHorizontal: 10,
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
});

export default Post;
