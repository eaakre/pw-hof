import Section from "./components/Section.js";
import Player from "./components/Player.js";

let cardList;

const navbar = document.querySelector(".header");
const navbarHeight = navbar.offsetHeight;
const mobileMenuButton = document.getElementById("navbarMenu");
const mobileMenu = document.getElementById("navbarMenuOverlay");
const closeBtn = document.getElementById("closeBtn");

/* Open when someone clicks on the span element */
function openNav() {
  mobileMenu.style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeNav() {
  mobileMenu.style.width = "0";
}

mobileMenuButton.addEventListener("click", openNav);
closeBtn.addEventListener("click", closeNav);

let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;

window.addEventListener(
  "scroll",
  function handleScroll() {
    const scrollTopPosition =
      window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTopPosition > lastScrollTop && scrollTopPosition >= 200) {
      navbar.style.transform = "translateY(-" + navbarHeight + "px)";
    } else if (scrollTopPosition < lastScrollTop) {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = scrollTopPosition <= 0 ? 0 : scrollTopPosition;
  },
  false
);

function createPlayer(data) {
  const player = new Player(data, "#swiper__template");
  return player.getView();
}
function renderCard(data) {
  const cardElement = createPlayer(data);
  cardList.addItem(cardElement);
}

cardList = new Section(
  { data: batters, renderer: renderCard },
  ".swiper-wrapper"
);
cardList.renderItems();

var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
  pagination: {
    el: ".swiper-pagination",
  },
});

// const hittingTable = document.getElementById("hitting-table");
const hittingContent = document.getElementById("hitting-content");
const hittingButtons = document.querySelectorAll("th button");

const createRow = (obj) => {
  const row = document.createElement("tr");
  const objKeys = Object.keys(obj);
  objKeys.map((key) => {
    if (key !== "image" && key !== "link") {
      const cell = document.createElement("td");
      cell.setAttribute("data-attr", key);
      if (key == "name") {
        let playerLink = document.createElement("a");
        playerLink.setAttribute("href", obj.link);
        playerLink.setAttribute("target", "_blank");
        playerLink.classList.add("player-link");
        playerLink.innerHTML = obj[key];
        cell.appendChild(playerLink);
      } else {
        cell.innerHTML = obj[key];
      }
      row.appendChild(cell);
    }
  });
  return row;
};

const getTableContent = (data) => {
  Object.keys(
    data.forEach(function (player) {
      const row = createRow(player);
      hittingContent.appendChild(row);
    })
  );
};

const sortData = (data, param, direction = "asc") => {
  hittingContent.innerHTML = "";
  const sortedData =
    direction == "asc"
      ? [...data].sort(function (a, b) {
          if (a[param] < b[param]) {
            return -1;
          }
          if (a[param] > b[param]) {
            return 1;
          }
          return 0;
        })
      : [...data].sort(function (a, b) {
          if (b[param] < a[param]) {
            return -1;
          }
          if (b[param] > a[param]) {
            return 1;
          }
          return 0;
        });

  getTableContent(sortedData);
};

const resetButtons = (event) => {
  [...hittingButtons].map((button) => {
    if (button !== event.target) {
      button.removeAttribute("data-dir");
    }
  });
};

window.addEventListener("load", () => {
  [...hittingButtons].map((button) => {
    button.addEventListener("click", (e) => {
      resetButtons(e);
      if (e.target.getAttribute("data-dir") == "desc") {
        sortData(batters, e.target.id, "desc");
        e.target.setAttribute("data-dir", "asc");
      } else {
        sortData(batters, e.target.id, "asc");
        e.target.setAttribute("data-dir", "desc");
      }
    });
  });

  getTableContent(batters);
});
