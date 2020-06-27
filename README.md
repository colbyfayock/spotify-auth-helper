# Spotify Auth Helper
Helper app to grab an access and refresh token from your Spotify account using Oauth 

## Getting Started
* `yarn install`
* Configure environment (see below)
* `yarn develop`

The app should open at http://localhost:9000 unless configured otherwise

## Environment Configuration
**Note**: It's imporatnt that the `SPOTIFY_CLIENT` values do not get exposed publicly. The `.env` file is already in the `.gitignore`, but be sure any changes don't allow for those values to be stored in git.

You should include an `.env` file in the root of the project containing:
```
SPOTIFY_CLIENT_ID="[Spotify App Client ID]"
SPOTIFY_CLIENT_SECRET="[Spotify App Client Secret]"
SPOTIFY_REDIRECT_URI="[Spotify App Redirect URL]"

NEXT_PUBLIC_API_ENDPOINT="[Project API Endpoint]"
```

* **SPOTIFY_CLIENT_ID**: Obtained with an app via [developer.spotify.com](https://developer.spotify.com/)
* **SPOTIFY_CLIENT_SECRET**: Obtained with an app via [developer.spotify.com](https://developer.spotify.com/)
* **SPOTIFY_REDIRECT_URI**: Configured in an app via  [developer.spotify.com](https://developer.spotify.com/) - if running locally, this value should be `http://localhost:3000` unless the port is unavailable or you change it. You should see this printed in the terminal when running locally. You should additionally configure this as the redirect URI in the Spotify Developer app configuration.
* **NEXT_PUBLIC_API_ENDPOINT** This will be the active endpoint this project's functions are deployed or running from - if running locally, this value should be `http://localhost:9000` unless the port is unavailable or you change it. You should see this printed in the terminal when running locally.
