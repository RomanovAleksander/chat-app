import * as React from "react"

const HomeIcon: React.FC = (props) => {
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
        d="M15 19v-4h4l.001 4H15zm4-6h-4c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h4c1.103 0 2-.897 2-2v-4c0-1.103-.897-2-2-2zM5 19v-4h4l.001 4H5zm4-6H5c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h4c1.103 0 2-.897 2-2v-4c0-1.103-.897-2-2-2zm6-4V5h4l.001 4H15zm4-6h-4c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h4c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 9V5h4l.001 4H5zm4-6H5c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h4c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"
        fill="#707C97"
      />
      <mask
        id="prefix__home"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={3}
        y={3}
        width={18}
        height={18}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 19v-4h4l.001 4H15zm4-6h-4c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h4c1.103 0 2-.897 2-2v-4c0-1.103-.897-2-2-2zM5 19v-4h4l.001 4H5zm4-6H5c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h4c1.103 0 2-.897 2-2v-4c0-1.103-.897-2-2-2zm6-4V5h4l.001 4H15zm4-6h-4c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h4c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM5 9V5h4l.001 4H5zm4-6H5c-1.103 0-2 .897-2 2v4c0 1.103.897 2 2 2h4c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z"
          fill="#fff"
        />
      </mask>
      <g mask="url(#prefix__home)">
        <path fill="transparent" d="M0 0h24v24H0z" />
      </g>
    </svg>
  )
}

export default HomeIcon
