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
import Login from './views/login'
import { Channel, DefaultChannel, User, DefaultUser, Question, Answer } from './models'
import ChatService from './httpService';

const chatService = new ChatService()

interface AppState {
  users: Array<User>
  channels: Array<Channel>
  serverStatus: string
  user?: User
  // activeChannel: Channel //@Todo
  // activeQuestion: Question //@Todo
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
            <Route path="/messages/:channelId" children={ < this.MessagesRoute /> } />              
            <Route path="/newChannel" >
              <NewChannel onNewChannel={ this.addChannel }/>
            </Route>
            <Route path="/login" children={ this.LoginRoute } />
            <Route path="/addUser" children={this.AddUserRoute} />
            <Route path="/" children={ this.HomeRoute } />              
          </Switch>
        </div>
      </Router>
    )
  }

  MessagesRoute = () => {
    let { channelId } = useParams();
    let channel = (channelId && this.state.channels.find(c => c.name === channelId)) || this.state.channels.find(c => c.name === 'general');

    if (channel)
      return <Messages onSync={this.handleSync} onQuestionAsked={this.addQuestion} onQuestionAnswered={this.answerQuestion} channel={ channel } toggleAnswerMode={this.toggleAnswerMode} {...this.props} {...this.state}/>
    else return null;
  }

  HomeRoute = () => {
    let channel = this.state.channels.find(c => c.name === 'general')
    if (channel)
      return <Messages onSync={this.handleSync} onQuestionAsked={this.addQuestion} onQuestionAnswered={this.answerQuestion} channel={ channel } toggleAnswerMode={this.toggleAnswerMode} {...this.props} {...this.state}/>    
    else return null;
  }

  NewChannelRoute = (props: { history: H.History}) => {
    return <NewChannel onNewChannel={this.addChannel} {...props} />
  }

  LoginRoute = (props: { history: H.History }) => {
    return <Login onLogin={this.handleLogin} history={props.history} />
  }

  AddUserRoute = (props: { history: H.History}) => {
    return <Home onUpdateUser={this.addUser} onSync={this.handleSync} {...this.props} {...props} {...this.state} />
  }

  addUser = (user: User) => {
    chatService.addUser(user)
    .then(users => this.setState({users}))
    .catch(error => alert(`Could not create user: ${error.error}`))
  }

  addChannel = (channelName: string) => {    
    let newChannel = {name: channelName, questions: [] as Question[]}
    this.setState((state) => ({
      channels: [...state.channels, newChannel]
    }))
  } 

  addQuestion = (channelId: string, questionText: string) => {
    let updateChannel = (id: string, user: User, channel: Channel) => ({
      ...channel, 
      questions: [...channel.questions, {
        id, 
        user, 
        content: questionText, 
        answers: [] as Answer[]
      }]
    })

    let channel = this.state.channels.find(c => c.name === channelId)

    if(channel && this.state.user){
      let user = this.state.user
      let id: string = `q${channel.questions.length + 1}`
      let updatedChannels: Channel[] = this.state.channels.map(channel => {
        return channel.name === channelId ? updateChannel(id, user, channel) : channel
      })  

      this.setState({
        channels: updatedChannels
      })  
    }
  }

  handleLogin = (userName: string) => {
    chatService.loginUser(userName)
    .then(this.updateState)
    .catch(err => alert(`Oops ${err.error}`))
  }

  updateState = (state: AppState) => {
    this.setState(state)
  }

  updateChannels = (channels: Array<Channel>) => {
    this.setState(state => ({
      channels
    }))
  }

  handleSync = () => {
    chatService.syncChannels()
    .then(this.updateChannels)
  }

  answerQuestion = (channelId: string, questionId: string, content: string) => {
    //@TODO
  }

  toggleAnswerMode = (channelId: string, activeQuestion: string) => {
    //@TODO
  }
}

export default App;
