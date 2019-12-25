import * as React from 'react'
import { Link } from 'react-router-dom'
import * as H from 'history';

interface LoginFormState {
  loginName: string
}

interface LoginFormProps {
  history: H.History
  onNewLogin: (name: string, h: H.History) => void
}

class NewLoginForm extends React.Component<LoginFormProps, LoginFormState> {

  state: LoginFormState = {
    loginName: ''
  }
  
  render() {
    return (
      <div className="newChannel">
        <div className="newChannel_content">
         
          <form onSubmit={this.handleAddLogin}>
            <h1>Create a login</h1>
            <label>Name</label>
            <div className="inputWrapper">
              <input 
                id="channelName" 
                placeholder="e.g. leads" 
                value={this.state.loginName}
                onChange={this.handleNameChange}
              />
            </div>
            <div className="newChannel_buttonsWrapper">
              <button className="cancel">Cancel</button>
              <button className="create">Create login</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

  handleNameChange = (event: any) => {
    this.setState({
      loginName: event.target.value
    })
  }

  handleAddLogin = (event: any) => {
    this.props.onNewLogin(this.state.loginName, this.props.history)
    event.preventDefault();
  }
}

export default NewLoginForm