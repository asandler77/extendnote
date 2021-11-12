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
      // horizontal={true}
      // keyExtractor={item => item.id}/>;
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
