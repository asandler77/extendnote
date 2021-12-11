/* eslint-disable react-native/no-color-literals */
import React, {ReactElement, useState} from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  BorderRadius,
  FontsFamily,
  FontSize,
  FontWeight,
  Opacity,
  Spacing,
} from './uiLibrary';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {leftArrowIcon} from '../assets/leftArrow';
import {rightArrowIcon} from '../assets/rightArrow';

// to override the calendar's default day names
LocaleConfig.locales[LocaleConfig.defaultLocale].dayNamesShort = [
  'S',
  'M',
  'T',
  'W',
  'T',
  'F',
  'S',
];

// for testing purpose as api is not ready yet
const INITIAL_DATE = '2021-06-15';

interface DayProps {
  dateString: string;
  month: number;
}

export interface CalendarProps {
  modalClose: () => void;
  onSelectDate: (date: string) => void;
  selectDateLabel?: string;
  linkLabel?: string;
}

const MyCalendar = ({navigation}: any): ReactElement => {
  // const styles = useStylesWithColors(calendarStyles);
  const [selectedMonth] = useState<number>(
    new Date(INITIAL_DATE).getUTCMonth() + 1,
  );

  const [day, setDay] = useState<DayProps>({
    dateString: INITIAL_DATE,
    month: 6, // to open default month as june when api integration is done it will be dynamic
  });

  const onDayPress = (d: DayProps) => {
    console.log('date click...', d);
    navigation.onSelectDate(d.dateString);
    setDay(d);
    navigation.modalClose();
  };

  const showEarliest = () => {
    navigation.modalClose();
    navigation.onSelectDate('');
  };

  const renderCalendarWithMarkedDates = (): ReactElement => {
    const dayComponent = ({date, marking, testID, ...props}: any) => {
      const isDisabled = marking?.disabled;
      const isSelected = date.dateString === day?.dateString;
      const isEvent = marking?.noEvent;
      const isThisMonth = date.month === selectedMonth;

      return (
        <Pressable
          onPress={() => props.onPress(date)}
          style={[
            styles.customDay,
            !!isSelected && styles.selectedText,
            !isThisMonth && styles.disabledDay,
          ]}
          testID={testID}>
          <Text
            style={[
              styles.day,
              !!isDisabled && styles.textDisabled,
              !!isSelected && styles.activeText,
              !!isEvent && styles.event,
            ]}>
            {date.day}
          </Text>
        </Pressable>
      );
    };

    const renderArrow = (direction: string) => {
      if (direction === 'right') {
        return rightArrowIcon(styles.arrowStyle.color);
      } else {
        return leftArrowIcon(styles.arrowStyle.color);
      }
    };

    return (
      <View>
        <Calendar
          style={styles.calendar}
          current={INITIAL_DATE}
          disableAllTouchEventsForDisabledDays={true}
          firstDay={0}
          markedDates={{
            [INITIAL_DATE]: {marked: true},
          }}
          renderArrow={renderArrow}
          dayComponent={dayComponent}
          onDayPress={onDayPress}
          theme={{
            monthTextColor: styles.calendarText.color,
            textSectionTitleColor: styles.calendarText.color,
            calendarBackground: styles.calendarWrapper.backgroundColor,
            textMonthFontWeight: FontWeight.BOLD,
            textMonthFontSize: FontSize.M,
            arrowStyle: {
              padding: 0,
            },
            // @ts-expect-error to override calendar header default styles
            'stylesheet.calendar.header': {
              week: {
                marginTop: Spacing.XL,
                marginHorizontal: 12,
                flexDirection: 'row',
                justifyContent: 'space-between',
              },
              dayHeader: {
                marginTop: 2,
                marginBottom: Spacing.M,
                width: Spacing.XL,
                textAlign: 'center',
                color: styles.calendarText.color,
                fontSize: FontSize.M,
                fontFamily: FontsFamily.SANS_MEDIUM,
                fontWeight: FontWeight.BOLD,
              },
            },
          }}
          testID="Calendar"
        />
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      presentationStyle="overFullScreen"
      transparent={true}
      visible={true}>
      <View style={styles.bgTransparent}>
        <Pressable
          testID={'modalCloseClick'}
          style={styles.modalCloseBtn}
          onPress={navigation.modalClose}
        />
        <View style={styles.calendarWrapper}>
          <View style={styles.calendarHeader}>
            <Text style={styles.selectDate}>{navigation.selectDateLabel}</Text>
          </View>
          {renderCalendarWithMarkedDates()}
          <Pressable
            onPress={showEarliest}
            testID={'earliestAvailableButton'}
            style={styles.availableBtn}>
            <Text style={styles.availableText}>{navigation.linkLabel}</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // const styles: SG = ({ BLUE, WHITE, ALWAYS_WHITE, HIGH_EMPHASIS, GRAY_300, GRAY_400, GRAY_500, SCRIM }) => ({
  calendar: {
    marginBottom: Spacing.L,
  },
  calendarText: {
    color: '#1d2329',
  },
  event: {
    textDecorationStyle: 'solid',
    textDecorationLine: 'line-through',
    opacity: Opacity.L,
    color: '#bdc2c7',
    textDecorationColor: '#878c94',
  },
  customDay: {
    textAlign: 'center',
    width: Spacing.XL,
    height: Spacing.XL,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  availableText: {
    fontSize: FontSize.M,
    letterSpacing: 0.25,
    textAlign: 'center',
    fontFamily: FontsFamily.SANS_MEDIUM,
    color: '#0057b8',
  },
  calendarWrapper: {
    borderTopRightRadius: Spacing.L,
    borderTopLeftRadius: Spacing.L,
    paddingTop: Spacing.L,
    backgroundColor: '#fff',
  },
  calendarHeader: {
    paddingBottom: Spacing.L,
    paddingTop: Spacing.XS,
    marginBottom: Spacing.S,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#dcdfe3',
  },
  selectDate: {
    textAlign: 'center',
    fontSize: FontSize.M,
    fontWeight: FontWeight.BOLD,
    letterSpacing: 0.25,
    color: '#1d2329',
  },
  availableBtn: {
    paddingVertical: Spacing['2XL'],
    borderTopWidth: 0.5,
    marginBottom: Spacing.S,
    borderColor: '#dcdfe3',
  },
  day: {
    fontFamily: FontsFamily.SANS_REGULAR,
    fontSize: FontSize.M,
    letterSpacing: 0.2,
    color: '#1d2329',
  },
  selectedText: {
    backgroundColor: '#0057b8',
    borderRadius: BorderRadius.XL,
    color: '#fff',
  },
  textDisabled: {
    color: '#bdc2c7',
  },
  activeText: {
    color: '#fff',
  },
  disabledDay: {
    opacity: Opacity.M,
  },
  bgTransparent: {
    // need calendar background design change to avoid using isDarkMode()
    // backgroundColor: 'white',
    flex: 1,
  },
  modalCloseBtn: {
    flex: 1,
  },
  arrowStyle: {
    color: '#1d2329',
  },
});

export default MyCalendar;
