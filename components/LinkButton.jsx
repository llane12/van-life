import { useState } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import "./linkButton.css";

export default function LinkButton({ link, color, variant, children, className, ...rest }) {
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const btnClass = classNames("btn", "btn-" + color, "btn-" + variant, className, {
        "btn-pressed": isPressed,
        "btn-over": isHovered && !isPressed,
    });

    return (
        <Link
            to={link}
            className={btnClass}
            {...rest}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
        </Link>
    );
}
