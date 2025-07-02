import React from 'react';
import styled from 'styled-components/native';
import {Text as TextComponent} from './Text';
import {TextProps} from 'react-native';

export const ListRow: React.FC<{
  values: (string | number)[];
  textStyle?: TextProps['style'];
}> = ({values, textStyle}) => (
  <CurrencyRateContainer>
    {values.map((value, i) => (
      <CellText style={textStyle} key={i} size="base" weight="medium">
        {value}
      </CellText>
    ))}
  </CurrencyRateContainer>
);

const CellText = styled(TextComponent)`
  flex: 1;
  text-align: center;
  padding: ${({theme}) => theme.gaps.md};
`;

const CurrencyRateContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${({theme}) => theme.background.surface};
  border-bottom-width: ${({theme}) => theme.border.width.thin};
  border-bottom-color: ${({theme}) => theme.border.secondary.color};
  margin: 0 ${({theme}) => theme.gaps.md};
  border-radius: ${({theme}) => theme.border.radius.md};
  margin-bottom: ${({theme}) => theme.gaps.sm};
  ${({theme}) => `
    shadow-color: ${theme.shadows.sm.shadowColor};
    shadow-offset: ${theme.shadows.sm.shadowOffset.width}px ${theme.shadows.sm.shadowOffset.height}px;
    shadow-opacity: ${theme.shadows.sm.shadowOpacity};
    shadow-radius: ${theme.shadows.sm.shadowRadius}px;
    elevation: ${theme.shadows.sm.elevation};
  `}
`;
