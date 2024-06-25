$(document).ready(function () {
  // Form Toggle Handlers
  $("#addArtist").click(() => $("#addArtistForm").toggle());
  $("#addAlbum").click(() => $("#addAlbumForm").toggle());
  $("#addSong").click(() => {
    $("#addSongForm").toggle();
    fetchAllAlbums(); // Fetch albums when toggling the add song form
  });

  // Fetch and Display Artists, Albums, and Songs
  async function fetchAllArtists() {
    try {
      const response = await fetch("http://localhost:3000/artists/all");
      const artists = await response.json();
      populateArtistsList(artists);
      populateArtistSelect(artists);
    } catch (error) {
      console.error("Error fetching artists:", error);
    }
  }

  function populateArtistsList(artists) {
    const $artistsList = $("#artistList");
    $artistsList.empty();
    artists.forEach((artist) => {
      const $listItem = $("<li>")
        .text(artist.name)
        .addClass("cursor-pointer")
        .data("artistId", artist._id);

      const $closeBtn = $("<span>")
        .text("x")
        .addClass(
          "close-btn inline-block bg-red-500 text-white p-1 ml-2 cursor-pointer hover:bg-red-700 rounded"
        )
        .data("artistId", artist._id);

      $listItem.append($closeBtn);
      $artistsList.append($listItem);
    });

    $artistsList.on("click", "li", function () {
      const artistId = $(this).data("artistId");
      fetchAlbumsByArtist(
        artists.find((artist) => artist._id === artistId).albums
      );
    });

    $artistsList.on("click", ".close-btn", function (event) {
      event.stopPropagation();
      deleteArtist($(this).data("artistId"));
      $(this).parent().remove();
    });
  }

  function populateArtistSelect(artists) {
    const $albumArtistSelect = $("#albumArtist");
    $albumArtistSelect
      .empty()
      .append($("<option disabled selected>").text("Select Artist"));
    artists.forEach((artist) => {
      const $option = $("<option>").val(artist._id).text(artist.name);
      $albumArtistSelect.append($option);
    });
  }

  async function fetchAllAlbums() {
    try {
      const response = await fetch("http://localhost:3000/albums/all");
      const albums = await response.json();
      populateAlbumSelect(albums);
    } catch (error) {
      console.error("Error fetching albums:", error);
    }
  }

  function populateAlbumSelect(albums) {
    const $songAlbumSelect = $("#songAlbum");
    $songAlbumSelect
      .empty()
      .append($("<option disabled selected>").text("Select Album"));
    albums.forEach((album) => {
      const $option = $("<option>").val(album._id).text(album.name);
      $songAlbumSelect.append($option);
    });
  }

  async function fetchAlbumsByArtist(albums) {
    const $albumsList = $("#albumsList");
    $albumsList.empty();
    albums.forEach((album) => {
      const $listItem = $("<li>")
        .text(album.name)
        .addClass("cursor-pointer")
        .data("albumId", album._id);

      const $closeBtn = $("<span>")
        .text("x")
        .addClass(
          "close-btn inline-block bg-red-500 text-white p-1 ml-2 cursor-pointer hover:bg-red-700 rounded"
        )
        .data("albumId", album._id);

      $listItem.append($closeBtn);
      $albumsList.append($listItem);
    });

    $albumsList.on("click", "li", function () {
      const albumId = $(this).data("albumId");
      fetchSongsByAlbum(albumId);
    });

    $albumsList.on("click", ".close-btn", function (event) {
      event.stopPropagation();
      deleteAlbum($(this).data("albumId"));
      $(this).parent().remove();
    });
  }

  async function fetchSongsByAlbum(albumId) {
    try {
      const response = await fetch(`http://localhost:3000/albums/${albumId}`);
      const album = await response.json();
      const songs = album.songs;
      const $songsList = $("#songsList");
      $songsList.empty();
      songs.forEach((song) => {
        const $listItem = $("<li>")
          .text(song.name)
          .addClass("cursor-pointer")
          .data("songId", song._id);

        const $closeBtn = $("<span>")
          .text("x")
          .addClass(
            "close-btn inline-block bg-red-500 text-white p-1 ml-2 cursor-pointer hover:bg-red-700 rounded"
          )
          .data("songId", song._id);

        $listItem.append($closeBtn);
        $songsList.append($listItem);
      });
      $songsList.on("click", ".close-btn", function (event) {
        event.stopPropagation();
        deleteSong($(this).data("songId"));
        $(this).parent().remove();
      });
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  }

  // FORMS
  $("#artistForm").submit(async function (event) {
    event.preventDefault();
    const name = $("#artistName").val();
    const dob = $("#artistDob").val();
    const bio = $("#artistBio").val();

    try {
      const response = await fetch("http://localhost:3000/artists/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, dob, bio }),
      });

      if (response.ok) {
        const newArtist = await response.json();
        appendArtistToList(newArtist);
        // $("#addArtistForm").hide();
      } else {
        console.error("Failed to add artist");
      }
    } catch (error) {
      console.error("Error adding artist:", error);
    }
  });
  function appendArtistToList(artist) {
    const $artistsList = $("#artistList");
    const $albumsList = $("#albumsList");
    const $listItem = $("<li>")
      .text(artist.name)
      .addClass("cursor-pointer")
      .data("artistId", artist._id);

    const $closeBtn = $("<span>")
      .text("x")
      .data("artistId", artist._id)
      .addClass(
        "close-btn inline-block bg-red-500 text-white p-1 ml-2 cursor-pointer hover:bg-red-700 rounded"
      )
      .click(function (event) {
        event.stopPropagation();
        deleteArtist($(this).data("artistId"));
        $albumsList.empty();
        $(this).parent().remove();
      });
    $listItem.append($closeBtn);
    $artistsList.append($listItem);
    fetchAllArtists();
  }

  $("#albumForm").submit(async function (event) {
    event.preventDefault();
    const name = $("#albumName").val();
    const genre = $("#albumGenre").val();
    const releaseDate = $("#albumReleaseDate").val();
    const artist = $("#albumArtist").val();

    try {
      const response = await fetch("http://localhost:3000/albums/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, genre, releaseDate, artistId: artist }),
      });

      if (response.ok) {
        const newAlbum = await response.json();
        appendAlbumToList(newAlbum);
      } else {
        console.error("Failed to add album");
      }
    } catch (error) {
      console.error("Error adding album:", error);
    }
  });

  function appendAlbumToList(album) {
    const $albumsList = $("#albumsList");
    const $songsList = $("#songsList");
    const $listItem = $("<li>")
      .text(album.name)
      .addClass("cursor-pointer")
      .data("albumId", album._id);
    console.log("Album ID:", album._id);
    const $closeBtn = $("<span>")
      .text("x")
      .addClass(
        "close-btn inline-block bg-red-500 text-white p-1 ml-2 cursor-pointer hover:bg-red-700 rounded"
      )
      .data("albumId", album._id)
      .click(function (event) {
        event.stopPropagation();
        console.log("Album ID:", $(this).data("albumId"));
        deleteAlbum($(this).data("albumId"));
        $(this).parent().remove();
        $songsList.empty();
      });
    fetchAllAlbums();
    $listItem.append($closeBtn);
    $albumsList.append($listItem);
  }

  $("#songForm").submit(async function (event) {
    event.preventDefault();
    const name = $("#songName").val();
    const duration = $("#songDuration").val();
    const album = $("#songAlbum").val();
    const trackNumber = $("#songTrackNumber").val();
    try {
      const response = await fetch("http://localhost:3000/songs/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, duration, albumId: album, trackNumber }),
      });

      if (response.ok) {
        const newSong = await response.json();
        appendSongToList(newSong);
        // $("#addSongForm").hide();
      } else {
        console.error("Failed to add song");
      }
    } catch (error) {
      console.error("Error adding song:", error);
    }
  });

  function appendSongToList(song) {
    const $songsList = $("#songsList");
    const $listItem = $("<li>")
      .text(song.name)
      .addClass("cursor-pointer")
      .data("songId", song._id);

    const $closeBtn = $("<span>")
      .text("x")
      .addClass(
        "close-btn inline-block bg-red-500 text-white p-1 ml-2 cursor-pointer hover:bg-red-700 rounded"
      )
      .data("songId", song._id)
      .click(function (event) {
        event.stopPropagation();
        deleteSong($(this).data("songId"));
        $(this).parent().remove();
      });
    $listItem.append($closeBtn);
    $songsList.append($listItem);
  }

  async function deleteArtist(artistId) {
    try {
      await fetch(`http://localhost:3000/artists/${artistId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting artist:", error);
    }
  }

  async function deleteAlbum(albumId) {
    try {
      await fetch(`http://localhost:3000/albums/${albumId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting album:", error);
    }
  }

  async function deleteSong(songId) {
    try {
      await fetch(`http://localhost:3000/songs/${songId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting song:", error);
    }
  }

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
    const data = { username, password };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    const data = { username, password, role: "user" };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  fetchAllArtists();
});
