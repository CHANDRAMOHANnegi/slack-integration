import React from 'react';
import moment, { Moment } from 'moment';
import DashboardHoc from '../hoc/DashboardHoc';
import SlackUserService from '../services/SlackUserService';
import IAttendanceData from '../models/interfaces/IAttendanceData';
import ServiceResponse from '../services/ServiceResponse';
import WorkSpaceServices from '../services/WorkSpaceServices';
import IWorkspaceAttendabceSetting from '../models/interfaces/IWorkspaceAttendabceSetting';

interface ICalendarState {
  today: Moment;
  showMonthPopup: boolean;
  selectedDay: string;
  selectedMonth: string;
  showYearNav: boolean;
  selectedYear: string;
  workspaceAttendanceSetting: IWorkspaceAttendabceSetting,
  attendanceData: Array<IAttendanceData>;
}

interface ICalendarProps {
  match: {
    params: { workspaceid: string, slackappid: string, slackid: string }
  }
}

class Calendar extends React.Component<ICalendarProps, ICalendarState> {

  constructor(props: any) {
    super(props);
    this.state = {
      today: moment(),
      showMonthPopup: false,
      showYearNav: false,
      selectedDay: moment().format('D'),
      selectedMonth: moment().format('MMMM'),
      selectedYear: moment().format('YYYY'),
      attendanceData: [],
      workspaceAttendanceSetting: {
        holidayDates: [], weekOffDays: [], startTime: '', endTime: '', updatedBy: '', workspaceId: '',
      },
    };
  }

  weekdays = moment.weekdays(); //["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  months = moment.months();

  year = () => {
    return this.state.today.format('Y');
  };
  month = () => {
    return this.state.today.format('MMMM');
  };
  daysInMonth = () => {
    return this.state.today.daysInMonth();
  };
  // currentDate = () => {
  //   return this.state.today.get('date');
  // };
  // currentDay = () => {
  //   return this.state.today.format('D');
  // };

  firstDayOfMonth = () => {
    let today = this.state.today;
    return moment(today).startOf('month').format('d'); // Day of week 0...1..5...6
  };

  setMonth = (month: any, DateContext?: any) => {
    let monthNo = this.months.indexOf(month);
    let today = Object.assign({}, !!DateContext ? DateContext : this.state.today);
    let dateContext = moment(today).set('month', monthNo);

    this.setState({
      today: dateContext,
      selectedMonth: dateContext.format('MMMM'),
      selectedYear: dateContext.format('Y'),
    }, () => {
      this.fetchAttendanceDataByMonthAndYear(this.months.indexOf(this.state.selectedMonth), parseInt(this.state.selectedYear));
    });
  };

  setYear = (year: any) => {
    let today = Object.assign({}, this.state.today);
    let particularYearContext = moment(today).set('year', year);

    this.setState({
      today: particularYearContext,
      selectedYear: particularYearContext.format('YYYY'),
    }, () => {
      this.fetchAttendanceDataByMonthAndYear(this.months.indexOf(this.state.selectedMonth), parseInt(this.state.selectedYear));
    });
  };

  nextMonth = () => {
    let today = Object.assign({}, this.state.today);
    const dateContext = moment(today).add(1, 'month');
    this.setMonth(dateContext.format('MMMM'), dateContext);
  };

  prevMonth = () => {
    let today = Object.assign({}, this.state.today);
    const dateContext = moment(today).subtract(1, 'month');
    this.setMonth(dateContext.format('MMMM'), dateContext);
  };

  onChangeMonth = () => {
    this.setState({
      showMonthPopup: !this.state.showMonthPopup,
    });
  };

  MonthNav = () => {
    return (
      <span
        className="label-month"
        onClick={() => this.onChangeMonth()}>
                {this.month()}
        {this.state.showMonthPopup &&
        <div className="month-popup">
          {moment.months().map((month: string | any) => {
            return (<div key={month}><span><i onClick={() => this.setMonth(month, this.state.today)}>{month}</i></span>
            </div>);
          })}
        </div>}
      </span>
    );
  };

  showYearEditor = () => {
    this.setState({
      showYearNav: true,
    });
  };


  onKeyUpYear = (e: React.SyntheticEvent) => {
    // @ts-ignore
    if (e.which === 13 || e.which === 27) {
      // @ts-ignore
      this.setYear(e.target.value);
      this.setState({
        showYearNav: false,
      });
    }
  };

  YearNav = () => {
    return (
      this.state.showYearNav ?
        <input
          defaultValue={this.year()}
          className="editor-year" onKeyUp={(e) => this.onKeyUpYear(e)}
          onChange={(e) => this.setYear(e.target.value)} type="number"
          placeholder="year"/>
        :
        <span className="label-year" onDoubleClick={() => {
          this.showYearEditor();
        }}>{this.year()}</span>
    );
  };

  async componentWillMount() {
    const { workspaceid } = this.props.match.params;
    const sr: ServiceResponse<any> = await WorkSpaceServices.getWorkspaceSetting(workspaceid);
    const { data } = sr;
    if (!data || !data.success) {
      console.log('data not found');
    } else {
      const { startTime, endTime, weekOffDays, holidayDates, updatedBy, workspaceId } = data.data;
      const workspaceAttendanceSetting = {
        holidayDates,
        weekOffDays,
        startTime,
        endTime,
        updatedBy,
        workspaceId,
      };
      if (data)
        this.setState({
          workspaceAttendanceSetting,
        });
    }
  }

