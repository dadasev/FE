import React, { useState, useEffect } from 'react';
import youtube from '../../apis/youtube';
import axios from 'axios';
import SearchBar from '../SearchBar';
import VideoList from '../VideoList';
import VideoDetail from '../VideoDetail';
import Strings from '../../utils/strings.js';

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPageToken] = useState("");
  const [inputValue, setInputValue] = useState("buildings");
  
  const search = async (term, nextPageToken, isNewSearch) => {
    const { data } = await youtube.get('/search', {
      params: {
        q: term,
        pageToken: nextPageToken || ""
      }
    });
    if(isNewSearch){
      setVideos([]);
      setVideos(data.items);
    } else {
      setVideos(videos.concat(data.items));
    }
    setNextPageToken(data.nextPageToken);
  };

  const previewedVideoLogger = async ({id, snippet}) => {
    await axios.post(`${Strings.loggerAPIUrl}/previewedVideo`, {
      videoId: id.videoId,
      title: snippet.title,
      description: snippet.description
    })
    .then(() => {
      console.log('video was logged');
    }, (error) => {
      console.log(error);
    });
  };

  useEffect(()=>{
    search(inputValue);
  }, []);

  useEffect(()=>{
    window.addEventListener('scroll', loadMore);
    return () => window.removeEventListener('scroll', loadMore);
  });
  
  useEffect(() => {
    !!videos && setSelectedVideo(videos[0]);
  }, [videos]);

  const loadMore = async () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.scrollingElement.scrollHeight) {
        search(inputValue, nextPageToken);
    }
  };

  const onVideoSelect = video => {
    previewedVideoLogger(video);
    setSelectedVideo(video);
  }

  return (
    <div className="ui container">
      <SearchBar onFormSubmit={search} onInputValueChange={setInputValue} />
      <div className="ui stackable grid">
        <div className="ui row">
          <div className="ten wide column">
            <VideoDetail video={selectedVideo} />
          </div>
          <div className="six wide column">
            {videos.length > 0 && <VideoList
              onVideoSelect={onVideoSelect}
              videos={videos}
            />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
