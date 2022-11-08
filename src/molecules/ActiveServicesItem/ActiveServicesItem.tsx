import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import theme from 'styles/theme';
import {Icon} from 'atoms/Icon';
import {Row} from 'atoms/Row';
import {Touch} from 'atoms/Touch';
import {Card} from 'atoms/Card';
import {IconWithText} from 'molecules/IconWithText';
import {navigate} from 'services/NavigationService';

type ActiveServicesItem = {
  projectName: any;
  name: string;
  date: string;
  organizationName: string;
  serviceType: string;
  internal: boolean;
  project_id: number;
};
export const ActiveServicesItem = ({
  projectName,
  name,
  date,
  organizationName,
  serviceType,
  internal,
  project_id,
}: ActiveServicesItem) => {
  const handleView = () => {
    navigate('Projects', {project_id});
  };
  return (
    <Touch onPress={handleView}>
      <Box justifyContent="center" alignItems="center">
        <Card
          variant="medium"
          bg="lightestBlue"
          mx="s"
          my="sl"
          height={145}
          width="90%"
          borderRadius={theme.spacing.sl}>
          <Row justifyContent="space-between">
            <TextView pl="sl" pt="m" pb="-m" fontWeight="700" color="darkText">
              {projectName}
            </TextView>
            <Box pr="s" pt="s">
              <Icon
                name="cheveron-right"
                color={theme.colors.black}
                size={32}
              />
            </Box>
          </Row>
          <Row justifyContent="space-between" pb="xs">
            <IconWithText iconName="ProfileOutline" textDescription={name} />

            <IconWithText iconName="calendar" textDescription={date} />
          </Row>
          <Box
            width="98%"
            bg="whiteText"
            borderBottomLeftRadius={10}
            borderBottomRightRadius={10}
            alignSelf="center"
            mt="xs"
            height={68}>
            <Row justifyContent="space-between">
              <Row mt="s" ml="s">
                <Icon name="building" size={20} color={theme.colors.black} />
                <TextView pl="sl" fontWeight="700" color="darkText">
                  {organizationName}
                </TextView>
              </Row>
              {internal ? (
                <Box
                  width="4%"
                  borderRadius={10}
                  alignSelf="center"
                  mt="s"
                  height="50%"
                  bg="primary"
                  mr="s"></Box>
              ) : null}
            </Row>
            <TextView px="sl" pt="xm" variant="regular" color="darkText">
              {' '}
              {serviceType}
            </TextView>
          </Box>
        </Card>
      </Box>
    </Touch>
  );
};
