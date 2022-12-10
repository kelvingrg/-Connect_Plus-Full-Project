import React from 'react'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'
import TimeAgo from 'javascript-time-ago'
import ReactTimeAgo from 'react-time-ago'
TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

function TimeagoDate({timeStamp}) {
  return (
    <ReactTimeAgo date={timeStamp}  locale="en-US"/>
  )
}

export default TimeagoDate