document.getElementById("search-btn").addEventListener("click", () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  const inLowerCase = searchText.toLowerCase();

  // clean field text
  searchField.value = "";

  //data load
  function lodeData() {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inLowerCase}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showPhone(data.data));
  }
  lodeData();
});

// show phone
const showPhone = (phones) => {
  const showLimite = phones.slice(0, 20);
  const showPhones = document.getElementById("show-phones");
  // clean search reasult
  showPhones.textContent = "";

  // show not found massage
  const noResult = document.getElementById("no-result");
  if (showLimite.length == 0) {
    noResult.classList.remove("d-none");
  } else {
    noResult.classList.add("d-none");

    // show searched results
    showLimite.forEach((phone) => {
      const phoneInfo = document.createElement("div");
      phoneInfo.classList.add("col");
      phoneInfo.innerHTML = `
      <div class="card h-100">
        <img src="${phone.image}" class="card-img-top w-75 mx-auto" alt="..." />
        <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <h6 class="card-title">${phone.brand}</h6>
        <button class="btn btn-primary w-100">Details</button>
        </div>
      </div>
      `;
      showPhones.appendChild(phoneInfo);
    });
  }
};
