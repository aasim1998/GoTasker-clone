import React from 'react';
import {PressEvent} from 'typings/utils';
import {Box} from 'atoms/Box';
import {MenuModal} from 'atoms/MenuModal';
import {Touch} from 'atoms/Touch';
import {TextView} from 'atoms/TextView';
import {navigate} from 'services/NavigationService';
import {isIOS} from 'utils/device';
import useAuth from 'context/Authentication';
import {userRoleType} from 'utils/constant';
type ToggleModalProps = {
  visible?: boolean;
  onCloseModal?: PressEvent;
  routeName?: string;
  routeName2?: string;
  postedByMe?: string;
  SavedFeeds?: string;
};
export const FeedsModal = ({
  visible,
  routeName,
  routeName2,
  postedByMe,
  SavedFeeds,
  onCloseModal,
}: ToggleModalProps) => {
  const {
    state: {userData},
  } = useAuth();

  const modalList = userData[0]?.current_user?.role_list?.role;

  return (
    <MenuModal visible={visible} onBackdropPress={onCloseModal}>
      <Box
        position="absolute"
        right={10}
        bg="bgWhite"
        p="l"
        pt={modalList !== userRoleType.OWNER ? 'xs' : 'l'}
        pb={modalList !== userRoleType.OWNER ? 'm' : 'l'}
        borderRadius={10}
        top={isIOS ? 118 : 130}>
        {modalList === userRoleType.OWNER ? (
          <Touch>
            <TextView
              variant="medium"
              color="black"
              fontWeight="bold"
              fontSize={isIOS ? 18 : 14}
              text={postedByMe}
              onPress={() => {
                onCloseModal();
                navigate(routeName);
              }}
            />
          </Touch>
        ) : null}
        <Touch>
          <TextView
            variant="medium"
            color="black"
            fontWeight="bold"
            fontSize={isIOS ? 18 : 14}
            mt={isIOS ? 'm' : 's'}
            text={SavedFeeds}
            onPress={() => {
              onCloseModal();
              navigate(routeName2);
            }}
          />
        </Touch>
      </Box>
    </MenuModal>
  );
};
