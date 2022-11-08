import React from 'react';
import {Box} from 'atoms/Box';
import {Row} from 'atoms/Row';
import {Text} from 'atoms/Text';
import {TextView} from 'atoms/TextView';
import {Button} from 'molecules/Button';
import {isAndroid} from 'utils/device';
import {Touch} from 'atoms/Touch';
import {TextButton} from 'atoms/TextButton';
import {Image} from 'atoms/Image';
import GlobalVariables, {AcceptIcon} from 'utils/constant';
import {PressEvent} from 'typings/events';

type ServiceCardProps = {
  description: string;
  title: string;
  onPress?: PressEvent;
};
export const ServiceCard = ({
  description,
  title,
  onPress,
}: ServiceCardProps) => {
  return (
    <Box bg="transparent">
      <Row>
        <Box width="30%" pt="xs" alignItems="center">
          <Text color="greyText">{GlobalVariables.Day}</Text>
          <Text
            fontWeight="400"
            fontSize={isAndroid ? 38 : 45}
            color="darkText">
            {GlobalVariables.Date}
          </Text>
          <Text color="greyText">{GlobalVariables.Month}</Text>
          <Text fontWeight="700" fontSize={14} color="darkText" mt="xs">
            {GlobalVariables.Time}
          </Text>
        </Box>

        <Box width="70%" height="100%" px="s" pt="s">
          <Text color="darkText" fontWeight="700" fontSize={16}>
            {description}
          </Text>
          <TextView pt="s" fontWeight="800" color="lightBlue">
            {title}
          </TextView>
          {title == GlobalVariables.JobComplete ? (
            <Row
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              pr="m">
              <Box>
                <Touch mt="s">
                  <TextButton
                    localeId="view.event.btn"
                    color="lightingYellow"
                    fontWeight="800"
                    textDecorationLine="underline"
                    onPress={onPress}
                  />
                </Touch>
              </Box>
              <Image height={45} width={45} source={AcceptIcon} />
            </Row>
          ) : (
            <Row width="100%" justifyContent="flex-start" alignContent="center">
              <Box
                mr="s"
                height="70%"
                width="42%"
                justifyContent="center"
                alignContent="center">
                <Button
                  title="accept.btn.txt"
                  variant="yellowPrimarySmall"
                  borderColor="lightingYellow"
                  onPress={onPress}
                />
              </Box>
              <Box
                height="70%"
                width="42%"
                justifyContent="center"
                alignContent="center">
                <Button
                  title="edit.btn.txt"
                  variant="yellowPrimarySmall"
                  borderColor="lightingYellow"
                  onPress={onPress}
                />
              </Box>
            </Row>
          )}
        </Box>
      </Row>
    </Box>
  );
};
