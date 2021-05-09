/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {SharedElement} from 'react-navigation-shared-element';

// importing constants
import Constants from '../../Constant';

import Styles from '../../Styles';

// importing assets
const bg = require('../../../assets/background-day.png');
const bird = require('../../../assets/bird.png');

type LeaderBoardParams = {
  navigation: any;
};

const LeaderBoard = (props: LeaderBoardParams) => {
  const [board, setBoard] = useState<any[]>([]);

  useEffect(() => {
    firestore()
      .collection('leaderboard')
      .orderBy('score')
      .limit(25)
      .get()
      .then(snap => {
        let tmp: any[] = [];
        snap.forEach((snap: any) => {
          tmp.push(snap.data());
        });
        setBoard(tmp.reverse());
      });
  });

  return (
    <View style={styles.viewContainer}>
      <Image source={bg} style={styles.backgroundImage} resizeMode="stretch" />
      <View style={styles.backBtn}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Text style={[styles.backBtnText, Styles.fontLarge]}>x</Text>
        </TouchableOpacity>
      </View>
      <SharedElement id="flappyBirdImage">
        <Image source={bird} resizeMode="contain" style={[styles.birdImage]} />
      </SharedElement>
      <Animated.View style={styles.innerContainer}>
        <FlatList
          style={styles.boardListContainer}
          data={board}
          keyExtractor={(i, index) => `${index}`}
          renderItem={({item}) => {
            return (
              <View style={styles.flatListRow}>
                <Text style={[styles.flatListText, Styles.fontSmall]}>
                  {item.name}
                </Text>
                <Text style={[styles.flatListText, Styles.fontSmall]}>
                  {item.score}
                </Text>
              </View>
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={styles.flatListSeparator} />;
          }}
          ListEmptyComponent={() => {
            return (
              <Text style={[styles.flatListText, Styles.fontSmall]}>
                Loading...
              </Text>
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View
                style={[
                  styles.flatListRow,
                  {
                    borderBottomColor: 'white',
                    borderBottomWidth: 1,
                  },
                ]}>
                <Text style={[styles.flatListText, Styles.fontSmall]}>
                  Name
                </Text>
                <Text style={[styles.flatListText, Styles.fontSmall]}>
                  Score
                </Text>
              </View>
            );
          }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
  },
  backBtnText: {
    fontFamily: 'cusFont',
    color: 'white',
  },
  birdImage: {
    position: 'absolute',
    alignSelf: 'center',
    width: Constants.BIRD_IMAGE_WIDTH,
    height: Constants.BIRD_IMAGE_HEIGHT,
    transform: [{translateY: -Constants.MAX_HEIGHT / 2.6}],
  },
  innerContainer: {
    alignSelf: 'center',
    position: 'absolute',
    height: Constants.MAX_HEIGHT - Constants.MAX_HEIGHT / 3 - 20,
    bottom: Constants.MAX_HEIGHT / 12,
    width: Constants.MAX_WIDTH - 80,
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    borderWidth: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  boardListContainer: {
    alignSelf: 'stretch',
  },
  flatListRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 5,
  },
  flatListText: {
    color: 'white',
    fontFamily: 'cusFont',
  },
  flatListSeparator: {
    borderBottomColor: 'rgba(255,255,255, 0.2)',
    borderBottomWidth: 1,
  },
});

LeaderBoard.sharedElements = () => {
  return [
    {
      id: 'flappyBirdImage',
      animation: 'fade',
      resize: 'none',
      align: 'center',
    },
  ];
};

export default LeaderBoard;
