import React from 'react';
import {Card} from 'atoms/Card';
import {Row} from 'atoms/Row';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import {PressEvent} from 'typings/utils';

type LabeledCardtype = {
  cardData: any;
  openModal: PressEvent;
};

export const LabeledCard = ({cardData, openModal}: LabeledCardtype) => {
  const handleModal = () => {
    if (typeof openModal === 'function') {
      openModal();
    }
  };

  var startTime = new Date(cardData?.time).toLocaleTimeString();
  var time1 = startTime.slice(0, 4);
  var time2 = startTime.slice(7, 11);
  var finalTime = time1 + time2;

  return (
    <Touch
      mb="-m"
      onPress={handleModal}
      alignSelf="center"
      justifyContent="center"
      height={100}
      width={'95%'}
      bg={
        (cardData.visit_type === 'work' && cardData.status === 'accepted') ||
        (cardData.visit_type === 'visit' && cardData.status === 'accepted')
          ? 'lightBlue'
          : (cardData.visit_type === 'work' && cardData.status === 'pending') ||
            (cardData.visit_type === 'visit' && cardData.status === 'pending')
          ? 'greyText'
          : 'lightingYellow'
      }
      m="l"
      p="xxs"
      borderRadius={15}>
      <Row py="s" px="s" alignContent="flex-start">
        <Text color="whiteText" fontWeight="800">
          {finalTime}
        </Text>
        <Text fontWeight="800" color="whiteText">
          -{cardData?.visit_type}
        </Text>
      </Row>
      <Card height={'60%'} width={'100%'} borderRadius={15} px="s" p="s">
        <Text color="darkText">
          {cardData?.name}-{cardData?.current_user?.full_name}
        </Text>
        <Text color="darkText">{cardData?.description}</Text>
      </Card>
    </Touch>
  );
};
