import React, { useEffect, useState, useRef } from "react";
import { Card, List, Button, Progress, Pagination } from "antd";
import moment from "moment";
import { DeleteOutlined, EditOutlined, HeartTwoTone } from "@ant-design/icons";
import {
  readAlbums,
  deleteAlbum,
  searchAlbums,
} from "../../redux/action/album";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate , Link} from "react-router-dom";

const AlbumListing = () => {
  const dispatch = useDispatch();
  const  navigate  = useNavigate(); 
  const [currentAudio, setCurrentAudio] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track playback status
  const audioRef = useRef(null); // Reference to the audio element
  const [audioProgress, setAudioProgress] = useState(0); // Progress in percentage
  const [audioDuration, setAudioDuration] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const albums = useSelector((state) => state.album.albums.data);
  const searchResults = useSelector((state) => state.album.searchResults);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  // Retrieve albums from Redux store
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedAlbums = (typeof searchResults === 'undefined' ? albums?.slice(startIndex, endIndex) : searchResults?.slice(startIndex, endIndex))


  useEffect(() => {
    dispatch(readAlbums());
  }, []);

  const handlePlayAudio = (audioUrl) => {
    if (currentAudio) {
      if (currentAudio.src === audioUrl) {
        if (currentAudio.paused) {
          currentAudio.play();
          setIsPlaying(true); // Update playback state
        } else {
          currentAudio.pause();
          setIsPlaying(false); // Update playback state
        }
      } else {
        currentAudio.pause();
        currentAudio.src = "";
        currentAudio.load();

        const audioElement = new Audio(audioUrl);
        audioElement.play();
        setCurrentAudio(audioElement);
        setIsPlaying(true); // Update playback state
      }
    } else {
      const audioElement = new Audio(audioUrl);
      audioElement.play();
      setCurrentAudio(audioElement);
      setIsPlaying(true); // Update playback state
    }
  };
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);

    if (minutes > 0) {
      return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    } else {
      return `${seconds}`;
    }
  };

  const handleDelete = async (albumId) => {
    try {
      // Call the deleteAlbum action with the albumId
      await dispatch(deleteAlbum(albumId));

      // After successful deletion, fetch the updated list of albums
      dispatch(readAlbums());
    } catch (error) {
      console.log(error);
    }
  };
  const updateProgress = () => {
    if (currentAudio) {
      const currentTime = currentAudio.currentTime;
      const duration = currentAudio.duration;
      if (!isNaN(currentTime) && !isNaN(duration)) {
        const progress = (currentTime / duration) * 100;
        setAudioCurrentTime(progress);
        setAudioDuration(duration);
      }
    }
  };
  useEffect(() => {
    if (currentAudio) {
      currentAudio.addEventListener("timeupdate", updateProgress);
    }
    return () => {
      if (currentAudio) {
        currentAudio.removeEventListener("timeupdate", updateProgress);
      }
    };
  }, [currentAudio]);
  const searchHandle = async (e) => {
    const searchdata = e.target.value;

    if (searchdata) {
      // Dispatch the searchAlbums action with the search query
      dispatch(searchAlbums(searchdata));
    } else {
      // If the search query is empty, fetch all albums
      dispatch(readAlbums());
    }
  };
  return (
    <div className="album-list">
      <div className="albumList">
        <h2>Album List</h2>
        <input
          type="text"
          placeholder="enter your search item"
          className="searchalbumbox"
          onChange={searchHandle}
        />
      </div>

      <div className="list-spinner">
        {displayedAlbums?.length > 0 ? (
          <>
            <List
            style={{maxWidth:"100%"}}
              grid={{ gutter: 20, column: 5 }}
              dataSource={displayedAlbums}
              renderItem={(
                albumItem,
                index // Add index here
              ) => (
                <List.Item>
                <Card
                  title={albumItem.title}
                  cover={
                    <img
                    className='coverImage'
                      alt={albumItem.title}
                      src={`http://localhost:5000/${albumItem.coverImage}`}
                    />
                  }
                >
                  <div className="buttonGroup-icons">
                  <Button type="danger" onClick={() => handleDelete(albumItem?._id)}>
                    <DeleteOutlined />
                  </Button>
                  <Button
                    type="primary"
                    onClick={() =>
                      handlePlayAudio(
                        `http://localhost:5000/${albumItem.audioFile}`
                      )
                    }
                  >
                    {currentAudio &&
                    currentAudio.src ===
                      `http://localhost:5000/${albumItem.audioFile}` &&
                    isPlaying
                      ? "Pause"
                      : "Play MP3"}
                  </Button>
                  <Link to={"/updatealbum/"+albumItem._id}>
                  <Button type="danger">
                    <EditOutlined />
                  </Button>
                  </Link>
                  <Button type="danger">
                  <HeartTwoTone twoToneColor="#eb2f96" />
                  </Button>
                  
                  </div>
                  <h4>Produced By: {albumItem.artist}</h4>
                  <h4>Release Date: {moment(albumItem.releaseDate).format('DD-MM-YYYY')}</h4>

                  {isPlaying &&
                    currentAudio &&
                    currentAudio.src ===
                      `http://localhost:5000/${albumItem.audioFile}` && (
                      <div>
                        <p>
                          {formatTime(audioCurrentTime)} /{" "}
                          {formatTime(audioDuration)}
                        </p>
                      </div>
                    )}
                </Card>
              </List.Item>
              )}
            />
          </>
        ) : (
          <h4>No Albums Found</h4>
        )}
        <audio
          ref={audioRef}
          onTimeUpdate={updateProgress}
          onEnded={() => setIsPlaying(false)}
          onLoadedMetadata={updateProgress}
        />
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={albums?.length || 0}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default AlbumListing;
