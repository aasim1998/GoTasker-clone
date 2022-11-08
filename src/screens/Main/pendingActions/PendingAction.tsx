import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {FlatList} from 'react-native';
import {PendingActionItem} from 'molecules/PendingActionItem/PendingActionItem';
import {navigate} from 'services/NavigationService';
import useAuth from 'context/Authentication';
import GlobalVariables, {userRoleType} from 'utils/constant';
import {Text} from 'atoms/Text';
import theme from 'styles/theme';
import useDashboard from 'context/DashboardAPI';

export const PendingAction = () => {
  const {
    state: {userData},
  } = useAuth();
  const {
    state: {pendingActionList, pendingActionCounterList},
    actions: {dismissAction},
  } = useDashboard();

  const userInfo = userData[0]?.current_user?.role_list?.role;
  const [card, setCard] = useState(pendingActionList?.pendingActionList);

  useEffect(()=>{
    setCard(pendingActionList?.pendingActionList)
  }, [pendingActionList])

  const handleDismiss = (index, item) => {
    card.splice(card.indexOf(item), 1);
    setCard([...card]);
    dismissAction(index);
  };
  const handleView = item => {
    navigate('Projects', {
      project_id: item.project_id,
      notice_title: item.notice_title,
    });
  };

  return (
    <Box flex={1}>
      <Navbar showBack title="title.pendingAction" />
      {userInfo === userRoleType.MANAGER && pendingActionCounterList === 0 ? (
        <Box
          bg={'whiteText'}
          flex={1}
          justifyContent="center"
          alignItems="center">
          <Text
            localeId="no.data.found"
            fontSize={theme.textVariants.boldTitle.fontSize}
            fontWeight={theme.textVariants.subTitle.fontWeight}
            color={'darkGreyText'}
          />
        </Box>
      ) : (
        <FlatList
          data={card}
          renderItem={({item}) => (
            <PendingActionItem
              projectName={
                item?.notice_display_name == null
                  ? item.referenceable_type
                  : item?.notice_display_name
              }
              name={item?.notice_client_display_name}
              date={item?.date}
              services={
                item?.notice_title != null
                  ? item?.notice_title
                  : GlobalVariables.TodoListText
              }
              cardDescription={
                item.referenceable_type == 'TodoList'
                  ? `${GlobalVariables.ForClientText} ${item.referenceable.user.name}`
                  : item?.notice_message
              }
              cardSubDescription={item?.referenceable?.description}
              dismiss={() => handleDismiss(item.id, item)}
              onPress={() => handleView(item)}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
    </Box>
  );
};
