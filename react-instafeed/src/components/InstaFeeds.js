import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Feed from "./Feed";
import "./InstaFeeds.css";

function InstaFeeds({ token, ...props }) {

    const [feeds, setFeedsData] = useState([]);

    const tokenProp = useRef(token);
    tokenProp.current = token;

    useEffect(() => {

        const abortController = new AbortController();

        async function fetchInstagramPost(){
            try{
                axios
                    .get(`https://graph.instagram.com/me/media?fields=id,media_type,media_url,caption&limit=${props.limit}&access_token=${tokenProp.current}`)
                    .then((resp) => {
                        setFeedsData(resp.data.data)
                    })
            } catch (err){
                console.log('error', err);
            }
        }

        fetchInstagramPost();

        return() => {

            abortController.abort();
        };
    }, [props.limit])


    return (
        <div className="container">
            {feeds.map((feed) => (
                <Feed key={feed.id} feed={feed}/>
            ))}
        </div>
    )
}

export default InstaFeeds;
