import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useParams
} from 'react-router-dom'
import * as H from 'history';

import './index.css';
import Home from './views/home'
import Messages from './views/messages'
import NewChannel from './views/newChannel'
import NewLogin from './views/newLogin'

import { Channel, DefaultChannel, User, DefaultUser, Question, Answer } from './models'
import { AnyARecord } from 'dns';
import ChatService from './httpService';


const chatService = new ChatService()

interface AppState {
  users: Array<User>
  channels: Array<Channel>
  serverStatus: string
  user?: User
  activeChannel: Channel
  activeQuestion: Question //@Todo
}

interface AppProps {
  appName: string
}

class App extends React.Component<AppProps, AppState> {

  


  // private timerID: NodeJS.Timer | number

  state: AppState = {
    users: [DefaultUser],
    channels: [DefaultChannel],
    serverStatus: 'Up'
  } as AppState

  render() {
    return(
      <Router>
        <div className="app">
          <Switch>
          
            <Route path="/messages/:channelId" children={<this.MessagesRoute />} />
                        
            <Route path="/newChannel" >
              <NewChannel onNewChannel={ this.addChannel }/>
            </Route>
            <Route path="/addUser" children={ this.HomeRoute } />  
            <Route path="/" children={this.NewLoginRoute} />
                        
          </Switch>
        </div>
      </Router>
    )
  }

  MessagesRoute = () => {
    let { channelId } = useParams();
    let channel = (channelId && this.state.channels.find(c => c.name === channelId)) || this.state.channels.find(c => c.name === 'general');
    
    if (channel){
      this.state.activeChannel = channel
      return <Messages activeQuestion={this.state.activeQuestion} onQuestionAsked={this.addQuestion} onQuestionAnswered={this.answerQuestion} channel={ channel } toggleAnswerMode={this.toggleAnswerMode} {...this.props} {...this.state}/>
    }
    else return null;
  }

  NewChannelRoute = (props: { history: H.History}) => {
    return <NewChannel onNewChannel={this.addChannel} {...props} />
  }
  NewLoginRoute = (props: { history: H.History}) => {
    return <NewLogin history={props.history} onNewLogin={this.addLogin} {...props} />
  }

  HomeRoute = (props: { history: H.History}) => {
    return <Home onUpdateUser={this.setUser} {...this.props} {...props} {...this.state} />
  }

  setUser = (user: User) => {
    console.log("setUser")
    //let existingUser = this.state.users.find(u => u.name === user.name)
    //let users = !existingUser ? [ ...this.state.users,  user] : this.state.users;
    chatService.addUser(user)
    .then((users)=>{
      console.log(users)
      this.setState({
        users
      })
      this.state.users = users
    })
    .catch((err)=>console.log(err))
    
  }
 

  addChannel = (channelName: string) => {    
    const nouvelle = {name: channelName, questions: [] as Question[]}
    this.setState({
      channels: [...this.state.channels, nouvelle]
    })
    
  } 
  addLogin = (login: string, h: H.History) => {
    chatService.loginUser(login).then(
      (state)=>{
        console.log(state)
        this.setState(state)
      }
    )
    .catch((err)=>console.log(err))
    if(this.state.user && this.state.user.name===login){
      console.log("connected")
      h.push('/messages/general')
    }
    else{
      alert("Unknown user")
    }
  }

  addQuestion = (channelId: string, questionText: string) => {
    const user = this.state.user ? this.state.user: {name:"Anonymous"}
    const idd = this.state.channels.filter(h=> h.name === channelId)[0].questions.length +1
    const q: Question = {id:""+idd , user: user, content: questionText, answers:[] as Answer[]}
    this.state.channels.filter(h => h.name === channelId).map(l=> l.questions.push(q));
    this.setState({
      channels: this.state.channels
    }
      
      
    )
  }

  answerQuestion = (channelId: string, questionId: string, content: string) => {
    
   
    const user = this.state.user ? this.state.user: {name:"Anonymous"}
    const answer: Answer = {user: user, content: content}

    this.state.channels.filter(h => h.name === channelId).map(ch=>{
      
      ch.questions.filter(q=>q.id === questionId).map(a=>a.answers.push(answer))})
    console.log(this.state.channels)
    this.setState({
      channels: this.state.channels
    }
      
      
    )
  }

  toggleAnswerMode = (activeQuestion: string) => {
    console.log("toogle app")
    if(this.state.activeQuestion){

      delete this.state.activeQuestion
      this.setState({
        activeQuestion: this.state.activeQuestion
      })
    }
    else{ 
      const q= this.state.activeChannel.questions.find(h => h.id ===activeQuestion)
      if (q){
        console.log(q)
        this.setState({
          activeQuestion: q
        })
      }
    }

  }
}

export default App;
