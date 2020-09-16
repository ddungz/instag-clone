import React from 'react'

const Profile = () => {
    return (
        <div style={{maxWidth: "980px", margin: "0px auto"}}>
            <div style={{
                display: "flex",
                justifyContent: "space-around",
                margin: "18px 0",
                borderBottom: "1px solid grey"
                }}>
                <div>
                    <img style={{width: "160px", height: "160px", borderRadius: "80px"}}  alt="" src="https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"/>
                </div>
                <div>
                    <h4>duydung d</h4>
                    <div style={{display: "flex", justifyContent: "space-between", width: "108%"}}>
                        <h6>40 posts</h6>
                        <h6>30 followers</h6>
                        <h6>20 following</h6>
                    </div>
                </div>
            </div>

            <div className="gallery">
                <img className="item" alt="" src="https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"/>
                <img className="item" alt="" src="https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"/>
                <img className="item" alt="" src="https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"/>
                <img className="item" alt="" src="https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"/>
                <img className="item" alt="" src="https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"/>
                <img className="item" alt="" src="https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"/>
            </div>
        </div>
    )
}

export default Profile