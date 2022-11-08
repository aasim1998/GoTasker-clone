import React, {useEffect, useState} from 'react';
import useAuth from '../../../context/Authentication';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {ListItem} from 'molecules/ListItem';
import GlobalVariables, {userRoleType} from 'utils/constant';
import {RightModal} from 'molecules/RightModal';
import {NewServiceModal} from 'molecules/NewServiceModal';
import useDashboard from 'context/DashboardAPI';

export const Dashboard = ({navigation}: {navigation: any}) => {
  const {
    state: {userData},
  } = useAuth();
  const {
    actions: {getPendingAction},
  } = useDashboard();
  useEffect(() => {
    getPendingAction();
  }, []);
  const userInfo = userData[0]?.current_user?.role_list?.role;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isNewServiceModalVisible, setNewServiceModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const openNewServiceModal = () => {
    setIsModalVisible(false);
    setNewServiceModalVisible(true);
  };

  const closeNewServiceModal = () => {
    setNewServiceModalVisible(false);
  };

  return (
    <Box bg="whiteText" height="100%">
      <Navbar
        renderLeft="profile"
        onLeftClick={() => navigation.navigate('Profile')}
        title="title.dashboard"
        renderRight="plus"
        onRightClick={openModal}
      />
      <Box>
        <ListItem
          data={
            userInfo === userRoleType.OWNER
              ? GlobalVariables.dataDashboard_Owner
              : userInfo === userRoleType.CLIENT
              ? GlobalVariables.dataDashboard_Client
              : userInfo === userRoleType.SUBCONTRACTOR
              ? GlobalVariables.dataDashboard_Subcontractor
              : userInfo === userRoleType.MANAGER
              ? GlobalVariables.dataDashboard_Manager
              : null
          }
        />
      </Box>
      <RightModal
        visible={isModalVisible}
        onCloseModal={closeModal}
        openNewServiceModal={openNewServiceModal}
      />
      <NewServiceModal
        visible={isNewServiceModalVisible}
        onCloseModal={closeNewServiceModal}
      />
    </Box>
  );
};
