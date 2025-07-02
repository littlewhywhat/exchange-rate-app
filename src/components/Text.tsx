import React, {ComponentProps} from 'react';
import {Text as RNText} from 'react-native';
import styled from 'styled-components/native';

type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | 'small' | 'medium';
type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export const Text: React.FC<
  {
    size?: TextSize;
    weight?: TextWeight;
    color?: 'primary' | 'secondary';
  } & ComponentProps<typeof RNText>
> = ({size = 'base', weight = 'normal', color = 'primary', children, ...props}) => (
  <StyledText $size={size} $weight={weight} $color={color} {...props}>
    {children}
  </StyledText>
);

const StyledText = styled.Text.attrs<{
  $size?: TextSize;
  $weight?: TextWeight;
  $color?: 'primary' | 'secondary';
}>(({$size, $weight, $color}) => ({
  $size: $size || 'base',
  $weight: $weight || 'normal',
  $color: $color || 'primary',
}))`
  font-size: ${props => {
    // Handle legacy sizes
    if (props.$size === 'small' || props.$size === 'medium') {
      return props.theme.text.size[props.$size];
    }
    // Handle new sizes, fallback to base for unknown sizes
    return props.theme.text.size[props.$size as keyof typeof props.theme.text.size] || props.theme.text.size.base;
  }};
  font-weight: ${props => props.theme.text.weight[props.$weight!]};
  color: ${props => props.theme.text[props.$color!].color};
  line-height: ${props => props.theme.text.lineHeight.normal};
`;
