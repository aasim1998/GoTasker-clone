import React, {useState, useEffect} from 'react';
import {PressEvent} from 'typings/utils';
import {Box} from 'atoms/Box';
import {Divider} from 'atoms/Divider';
import {MenuModal} from 'atoms/MenuModal';
import {ProjectRightMenu} from 'molecules/ProjectRightMenu';
import {isIOS} from 'utils/device';
import useProject from 'context/ProjectAPI';

type ProjectRightModalProps = {
  visible?: boolean;
  onCloseModal?: PressEvent;
  clientParticipation?: PressEvent;
  editName?: PressEvent;
  makeActive?: PressEvent;
};

export const ProjectRightModal = ({
  visible,
  onCloseModal,
  clientParticipation,
  editName,
  makeActive,
}: ProjectRightModalProps) => {
  const {
    actions: {modifyProject, getProjectDetails},
    state: {projectDetails, modifyProjectLoading},
  } = useProject();

  const [isClientParticipation, setIsClientParticipation] = useState(
    projectDetails[0]?.internal,
  );
  const clientParticipationHandler = async () => {
    setIsClientParticipation(!isClientParticipation);
    await modifyProject(String(projectDetails[0]?.id), {
      internal: !isClientParticipation,
    });
    clientParticipation && clientParticipation();
  };

  useEffect(() => {
    getProjectDetails(String(projectDetails[0]?.id));
  }, [modifyProjectLoading, getProjectDetails]);

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
            <ProjectRightMenu
              title={
                projectDetails[0]?.internal
                  ? 'turn.off.client.participation'
                  : 'turn.on.client.participation'
              }
              onPress={clientParticipationHandler}
            />
            <Divider />
          </Box>
          <Box mt="s">
            <ProjectRightMenu title="edit.name" onPress={editName} />
          </Box>
          <Divider />
          <Box mt="s" mb="-s">
            <ProjectRightMenu
              title={
                projectDetails[0]?.status === 'active'
                  ? 'make.inactive'
                  : 'make.active'
              }
              onPress={makeActive}
            />
          </Box>
        </Box>
      </Box>
    </MenuModal>
  );
};
