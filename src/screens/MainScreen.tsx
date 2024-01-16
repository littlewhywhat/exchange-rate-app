import React from 'react';
import {
  StatusBar,
  useColorScheme,
  RefreshControl,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import styled from 'styled-components/native';
import {useModal} from '../hooks';
import {Message, Text} from '../components';
import {ConversionView, CurrencyRatesSelectModal} from '../modules/conversion';
import {useMainScreenController} from './useMainScreenController';
import {DateTime} from 'luxon';

export const MainScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const {
    setUserAmountCZK,
    currentRates,
    fetchInfo,
    isRefetching,
    isFirstTimeLoading,
    hasError,
    refetch,
    conversion,
    setSelectedCurrencyRate,
  } = useMainScreenController();

  const {toggleModal, visible} = useModal();

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScreenContainer
          keyboardShouldPersistTaps="always"
          contentInsetAdjustmentBehavior="automatic"
          refreshControl={
            <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
          }>
          <>
            {hasError && (
              <Message messageType="error" message={messages.fetchError} />
            )}
            {fetchInfo && (
              <Message
                {...(fetchInfo.isUpToDate
                  ? {message: messages.upToDate(fetchInfo.date)}
                  : {
                      messageType: 'warn',
                      message: messages.outOfDateWarning,
                    })}
              />
            )}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <CenteredView>
                {isFirstTimeLoading && (
                  <LoadingTextView>
                    <LoadingText>Loading...</LoadingText>
                  </LoadingTextView>
                )}
                {conversion && (
                  <ConversionView
                    onAmountChange={setUserAmountCZK}
                    conversion={conversion}
                    onConversionCurrencyPress={toggleModal}
                  />
                )}
              </CenteredView>
            </TouchableWithoutFeedback>
          </>
        </ScreenContainer>
        {currentRates && (
          <CurrencyRatesSelectModal
            visible={visible}
            toggleModal={toggleModal}
            currencyRates={currentRates}
            onSelect={setSelectedCurrencyRate}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const messages = {
  outOfDateWarning:
    'WARNING! Yesterday rates! Foreign exchange market rates as of a given date are updated only once a day (every working day after 2.30 p.m.). Please try again later with a pull-down gesture.',
  upToDate: (date: DateTime) =>
    `Using exchange rates as per ${date.toFormat(
      'dd.LL.yyyy',
    )}.\nRefresh with a pull-down gesture.`,
  fetchError:
    'Error while fetching current rates. Please try again later with a pull-down gesture',
};

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const LoadingTextView = styled.View`
  flex: 1;
`;

const KeyboardAvoidingView = styled.KeyboardAvoidingView`
  flex: 1;
`;

const LoadingText = styled(Text).attrs({size: 'medium'})`
  text-align: center;
`;

const CenteredView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding-left: ${({theme}) => theme.gaps.big};
  padding-right: ${({theme}) => theme.gaps.big};
`;

const ScreenContainer = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})`
  flex: 1;
  background-color: ${({theme}) => theme.background.primary};
`;
