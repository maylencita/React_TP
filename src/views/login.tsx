import * as React from 'react'
import { Link } from 'react-router-dom'
import * as H from 'history';

interface LoginFormState {
  userName: string
}

interface LoginFormProps {
  history: H.History
  onLogin: (name: string) => void
}

class LoginForm extends React.Component<LoginFormProps, LoginFormState> {

  state: LoginFormState = {
    userName: ''
  }
  
  render() {
    return (
      <div className="newChannel">
        <div className="newChannel_content">
          <Link to="/" className="newChannel_close"> <span>X</span> </Link>
          <form onSubmit={this.handleLogin}>
            <h1>Please Login</h1>
            <label>Your name</label>
            <div className="inputWrapper">
              <input 
                id="userName" 
                placeholder="e.g. leads" 
                value={this.state.userName}
                onChange={this.handleNameChange}
              />
            </div>
            <div className="newChannel_buttonsWrapper">
              <button className="cancel">Cancel</button>
              <button className="create">Create channel</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  handleNameChange = (event: any) => {
    this.setState({
      userName: event.target.value
    })
  }

  handleLogin = (event: any) => {
    this.props.onLogin(this.state.userName)
    this.props.history.push('/messages/general')
    event.preventDefault();
  }
}

export default LoginForm