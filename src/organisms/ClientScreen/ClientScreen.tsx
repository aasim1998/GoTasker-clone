import React, {useCallback, useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {LabelIcon} from 'molecules/LabelIcon';
import useJob from 'context/ClientListAPI';
import useAuth from 'context/Authentication';
import {ActiveJobTab} from 'molecules/ActiveJobTab';
import {navigate} from 'services/NavigationService';

export const ClientScreen = () => {
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const {
    actions: {changeLanguage},
  } = useAuth();

  const {
    state: {clientJobData, clientLoading},
    actions: {getClientList},
  } = useJob();

  useEffect(() => {
    if (masterDataSource.length === 0) {
      getClientList();
    }
    const data = clientJobData?.length > 0 ? clientJobData : [];
    setFilteredDataSource(data);

    setMasterDataSource(data);
  }, [clientJobData]);

  const searchFilterFunction = text => {
    setSearch(text);
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.full_name && item.full_name.toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
    } else {
      setFilteredDataSource(masterDataSource);
    }
  };

  const clearSearch = () => {
    setSearch('');
    setFilteredDataSource(masterDataSource);
  };
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getClientList();
    setRefreshing(false);
  }, []);

  const handleView = item => {
    navigate('ActiveServices', {
      clientName: item.full_name,
      clientId: item.id,
    });
  };

  const renderItem = ({item}) => {
    return (
      <Box>
        <LabelIcon
          name={item.full_name}
          availableOnGotasker={item.internal_usage}
          search={search}
          onClick={() => handleView(item)}
        />
      </Box>
    );
  };

  return (
    <ActiveJobTab
      placeholderText="search.clients"
      search={search}
      displayText="client.list"
      onChange={text => searchFilterFunction(text)}
      onClear={clearSearch}
      renderFunction={renderItem}
      isLoading={clientLoading}
      filteredDataSource={filteredDataSource}
      mainData={clientJobData}
      refreshing={refreshing}
      onRefresh={onRefresh}
      noListFound="no.client.found"
      onPressText={clearSearch}
    />
  );
};
