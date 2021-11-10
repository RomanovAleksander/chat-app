import * as React from "react"

const PlusIcon: React.FC = (props) => {
    return (
        <svg
            width={24}
            height={24}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19 11h-6V5a1 1 0 10-2 0v6H5a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2z"
                fill="#231F20"
            />
            <mask
                id="prefix__plus"
                style={{
                    maskType: "alpha",
                }}
                maskUnits="userSpaceOnUse"
                x={4}
                y={4}
                width={16}
                height={16}
            >
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19 11h-6V5a1 1 0 10-2 0v6H5a1 1 0 100 2h6v6a1 1 0 102 0v-6h6a1 1 0 100-2z"
                    fill="#fff"
                />
            </mask>
            <g mask="url(#prefix__plus)">
                <path fill="#fff" d="M0 0h24v24H0z" />
            </g>
        </svg>
    )
}

export default PlusIcon
