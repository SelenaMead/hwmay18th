import React from 'react'

export const Trash = () => {
  return (
    <div className="row">
    <div className="col-md-12">
      <h1>Selena's trashed messages</h1>
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