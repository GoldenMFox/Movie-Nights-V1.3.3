function openNav() {
  const sidebar = document.getElementById("mySidebar");
  const sidebarItems = document.querySelectorAll(".filter-group");
  const closeBtn = document.querySelector(".closebtn");

  sidebar.style.width = "250px";
  sidebar.style.padding = "20px";
  sidebar.style.display = "block";
  sidebarItems.forEach((item) => {
    item.style.display = "block";
  });

  closeBtn.style.display = "block"; // Show the close button
}

function closeNav() {
  const sidebar = document.getElementById("mySidebar");
  const sidebarItems = document.querySelectorAll(".filter-group");
  const closeBtn = document.querySelector(".closebtn");

  sidebar.style.width = "0";
  sidebar.style.padding = "0";

  sidebarItems.forEach((item) => {
    item.style.display = "none";
  });

  closeBtn.style.display = "none"; // Hide the close button
}