  async componentDidMount() {
    const { selectedYear, selectedMonth } = this.state;
    const month = moment.months().indexOf(selectedMonth);
    this.fetchAttendanceDataByMonthAndYear(month, parseInt(selectedYear));
  }


  modal = (date: string) => {
    const { attendanceData } = this.state;
    if (attendanceData.length > 0) {
      const today: any = attendanceData.find(data => data.day == date);
      const { entryTime, exitTime } = !!today && today;
      return <div className="card attendanceModal showOnHover">
        <div className="card-body">
          <ul className="list-group list-group-flush ">
            <li className="list-group-item">Date : {date}</li>
            <li className="list-group-item">Entry Time : {entryTime ? moment(entryTime).format('hh:mm:ss a') : ''}</li>
            <li className="list-group-item">Exit Time : {exitTime ? moment(exitTime).format('hh:mm:ss a') : ''}</li>
          </ul>
        </div>
      </div>;
    }
  };

  fetchAttendanceDataByMonthAndYear = async (month: number, year: number) => {
    const { slackid } = this.props.match.params;
    const res: ServiceResponse<any> = await SlackUserService.fetchSlackUserAttendanceByMonthAndYear(month + 1, year, slackid);
    console.log(res);
    const { data } = res;
    if (!data || !data.success) {
    } else {
      const { data: attendanceData } = data;
      if (data.success && attendanceData)
        this.setState({
          attendanceData: attendanceData,
        });
    }
  };

  render() {
    const { attendanceData, workspaceAttendanceSetting } = this.state;
    const { holidayDates, startTime, weekOffDays } = workspaceAttendanceSetting;

    let blanks = [];
    for (let i = 0; i < parseInt(this.firstDayOfMonth()); i++) {
      blanks.push(
        <td key={i * 80} className="emptySlot">{' '}</td>,
      );
    }

    let daysInMonth = [];
    for (let d = 1; d <= this.daysInMonth(); d++) {
      let dayClass = 'day';
      const currentDay = this.state.today.format('YYYY-MM-') + d;
      dayClass = attendanceData.find((attendanceData) => {

        const entr1 = moment(moment('2019-09-05T06:09:27.000Z'));
        const entr2 = moment(moment('2019-09-05T06:00:57.000Z'));

        let EntryTime = moment(attendanceData.entryTime);
        const startTime1 = {
          hours: moment(startTime).format('HH'),
          mins: moment(startTime).format('mm'),
          sec: moment(startTime).format('ss'),
        };
        const entryTime1 = {
          hours: moment(EntryTime).format('HH'),
          mins: moment(EntryTime).format('mm'),
          sec: moment(EntryTime).format('ss'),
        };
        const starttime = moment([startTime1.hours, startTime1.mins, startTime1.sec], 'HH:mm:ss');
        const entrytime = moment([entryTime1.hours, entryTime1.mins, entryTime1.sec], 'HH:mm:ss');
        const diff = entrytime.diff(starttime, 'minutes');

        console.log((diff));

        return attendanceData.day == currentDay && diff >= 0;
      }) ? [dayClass, 'late'].join(' ') : [dayClass, 'ontime'].join(' ');

      dayClass = weekOffDays.length > 0 && !!weekOffDays.find(weekOffDay => weekOffDay === this.state.today.set('date', d).format('ddd'))
        ? [dayClass, 'weekOffDay'].join(' ') : dayClass;
      dayClass = !!holidayDates.find(holidayDate => holidayDate.date == currentDay)
        ? [dayClass, 'holiday'].join(' ') : dayClass;

      daysInMonth.push(
        <td key={d} className={'day'}>
          <span className={dayClass}>{d}
            {this.modal(currentDay)}
          </span>
        </td>,
      );
    }

    let totalSlots = [...blanks, ...daysInMonth];
    let rows: Array<{}> = [];
    let cells: Array<{}> = [];

    totalSlots.forEach((date, i) => {

      if ((i % 7) !== 0) {
        cells.push(date);
      } else {
        let insertRow = cells.slice();
        rows.push(insertRow);
        cells = [];
        cells.push(date);
      }
      if (i === totalSlots.length - 1) {
        let insertRow = cells.slice();
        rows.push(insertRow);
      }
    });

    let trElems = rows.map((d, i) => {
      return (
        <tr key={i * 100}>
          {d}
        </tr>
      );
    });

    return (
      <DashboardHoc>
        <div className="calendar-container">
          <table className="calendar table">
            <thead>
            <tr className="calendar-header">
              <td colSpan={3}><i onClick={this.prevMonth}>&larr;prev</i></td>
              <td colSpan={3}>
                <this.MonthNav/>
                {' '}
                <this.YearNav/>
              </td>
              <td colSpan={1}><i onClick={this.nextMonth}>next&rarr;</i></td>
            </tr>
            </thead>
            <tbody>
            <tr className="weekDays">
              {this.weekdaysShort.map((day) => <td key={day} className="week-day">{day}</td>)}</tr>
            {trElems}
            </tbody>
          </table>
        </div>
      </DashboardHoc>
    );
  }
}

export default Calendar;
