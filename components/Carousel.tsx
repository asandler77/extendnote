import React from 'react';
import {FlatList, View} from 'react-native';
import Note from './Note';
import {DataType} from './types';

interface Props {
  data: DataType[] | null;
}

export default ({data}: Props) => {
  return (
    <FlatList
      data={data}
      numColumns={2}
      renderItem={({item}) => {
        return (
          <View>
            <Note data={item} />
          </View>
        );
      }}
    />
  );
};
