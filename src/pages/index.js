import { useState, useEffect } from 'react';
import axios from 'axios';

import { urlParamByName } from '../lib/location';

const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function Index() {
  const [code, setCode] = useState();
  const [tokens, setTokens] = useState();

  // When the page loads, look to see if hte URL includes the code.
  // If it does, set it in state to use it for subequent auth

  useEffect(() => {
    const paramCode = urlParamByName({
      url: window.location.href
    });
    setCode(paramCode);
  }, []);

  /**
   * handleOnLogin
   * @description Fetches the Spotify login URL and redirects the browser to that address
   */

  async function handleOnLogin({ scope }) {
    const { data = {} } = await axios({
      method: 'post',
      url: `${apiEndpoint}/login`,
      data: {
        scope
      }
    });

    const { message } = data;

    window.location = message;
  }

  /**
   * handleOnFetchToken
   * @description Fetches the Spotify login URL and redirects the browser to that address
   */

  async function handleOnFetchToken() {
    const { data: responseData = {} } = await axios({
      method: 'post',
      url: `${apiEndpoint}/token`,
      data: {
        code
      }
    });

    const { data = {} } = responseData;

    setTokens({
      accessToken: data?.access_token,
      refreshToken: data?.refresh_token,
      scope: data?.scope
    });
  }

  /**
   * handleSubmitLogin
   */

  function handleSubmitLogin(e) {
    e.preventDefault();
    const { currentTarget } = e;
    const scope = Array.from(currentTarget.elements).find(({name}) => name === 'scope')?.value;

    handleOnLogin({
      scope
    });
  }

  /**
   * handleSubmitToken
   */

  function handleSubmitToken(e) {
    e.preventDefault();

    handleOnFetchToken();
  }

  return (
    <div className="app">
      <style jsx>{`
        .app {
          font-family: sans-serif;
        }
        .app label {
          display: block;
        }
      `}</style>
      <h1>Spotify Authorization Helper</h1>
      <h2>Get a Code</h2>
      {code && (
        <ul>
          <li>
            <strong>Code</strong>:
            <code>
              <pre>{code}</pre>
            </code>
          </li>
        </ul>
      )}
      <form onSubmit={handleSubmitLogin}>
        <p>
          <label>Scope</label>
          <input type="text" name="scope" />
        </p>
        <p>
          <button>
            { code ? 'Re-Login' : 'Login' }
          </button>
        </p>
      </form>
      {code && (
        <>
          <h2>Get a Token</h2>
          { tokens && (
            <ul>
              <li>
                <strong>Access Token</strong>:
                <code>
                  <pre>{tokens?.accessToken}</pre>
                </code>
              </li>
              <li>
                <strong>Refresh Token</strong>:
                <code>
                  <pre>{tokens?.refreshToken}</pre>
                </code>
              </li>
              <li>
                <strong>Scope</strong>:
                <code>
                  <pre>{tokens?.scope}</pre>
                </code>
              </li>
            </ul>
          )}
          <form onSubmit={handleSubmitToken}>
            <p>
              <button>
                { tokens ? 'Get a New Token' : 'Get a Token' }
              </button>
            </p>
          </form>
        </>
      )}
    </div>
  );
}

