auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('articles').onSnapshot(snapshot => {
            setupArticles(snapshot.docs)
            setupUI(user);
        })
    } else {
        setupArticles([]);
        setupUI();
    }
});

const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', e => {
    e.preventDefault();

    db.collection('articles').add({
        title: createForm['title'].value,
        content: createForm['content'].value,
    }).then(() => {
        const modal = document.querySelector('#modal-create');
        M.Modal.getInstance(modal).close();
        createForm.reset();
    }).catch(err => {
        
    })
});

// Dohvaćanje obrazca za prijavu
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', e => {
    e.preventDefault(); // Sprječavanje osvježavanja stranice koje je uzrokovalo nestanak naših podataka
    const email = signupForm['signup-email'].value; // Uzimanje emaila iz obrazca
    const password = signupForm['signup-password'].value; // Uzimanje lozinke
    // Asinkrona funkcija koja šalje podatke pomoću Firebase auth funkcionalnosti. Nakon što je uspješno izvršena, gasimo prozor
    auth.createUserWithEmailAndPassword(email, password).then(data => {
        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
    });
});

const logout = document.querySelector('#logout');
logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        alert('Odjava uspješna');
    });
})

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    auth.signInWithEmailAndPassword(email, password).then(data => {
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
    })
})