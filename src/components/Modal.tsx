import React, {PropsWithChildren} from 'react';
import {Modal as RNModal} from 'react-native';
import styled from 'styled-components/native';

export const Modal: React.FC<
  PropsWithChildren<{visible: boolean; close: () => void}>
> = ({visible, close, children}) => (
  <RNModal animationType="slide" visible={visible} transparent>
    <ModalContainer>
      <ModalBackdrop onPress={close} />
      <ModalView>
        <ModalHandle />
        <ModalContent>
          {children}
        </ModalContent>
        <CancelButton onPress={close}>
          <CancelText>Cancel</CancelText>
        </CancelButton>
      </ModalView>
    </ModalContainer>
  </RNModal>
);

const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: flex-end;
`;

const ModalBackdrop = styled.Pressable`
  flex: 1;
`;

const ModalView = styled.View`
  background-color: ${({theme}) => theme.background.surface};
  border-radius: ${({theme}) => theme.border.radius.xl}
    ${({theme}) => theme.border.radius.xl} 0 0;
  padding: ${({theme}) => theme.gaps.lg};
  padding-top: ${({theme}) => theme.gaps.md};
  max-height: 80%;
  ${({theme}) => `
    shadow-color: ${theme.shadows.xl.shadowColor};
    shadow-offset: ${theme.shadows.xl.shadowOffset.width}px ${theme.shadows.xl.shadowOffset.height}px;
    shadow-opacity: ${theme.shadows.xl.shadowOpacity};
    shadow-radius: ${theme.shadows.xl.shadowRadius}px;
    elevation: ${theme.shadows.xl.elevation};
  `}
`;

const ModalHandle = styled.View`
  width: 36px;
  height: 4px;
  background-color: ${({theme}) => theme.border.secondary.color};
  border-radius: ${({theme}) => theme.border.radius.full};
  align-self: center;
  margin-bottom: ${({theme}) => theme.gaps.md};
`;

const ModalContent = styled.View`
  flex: 1;
  margin-bottom: ${({theme}) => theme.gaps.md};
`;

const CancelButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: ${({theme}) => theme.buttons.height.lg};
  background-color: ${({theme}) => theme.buttons.secondary.background};
  border-radius: ${({theme}) => theme.border.radius.lg};
  border-width: ${({theme}) => theme.border.width.thin};
  border-color: ${({theme}) => theme.border.primary.color};
  ${({theme}) => `
    shadow-color: ${theme.shadows.sm.shadowColor};
    shadow-offset: ${theme.shadows.sm.shadowOffset.width}px ${theme.shadows.sm.shadowOffset.height}px;
    shadow-opacity: ${theme.shadows.sm.shadowOpacity};
    shadow-radius: ${theme.shadows.sm.shadowRadius}px;
    elevation: ${theme.shadows.sm.elevation};
  `}
`;

const CancelText = styled.Text`
  font-size: ${({theme}) => theme.text.size.lg};
  color: ${({theme}) => theme.buttons.secondary.text};
  font-weight: ${({theme}) => theme.text.weight.semibold};
`;
