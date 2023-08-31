import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import tw from 'twrnc';

import BackButton from '../components/BackButton';

const Screen = () =>  {
  return (
    <View style={tw`flex-1`}>
        <BackButton />
        <MapView style={tw`h-full w-full`} />
    </View>
  );
}

export default Screen;