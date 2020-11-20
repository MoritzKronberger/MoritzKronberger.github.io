window.addEventListener("load", function () {

    import { Credentials } from './Credentials';

    let partUrl = "https://orion.apiseeds.com/api/music/lyric/";
    let apiKey = "?apikey=CZzFr94brr39VGSeVLAsRhoQECkYpKGwxp4zarnBhUkGaFWWwLYEuxvpLt7BoFyv";

    function httpGet(myUrl) {
        
        // create new http request
        var xhr = new XMLHttpRequest();

        // set up http request
        xhr.open("GET", myUrl, true); // true for asynchronous request
        xhr.onload = function (e) {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let songData = xhr.responseText;
                    console.log(songData);
                    //console.log(songData.result.artist.track.text);
                } else {
                    console.error(xhr.statusText);
                }
            }
        };

        xhr.onerror = function (e) {
            alert('Oops! Something went wrong. Please try again.' + xhr.statusText); // alert in case of error
        };

        xhr.send(null);
    }

    const form = document.getElementById("form");

    form.addEventListener("submit", function (event) {

        // initialize artist and track variables
        let artist = document.getElementById("artist");
        let track = document.getElementById("track");

        // concatenate the url
        let url = partUrl + artist.value + "/" + track.value + apiKey;

        // print values for debugging
        //console.log(artist.value);
        //console.log(track.value);
        //console.log(url);

        event.preventDefault();

        // pass url to request data of particular song
        httpGet(url);
    });
    
    // SPOTIFY API

    const App = () => {

      const spotify = Credentials();  
    
      console.log('RENDERING APP.JS');
    
      const data = [
        {value: 1, name: 'A'},
        {value: 2, name: 'B'},
        {value: 3, name: 'C'},
      ]; 
    
      const [token, setToken] = useState('');  
      const [genres, setGenres] = useState({selectedGenre: '', listOfGenresFromAPI: []});
      const [playlist, setPlaylist] = useState({selectedPlaylist: '', listOfPlaylistFromAPI: []});
      const [tracks, setTracks] = useState({selectedTrack: '', listOfTracksFromAPI: []});
      const [trackDetail, setTrackDetail] = useState(null);
    
      useEffect(() => {
    
        axios('https://accounts.spotify.com/api/token', {
          headers: {
            'Content-Type' : 'application/x-www-form-urlencoded',
            'Authorization' : 'Basic ' + btoa(spotify.ClientId + ':' + spotify.ClientSecret)      
          },
          data: 'grant_type=client_credentials',
          method: 'POST'
        })
        .then(tokenResponse => {      
          setToken(tokenResponse.data.access_token);
    
          axios('https://api.spotify.com/v1/browse/categories?locale=sv_US', {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + tokenResponse.data.access_token}
          })
          .then (genreResponse => {        
            setGenres({
              selectedGenre: genres.selectedGenre,
              listOfGenresFromAPI: genreResponse.data.categories.items
            })
          });
          
        });
    
      }, [genres.selectedGenre, spotify.ClientId, spotify.ClientSecret]); 
    
      const genreChanged = val => {
        setGenres({
          selectedGenre: val, 
          listOfGenresFromAPI: genres.listOfGenresFromAPI
        });
    
        axios(`https://api.spotify.com/v1/browse/categories/${val}/playlists?limit=10`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token }
        })
        .then(playlistResponse => {
          setPlaylist({
            selectedPlaylist: playlist.selectedPlaylist,
            listOfPlaylistFromAPI: playlistResponse.data.playlists.items
          })
        });
    
        console.log(val);
      }
    
      const playlistChanged = val => {
        console.log(val);
        setPlaylist({
          selectedPlaylist: val,
          listOfPlaylistFromAPI: playlist.listOfPlaylistFromAPI
        });
      }
    
      const buttonClicked = e => {
        e.preventDefault();
    
        axios(`https://api.spotify.com/v1/playlists/${playlist.selectedPlaylist}/tracks?limit=10`, {
          method: 'GET',
          headers: { 'Authorization' : 'Bearer ' + token }
        })
        .then(tracksResponse => {
          setTracks({
            selectedTrack: tracks.selectedTrack,
            listOfTracksFromAPI: tracksResponse.data.items
          })
        });
      }
    
      const listboxClicked = val => {
    
        const currentTracks = [...tracks.listOfTracksFromAPI];
    
        const trackInfo = currentTracks.filter(t => t.track.id === val);
    
        setTrackDetail(trackInfo[0].track);
    
      }
      
    }
});