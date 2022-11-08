import React from 'react';
import {Box} from 'atoms/Box';
import {FlatList} from 'react-native';
import {Card} from 'atoms/Card';
import {Row} from 'atoms/Row';
import {TextView} from 'atoms/TextView';
import {Image} from 'atoms/Image';
import {ChipStatus} from 'atoms/ChipStatus';
import {Touch} from 'atoms/Touch';
import {ScrollView} from 'react-native-gesture-handler';
import edit from '../../assets/images/edit.png';
import share from '../../assets/images/share.png';
import {deviceHeight, deviceWidth, isIOS} from 'utils/device';
import {navigate} from 'services/NavigationService';
import Share from 'react-native-share';
import {chipStatus, shareMessage} from 'utils/constant';

type FeedListItemProps = {
  data: any;
};
export const FeedListItem = ({data}: FeedListItemProps) => {
  const renderItem = item => {
    const formattedDate = item?.item?.created_at
      .toLocaleString()
      .split('T')[0]
      .split('-')
      .reverse()
      .join('/');
    const myCustomShare = async () => {
      const shareOptions = {
        message: shareMessage.message(
          item?.item?.title,
          item?.item?.promotion_url,
        ),
      };
      try {
        const ShareResponse = await Share.open(shareOptions);
      } catch (error) {
        console.log('Error =>', error);
      }
    };
    return (
      <Touch
        onPress={() => {
          navigate('FeedStackScreen', {
            screen: 'FeedDetails',
            initial: false,
            params: {id: item?.item?.id},
          });
        }}>
        <ScrollView>
          <Card m="m" flex={1}>
            <Row
              m="s"
              justifyContent="space-between"
              alignItems="center"
              mt={isIOS ? 'm' : 's'}>
              <Image
                mr={isIOS ? '-mxxxl' : '-xl'}
                source={{uri: item?.item?.organization_logo}}
                width={40 % -deviceHeight}
                height={35 % -deviceHeight}
              />
              <Box mr="l">
                <TextView
                  fontWeight="bold"
                  color="zBlack"
                  fontSize={isIOS ? 16 % -deviceHeight : 15 % -deviceHeight}>
                  {item?.item?.organization_name}
                </TextView>
                <TextView
                  color="greyText"
                  mt={isIOS ? 'xs' : '-xxs'}
                  variant="titleDescription"
                  fontSize={isIOS ? 14 % -deviceHeight : 12 % -deviceHeight}>
                  Posted on: {formattedDate}
                </TextView>
              </Box>

              <Box ml="l">
                <Row justifyContent="flex-end">
                  <Touch mr="s" mt="s" onPress={() => navigate('EditFeeds')}>
                    <Image source={edit} width={25} height={25} />
                  </Touch>
                  <Touch mt="s" onPress={myCustomShare}>
                    <Image source={share} width={23} height={23} />
                  </Touch>
                </Row>
              </Box>
            </Row>

            <Box mb="l" height={280} my="xs">
              <Image
                source={{uri: item?.item?.avatar}}
                height={isIOS ? '100%' : '90%'}
              />
            </Box>
            <Row
              justifyContent="space-between"
              alignItems="center"
              width={deviceWidth}
              mt={isIOS ? '-sl' : '-mxxxl'}>
              <Box ml="s" mt={isIOS ? 'xs' : 's'}>
                <Row justifyContent="flex-start">
                  <Box width={isIOS ? '58%' : '60%'}>
                    <TextView
                      fontWeight="bold"
                      color="zBlack"
                      fontSize={isIOS ? 18 : 16}>
                      {item?.item?.title}
                    </TextView>
                  </Box>
                  <Box mx={isIOS ? 'm' : '-xxs'}>
                    <ChipStatus
                      text={
                        item?.item?.approved === chipStatus.pending
                          ? chipStatus.underReview
                          : item?.item?.approved
                      }
                      color="lightingYellow"
                      px="s"
                    />
                  </Box>
                </Row>
                <Box width={deviceWidth - 50}>
                  <TextView
                    color="darkGreyText"
                    mb="m"
                    mt="xs"
                    numberOfLines={3}
                    ellipsizeMode="tail"
                    fontSize={isIOS ? 18 : 16}>
                    {item?.item?.description}
                  </TextView>
                </Box>
              </Box>
            </Row>
          </Card>
        </ScrollView>
      </Touch>
    );
  };
  return (
    <Box>
      <FlatList
        initialNumToRender={10}
        renderItem={renderItem}
        data={data}
        onEndReachedThreshold={0.1}
        showsVerticalScrollIndicator={false}
        keyExtractor={(__: any, i: number) => i.toString()}
      />
    </Box>
  );
};
