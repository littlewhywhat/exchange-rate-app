import React, {useCallback, useState} from 'react';
import {Conversion, CurrencyCode} from '../../types';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text} from '../../components/Text';

interface ConversionViewProps {
  onAmountChange: (amount: number) => void;
  conversion: Conversion;
  onConversionCurrencyPress: () => void;
}

export const ConversionView: React.FC<ConversionViewProps> = ({
  conversion,
  onAmountChange,
  onConversionCurrencyPress,
}) => {
  const [textAmount, setTextAmount] = useState(String(conversion.czkAmount));

  const onCZKAmountChange = useCallback(
    (rawValue: string) => {
      // @todo write unit test
      // substitute , to . and prepend with 0 if starts with .
      const value = rawValue.replaceAll(',', '.').replace(/^\./, '0.');
      // check if value is convertable to number string with only 2 decimal places after .
      if (value.length && !value.match(/^\d+(?:\.\d{0,2})?$/)) {
        return;
      }
      // not allow adding/leaving more than one leading zeros
      const [integerPart] = value.split('.');
      if (integerPart.startsWith('0') && integerPart !== '0') {
        return;
      }
      setTextAmount(value);
      onAmountChange?.(Number(value));
    },
    [setTextAmount, onAmountChange],
  );

  return (
    <ConversionViewContainer>
      <ConversionCard>
        <InputRow>
          <CurrencyCodeSection>
            <Text size="lg" weight="semibold" color="primary">{CurrencyCode.CZK}</Text>
          </CurrencyCodeSection>
          <AmountInputSection>
            <AmountInput
              autoFocus
              maxLength={11}
              value={textAmount}
              placeholder="0.00"
              onChangeText={onCZKAmountChange}
            />
          </AmountInputSection>
        </InputRow>
        
        <Divider />
        
        <OutputRow>
          <CurrencySelectSection onPress={onConversionCurrencyPress}>
            <Text size="lg" weight="semibold" color="primary">{conversion.currencyRate.code}</Text>
            <DropdownIcon name="chevron-down" />
          </CurrencySelectSection>
          <ConvertedAmountSection>
            <ConvertedAmountText size="lg" weight="medium">
              {conversion.result}
            </ConvertedAmountText>
          </ConvertedAmountSection>
        </OutputRow>
      </ConversionCard>
    </ConversionViewContainer>
  );
};

const ConversionViewContainer = styled.View`
  flex: 1;
  justify-content: center;
  padding: ${({theme}) => theme.gaps.md};
`;

const ConversionCard = styled.View`
  background-color: ${({theme}) => theme.background.surface};
  border-radius: ${({theme}) => theme.border.radius.xl};
  padding: ${({theme}) => theme.gaps.lg};
  border-width: ${({theme}) => theme.border.width.thin};
  border-color: ${({theme}) => theme.border.secondary.color};
  ${({theme}) => `
    shadow-color: ${theme.shadows.lg.shadowColor};
    shadow-offset: ${theme.shadows.lg.shadowOffset.width}px ${theme.shadows.lg.shadowOffset.height}px;
    shadow-opacity: ${theme.shadows.lg.shadowOpacity};
    shadow-radius: ${theme.shadows.lg.shadowRadius}px;
    elevation: ${theme.shadows.lg.elevation};
  `}
`;

const InputRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${({theme}) => theme.gaps.sm};
`;

const OutputRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${({theme}) => theme.gaps.sm};
`;

const CurrencyCodeSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${({theme}) => theme.gaps.md};
  background-color: ${({theme}) => theme.background.surfaceVariant};
  border-radius: ${({theme}) => theme.border.radius.lg};
  margin-right: ${({theme}) => theme.gaps.sm};
`;

const AmountInputSection = styled.View`
  flex: 2;
  background-color: ${({theme}) => theme.background.surfaceVariant};
  border-radius: ${({theme}) => theme.border.radius.lg};
  padding: ${({theme}) => theme.gaps.md};
`;

const AmountInput = styled.TextInput.attrs({
  inputMode: 'decimal',
})`
  text-align: right;
  font-size: ${({theme}) => theme.text.size.xl};
  color: ${({theme}) => theme.text.primary.color};
  font-weight: ${({theme}) => theme.text.weight.semibold};
  min-height: 32px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${({theme}) => theme.border.secondary.color};
  margin: ${({theme}) => theme.gaps.md} ${({theme}) => theme.gaps.lg};
`;

const CurrencySelectSection = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: ${({theme}) => theme.gaps.md};
  background-color: ${({theme}) => theme.buttons.secondary.background};
  border-radius: ${({theme}) => theme.border.radius.lg};
  border-width: ${({theme}) => theme.border.width.thin};
  border-color: ${({theme}) => theme.border.primary.color};
  margin-right: ${({theme}) => theme.gaps.sm};
  ${({theme}) => `
    shadow-color: ${theme.shadows.sm.shadowColor};
    shadow-offset: ${theme.shadows.sm.shadowOffset.width}px ${theme.shadows.sm.shadowOffset.height}px;
    shadow-opacity: ${theme.shadows.sm.shadowOpacity};
    shadow-radius: ${theme.shadows.sm.shadowRadius}px;
    elevation: ${theme.shadows.sm.elevation};
  `}
`;

const DropdownIcon = styled(Icon)`
  margin-left: ${props => props.theme.gaps.sm};
  color: ${props => props.theme.text.secondary.color};
  font-size: 14px;
`;

const ConvertedAmountSection = styled.View`
  flex: 2;
  background-color: ${({theme}) => theme.background.surfaceVariant};
  border-radius: ${({theme}) => theme.border.radius.lg};
  padding: ${({theme}) => theme.gaps.md};
  align-items: flex-end;
  justify-content: center;
`;

const ConvertedAmountText = styled(Text)`
  text-align: right;
  color: ${({theme}) => theme.text.primary.color};
`;
