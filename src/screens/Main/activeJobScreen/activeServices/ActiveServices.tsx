import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {ActiveServicesItem} from 'molecules/ActiveServicesItem';
import {FlatList} from 'react-native';
import {Text} from 'atoms/Text';
import theme from 'styles/theme';
import useJob from 'context/ClientListAPI';
import {Spinner} from 'atoms/Spinner';
import moment from 'moment';

export const ActiveServices = ({route}) => {
  const {clientName} = route.params;
  const {clientId} = route.params;
  const [masterDataSource, setMasterDataSource] = useState([]);
  const {
    state: {activeServicesData, activeServicesLoading},
    actions: {getActiveServicesList},
  } = useJob();

  useEffect(() => {
    if (masterDataSource.length === 0) {
      getActiveServicesList(clientId);
    }

    const data = activeServicesData?.length > 0 ? activeServicesData : [];
    setMasterDataSource(data);
  }, [activeServicesData]);

  const toTitleCase = str => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };

  return (
    <Box bg="whiteText" flex={1}>
      <Navbar title="title.active.services" showBack />
      <Box
        width="100%"
        bg="whiteText"
        height="6%"
        justifyContent="center"
        alignItems="center"
        shadowColor="zBlack"
        shadowOpacity={0.2}
        shadowRadius={5}
        elevation={8}
        shadowOffset={{width: 0, height: 2}}>
        <Text
          color="darkText"
          fontWeight="700"
          fontSize={theme.textVariants.headline.fontSize}>
          {clientName}
        </Text>
      </Box>
      {masterDataSource.length !== 0 && activeServicesLoading == false ? (
        <FlatList
          data={masterDataSource}
          ListHeaderComponent={<Box mt="sl"></Box>}
          ListFooterComponent={<Box mb="sl"></Box>}
          renderItem={({item}) => (
            <ActiveServicesItem
              projectName={toTitleCase(item?.name)}
              project_id={item.id}
              name={item?.client.full_name}
              date={moment(item?.created_at.slice(0, 10)).format('MM/DD/YYYY')}
              organizationName={item?.organization_name}
              serviceType={toTitleCase(item?.description)}
              internal={item?.internal}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
      ) : activeServicesLoading ? (
        <Box
          height="100%"
          justifyContent="center"
          alignItems="center"
          mt="-xxxl">
          <Spinner color="primary" size="large" />
        </Box>
      ) : masterDataSource.length == 0 ? (
        <Box
          bg={'whiteText'}
          flex={1}
          justifyContent="center"
          alignItems="center">
          <Text
            localeId="no.record.found"
            fontSize={theme.textVariants.boldTitle.fontSize}
            fontWeight={theme.textVariants.subTitle.fontWeight}
            color={'darkGreyText'}></Text>
        </Box>
      ) : null}
    </Box>
  );
};
