let clientID = 'a23551dc93714075ac0336483e673b14';
let clientSecret = '8acdeb39978c450aa3c73344284cf26b';

// copied from get access token function
let accessToken = 'BQDJUIrSd3vU13ZEAKaoqPX9YmY2-2--pg3ll4fTCv3YSxnQ-e2336-XiCxlkRh1RTez1cIWmikdUUgE-UA';
let url;

let artist='survivor';
let trackName;

function setup(){
    console.log(accessToken);
    searchForTrack();
};


function searchForTrack(){
    url = 'https://api.spotify.com/v1/search?q=' + artist + '&type=artist';
    getAPIData(function(results){
        console.log(results);
    });
}

function getAPIData(callback) {
    if (!accessToken) {
      throw "Can't do an API call without an access token!";
    }
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.setRequestHeader("Authorization", "Bearer " + accessToken);
    request.addEventListener("load", function() {
      callback(JSON.parse(this.responseText));
    });
    request.send();
  }

/*
function getAccessToken(callback) {
    var url = "https://accounts.spotify.com/api/token";
    // XMLHttpRequest is a way of doing a very customizable API call
    // You almost never need it
    var request = new XMLHttpRequest();
    request.open("POST", url, true);
    // The line below has our permanent password
    request.setRequestHeader("Authorization", "Basic " + btoa(clientID + ':' + clientSecret));
    request.setRequestHeader("content-type", "application/x-www-form-urlencoded");
    request.addEventListener("load", function() {
        console.log(JSON.parse(this.responseText));
        callback(this.responseText);
    });
    request.send("grant_type=client_credentials");
  }*/