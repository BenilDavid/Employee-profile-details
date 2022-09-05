import React from 'react';
import'./Box.scss';

export const Box = ({
    title = '',
    className = null,
    onClick = () => {
        return null;
    },
    children,
    textClass = null
}) => {
    return (
        <div className={`box_wrapper my-3 ${className}`} onClick={onClick}>
            {title !== '' ? (
                <div className={`box_title ${textClass}`}>
                    <b className={`${textClass} `}>{title}</b>
                </div>
            ) : (
                ''
            )}
            <div>{children}</div>
        </div>
    );
};
