/* eslint-disable react/prop-types */
import randomColor from '@/utils/colorRandomizer'
import React, { useMemo } from 'react'

function CommentItem({comment}) {
    const colorValue = useMemo(()=>
    randomColor()
  ,[])
  return (
    <div
    className="rounded-lg px-3 py-1 flex gap-2 flex-wrap"
  >
    <p
      className={`text-sm font-semibold`}
      style={{ color: `${colorValue}` }}
    >
      {comment.username} :{" "}
      <span className="font-normal text-white">
        {comment.comment}
      </span>
    </p>
  </div>
  )
}

export default CommentItem
