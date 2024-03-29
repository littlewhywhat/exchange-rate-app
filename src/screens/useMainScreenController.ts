import {useEffect, useMemo, useState} from 'react';

import {useQuery} from 'react-query';
import {getCurrenciesRates} from '../api/centralBank';
import {convertToCurrency, isUpToDate} from '../utils';
import {CurrencyCode, CurrencyRate} from '../types';

const INITIAL_CURRENCY_CODE = CurrencyCode.EUR;
const INITIAL_USER_AMOUNT_CZK = 1000;

export const useMainScreenController = () => {
  const [selectedCurrencyRate, setSelectedCurrencyRate] =
    useState<CurrencyRate>();

  const [userAmountCZK, setUserAmountCZK] = useState(INITIAL_USER_AMOUNT_CZK);

  const {data, isLoading, isError, refetch} = useQuery(
    'currentRates',
    getCurrenciesRates,
  );

  useEffect(() => {
    setSelectedCurrencyRate(
      data?.rates.find(({code}) => code === INITIAL_CURRENCY_CODE) ||
        data?.rates[0],
    );
  }, [data?.rates]);

  const conversion = useMemo(
    () =>
      selectedCurrencyRate && {
        result: convertToCurrency(userAmountCZK, selectedCurrencyRate),
        currencyRate: selectedCurrencyRate,
        czkAmount: userAmountCZK,
      },
    [userAmountCZK, selectedCurrencyRate],
  );

  const fetchInfo = useMemo(
    () =>
      data?.date && {
        isUpToDate: isUpToDate(data.date),
        date: data.date,
      },
    [data?.date],
  );

  return {
    setUserAmountCZK,
    currentRates: data?.rates,
    fetchInfo,
    refetch,
    isRefetching: Boolean(isLoading && conversion),
    isFirstTimeLoading: Boolean(isLoading && !conversion),
    hasError: isError,
    setSelectedCurrencyRate,
    conversion,
  };
};
