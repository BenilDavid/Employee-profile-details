import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEye,
    faEyeSlash,
} from "@fortawesome/free-regular-svg-icons";


export const Input = ({
    className = "",
    placeholder = "",
    onChange,
    value = "",
    name,
    disabled = false,
    type = "",
    max = null,
    onClick,
    label,
    style,
    required,
    onKeyPress,
    pattern,
    mandatory = true,
    eye = false,
}) => {

    const [toggleEye, setToggleEye] = useState(false);
    function handleShowPassword() {
        setToggleEye(!toggleEye);
    }

    return (
        <>
        <div className="d-flex justify-content-between">
            {label ? (
                <label className="label me-4">
                    {label} {mandatory ? <span className="text-error">*</span> : ""}
                </label>

            ) : (
                ""
            )}
                {eye === true ? (<FontAwesomeIcon onClick={handleShowPassword} className="cursor-pointer" icon={toggleEye ? faEye : faEyeSlash} />) : ''}
            </div>
            <input
                className={`form-control custom-input ${className}`}
                name={name}
                type={toggleEye ? 'text' : type }
                disabled={disabled}
                value={value}
                min={0}
                maxLength={max}
                placeholder={placeholder}
                onChange={onChange}
                style={style}
                required={required}
                onKeyPress={onKeyPress}
                pattern={pattern}
            />
        </>
    );
}
