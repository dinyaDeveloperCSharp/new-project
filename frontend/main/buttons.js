console.log(document.cookie);

const settingsButton = document.getElementById("settingsButton");
const revertButton = document.getElementById("revertButton");
const deleteButton = document.getElementById("deleteAccountButton");
const settings = document.getElementById("settings");
const logoutButton = document.getElementById("logoutButton");

settingsButton.addEventListener("click", () => {
  settings.style.right = "0"; // Slide the panel in
  revertButton.style.display = "flex";
});

revertButton.addEventListener("click", () => {
  settings.style.right = "-250px"; // Slide the panel out
  revertButton.style.display = "none";
});

logoutButton.addEventListener("click", () => {
  localStorage.removeItem("JWT");
  window.location.href = "/frontend/login.html";
});

deleteButton.addEventListener("click", async () => {
  const token = localStorage.getItem("JWT");
  const payload = jwt_decode(token);

  const userId = payload.id;
  console.log("User ID:", userId);

  deleteAccount(userId);
});

async function deleteAccount(userID) {
  if (confirm("Are you sure you want to delete your account?")) {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/users/id/${userID}`
      );
      console.log("ACCOUNT DELETED SUCCESSFUL");
      localStorage.removeItem("JWT");

      window.location.href = "/frontend/main/accountDeleted.html";
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert("An error occurred while trying to delete your account.");
    }
  }
}
