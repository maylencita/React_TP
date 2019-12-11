import * as React from 'react'

export function UserIcon (props: {userIcon: string}) {
  return (
    <div className="user_icon">{props.userIcon}</div>
  )
}

export function UserName (props: {userNickname: string}) {
  return (
    <div className="message_content_header">
      {props.userNickname}
    </div>
  )
}