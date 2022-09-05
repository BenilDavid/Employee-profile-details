import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import './DatePicker.scss';
import 'antd/dist/antd.css';

 export const CustomDatePicker = ({
    placeholder = "Select month",
    onChange,
    label = false,
    value,
    picker,
    format = 'MM-DD-YYYY',
    allowClear = true,
    disabled = false,
    name,
    disabledDate,
    customDateOption = false,
    defaultDay = null,
    defaultMonth = null,
    defaultYear = null,
}) => {

    const customDateOptionFormater = (format, date, month, year) => {
        let formatted = ""
        let currentDay = moment()

        switch (format) {
            default:
                formatted = moment(`${year ? year : currentDay.format('YYYY')}-${month ? month : currentDay.format('MM')}-${date ? date : currentDay.format('DD')}`, 'YYYY-MM-DD')
                break
        }
        return formatted
    }

    return (
        <div className="custom_datepicker">
            {label !== false ? (
                <div className="d-flex justify-content-start label-content">
                    <label className="font-weight-normal">{label}</label>
                </div>
            ) : null}
            <DatePicker
                placeholder={placeholder}
                defaultPickerValue={customDateOption ? customDateOptionFormater(format, defaultDay, defaultMonth, defaultYear) : ''}
                disabledDate={disabledDate}
                onChange={onChange}
                picker={picker}
                format={format}
                disabled={disabled}
                value={value}
                allowClear={allowClear}
                name={name}
            />
        </div>
    );
};
