window.addEventListener("DOMContentLoaded", function () {
  // Function to fetch and insert HTML content
  function fetchAndInsertContent(url, selector) {
    return fetch(url)
      .then((res) => res.text())
      .then((data) => {
        document.querySelector(selector).innerHTML = data; // Insert the HTML content into the DOM

        // Parse the HTML response to execute embedded scripts
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, "text/html");

        // Execute each script found in the fetched HTML
        const scripts = doc.querySelectorAll("script");
        scripts.forEach((script) => eval(script.textContent)); // Evaluate the script's content
      });
  }

  // Fetch and insert header and footer content
  Promise.all([
    fetchAndInsertContent("/header.html", ".header"),
    fetchAndInsertContent("/footer.html", ".footer"),
  ]).then(() => {
    // Highlight the active nav link based on the current path after header content is loaded
    const currentPath = window.location.pathname.split("/").pop().split(".")[0];
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      const linkPath = link.getAttribute("href").split("/").pop();
      if (currentPath === linkPath) {
        link.classList.add("active");
      }
    });

    // Add sticky class to navbar on scroll
    window.addEventListener("scroll", function () {
      const navbar = document.querySelector(".navbar");
      const topbarHeight = document.querySelector(".topbar").offsetHeight; // Adjust if necessary

      if (window.scrollY > topbarHeight) {
        navbar.classList.add("sticky");
      } else {
        navbar.classList.remove("sticky");
      }
    });
  });
});
