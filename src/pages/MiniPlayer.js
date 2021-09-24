import React, { useRef, useState } from 'react'
import classes from "../styles/MiniPlayer.module.css"
import ReactPlayer from 'react-player'

export default function MiniPlayer({ id, title }) {
    const buttonRef = useRef()
    const [status, setStatus] = useState(false)

    const videoID = `https://www.youtube.com/watch?v=${id}`

    function toggleMiniPlayer() {
        if (!status) {
            buttonRef.current.classList.remove(classes.floatingBtn)
            setStatus(true)
        } else {
            buttonRef.current.classList.add(classes.floatingBtn)
            setStatus(false)
        }
    }

    return (
        <div className={`${classes.miniPlayer} ${classes.floatingBtn}`} ref={buttonRef} onClick={toggleMiniPlayer}>
            <span className={`material-icons-outlined ${classes.open}`} > play_circle_filled </span>
            <span className={`material-icons-outlined ${classes.close}`} onClick={toggleMiniPlayer}> close </span>
            <ReactPlayer url={videoID} width='300px' height='168px' playing={status} className={classes.player} controls />

            <p>{title} </p>
        </div>
    )
}
