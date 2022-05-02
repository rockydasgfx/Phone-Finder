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
      .then((data) => console.log(data));
  }
  lodeData();
});
