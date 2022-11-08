import React from 'react';
import {Box} from 'atoms/Box';
import theme from 'styles/theme';
import {Text} from 'atoms/Text';
import {FlatList, RefreshControl} from 'react-native';
import {InputSearch} from 'atoms/InputSearch';
import {PressEvent} from 'typings/utils';
import {Spinner} from 'atoms/Spinner';
import {Touch} from 'atoms/Touch';
import {FlatlistDivider} from 'atoms/FlatlistDivider';

type ActiveJobTabProps = {
  placeholderText?: string;
  search?: string;
  displayText: string;
  onChange: PressEvent;
  onClear: PressEvent;
  onPressText: PressEvent;
  renderFunction?: Function;
  filteredDataSource: Array;
  mainData: Array;

  isLoading: boolean;
  refreshing: boolean;
  onRefresh?: Function;
  noListFound: string;
};

export const ActiveJobTab = ({
  placeholderText,
  search,
  displayText,
  onChange,
  onClear,
  onPressText,
  renderFunction,
  filteredDataSource,
  mainData,
  isLoading,
  refreshing,
  onRefresh,
  noListFound,
}: ActiveJobTabProps) => {
  return (
    <Box bg={'whiteText'} flex={1}>
      {mainData === undefined ? (
        <Box height="100%" justifyContent="center" alignItems="center">
          <Spinner color="primary" size="large" />
        </Box>
      ) : mainData?.length > 0 ? (
        <Box flex={1}>
          <Box mt="xm" alignItems="center">
            <InputSearch
              placeholder={placeholderText}
              onChange={onChange}
              value={search}
              onClear={onClear}
            />
          </Box>
          <Text
            localeId={displayText}
            fontSize={theme.textVariants.boldTitle.fontSize}
            fontWeight={theme.textVariants.subTitle.fontWeight}
            color={'darkGreyText'}
            ml="l"
            mt="s"
          />
          {filteredDataSource.length == 0 && search ? (
            <Box justifyContent="center" alignItems="center" flex={1}>
              <Touch onPress={onPressText}>
                <Text
                  textAlign="center"
                  fontSize={theme.textVariants.boldTitle.fontSize}
                  color={'darkGreyText'}
                  localeId={noListFound}
                />
                <Text
                  textAlign="center"
                  fontSize={theme.textVariants.boldTitle.fontSize}
                  color={'darkGreyText'}
                  localeId="please.tap.to.refresh"
                  pb="XL"
                />
              </Touch>
            </Box>
          ) : (
            <Box mb="m" mt="s" flex={1}>
              {!isLoading ? (
                <FlatList
                  data={filteredDataSource}
                  renderItem={renderFunction}
                  keyExtractor={item => item.id.toString()}
                  ItemSeparatorComponent={FlatlistDivider}
                  ListFooterComponent={
                    filteredDataSource ? FlatlistDivider : null
                  }
                  refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={onRefresh}
                    />
                  }
                />
              ) : refreshing ? null : (
                <Box height="100%" justifyContent="center" alignItems="center">
                  <Spinner color="primary" size="large" />
                </Box>
              )}
            </Box>
          )}
        </Box>
      ) : (
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
      )}
    </Box>
  );
};
