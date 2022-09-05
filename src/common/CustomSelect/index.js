import React from 'react';
import classNames from 'classnames';
import { Select } from 'antd';
import './CustomSelect.scss';

const { Option } = Select;

export const CustomSelect = ({
    onChange,
    optionsList = [],
    placeholder = '',
    name = '',
    value,
    label = '',
    disabled = false,
    classname = '',
    mandatory = true,
}) => {
    return (
        <>
            {label === '' ? (
                ''
            ) : (
                <label className="label">
                    {label} {mandatory ? <span className="text-error">*</span> : ''}
                </label>
            )}
            <div
                className={classNames(
                    'custom_select_container',
                    classname ? classname : ''
                )}
            >
                <Select
                    showSearch
                    disabled={disabled}
                    placeholder={placeholder}
                    optionFilterProp="children"
                    onChange={(value) => {
                        let body = {};
                        let infinite = false;
                        let isInfinite = optionsList.filter((options) => {
                            if (options.value === value) {
                                infinite = true;
                                // if (options.id) {
                                return options.id;
                                // }
                            }
                        });
                        body = {
                            name: name,
                            value: value,
                            id: infinite ? isInfinite[0].id : '',
                        };
                        onChange(body);
                    }}
                    value={value !== '' ? value : undefined}
                >
                    {optionsList.length > 0 &&
                        optionsList.map(({ id, label, value }) => {
                            return (
                                <Option className="text-capitalize" key={id} value={value || id}>
                                    {label}
                                </Option>
                            );
                        })}
                </Select>
            </div>
        </>
    );
};
