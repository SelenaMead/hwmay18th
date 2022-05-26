import React from 'react'

export const Sent = () => {
  return (
    <div className="row">
    <div className="col-md-12">
      <h1>Selena's sent messages</h1>
      <form action="">
        <div className="row">
          <div className="col-md-10">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                name="messageBody"
                aria-describedby="helpId"
                placeholder="What do you want to say?"
              />
            </div>
          </div>
          <div className="col-md-2">
            <input className="btn btn-primary btn-block" type="submit" value="Send"/>
          </div>
        </div>
      </form>
      <hr />
      <ul className="list-group">
        <li className="list-group-item">
          <p>Message Body</p>
          <div>
            <small>
              &mdash; Selena Mead 
              <span className="float-right">12 seconds ago</span>
              </small>
          </div>
        </li>
      </ul>
    </div>
  </div>
  )
}