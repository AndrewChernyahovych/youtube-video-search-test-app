import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Preloader from "../../components/Preloader";

const VideoDetailPage = () => {
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`https://ec3e-91-245-79-242.ngrok-free.app/api/video/${videoId}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVideoDetails(data);
      } catch (error) {
        setError("Error fetching video details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="video-detail">
      <h1 className="text-2xl font-bold">{videoDetails.title}</h1>
      <iframe
        className="w-full h-64 md:h-96"
        src={`https://www.youtube.com/embed/${videoDetails.videoId}`}
        title={videoDetails.title}
        allowFullScreen
      ></iframe>
      <p className="mt-4 text-gray-700">{videoDetails.description}</p>
      <p className="mt-2 text-sm text-gray-500">
        Published on: {new Date(videoDetails.publishedAt).toLocaleDateString()}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Views: {videoDetails.viewCount}
      </p>
      <p className="mt-2 text-sm text-gray-500">
        Likes: {videoDetails.likeCount}
      </p>
    </div>
  );
};

export default VideoDetailPage;
