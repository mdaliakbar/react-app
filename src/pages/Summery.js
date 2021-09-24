import React from 'react'
import successImage from '../assets/images/success.png'
import useFetch from '../hooks/useFetch'
import classes from '../styles/Summery.module.css'

export default function Summery({ score, noq }) {
    const getKeyword = () => {
        if ((score / (noq * 5)) * 100 < 50) {
            return "failed"
        } else if ((score / (noq * 5)) * 100 < 75) {
            return "good"
        } else if ((score / (noq * 5)) * 100 < 100) {
            return "very good"
        } else {
            return "excellent"
        }
    }
    const { error, loading, result } = useFetch(`https://api.pexels.com/v1/search?query=${getKeyword()}&per_page=1`, "GET",
        { Authorization: process.env.REACT_APP_PEXELS_API_KEY, }
    )
    const image = result ? result?.photos[0].src.medium : successImage;

    return (
        <div className={classes.summary}>
            <div className={classes.point}>
                <p className={classes.score}>
                    Your score is <br />
                    {score} out of {noq * 5}
                </p>
            </div>
            {loading && <div> loading... </div>}
            {error && <div> There was an error occured! </div>}
            {!loading && !error && (
                <div className={classes.badge}>
                    <img src={image} alt="Success" />
                </div>
            )}

        </div>
    )
}
