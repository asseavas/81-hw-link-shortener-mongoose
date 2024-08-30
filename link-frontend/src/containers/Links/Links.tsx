import { useState } from 'react';
import LinkForm from '../../components/LinkForm/LinkForm';
import axiosApi from '../../axiosApi';
import './links.css';

const Links = () => {
  const [shortUrl, setShortUrl] = useState<string | null>(null);

  const shortenLinkSubmit = async (data: { originalUrl: string }) => {
    try {
      const response = await axiosApi.post('/links', data);
      setShortUrl(response.data.shortUrl);
    } catch (error) {
      console.error('Failed to shorten the URL:', error);
    }
  };

  return (
    <div className="page">
      <h1 className="header">Shorten your link</h1>
      <LinkForm onSubmit={shortenLinkSubmit} />
      {shortUrl && (
        <div className="result">
          <p>Your shortened link:</p>
          <a
            href={`http://localhost:8000/${shortUrl}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`http://localhost:8000/${shortUrl}`}
          </a>
        </div>
      )}
    </div>
  );
};

export default Links;
