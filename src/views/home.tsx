import * as React from 'react'

import Layout from '../layout'
import Input from '../components/messageInput'
import { User, Channel } from '../models'

interface HomeProps {
  user?: User,
  appName: string,  
  serverStatus: string
  channels: Array<Channel>
  onUpdateUser: (user: User) => void
  history: any
  onSync:() => void 
}

type HomeState = {
  name: string,
  avatar?: string  
};

const avatars = [':)', '*_*', '^_^', '^_^\'', '-_-', '--\'', '[-_-]']

class home extends React.Component<HomeProps, HomeState> {
  state: HomeState = this.props.user ? {...this.props.user} : {
    name: '',
    avatar: avatars[0]
  }

  render() {
    return (
      <Layout {...this.props} onSync={this.props.onSync} activeChannel={this.props.channels[0]}>
        <div className="homeView">
          <form onSubmit={this.updateUser}>
            <h3> WELCOME TO {this.props.appName} </h3>

            <h2>What is your name ?</h2>
            <Input placeholder="your name" className="name" value={this.state.name} onChange={this.changeUserName} />

            <h3>Please choose an avatar</h3>
            <select id="avatar" onChange={this.changeAvatar} value={this.state.avatar}>
              {avatars.map((av, i) => <option value={av} key={i}>{av}</option>)}
            </select>

            <div className="home_buttonsWrapper">
              <button type="submit">Let's Go!</button>
            </div>
          </form>
        </div>
      </Layout>
    )
  }

  updateUser = (event: any) => {
    event.preventDefault();
    
    this.props.onUpdateUser(this.state);
    this.props.history.push('/messages/general');
  }

  changeUserName = (name: string) => {
    this.setState({
      name
    })
  }

  changeAvatar = (event: any) => {
    this.setState({
      avatar: event.target.value
    })
  }

}

export default home