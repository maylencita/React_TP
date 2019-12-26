import * as React from 'react'

import AnswerComponent from './answer'
import { UserIcon } from './user'
import { Question, Answer } from '../models';

interface QuestionProps {
  question: Question
  toggleAnswerMode: (q: string) => void
  addP: (question: Question) => void
}

interface QuestionState {
  points: number
}

class QuestionComponent extends React.Component<QuestionProps, QuestionState> {
  state: QuestionState = {points: this.props.question.note? this.props.question.note : 0}

  render() {
    return (
      <div className="message">
        <div className="message_gutter">
          <UserIcon userIcon={this.props.question.user.avatar || '[...]'} />
        </div>
        <div className="message_content">
          <div className="message_content_header">
            {this.props.question.user.name}
          </div>
          <div className="message_content_body">
            <div className="message_content_question"> 
              <div className="question_text">
                {this.props.question.content}
              </div>
            </div>
            <div className="message_content_answers">
              {
                this.props.question.answers.map(this.renderAnswer)
              }
            </div>
          </div>
        </div>    
        <div className="message_buttons">
            <span className="message_buttons_points">{this.props.question.note ?this.props.question.note: 0 }</span>
          <button className="message_buttons_addPoints" onClick={this.addPoints}>+1</button>
          <span className="question_buttons_answer" onClick={this.toggleAnswerMode}>A</span>
        </div>
      </div>  
    )
  }  

  addPoints = () => {
    console.log(this.props.question)
    if(this.props.question.note && this.props.question.note<5){
      this.setState(
        {points: this.state.points+1}
        );
      this.props.addP(this.props.question);
    }
    else{
      if(this.state.points<5){
        this.setState(
          {points: this.state.points+1}
          );
        this.props.addP(this.props.question);
  
      
        }
    }




   
    
  }

  renderAnswer = (answer: Answer, index: number) => (
    <AnswerComponent userNickName={answer.user.name} userIcon={answer.user.avatar ? answer.user.avatar: ":x"} answerText={answer.content} key={index} />
  )

  toggleAnswerMode = () => {
    this.props.toggleAnswerMode(this.props.question.id)
    console.log("toogle")
  }

}

export default QuestionComponent;
