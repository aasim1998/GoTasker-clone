import {Box} from 'atoms/Box';
import {Icon} from 'atoms/Icon';
import {LocaleString} from 'locales/en';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Searchbar} from 'react-native-paper';
import theme from 'styles/theme';
import {PressEvent} from 'typings/utils';
import {translate} from 'utils/locale';

export type InputSearchProps = {
  placeholder: LocaleString;
  value: string;
  onChange: PressEvent;
  onClear: PressEvent;
};
const color = theme.colors;
export const InputSearch = ({
  placeholder,
  value,
  onChange,
  onClear,
}: InputSearchProps) => {
  return (
    <Box m="s">
      <Searchbar
        placeholder={translate(placeholder)}
        onChangeText={onChange}
        value={value}
        style={styles.wrapper}
        inputStyle={styles.placeholderStyle}
        placeholderTextColor={color.greyText}
        icon={() => <Icon name="search" size={18} color={color.greyText} />}
        clearIcon={() =>
          value !== '' && (
            <Icon
              name="cancel-circle"
              size={22}
              color={color.greyText}
              onPress={onClear}
            />
          )
        }
      />
    </Box>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: '#e4e8ed',
    width: '100%',
    shadowOpacity: 0,
    borderRadius: 20,
    backgroundColor: theme.colors.inactiveTabBar,
  },
  placeholderStyle: {
    width: '100%',
    marginRight: theme.spacing['-xl'],
  },
});
