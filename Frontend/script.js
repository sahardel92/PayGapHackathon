document.addEventListener("DOMContentLoaded", () => {

    const secteurSelect = document.getElementById("secteur");
    const metierSelect = document.getElementById("metier");
    const niveauSelect = document.getElementById("niveau");

    // Fonction d’ajustement selon le niveau
    function ajusterSalaireParNiveau(salaireBase, niveau) {
        if (niveau === "Junior") {
            return Math.round(salaireBase * 0.88);  // -12%
        }
        if (niveau === "Senior") {
            return Math.round(salaireBase * 1.18); // +18%
        }
        return salaireBase; // Medior
    }

    // 1. FILTRER LES MÉTIERS SELON LE SECTEUR
    secteurSelect.addEventListener("change", () => {
        const secteur = secteurSelect.value;
        metierSelect.value = "";

        Array.from(metierSelect.options).forEach(option => {
            if (option.value === "") return;
            option.hidden = (option.getAttribute("data-secteur") !== secteur);
        });
    });

    // 2. ENVOYER LA REQUÊTE AU BACKEND PHP
    document.getElementById("salaryForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const secteur = secteurSelect.value;
        const metier = metierSelect.value;
        const salaire = document.getElementById("salaire").value;
        const niveau = niveauSelect.value;

        if (!secteur || !metier || !salaire || !niveau) {
            alert("Merci de remplir tous les champs.");
            return;
        }

        try {
            const url = `http://localhost/PayGapHackathon/Backend/calculate.php?secteur=${encodeURIComponent(secteur)}&metier=${encodeURIComponent(metier)}&salaire=${encodeURIComponent(salaire)}`;
            const res = await fetch(url);
            const data = await res.json();

            if (data.error) {
                alert(data.error);
                return;
            }

            // APPLY LEVEL ADJUSTMENTS
            const salaireHomme = ajusterSalaireParNiveau(data.salaireHomme, niveau);
            const salaireFemme = ajusterSalaireParNiveau(data.salaireFemme, niveau);
            const moyenneSecteur = ajusterSalaireParNiveau(data.moyenneSecteur, niveau);

            // 3. AFFICHAGE BOÎTES HOMME/FEMME
            document.getElementById("boxHomme").textContent = salaireHomme + " €";
            document.getElementById("boxFemme").textContent = salaireFemme + " €";
            document.getElementById("resultBoxes").style.display = "flex";

            // MESSAGE
            let message = "";
            if (salaire < moyenneSecteur) {
                message = `Ton salaire est en dessous de la moyenne pour un niveau ${niveau}.`;
            } else if (salaire > moyenneSecteur) {
                message = `Ton salaire est au-dessus de la moyenne pour un niveau ${niveau}.`;
            } else {
                message = `Ton salaire est égal à la moyenne pour un niveau ${niveau}.`;
            }

            // 4. AFFICHAGE RÉSULTAT DÉTAILLÉ
            const resultDetails = document.getElementById("resultDetails");

            resultDetails.innerHTML = `
              

                <p><strong>Moyenne du secteur :</strong> ${moyenneSecteur} €</p>
                <p style="margin-top:8px;">${message}</p>
            `;

            resultDetails.style.display = "block";

        } catch (error) {
            console.error(error);
            alert("Erreur de connexion au serveur.");
        }
    });

});

