/* ============================================================
  LOGICA PER L'INTERO SITO
  (Include: Hamburger, Form Validation, Formspree, Animazioni, FAQ)
============================================================ */
document.addEventListener('DOMContentLoaded', () => {

    /* ========================================
       1. GESTIONE MENU HAMBURGER (MOBILE)
    ======================================== */

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
    } // Fine blocco Hamburger

    /* ========================================
       2. GESTIONE INVIO FORM CONTATTI
    ======================================== */

    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const privacyCheckbox = document.getElementById('privacy');

    if (form && formStatus && privacyCheckbox) {

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!privacyCheckbox.checked) {
                formStatus.innerHTML = 'Devi accettare la Privacy Policy per inviare.';
                formStatus.style.color = 'red';
                return;
            }

            formStatus.innerHTML = 'Invio in corso...';
            formStatus.style.color = 'var(--text-color)';

            const formData = new FormData(form);

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.innerHTML = 'Grazie! Il tuo messaggio è stato inviato.';
                    formStatus.style.color = '#25D366';
                    form.reset();
                } else {
                    formStatus.innerHTML = 'Errore: Impossibile inviare il messaggio. Riprova.';
                    formStatus.style.color = 'red';
                }
            } catch (error) {
                console.error('Errore di invio:', error);
                formStatus.innerHTML = 'Errore di connessione. Controlla la tua rete.';
                formStatus.style.color = 'red';
            }
        });
    } // Fine blocco Form

    /* ========================================
       3. GESTIONE ANIMAZIONI "FADE-IN" ALLO SCORRIMENTO
    ======================================== */

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
    }); // Fine blocco Animazioni


    /* ✅ BLOCCO AGGIUNTO: 
      4. GESTIONE FAQ (Accordion)
    */

    // Seleziona tutti gli "item" (contenitore di domanda + risposta)
    const allFaqItems = document.querySelectorAll('.faq-item');

    if (allFaqItems.length > 0) {

        allFaqItems.forEach(item => {
            // Per ogni item, trova il pulsante-domanda al suo interno
            const questionButton = item.querySelector('.faq-question');

            // Aggiungi un ascoltatore di click a quel pulsante
            questionButton.addEventListener('click', () => {

                // Controlla se l'item cliccato è GIA' aperto
                const isAlreadyActive = item.classList.contains('active');

                // SPIEGAZIONE "VERBOSA": Chiudi tutti gli altri!
                // Prima di fare qualsiasi cosa, passa in rassegna TUTTI 
                // gli item e rimuovi la classe 'active' da ognuno.
                // Questo assicura che solo uno sia aperto alla volta.
                allFaqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });

                // Ora, apri questo item (SOLO se non era già aperto)
                // Se era già aperto (isAlreadyActive = true), il loop sopra
                // l'ha appena chiuso, e noi non facciamo nient'altro.
                // Questo crea l'effetto "chiudi cliccando di nuovo".
                if (!isAlreadyActive) {
                    item.classList.add('active');
                }
            });
        });
    } // Fine blocco FAQ

}); // Fine script