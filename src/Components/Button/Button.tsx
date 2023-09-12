import React from "react";
import './Button.scss';

const Button = ({onClick, label, icon, className, style}: {
    onClick: any,
    label?: string,
    icon?: string,
    className?: string,
    style?: object
}) => {
    return (
        <button className={`${className} app-button`} onClick={onClick} style={style}>
            {icon ? <img src={icon} alt="button-icon" height={15} width={15}></img> : null}
            {label ? label : ''}
        </button>
    )
}

export default Button