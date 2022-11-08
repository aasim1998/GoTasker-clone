import React from 'react';
import {PressEvent} from 'typings/utils';
import {Box} from 'atoms/Box';
import {Divider} from 'atoms/Divider';
import {MenuModal} from 'atoms/MenuModal';
import {isIOS} from 'utils/device';
import {Text} from 'atoms/Text';
import {Row} from 'atoms/Row';
import useAuth from 'context/Authentication';
import {userRoleType} from 'utils/constant';

type ProjectInfoModalProps = {
  visible?: boolean;
  onCloseModal?: PressEvent;
  projectName?: string;
  fullName?: string;
  organizationName?: string;
  fullAddress?: string;
  desc?: string;
};

export const ProjectInfoModal = ({
  visible,
  onCloseModal,
  projectName,
  fullAddress,
  fullName,
  organizationName,
  desc,
}: ProjectInfoModalProps) => {
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
        borderRadius={3}
        bg="whiteText"
        p="sl"
        mt={isIOS ? 'XXXXL' : 'XXXLL'}
        mr="mll"
        justifyContent="space-between"
        alignItems="center">
        <Box>
          <Box>
            <Text
              textAlign="center"
              fontSize={15}
              fontWeight="700"
              color="black"
              textTransform="capitalize">
              {projectName}
            </Text>
            <Divider mt="s" mx="-s" />
          </Box>
          <Row mt="s">
            <Text localeId="info.modal.client" fontWeight="700" color="black" />
            <Text color="black">{fullName}</Text>
          </Row>
          <Row mt="s">
            <Text localeId="info.modal.from" fontWeight="700" color="black" />
            <Text color="black">{organizationName}</Text>
          </Row>
          {userInfo !== userRoleType.CLIENT && (
            <Row mt="s">
              <Text
                localeId="info.modal.address"
                fontWeight="700"
                color="black"
              />
              <Text color="black">{fullAddress}</Text>
            </Row>
          )}
          <Row mt="s">
            <Text
              localeId="info.modal.description"
              fontWeight="700"
              color="black"
            />
            <Text color="black">{desc}</Text>
          </Row>
        </Box>
      </Box>
    </MenuModal>
  );
};
