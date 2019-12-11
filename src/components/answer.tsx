import * as React from 'react'

interface AnswerProps {
  userIcon: string,
  userNickName: string,
  answerText: string
}

const answer = (props: AnswerProps) => {
  return (
    <div className="answer">
      <div className="answer_gutter">
        <div className="user_icon"> {props.userIcon} </div>
      </div>
      <div className="answer_content">
        <div className="answer_header">{props.userNickName}</div>
        <div className="answer_text">
          {props.answerText}
        </div>
      </div>
      <div className="message_buttons">
        <span className="message_buttons_points">3</span>
        <span className="message_buttons_addPoints">+1</span>
      </div>
    </div>    
  )
}

export default answer