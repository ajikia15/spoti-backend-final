async function fetchAlbumsByArtist(albums) {
  const albumsList = document.getElementById("albumsList");
  albumsList.innerHTML = "";
  albums.forEach((album) => {
    const listItem = document.createElement("li");
    listItem.textContent = album.name;
    listItem.classList.add("cursor-pointer");
    listItem.addEventListener("click", () => {
      fetchSongsByAlbum(album._id);
    });
    albumsList.appendChild(listItem);
  });
}

async function fetchSongsByAlbum(albumId) {
  try {
    const response = await fetch(`http://localhost:3000/albums/${albumId}`);
    const album = await response.json();
    const songs = album.songs;
    const songsList = document.getElementById("songsList");
    songsList.innerHTML = "";
    songs.forEach((song) => {
      const listItem = document.createElement("li");
      listItem.textContent = song.name;
      listItem.classList.add("cursor-pointer");
      songsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching songs:", error);
  }
}

async function fetchAllArtists() {
  try {
    const response = await fetch("http://localhost:3000/artists/all");
    const artists = await response.json();
    const artistsList = document.getElementById("artistList");
    artistsList.innerHTML = "";
    artists.forEach((artist) => {
      const listItem = document.createElement("li");
      listItem.textContent = artist.name;
      listItem.classList.add("cursor-pointer");
      listItem.addEventListener("click", () =>
        fetchAlbumsByArtist(artist.albums)
      );
      artistsList.appendChild(listItem);
    });
  } catch (error) {
    console.error("Error fetching artists:", error);
  }
}

fetchAllArtists();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const loginBtn = document.getElementById("loginBtn");
  const registerBtn = document.getElementById("registerBtn");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    loginUser(username, password);
  });

  registerBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    registerUser(username, password);
  });
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
      method: "POST", // or 'PUT'
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
