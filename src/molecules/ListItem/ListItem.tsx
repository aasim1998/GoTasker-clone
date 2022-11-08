import React from 'react';
import {FlatList} from 'react-native';
import {Tabs} from 'molecules/Tabs';
import {Box} from 'atoms/Box';

type ListItemProps = {
  data?: any;
  navigation?: any;
};

export const ListItem = ({data}: ListItemProps) => {
  const renderItem = item => {
    return (
      <Tabs
        title={item?.item?.title}
        imageURL={item?.item?.imageURL}
        onPress={item?.item?.onPress}
        pendingActionCounter={item?.item?.prop}
      />
    );
  };

  return (
    <Box>
      <FlatList data={data} renderItem={renderItem} />
    </Box>
  );
};
