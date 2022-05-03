document.getElementById("search-btn").addEventListener("click", () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  const inLowerCase = searchText.toLowerCase();

  // clean field text
  searchField.value = "";

  //data load
  const loadData = () => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inLowerCase}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => showPhone(data.data));
  };
  loadData();
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
        <button class="btn btn-primary w-100" onclick="loadInfo('${phone.slug}')">Details</button>
        </div>
      </div>
      `;
      showPhones.appendChild(phoneInfo);
    });
  }
};

const loadInfo = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showInfo(data.data));
};

const showInfo = (info) => {
  const { chipSet, displaySize, memory, storage, sensors } = info.mainFeatures;

  const showInfo = document.getElementById("show-info");
  showInfo.textContent = "";
  const infoWrap = document.createElement("div");
  infoWrap.classList.add("row");
  infoWrap.classList.add("g-0");
  infoWrap.innerHTML = `
    <div class="col-md-4">
      <img src="${info.image}" class="img-fluid rounded-start" alt="..." />
    </div>
    <div class="col-md-8" >
      <p class="card-body">
      <h6 class="card-title">${info.brand}</h6>
        <h5 class="card-title">${info.name}</h5>
        <p class="card-text">
          <small class="text-muted">
          ${
            info.releaseDate == "" ? "Release Date not found" : info.releaseDate
          }</small>
        </p>
        <p class="card-text">Chipset : ${chipSet}</p>
        <p class="card-text">Display Size : ${displaySize}</p>
        <p class="card-text">Memory : ${memory}</p>
        <p class="card-text">Storage : ${storage}</p>
        <p class="card-text" >sensors : 
        ${sensors.map((sensor) => `<span> ${sensor} </span>`)}
        </p>
        <p id='other'>
        Other Features : <br>
        </p>
    </div>
  `;
  showInfo.appendChild(infoWrap);

  const other = document.getElementById("other");
  const others = info.others;
  for (let prop in others) {
    const wraper = document.createElement("span");
    wraper.innerHTML = `${prop} : ${others[prop]} , `;
    other.appendChild(wraper);
  }
};
