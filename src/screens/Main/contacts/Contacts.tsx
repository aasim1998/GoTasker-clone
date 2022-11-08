import React from 'react';
import useAuth from '../../../context/Authentication';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {ListItem} from 'molecules/ListItem';
import GlobalVariables, {userRoleType} from 'utils/constant';

export const Contacts = ({navigation}: {navigation: any}) => {
  const {
    state: {userData},
  } = useAuth();

  const userInfo = userData[0]?.current_user?.role_list?.role;
  return (
    <Box bg="bgWhite" height="100%">
      <Navbar showBack title="title.contacts" />
      <Box>
        <ListItem
          data={
            userInfo === userRoleType.OWNER
              ? GlobalVariables.dataContacts_Owner
              : userInfo === userRoleType.CLIENT
              ? null
              : userInfo === userRoleType.SUBCONTRACTOR
              ? null
              : userInfo === userRoleType.MANAGER
              ? GlobalVariables.dataContacts_Manager
              : null
          }
        />
      </Box>
    </Box>
  );
};
