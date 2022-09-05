import React from "react";

export const TextArea = ({
    className = "form-control",
    placeholder = "",
    value = "",
    name = '',
    disabled = false,
    cols = 4,
    rows = 4,
    wrapperClass = "",
    onChange,
}) => {

        return (
            <div className={`textarea-wrapper ${wrapperClass}`}>
                <textarea
                    className={`text-area-shiftr ${className}`}
                    name={name}
                    cols={cols}
                    rows={rows}
                    disabled={disabled}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                ></textarea>
                {/* <span className="textarea-length">
                    {maxLength - value.length} characters
                </span> */}
            </div>
        );
    }
