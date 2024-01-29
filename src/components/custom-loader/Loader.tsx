import React, {memo} from 'react';
import {StyleSheet, ActivityIndicator, View, Modal} from 'react-native';
import {useTheme} from '../../theme/ThemeProvider';
import responsiveSize from '../../utils/ResponsiveSize';

interface LoaderProp {
    loadingState: boolean;
  }

const Loader = ({loadingState}: LoaderProp) => {
  const {colors} = useTheme();

  console.log("loader", loadingState)

  return (
    <Modal animationType="fade" transparent={true} visible={loadingState}>
      <View style={styles.modalContainer}>
        <View
          style={[
            styles.modalContent,
            {backgroundColor: colors.background},
          ]}>
            <ActivityIndicator size="large" color={colors.text} />
          </View>
      </View>
    </Modal>
  );
};

export default memo(Loader);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    height: responsiveSize(150),
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
