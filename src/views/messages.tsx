import * as React from 'react'
import Layout from '../layout'

import QuestionBlock from '../components/question'
import MessageInput from '../components/messageInput'
import { Channel, Question } from '../models'

interface MessagesProps {
  appName: string,
  onSync: () => void
  channel: Channel
  channels: Array<Channel>
  //activeChannel: Channel
  activeQuestion?: Question
  onQuestionAsked: (channelId: string, question: string) => void
  onQuestionAnswered: (channelId: string, questionId: string, content: string) => void
  toggleAnswerMode: (q: string) => void
  addP: (q: Question) => void
}

interface MessagesState {
  currentMessage: string
}

class Messages extends React.Component<MessagesProps, MessagesState> {

  state: MessagesState = {
    currentMessage: ''
  }

  render(){
    return (
      <Layout {...this.props} onSync={this.props.onSync} activeChannel={this.props.channel}>
        <div className="messages_container">
          <div className="messages_body">
            <div className="message_list_scroll">
              {
                this.props.channel.questions &&
                this.props.channel.questions.map((question, index) => this.renderQuestion(question, index))
              }                      
            </div>
          </div>
          <footer className="messages_footer">
            <form onSubmit={this.props.activeQuestion ? this.sendAnswer:this.sendMessage}>
           
              <MessageInput placeholder={this.props.activeQuestion ? "Answer to #Question" : "Ask a question on #Channel"} value={this.state.currentMessage} onChange={this.updateQuestion} />
            </form>
            <div className="messagesContainer_notifBar" />
          </footer>
        </div>
      </Layout>
    )   
  }

  updateQuestion = (currentMessage: string) => {
    this.setState({ currentMessage });
  }

  sendMessage = (event: any) => {
    event.preventDefault();
    this.props.onQuestionAsked(this.props.channel.name, this.state.currentMessage)
    this.state.currentMessage = ""
    console.log("send message")
  }
  sendAnswer = (event: any) => {
    event.preventDefault();
    const idd = this.props.activeQuestion;
    console.log(idd)
    if(idd){
      this.props.onQuestionAnswered(this.props.channel.name, idd.id, this.state.currentMessage)
      this.state.currentMessage = ""
    }

    console.log("send answer")
  }
  

  renderQuestion = (question: Question, index: number) => {
    return <QuestionBlock addP={this.props.addP} question={question} key={index} toggleAnswerMode={this.props.toggleAnswerMode} />
  }
}

export default Messages
