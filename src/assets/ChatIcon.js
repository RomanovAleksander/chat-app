import * as React from "react"

function ChatIcon(props) {
  return (
    <svg
      width={24}
      height={24}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <mask
        id="prefix__chat"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={2}
        y={2}
        width={21}
        height={20}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 13a1 1 0 110-2.002A1 1 0 0116 13zm-4 0a1 1 0 110-2.002A1 1 0 0112 13zm-4 0a1 1 0 110-2.002A1 1 0 018 13zm11.07-8.072c-2.283-2.284-5.444-3.303-8.673-2.804-4.077.636-7.457 3.92-8.22 7.987a10.016 10.016 0 00.61 5.765c.099.23.129.446.09.64l-.857 4.287a.999.999 0 001.176 1.176l4.283-.856c.246-.047.485.022.644.088 1.814.767 3.808.977 5.765.611 4.067-.763 7.35-4.143 7.987-8.22.503-3.228-.52-6.389-2.804-8.674z"
          fill="#fff"
        />
      </mask>
      <g mask="url(#prefix__chat)">
        <path fill="url(#prefix__paint0_linear_1:67)" d="M0 0h24v24H0z" />
      </g>
      <defs>
        <linearGradient
          id="prefix__paint0_linear_1:67"
          x1={6}
          y1={4}
          x2={18}
          y2={19.5}
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7CB8F7" />
          <stop offset={0.934} stopColor="#2A8BF2" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default ChatIcon
