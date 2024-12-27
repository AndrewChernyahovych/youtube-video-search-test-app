import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Preloader from "../../components/Preloader";
import { BASE_URL } from "../../utils/constants";

interface VideoDetails {
  title: string;
  videoId: string;
  description: string;
  publishedAt: string;
  viewCount: number;
  likeCount: number;
}

const VideoDetailPage: React.FC = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const navigate = useNavigate();
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${videoId}`, {
          method: 'GET',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: VideoDetails = await response.json();
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
      <button
        onClick={() => navigate(-1)}
        className="bg-blue-500 text-white p-2 rounded-md mb-4"
      >
        Back
      </button>
      {videoDetails ? (
        <>
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
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default VideoDetailPage;
