import React from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {Button} from 'molecules/Button';
import {Touch} from 'atoms/Touch';
import {closeicon, success} from 'utils/constant';
import {Image} from 'atoms/Image';
import {navigate} from 'services/NavigationService';
import useAuth from 'context/Authentication';

export const Confirmation = () => {
  const {
    actions: {confirmChangePassword},
  } = useAuth();
  return (
    <Box height="100%" py="XL" px="l">
      <Touch onPress={() => confirmChangePassword()}>
        <Image source={closeicon} width={20} height={20} alignSelf="flex-end" />
      </Touch>
      <Box
        justifyContent="flex-start"
        pt="XXL"
        alignItems="center"
        height="100%">
        <Image source={success} width={140} height={140} />
        <Text
          color="black"
          localeId="successfully.changed"
          fontWeight="700"
          fontSize={30}
          pt="l"
        />
        <Text
          color="black"
          pt="l"
          textAlign="center"
          localeId="password.changed.text"
          fontWeight="400"
          fontSize={20}
        />
        <Touch
          height="15%"
          width="90%"
          justifyContent="center"
          pt="l"
          onPress={() => confirmChangePassword()}>
          <Button
            title="go.to.login.btn"
            variant="yellowPrimary"
            onPress={() => confirmChangePassword()}
          />
        </Touch>
      </Box>
    </Box>
  );
};
