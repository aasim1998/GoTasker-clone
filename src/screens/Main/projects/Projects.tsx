import React, {useEffect, useState} from 'react';
import {Box} from 'atoms/Box';
import {Navbar} from 'molecules/Navbar';
import {ProjectRightModal} from 'molecules/ProjectRightModal';
import {ProjectInfoModal} from 'molecules/ProjectInfoModal';
import {EditNameModal} from 'molecules/EditNameModal';
import {MakeActiveModal} from 'molecules/MakeActiveModal';
import {ClientParticipationModal} from 'molecules/ClientParticipationModal';
import {ProjectDetailTab} from 'molecules/ProjectDetailTab';
import useAuth from 'context/Authentication';
import {userRoleType} from 'utils/constant';
import useProject from 'context/ProjectAPI';

export const Projects = ({route}) => {
  const {project_id} = route.params !== undefined ? route.params : '';
  const {notice_title} = route.params !== undefined ? route.params : '';

  const {
    state: {userData},
  } = useAuth();

  const {
    actions: {getProjectDetails},
    state: {projectDetails, modifyProjectLoading},
  } = useProject();

  useEffect(() => {
    getProjectDetails(project_id);
  }, [modifyProjectLoading]);

  const userInfo = userData[0]?.current_user?.role_list?.role;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [clientParticipationModalVisible, setClientParticipationModalVisible] =
    useState(false);
  const [editNameModalVisible, setEditNameModalVisible] = useState(false);
  const [makeActiveModalVisible, setMakeActiveModalVisible] = useState(false);
  const [projectInfoModalVisible, setProjectInfoModalVisible] = useState(false);

  const openModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const clientParticipationOpenModal = () => {
    setIsModalVisible(false);
    setClientParticipationModalVisible(true);
  };

  const clientParticipationCloseModal = () => {
    setClientParticipationModalVisible(false);
  };

  const editNameOpenModal = () => {
    setIsModalVisible(false);
    setEditNameModalVisible(true);
  };

  const editNameCloseModal = () => {
    setEditNameModalVisible(false);
  };

  const makeActiveOpenModal = () => {
    setIsModalVisible(false);
    setMakeActiveModalVisible(true);
  };

  const makeActiveCloseModal = () => {
    setMakeActiveModalVisible(false);
  };

  const projectInfoOpenModal = () => {
    setProjectInfoModalVisible(true);
  };

  const projectInfoCloseModal = () => {
    setProjectInfoModalVisible(false);
  };

  return (
    <Box>
      <Navbar
        showBack
        showBackTitle="title.projects"
        showBackSubtitle={projectDetails[0]?.name}
        title=" "
        renderRight={
          userInfo !== userRoleType.CLIENT &&
          userInfo !== userRoleType.SUBCONTRACTOR &&
          'menu'
        }
        renderRightSecond="information-outline"
        onRightClick={openModal}
        onRightClickSecond={projectInfoOpenModal}
      />
      <Box mt="-xs" minHeight="100%">
        <ProjectDetailTab initialRoute={notice_title} />
      </Box>
      <ProjectRightModal
        visible={isModalVisible}
        onCloseModal={closeModal}
        clientParticipation={clientParticipationOpenModal}
        editName={editNameOpenModal}
        makeActive={makeActiveOpenModal}
      />
      <ClientParticipationModal
        projectInternal={projectDetails[0]?.internal}
        visible={clientParticipationModalVisible}
        onCloseModal={clientParticipationCloseModal}
      />
      <EditNameModal
        visible={editNameModalVisible}
        onCloseModal={editNameCloseModal}
      />
      <MakeActiveModal
        visible={makeActiveModalVisible}
        onCloseModal={makeActiveCloseModal}
      />
      <ProjectInfoModal
        visible={projectInfoModalVisible}
        onCloseModal={projectInfoCloseModal}
        projectName={projectDetails[0]?.name}
        fullAddress={projectDetails[0]?.client?.full_address}
        fullName={projectDetails[0]?.client?.personal_or_complete_name}
        organizationName={projectDetails[0]?.organization_name}
        desc={projectDetails[0]?.description}
      />
    </Box>
  );
};
