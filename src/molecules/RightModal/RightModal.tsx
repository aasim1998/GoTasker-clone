import React from 'react';
import {PressEvent} from 'typings/utils';
import {Box} from 'atoms/Box';
import {Divider} from 'atoms/Divider';
import {MenuModal} from 'atoms/MenuModal';
import activeJobs from 'images/ic_active_jobs.png';
import calendar from 'images/ic_calendar_02.png';
import email from 'images/ic_email.png';
import addQuote from 'images/ic_add_quote.png';
import {RightMenu} from 'molecules/RightMenu';
import useAuth from 'context/Authentication';
import {userRoleType} from 'utils/constant';
import {isIOS} from 'utils/device';

type RightModalProps = {
  visible?: boolean;
  onCloseModal?: PressEvent;
  openNewServiceModal?: PressEvent;
};

export const RightModal = ({
  visible,
  onCloseModal,
  openNewServiceModal,
}: RightModalProps) => {
  const {
    state: {userData},
  } = useAuth();
  const userInfo = userData[0]?.current_user?.role_list?.role;

  return (
    <MenuModal visible={visible} onBackdropPress={onCloseModal}>
      <Box
        borderColor="greyish"
        shadowColor="zBlack"
        shadowOpacity={0.2}
        shadowRadius={2}
        borderTopWidth={1}
        elevation={8}
        shadowOffset={{width: 0, height: 2}}
        borderRadius={10}
        bg="whiteText"
        px="m"
        py="s"
        mt={isIOS ? 'XXXL' : 'XXXXL'}
        mr="mll"
        justifyContent="space-between"
        alignItems="center">
        <Box>
          {userInfo === userRoleType.SUBCONTRACTOR ? null : (
            <Box>
              <RightMenu
                title="add.new.service"
                onPress={openNewServiceModal}
                imageURL={activeJobs}
              />
              <Divider />
            </Box>
          )}
          <Box mt={userInfo === userRoleType.SUBCONTRACTOR ? 'xxxs' : 's'}>
            <RightMenu
              title="add.new.event"
              //onPress={openNewServiceModal}
              imageURL={calendar}
            />
          </Box>
          <Divider />
          <Box mt="s">
            <RightMenu
              title="send.message"
              //onPress={openNewServiceModal}
              imageURL={email}
            />
          </Box>
          {userInfo === userRoleType.CLIENT ? null : (
            <Box>
              <Divider />
              <Box mt="s">
                <RightMenu
                  title="add.new.quote"
                  //onPress={openNewServiceModal}
                  imageURL={addQuote}
                />
              </Box>
            </Box>
          )}
          <Box mb="-s" />
        </Box>
      </Box>
    </MenuModal>
  );
};
