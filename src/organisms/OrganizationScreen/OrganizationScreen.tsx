import React, {useCallback, useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {useOrgJob} from 'context/OrganizationListAPI';
import {LabelIcon} from 'molecules/LabelIcon';
import useAuth from 'context/Authentication';
import {ActiveJobTab} from 'molecules/ActiveJobTab';
import {navigate} from 'services/NavigationService';

export const OrganizationScreen = () => {
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  const {
    actions: {changeLanguage},
  } = useAuth();

  const {
    state: {organizationJobData, organizationLoading},
    actions: {getOrganizationList},
  } = useOrgJob();

  useEffect(() => {
    if (masterDataSource.length === 0) {
      getOrganizationList();
    }
    const data = organizationJobData.length > 0 ? organizationJobData : [];
    setFilteredDataSource(data);

    setMasterDataSource(data);
  }, [organizationJobData]);

  const searchFilterFunction = text => {
    let filteredData = [];
    setSearch(text);
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.name && item.name.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      filteredData = newData;
    } else {
      filteredData = masterDataSource;
    }
    setFilteredDataSource(filteredData);
  };
  const clearSearch = () => {
    setSearch('');
    setFilteredDataSource(masterDataSource);
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getOrganizationList();
    setRefreshing(false);
  }, []);

  const toTitleCase = str => {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  const handleView = () => {
    navigate('SelectClient');
  };
  const renderItem = ({item}) => {
    return (
      <Box>
        <LabelIcon
          name={toTitleCase(item.name.toUpperCase())}
          image={item.logo}
          availableOnGotasker={true}
          search={search}
          onClick={handleView}
        />
      </Box>
    );
  };

  return (
    <ActiveJobTab
      placeholderText="search.organization"
      search={search}
      displayText="organization.list"
      onChange={text => searchFilterFunction(text)}
      onClear={clearSearch}
      renderFunction={renderItem}
      isLoading={organizationLoading}
      filteredDataSource={filteredDataSource}
      mainData={organizationJobData}
      refreshing={refreshing}
      onRefresh={onRefresh}
      noListFound="no.organization.found"
      onPressText={clearSearch}
    />
  );
};
