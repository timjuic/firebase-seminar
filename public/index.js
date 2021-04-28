const accountDetails = document.querySelector('.account-details');
const articleList = document.querySelector('.articles');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const setupUI = user => {
  if (user) {
    const html = `
      <div>Prijavljeni ste kao ${user.email}</div>
    `;
    accountDetails.innerHTML = html;
    loggedInLinks.forEach(item => item.style.display = "block");
    loggedOutLinks.forEach(item => item.style.display = "none");
  } else {
    accountDetails.innerHTML = '';
    loggedInLinks.forEach(item => item.style.display = "none");
    loggedOutLinks.forEach(item => item.style.display = "block");
  }
}

const setupArticles = data => { // Funkcija, dohvaća podatke iz Firestorea 
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const article = doc.data();
      const articleHtml = `
        <h4 class="lighten-4">${article.title}</h4>
        <p>${article.content}</p>`;
      html += articleHtml; // Dohvaćeni podaci se dodaju u HTML strukturu
    });
    articleList.innerHTML = html;
    // U slučaju da korisnik nije prijavljen, prikaži ovo
  } else articleList.innerHTML = '<h5 class="center-align">Morate se prijaviti da bi vidjeli članke!</h5>'
}

// Kada se sadržaj stranice učita, izvrši ovaj kod
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal'); // Dohvaćanje popup prozora
  M.Modal.init(modals); // Init funkcija iz Materialize biblioteke

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);
});