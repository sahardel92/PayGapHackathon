document.addEventListener("DOMContentLoaded", () => {

    const secteurSelect = document.getElementById("secteur");
    const metierSelect = document.getElementById("metier");

   
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

        if (!secteur || !metier || !salaire) {
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

           
            // 3. AFFICHAGE BOÎTES HOMME/FEMME
           
            document.getElementById("boxHomme").textContent = data.salaireHomme + " €";
            document.getElementById("boxFemme").textContent = data.salaireFemme + " €";
            document.getElementById("resultBoxes").style.display = "flex";

            
            // 4. AFFICHAGE RÉSULTAT DÉTAILLÉ
            const resultDetails = document.getElementById("resultDetails");

            resultDetails.innerHTML = `
                <h2>${data.metier}</h2>

                <p><strong>Moyenne du secteur :</strong> ${data.moyenneSecteur} €</p>
              

                <p style="margin-top:10px;">${data.message}</p>
            `;

            resultDetails.style.display = "block";

        } catch (error) {
            console.error(error);
            alert("Erreur de connexion au serveur.");
        }
    });

});

