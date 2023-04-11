import { useState } from 'react';

function App() {
  const [url, setUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleLogoFetch = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:8080/logo?url=${url}`);
      const logoUrl = await response.text();
      setLogoUrl(logoUrl);
    } catch (error) {
      console.log(error);
      setLogoUrl('Cannot connect to server')
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Website Logo Harverster</h1>
      <label htmlFor="url-input">Enter website URL: </label>
      <input id="url-input" type="text" value={url} onChange={handleUrlChange} onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleLogoFetch();
        }
      }
        }/>
      <button onClick={handleLogoFetch}>Fetch Logo</button>
      {loading && <span>Loading...</span>}
      {<p>{logoUrl}</p>}
      <p>
        <img src={logoUrl} alt="Website logo" width={256}/>
      </p>
    </div>
  );
}

export default App;
