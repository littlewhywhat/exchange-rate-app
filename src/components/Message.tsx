import React from 'react';
import styled from 'styled-components/native';
import {Text} from './Text';

type MessageType = 'error' | 'warn' | 'info' | 'success';

export const Message: React.FC<{
  message: string;
  messageType?: MessageType;
}> = ({message, messageType = 'info'}) => (
  <MessageContainer $type={messageType}>
    <MessageText $type={messageType}>{message}</MessageText>
  </MessageContainer>
);

const MessageContainer = styled.View.attrs<{$type: MessageType}>(props => ({
  $type: props.$type,
}))`
  background-color: ${({$type, theme}) =>
    theme.messages[$type].backgroundColor};
  margin-top: ${({theme}) => theme.gaps.md};
  margin-right: ${({theme}) => theme.gaps.md};
  margin-left: ${({theme}) => theme.gaps.md};
  padding: ${({theme}) => theme.gaps.md};
  border-radius: ${({theme}) => theme.border.radius.lg};
  ${({theme}) => `
    shadow-color: ${theme.shadows.sm.shadowColor};
    shadow-offset: ${theme.shadows.sm.shadowOffset.width}px ${theme.shadows.sm.shadowOffset.height}px;
    shadow-opacity: ${theme.shadows.sm.shadowOpacity};
    shadow-radius: ${theme.shadows.sm.shadowRadius}px;
    elevation: ${theme.shadows.sm.elevation};
  `}
  border-left-width: 4px;
  border-left-color: ${({$type, theme}) => {
    switch ($type) {
      case 'error': return '#dc2626';
      case 'warn': return '#d97706';
      case 'info': return '#2563eb';
      case 'success': return '#059669';
      default: return theme.border.primary.color;
    }
  }};
`;

const MessageText = styled(Text).attrs<{$type: MessageType}>(props => ({
  size: 'sm',
}))`
  text-align: center;
  color: ${({$type, theme}) => theme.messages[$type].textColor};
  font-weight: ${({theme}) => theme.text.weight.medium};
  line-height: ${({theme}) => theme.text.lineHeight.normal};
`;
