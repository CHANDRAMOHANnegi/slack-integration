import React, { Component } from 'react';
import DashboardHoc from '../hoc/DashboardHoc';
import moment from 'moment';
import WorkSpaceServices from '../services/WorkSpaceServices';
import ServiceResponse from '../services/ServiceResponse';
import IHolidayDates from '../models/interfaces/IHolidayDates';


interface WorkspaceSettingProps {
  match: {
    params: { workspaceid: string, slackappid: string }
  }
}

interface WorkspaceSettingState {
  startTime: string
  endTime: string
  weekOffDays: Array<any>
  holidayDates: Array<IHolidayDates>
  dataNotFound: boolean
}

let WeekDays = moment.weekdaysShort();

class WorkspaceSetting extends Component <WorkspaceSettingProps, WorkspaceSettingState> {

  constructor(props: any) {
    super(props);
    this.state = {
      startTime: '',
      endTime: '',
      weekOffDays: ['Sun'],
      holidayDates: [
        { date: '2019-09-21', message: 'independenceday' }, { date: '2019-09-21', message: 'independenceday' }],
      dataNotFound: false,
    };
  }

  async componentDidMount() {
    const { workspaceid: workspaceId } = this.props.match.params;
    const res = await WorkSpaceServices.getWorkspaceSetting(workspaceId);
    const { data } = res;
    if (!data || !data.data.success) {
      this.setState({ dataNotFound: true });
    }
    const { startTime, endTime, weekOffDays, holidayDates } = data.data;
    // console.log(moment('2019-09-02T20:31:47.000Z').format('hh:mm'));
    // console.log(moment(startTime).format('hh:mm a'));
    this.setState({
      startTime, endTime, weekOffDays, holidayDates, dataNotFound: false,
    });
  }

  handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { startTime, endTime, weekOffDays, holidayDates } = this.state;
    const { workspaceid: workspaceId } = this.props.match.params;
    const sr: ServiceResponse<any> = await WorkSpaceServices.getLoggedInUserId();
    const { data } = sr;
    if (!data || !data.data) {
      console.log('unable to get id ');
    }
    const id = data.data;
    const res = await WorkSpaceServices.setWorkspaceSetting({
      startTime, weekOffDays, workspaceId, holidayDates, endTime, updatedBy: id,
    });
  };

  handleEdit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const { startTime, endTime, weekOffDays, holidayDates } = this.state;
    const { workspaceid: workspaceId } = this.props.match.params;
    const sr: ServiceResponse<any> = await WorkSpaceServices.getLoggedInUserId();
    const { data } = sr;
    if (!data) {
      console.log('unable to get id wrong');
    }
    const id = data.data;
    const res = await WorkSpaceServices.editWorkspaceSetting({
      startTime, weekOffDays, workspaceId, holidayDates, endTime, updatedBy: id,
    });
    console.log(res);
  };


  handleChange = (e: React.SyntheticEvent) => {
    // @ts-ignore
    const [name, value] = [e.target.name, e.target.value];
    let timeSplit = value.split(':');
    let hour = timeSplit[0];
    let minutes = timeSplit[1];
    this.setState({
      ...this.state,
      [name]: moment().set({ hour: hour, minutes: minutes }).format(),
    });
  };

  render() {
    const { startTime, endTime, weekOffDays, dataNotFound } = this.state;
    console.log(this.state);
    return (
      <DashboardHoc>
        <div className={'WorkspaceSetting'}>
          <h2>Workspace setting</h2>
          <form>
            <div className="form-group row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Entry Time</label>
              <div className="col-sm-3">
                <input type="time" required={true} className="form-control"
                       value={moment(startTime).format('HH:mm')}
                       onChange={this.handleChange} name={'startTime'}/>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Exit Time</label>
              <div className="col-sm-3">
                <input type="time"
                       value={moment(endTime).format('HH:mm')}
                       className="form-control" required={true} name={'endTime'}
                       onChange={this.handleChange}/>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="inputPassword" className="col-sm-2 col-form-label"> work off Days</label>
              <div className="col-sm-6">
                <div className={'weekOffDays '}>
                  <ul className="list-group d-flex justify-content-between flex-row  flex-wrap align-items-center">
                    {weekOffDays && weekOffDays.map(day =>
                      day && <li className="list-group-item d-flex justify-content-between align-items-center">
                        {day} <span className="badge badge-primary badge-pill "
                                    onClick={() => {
                                      const weekdays = weekOffDays.slice().filter(Day => Day !== day);
                                      this.setState({ weekOffDays: weekdays });
                                    }}>x</span></li>)}</ul>
                </div>
                <select className="custom-select" id="inputGroupSelect01"
                        onChange={(e) => {
                          const day = WeekDays[parseInt(e.target.value)];
                          const weekdays = weekOffDays.slice();
                          !weekdays.find(Day => Day == day) && weekdays.push(day);
                          this.setState({ weekOffDays: weekdays });
                        }}>
                  <option value={'0'}></option>
                  {WeekDays.map((day, i) => <option value={i}>{day}</option>)}
                </select>
              </div>
            </div>

            {dataNotFound ? <button onClick={this.handleSubmit} type="submit"
                                    className="btn btn-primary align-self-center ">Submit</button>
              : <h2>
                <button
                  onClick={this.handleEdit}
                  type="submit" className="btn btn-primary align-self-center ">Edit
                </button>
              </h2>}
          </form>
        </div>
      </DashboardHoc>);
  }
}

export default WorkspaceSetting;
