import React from 'react';
import {Box} from 'atoms/Box';
import {Icon} from 'atoms/Icon';
import {Row} from 'atoms/Row';
import {Touch} from 'atoms/Touch';
import {PressEvent} from 'typings/utils';
import theme from 'styles/theme';
import {Image} from 'atoms/Image';
import HighlightText from '@sanar/react-native-highlight-text';
import {Text} from 'atoms/Text';
import {StyleSheet} from 'react-native';

type LabelIconProps = {
  name?: string;
  onClick?: PressEvent;
  image?: string;
  availableOnGotasker?: boolean;
  search?: string;
};

export const LabelIcon = ({
  name,
  onClick,
  image,
  availableOnGotasker,
  search,
}: LabelIconProps) => {
  return (
    <Box mt="l" mb="l" ml="m" mr="m">
      <Touch onPress={onClick}>
        <Row justifyContent="space-between" alignItems="center" mr="m">
          <Row ml="l">
            {image ? (
              <Image
                style={styles.image}
                source={{
                  uri: image,
                }}
              />
            ) : (
              <Icon
                name="ProfileOutline"
                size={20}
                color={theme.colors.searchHighLightBlue}
              />
            )}
            <Box>
              <HighlightText
                highlightStyle={styles.highLightStyle}
                style={styles.textStyle}
                searchWords={[search]}
                textToHighlight={name}
              />

              {availableOnGotasker == false && (
                <Text
                  color={'blackPrimary'}
                  ml="m"
                  mt="xm"
                  mb="-l"
                  fontSize={theme.textVariants.smallSubTitle.fontSize}
                  localeId="not.in.gotasker"
                />
              )}
            </Box>
          </Row>

          <Icon name="cheveron-right" color={theme.colors.black} size={20} />
        </Row>
      </Touch>
    </Box>
  );
};

const styles = StyleSheet.create({
  image: {width: 30, height: 30},
  highLightStyle: {
    color: theme.colors.searchHighLightBlue,
    fontSize: theme.textVariants.boldTitle.fontSize,
    fontWeight: theme.textVariants.subTitle.fontWeight,
  },
  textStyle: {
    color: theme.colors.black,
    marginBottom: theme.spacing['-s'],
    marginLeft: theme.spacing.m,
    fontSize: theme.textVariants.boldTitle.fontSize,
    fontWeight: theme.textVariants.subTitle.fontWeight,
  },
});
