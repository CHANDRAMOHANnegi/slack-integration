import HolidayDates from './IHolidayDates';
import { IWeekOffDaysEnum } from '../../constants/IWeekDaysEnum';

export default interface IWorkspaceAttendabceSetting {
  workspaceId: string;
  updatedBy: string;
  weekOffDays: IWeekOffDaysEnum[];
  startTime: string;
  endTime: string;
  holidayDates: HolidayDates[];
}

