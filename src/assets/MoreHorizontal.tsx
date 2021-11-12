import * as React from "react"

const MoreHorizontalIcon: React.FC = (props) => {
    return (
        <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3 12a2 2 0 114.001.001A2 2 0 013 12zm9-2a2 2 0 10.001 4.001A2 2 0 0012 10zm7 0a2 2 0 10.001 4.001A2 2 0 0019 10z"
                fill="#231F20"
            />
            <mask
                id="prefix__moreHorizontal"
                style={{
                    maskType: "alpha",
                }}
                maskUnits="userSpaceOnUse"
                x={3}
                y={10}
                width={18}
                height={4}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 12a2 2 0 114.001.001A2 2 0 013 12zm9-2a2 2 0 10.001 4.001A2 2 0 0012 10zm7 0a2 2 0 10.001 4.001A2 2 0 0019 10z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#prefix__moreHorizontal)">
                <path fill="#B7BDCB" d="M0 0h24v24H0z" />
            </g>
        </svg>
    )
}

export default MoreHorizontalIcon
