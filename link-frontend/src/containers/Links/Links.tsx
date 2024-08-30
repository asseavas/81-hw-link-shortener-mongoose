import { useState } from 'react';
import LinkForm from '../../components/LinkForm/LinkForm';
import axiosApi from '../../axiosApi';
import './links.css';

const Links = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const createShortUrl = async (data: { originalUrl: string }) => {
    try {
      const response = await axiosApi.post('/links', data);
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Failed to shorten the URL:', error);
    }
  };

  return (
    <div className="links-container">
      <h1 className="title">Shorten Your Link</h1>
      <LinkForm onSubmit={createShortUrl} />
      {shortUrl && (
        <div className="short-url-container">
          <p className="text">Your shortened link is:</p>
          <a
            href={`http://localhost:8000/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="short-url-link"
          >
            {`http://localhost:8000/${shortUrl}`}
          </a>
        </div>
      )}
    </div>
  );
};

export default Links;
