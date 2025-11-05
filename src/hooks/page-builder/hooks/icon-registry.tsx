// src/editor/icons.tsx
import React from 'react'

// --- Fallback Icon ---
export const FallbackIcon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='h-6 w-6'
    fill='none'
    viewBox='0 0 24 24'
    stroke='currentColor'
    strokeWidth={2}
  >
    <path
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2 1M4 7l2-1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5'
    />
  </svg>
)

// --- Icon Registry ---
export const componentIcons: Record<string, React.ReactNode> = {
  ImageWithCaption: (
    <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='m22.7 14.3l-1 1l-2-2l1-1c.1-.1.2-.2.4-.2c.1 0 .3.1.4.2l1.3 1.3c.1.2.1.5-.1.7M13 19.9V22h2.1l6.1-6.1l-2-2zM21 5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h6v-1.9l1.1-1.1H5l3.5-4.5l2.5 3l3.5-4.5l1.6 2.1l4.9-5z'
      />
    </svg>
  ),
  container: (
    <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='M2 2v20h20V2m-2.88 17.03H4.87V5h14.26v14.03m-4.3-8.32h2.86v6.88h-2.86m0-11.18h2.86v2.86h-2.86M6.3 6.41v11.18h7.1v-2.87H9.17V9.28h4.23V6.41Z'
      />
    </svg>
  ),
  'spacer-horizontal': (
    <svg transform={'rotate(90)'} xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
      <path fill='currentColor' d='M2 3h6v2H4v14h4v2H2zm5 14v-2h2v2zm4 0v-2h2v2zm4 0v-2h2v2zm7-14v18h-6v-2h4V5h-4V3z' />
    </svg>
  ),
  ImageGrid: (
    <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='M20 18H4V6h16m0-2H4c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2m-8 6h-2v2h2m-4-2H6v2h2m8 2h-2v2h2m0-6h-2v2h2z'
      />
    </svg>
  ),
  ImageSection: (
    <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24'>
      <path
        fill='currentColor'
        d='M19 19H5V5h14m0-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m-5.04 9.29l-2.75 3.54l-1.96-2.36L6.5 17h11z'
      />
    </svg>
  ),
  hero: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='editor-icon'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
      />
    </svg>
  ),
  paragraph: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='editor-icon'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M4 6h16M4 12h16M4 18h7' />
    </svg>
  ),
  'paragraph-rich': (
    <svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16' />
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={3.5} d='M4 12h16' />
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 18h7' />
    </svg>
  ),
  features: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='editor-icon'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
    </svg>
  ),
  testimonial: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='editor-icon'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
      />
    </svg>
  ),
  table: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='editor-icon'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M3 10h18M3 14h18M3 6h18M3 18h18M8 3v18M16 3v18' />
    </svg>
  ),
  image: (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='editor-icon'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
      />
    </svg>
  ),
  'image-with-caption': (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='editor-icon'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
      />
      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 20h16v-2H4v2zm4-14h8' />
    </svg>
  ),
  'one-column': (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='editor-icon'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={2}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='M9 4v16m-6 0h18' />
    </svg>
  ),
  'two-column': (
    <svg
      fill='currentColor'
      version='1.1'
      id='Capa_3'
      width='64px'
      height='64px'
      viewBox='0 0 35 35'
      transform='rotate(90)'
      stroke='currentColor'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <g>
          {' '}
          <g>
            {' '}
            <rect y='19.52' width='35' height='15.48'></rect> <rect width='35' height='15.481'></rect>{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  ),
  'three-column': (
    <svg
      fill='currentColor'
      version='1.1'
      id='Capa_2'
      width='64px'
      height='64px'
      viewBox='0 0 35 35'
      transform='rotate(0)'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <g>
          {' '}
          <g>
            {' '}
            <path d='M0,0v35h35V0H0z M33,33H2V2h31V33z'></path> <rect x='4.5' y='4.5' width='7' height='26'></rect>{' '}
            <rect x='14' y='4.5' width='7' height='26'></rect> <rect x='23.5' y='4.5' width='7' height='26'></rect>{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  ),
  'four-column': (
    <svg fill='currentColor' version='1.1' id='Capa_1' width='64px' height='64px' viewBox='0 0 35 35'>
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <g>
          {' '}
          <g>
            {' '}
            <rect width='6.119' height='35'></rect> <rect x='9.615' width='6.133' height='35'></rect>{' '}
            <rect x='19.245' width='6.116' height='35'></rect> <rect x='28.873' width='6.127' height='35'></rect>{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  ),
  'two-column-35-65': (
    <svg
      fill='currentColor'
      version='1.1'
      id='Capa_3565'
      width='64px'
      height='64px'
      viewBox='0 0 35.00 35.00'
      transform='matrix(-1, 0, 0, 1, 0, 0)rotate(0)'
    >
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g
        id='SVGRepo_tracerCarrier'
        strokeLinecap='round'
        strokeLinejoin='round'
        stroke='currentColor'
        strokeWidth='0.21000000000000002'
      ></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <g>
          {' '}
          <g>
            {' '}
            <rect x='0' y='9.027' width='24.395' height='25.974'></rect>{' '}
            <rect x='27.577' width='7.424' height='35'></rect>{' '}
            <path d='M0,6.727h24.395V0H0V6.727z M2.122,2.125h20.152v2.478H2.122V2.125z'></path>{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  ),
  'two-column-65-35': (
    <svg fill='currentColor' version='1.1' id='Capa_6535' width='64px' height='64px' viewBox='0 0 35 35.001'>
      <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
      <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
      <g id='SVGRepo_iconCarrier'>
        {' '}
        <g>
          {' '}
          <g>
            {' '}
            <rect x='0' y='9.027' width='24.395' height='25.974'></rect>{' '}
            <rect x='27.577' width='7.424' height='35'></rect>{' '}
            <path d='M0,6.727h24.395V0H0V6.727z M2.122,2.125h20.152v2.478H2.122V2.125z'></path>{' '}
          </g>{' '}
        </g>{' '}
      </g>
    </svg>
  ),
  'three-latest-post': (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' className='editor-icon'>
      <path fill='currentColor' d='M3 3v18h18V3zm15 15H6v-1h12zm0-2H6v-1h12zm0-4H6V6h12z' />
    </svg>
  ),
  'four-latest-post': (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' className='editor-icon'>
      <path
        fill='currentColor'
        d='M16 9h5.5L16 3.5zM7 2h10l6 6v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2M3 6v16h18v2H3a2 2 0 0 1-2-2V6z'
      />
    </svg>
  ),
  'success-story': (
    <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' className='editor-icon'>
      <path
        fill='currentColor'
        d='m20 22.09l2.45 1.49l-.65-2.81l2.2-1.88l-2.89-.25L20 16l-1.13 2.64l-2.87.25l2.18 1.88l-.68 2.81zM14.08 21H2a2.074 2.074 0 0 1-2-2V5c.04-1.09.91-1.96 2-2h20c1.09.04 1.96.91 2 2v10.53c-.58-.53-1.25-.92-2-1.19V5H2v14h12.08c-.05.33-.08.66-.08 1s.03.68.08 1M14 17H4v-1.25c0-1.66 3.34-2.5 5-2.5s5 .84 5 2.5zm0-6h4v1h-4zM9 7C7.63 7 6.5 8.13 6.5 9.5S7.63 12 9 12s2.5-1.13 2.5-2.5S10.37 7 9 7m5 2h6v1h-6zm0-2h6v1h-6z'
      />
    </svg>
  ),
  YouTubeVideo: (
    <svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' className='editor-icon'>
      <path
        fill='currentColor'
        d='m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73'
      />
    </svg>
  )
}
