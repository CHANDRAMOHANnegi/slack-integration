import React, {Component} from 'react';
import Calendar from "./Calendar";

interface IAttendanceState {
    attendanceData: Array<Object>;
    employeeData: {}
}

interface IAttendanceProps {

}

class Attendance extends Component<IAttendanceProps, IAttendanceState> {

    state = {
        employeeData: {
            name: "Vivek Dubey",
            email: "dubeyVivek@gmail.com",
            phone: 1234567890,
        },
        attendanceData: [{
            date: "2/7/2019",
            entryTime: "",
            exitTime: "",
            onLeave: true
        }, {
            date: "2/8/2019",
            entryTime: "",
            exitTime: "",
            onLeave: true
        }, {
            date: "11/7/2019",
            entryTime: "10:45",
            exitTime: "6:00",
            onLeave: false
        }, {
            date: "22/7/2019",
            entryTime: "",
            exitTime: "",
            onLeave: true
        }, {
            date: "12/7/2019",
            entryTime: "11:45",
            exitTime: "7:09",
            onLeave: false
        }, {
            date: "7/6/2019",
            entryTime: "",
            exitTime: "",
            onLeave: true
        },],
    };


    render() {
        const {name, email, phone} = this.state.employeeData;
        return (
            <div>
                Attendace
            </div>
        );
    }
}

export default Attendance;
