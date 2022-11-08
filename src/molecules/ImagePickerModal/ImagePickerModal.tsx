import React from 'react';
import {Box} from 'atoms/Box';
import {Text} from 'atoms/Text';
import {Touch} from 'atoms/Touch';
import RBSheet from 'react-native-raw-bottom-sheet';
import ImagePickerCropper from 'react-native-image-crop-picker';
import {translate} from 'utils/locale';
import {PressEvent} from 'typings/utils';
import {Divider} from 'atoms/Divider';
import {optionName} from 'utils/constant';

type ImagePickerModalProps = {
  onClickImage: PressEvent;
  onClickDocument?: PressEvent;
};
export const ImagePickerModal = React.forwardRef(
  ({onClickImage}: ImagePickerModalProps, ref) => {
    const optionsChat = [
      {
        name: translate('take.from.gallery'),
        onPress: () => {
          ImagePickerCropper.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            freeStyleCropEnabled: true,
          })
            .then(images => {
              onClickImage(images);
            })
            .catch(error => {
              console.log(error);
            });
        },
      },
      {
        name: translate('take.from.camera.text'),
        onPress: () => {
          ImagePickerCropper.openCamera({
            width: 300,
            height: 300,
            cropping: true,
            freeStyleCropEnabled: true,
          })
            .then(images => {
              onClickImage(images);
            })
            .catch(error => {});
        },
      },
    ];

    return (
      <RBSheet
        ref={ref}
        height={170}
        openDuration={250}
        closeOnDragDown={true}
        animationType="fade">
        <Box mt="xs">
          <Box width="100%" alignItems="center">
            <Text
              variant="medium"
              localeId="add.photo.text"
              color="greyText"
              mt="s"
            />
            <Divider width="100%" mt="s" />
          </Box>
          {optionsChat.map(({name, onPress}) => (
            <Touch onPress={onPress} key={name} flexDirection="row" pt="m">
              <Box width="100%" alignItems="center">
                <Text variant="medium" color="black" mb="xs">
                  {name}
                </Text>
                {name === optionName.gallery ? (
                  <Divider width="90%" mt="s" />
                ) : null}
              </Box>
            </Touch>
          ))}
        </Box>
      </RBSheet>
    );
  },
);
