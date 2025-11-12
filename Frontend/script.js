

// Charger automatiquement les secteurs et métiers depuis le fichier JSON
document.addEventListener("DOMContentLoaded", async () => {
  const secteurSelect = document.getElementById("secteur");
  const metierSelect = document.getElementById("metier");
  const resultDiv = document.getElementById("result");

  try {
    //  Charger le fichier JSON contenant les secteurs et métiers
    const response = await fetch("../Backend/data/salaries.json");
    const data = await response.json();

    // Remplir la liste des secteurs
    Object.keys(data).forEach((secteur) => {
      const option = document.createElement("option");
      option.value = secteur;
      option.textContent = secteur;
      secteurSelect.appendChild(option);
    });

    // Quand un secteur est choisi → afficher les métiers correspondants
    secteurSelect.addEventListener("change", () => {
      const selectedSector = secteurSelect.value;
      metierSelect.innerHTML = '<option value="">-- Choisis un métier --</option>';

      if (data[selectedSector]) {
        const metiers = Object.keys(data[selectedSector].metiers);
        metiers.forEach((metier) => {
          const option = document.createElement("option");
          option.value = metier;
          option.textContent = metier;
          metierSelect.appendChild(option);
        });
      }
    });
  } catch (error) {
    console.error(" Erreur lors du chargement du JSON :", error);
    resultDiv.innerHTML = `<p style="color:red;">Impossible de charger les données JSON.</p>`;
  }


  //  GESTION DU FORMULAIRE SALARIAL

  document.getElementById("salaryForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const secteur = secteurSelect.value.trim();
    const metier = metierSelect.value.trim();
    const niveau = document.getElementById("niveau").value;
    const salaire = document.getElementById("salaire").value.trim();

    // Vérification des champs obligatoires
    if (!secteur || !metier || !niveau || !salaire) {
      resultDiv.innerHTML = `<p style="color:red;">Merci de remplir tous les champs.</p>`;
      return;
    }

    try {
      //  URL de ton backend PHP local
      const url = `http://localhost/testHackthon-main/Backend/calculate.php?secteur=${encodeURIComponent(
        secteur
      )}&metier=${encodeURIComponent(metier)}&niveau=${encodeURIComponent(
        niveau
      )}&salaire=${encodeURIComponent(salaire)}`;

      //  Appel au backend
      const res = await fetch(url);
      const data = await res.json();

      if (data.error) {
        resultDiv.innerHTML = `<p style="color:red;"> ${data.error}</p>`;
        return;
      }

      //  Affichage des résultats salariaux
      resultDiv.innerHTML = `
        <div class="result-card">
          <h3>Résultats pour ${data.metier} (${data.niveau})</h3>
          <p> <strong>Femmes :</strong> ${data.salaireFemme} €</p>
          <p><strong>Hommes :</strong> ${data.salaireHomme} €</p>
          <p> <strong>Moyenne du secteur :</strong> ${data.moyenneSecteur} €</p>
          <p><strong>Salaire utilisateur :</strong> ${data.salaireUtilisateur} €</p>
          <hr>
          <p>${data.message}</p>
        </div>
      `;
    } catch (error) {
      console.error("Erreur :", error);
      resultDiv.innerHTML = `<p style="color:red;"> Une erreur est survenue lors de la connexion au serveur.</p>`;
    }
  });
});

