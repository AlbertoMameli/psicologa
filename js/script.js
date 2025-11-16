
document.addEventListener('DOMContentLoaded', () => {


    const hamburger = document.querySelector('.hamburger');

    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {


        hamburger.addEventListener('click', () => {


            navLinks.classList.toggle('active');


            hamburger.classList.toggle('active');
        });


        const allNavLinks = document.querySelectorAll('.nav-links a');


        allNavLinks.forEach(link => {

            link.addEventListener('click', () => {

                if (hamburger.classList.contains('active')) {

                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            });
        });
    }
    /* ========================================
       2. GESTIONE INVIO FORM CONTATTI
    ======================================== */

    // Seleziona gli elementi del form
    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // ✅ RIGA AGGIUNTA: Seleziona la nuova checkbox
    const privacyCheckbox = document.getElementById('privacy');

    // Controlla se il form esiste
    if (form && formStatus && privacyCheckbox) { // ✅ MODIFICATO: aggiunto "privacyCheckbox"

        // Aggiungi un ascoltatore per l'evento "submit"
        form.addEventListener('submit', async (e) => {

            // 1. Impedisce al browser di ricaricare la pagina (comportamento di default)
            e.preventDefault();

            /* ✅ BLOCCO AGGIUNTO:
              Controlla se la checkbox è spuntata. Se non lo è,
              mostra un errore e interrompi l'invio.
            */
            if (!privacyCheckbox.checked) {
                formStatus.innerHTML = 'Devi accettare la Privacy Policy per inviare.';
                formStatus.style.color = 'red';
                return; // Interrompe la funzione qui
            }
            /* FINE BLOCCO AGGIUNTO */


            // 2. Mostra un messaggio di caricamento (solo se la checkbox è OK)
            formStatus.innerHTML = 'Invio in corso...';
            formStatus.style.color = 'var(--text-color)'; // Colore testo

            // 3. Prepara i dati da inviare
            const formData = new FormData(form);

            try {
                // 4. Invia i dati a Formspree (o altro endpoint) in background
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                // 5. Gestisci la risposta di Formspree
                if (response.ok) {
                    // Invio riuscito!
                    formStatus.innerHTML = 'Grazie mille. Il tuo messaggio è stato inviato.';
                    formStatus.style.color = '#25D366'; // Verde successo
                    form.reset(); // Svuota i campi del modulo
                } else {
                    // Errore dal server
                    formStatus.innerHTML = 'Errore: Impossibile inviare il messaggio. Riprova.';
                    formStatus.style.color = 'red'; // Rosso errore
                }
            } catch (error) {
                // Errore di rete (es. no connessione)
                console.error('Errore di invio:', error);
                formStatus.innerHTML = 'Errore di connessione. Controlla la tua rete.';
                formStatus.style.color = 'red';
            }
        });
    } // Fine blocco Form


    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add('visible');


                observer.unobserve(entry.target);
            }
        });
    };


    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });


    elementsToReveal.forEach(element => {
        revealObserver.observe(element);
    });

}); 