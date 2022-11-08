import React from 'react';
import {Box} from 'atoms/Box';
import {TextView} from 'atoms/TextView';
import theme from 'styles/theme';
import {Icon} from 'atoms/Icon';
import {Row} from 'atoms/Row';
import {Touch} from 'atoms/Touch';
import {Card} from 'atoms/Card';
import GlobalVariables from 'utils/constant';
import {isAndroid} from 'utils/device';
import {Button} from 'molecules/Button';
import {ServiceCard} from 'molecules/ServiceCard';

export const PendingActionItem = ({
  projectName,
  name,
  date,
  services,
  cardDescription,
  cardSubDescription,
  dismiss,
  onPress,
}) => {
  return (
    <Box justifyContent="center" alignItems="center">
      <Card
        variant="medium"
        bg="lightBlue"
        m="s"
        height={180}
        width="90%"
        borderRadius={theme.spacing.sl}>
        <Row justifyContent="space-between" pt="s">
          <TextView pl="sl" fontWeight="900" color="whiteText">
            {projectName}
          </TextView>
          <TextView
            onPress={dismiss}
            pr="sl"
            variant="regular"
            color="whiteText"
            textDecorationLine="underline"
            fontWeight="900">
            {GlobalVariables.Dismiss}
          </TextView>
        </Row>
        <Row justifyContent="space-between">
          <Row justifyContent="space-between" mt="s" ml="sl">
            <Icon name="office" size={15} color="white" />
            <TextView px="xs" color="whiteText" fontWeight="900">
              {name}
            </TextView>
          </Row>
          <Row justifyContent="space-between" mt="s" mr="sl">
            <Icon name="calendar" size={16} color="white" />
            <TextView px="xs" fontWeight="900" color="whiteText">
              {/* {date} */}
              {GlobalVariables.SampleDate}
            </TextView>
          </Row>
        </Row>
        <Box
          width="98%"
          bg="whiteText"
          borderRadius={10}
          alignSelf="center"
          mt="xs"
          height={isAndroid ? 118 : 120}>
          {services == GlobalVariables.EventText ||
          services == GlobalVariables.JobComplete ? (
            <ServiceCard
              description={cardSubDescription}
              title={services}
              onPress={onPress}
            />
          ) : (
            <>
              <TextView pl="sl" pt="s" fontWeight="800" color="lightBlue">
                {services}
              </TextView>
              <TextView px="sl" pt="s" variant="regular" color="darkText">
                {cardDescription}
              </TextView>
              {services == GlobalVariables.QuoteTextNew ||
              services == GlobalVariables.QuoteTextAccepted ||
              services == GlobalVariables.QuoteTextRejected ? (
                <Box height={15} />
              ) : (
                <TextView px="sl" variant="regular" color="darkText">
                  {cardSubDescription}
                </TextView>
              )}

              {services == GlobalVariables.ServiceText ||
              services == GlobalVariables.FileText ||
              services == GlobalVariables.TodoListText ? (
                <Box px="s">
                  <Touch mt="s">
                    <TextView
                      color="lightingYellow"
                      fontWeight="800"
                      textDecorationLine="underline"
                      onPress={onPress}>
                      {services == GlobalVariables.ServiceText
                        ? GlobalVariables.ServiceButton
                        : services == GlobalVariables.FileText 
                        ? GlobalVariables.FileButton
                        : GlobalVariables.TodolistButton}
                    </TextView>
                  </Touch>
                </Box>
              ) : services == GlobalVariables.MessageText ||
                services == GlobalVariables.QuoteTextNew ||
                services == GlobalVariables.QuoteTextAccepted ||
                services == GlobalVariables.QuoteTextRejected ? (
                <Box
                  pl="s"
                  height="45%"
                  alignSelf="flex-start"
                  justifyContent="center"
                  alignContent="center">
                  <Button
                    title={
                      services == GlobalVariables.MessageText
                        ? GlobalVariables.MessageButton
                        : GlobalVariables.QuoteButton
                    }
                    variant="yellowPrimarySmall"
                    borderColor="lightingYellow"
                    onPress={onPress}
                  />
                </Box>
              ) : null}
            </>
          )}
        </Box>
      </Card>
    </Box>
  );
};
