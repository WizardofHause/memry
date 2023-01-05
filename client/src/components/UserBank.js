import React, { useState, useEffect } from 'react';
import UserMemories from './UserMemories'
import UserComments from './UserComments'
import ProfileDetails from './ProfileDetails'

export default function UserBank() {
    const [currentUser, setCurrentUser] = useState(false)
    const [memories, setMemories] = useState([])
    const [comments, setComments] = useState([])
    const [userProfile, setUserProfile] = useState(false)

    const updateUser = (user) => setCurrentUser(user)

    useEffect(() => {
        fetch('/authorized_user')
            .then((res) => {
                if (res.ok) {
                    res.json()
                        .then((user) => {
                            updateUser(user)
                            setUserProfile(user.user_profile)
                            setComments(user.comments)
                            setMemories(user.memories)
                        })
                }
            })
    }, [])

    const sortedMemories = (memories.slice(0).sort((a, b) => a.date.localeCompare(b.date))).reverse()

    const userMemories = sortedMemories.map(memory => {
        return (
            <UserMemories
                key={memory.created_at}
                memory={memory}
            />
        )
    })

    const userComments = comments.map(comment => {
        return (
            <UserComments
                key={comment.created_at}
                comment={comment}
            />
        )
    })

    return (
        <div class='ml-20'>
            <h1>{currentUser.name}'s Profile</h1>
            <ProfileDetails
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                currentUser={currentUser}
            />

            <h2>{currentUser.name}'s Memry's</h2>
            {memories.length > 0 ?
                <div className='tl-container'>
                    {userMemories}
                </div>
                : <p>Nothing Here! Create some Memry's, ya dinker doink!</p>}

            <h2>{currentUser.name}'s Comments</h2>
            {comments.length > 0 ?
                <div className='comments-container'>
                    {userComments}
                </div>
                : <p>Nothing Here! Comment on some shit, ya dinker doink!</p>}
        </div>
    )
}