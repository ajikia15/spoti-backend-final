// This function now accepts an array of albums directly
async function fetchAlbumsByArtist(albums) {
  const albumsList = document.getElementById("albumsList");
  albumsList.innerHTML = ""; // Clear existing albums
  albums.forEach((album) => {
    const listItem = document.createElement("li");
    listItem.textContent = album.name; // Assuming each album has a 'name' property
    listItem.classList.add("cursor-pointer");
    albumsList.appendChild(listItem);
  });
}

async function fetchAllArtists() {
  try {
    const response = await fetch("http://localhost:3000/artists/all");
    const artists = await response.json();
    const artistsList = document.getElementById("artistList");
    artistsList.innerHTML = ""; // Clear existing artists if needed
    artists.forEach((artist) => {
      const listItem = document.createElement("li");
      listItem.textContent = artist.name; // Assuming each artist has a 'name' property
      listItem.classList.add("cursor-pointer");
      // Pass the artist's albums directly to fetchAlbumsByArtist
      listItem.addEventListener("click", () =>
        fetchAlbumsByArtist(artist.albums)
      ); // Assuming each artist object has an 'albums' property
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
    event.preventDefault(); // Prevent the default form submission
    loginUser(); // Your login logic here
  });

  registerBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    registerUser(username, password);
  });
});

function loginUser() {
  console.log("Logging in...");
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
