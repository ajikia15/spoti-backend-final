$(document).ready(function () {
  async function fetchAlbumsByArtist(albums) {
    const $albumsList = $("#albumsList");
    $albumsList.empty();
    albums.forEach((album) => {
      const $listItem = $("<li>").text(album.name).addClass("cursor-pointer");
      $listItem.on("click", () => {
        fetchSongsByAlbum(album._id);
      });
      $albumsList.append($listItem);
    });
  }

  async function fetchSongsByAlbum(albumId) {
    try {
      const response = await fetch(`http://localhost:3000/albums/${albumId}`);
      const album = await response.json();
      console.log(response);
      const songs = album.songs;
      const $songsList = $("#songsList");
      $songsList.empty();
      songs.forEach((song) => {
        const $listItem = $("<li>").text(song.name).addClass("cursor-pointer");
        $songsList.append($listItem);
      });
      displaySongs(songs);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  }

  async function fetchAllArtists() {
    try {
      const response = await fetch("http://localhost:3000/artists/all");
      const artists = await response.json();
      const $artistsList = $("#artistList");
      $artistsList.empty();
      artists.forEach((artist) => {
        const $listItem = $("<li>")
          .text(artist.name)
          .addClass("cursor-pointer");
        $listItem.on("click", () => fetchAlbumsByArtist(artist.albums));
        $artistsList.append($listItem);
      });
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  }

  fetchAllArtists();

  $("#loginForm").submit(function (event) {
    event.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();
    loginUser(username, password);
  });

  $("#registerBtn").click(function (event) {
    event.preventDefault();
    const username = $("#username").val();
    const password = $("#password").val();
    registerUser(username, password);
  });

  async function loginUser(username, password) {
    const url = "http://localhost:3000/users/login";
    const data = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      console.log("Login successful:", jsonResponse);
      localStorage.setItem("token", jsonResponse.token);
      localStorage.setItem("username", username);
      location.reload();
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  async function registerUser(username, password) {
    const url = "http://localhost:3000/users/register";
    const data = {
      username: username,
      password: password,
      role: "user",
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      console.log("Registration successful:", jsonResponse);
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }
});
