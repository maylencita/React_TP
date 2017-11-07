import * as React from 'react'

const APP_NAME = 'Chit Chat'

const messages = () => {
  return (
    <div className="container">
      <div className="sideBar">
        <div className="sideBar_title">
          <h1>{APP_NAME}</h1>
        </div>
        <div className="sideBar_channels">
          <h2 className="sideBar_channels_title">
            Channels <span className="addButton sideBar_channels_add">+</span>
          </h2>
          <div className="sideBar_channel sideBar_channels_link"># channel 1</div>
          <div className="sideBar_channel sideBar_channels_link"># channel 2</div>
        </div>  
      </div>
      <div className="homeContainer">
        TODO : display messages
      </div>  
    </div>
  )   
}

export default messages