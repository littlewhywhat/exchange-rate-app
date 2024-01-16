import React, {ComponentProps, useCallback} from 'react';
import {TouchableOpacity} from 'react-native';
import {CurrencyRate} from '../../types';
import {ListRow} from '../../components/ListRow';

interface CurrencyRateViewProps {
  currencyRate: CurrencyRate;
  onPress: (rate: CurrencyRate) => void;
}

export const CurrencyRateView: React.FC<
  CurrencyRateViewProps &
    Omit<ComponentProps<typeof TouchableOpacity>, 'onPress'>
> = ({onPress, currencyRate, ...props}) => {
  const handlePress = useCallback(
    () => onPress(currencyRate),
    [onPress, currencyRate],
  );

  const {code, rateToCzk, amount} = currencyRate;

  return (
    <TouchableOpacity onPress={handlePress} {...props}>
      <ListRow values={[code, rateToCzk, amount]} />
    </TouchableOpacity>
  );
};
