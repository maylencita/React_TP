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
import { Channel, DefaultChannel, User, DefaultUser } from './models'

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
            <Route path="/messages/:channelId" children={<this.MessagesRoute />} />              
            <Route path="/newChannel" >
              <NewChannel onNewChannel={ this.addChannel }/>
            </Route>
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
      return <Messages onQuestionAsked={this.addQuestion} onQuestionAnswered={this.answerQuestion} channel={ channel } toggleAnswerMode={this.toggleAnswerMode} {...this.props} {...this.state}/>
    else return null;
  }

  NewChannelRoute = (props: { history: H.History}) => {
    return <NewChannel onNewChannel={this.addChannel} {...props} />
  }

  HomeRoute = (props: { history: H.History}) => {
    return <Home onUpdateUser={this.setUser} {...this.props} {...props} {...this.state} />
  }

  setUser = (user: User) => {
    let existingUser = this.state.users.find(u => u.name === user.name)
    let users = !existingUser ? [ ...this.state.users,  user] : this.state.users;

    this.setState({ user, users})
  }

  addChannel = (channelName: string) => {    
    //@TODO
  } 

  addQuestion = (channelId: string, questionText: string) => {
    //@TODO
  }

  answerQuestion = (channelId: string, questionId: string, content: string) => {
    //@TODO
  }

  toggleAnswerMode = (activeQuestion: string) => {
    //@TODO
  }
}

export default App;
