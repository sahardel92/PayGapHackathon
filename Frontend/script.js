document.getElementById("salaryForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const secteur = document.getElementById("secteur").value.trim();
  const metier = document.getElementById("metier").value.trim();
  const niveau = document.getElementById("niveau").value;
  const salaire = document.getElementById("salaire").value.trim();
  const resultDiv = document.getElementById("result");

  // Vérification des champs
  if (!secteur || !metier || !niveau || !salaire) {
    resultDiv.innerHTML = `<p style="color:red;"> Merci de remplir tous les champs.</p>`;
    return;
  }

  try {
    // URL de ton backend local
    const url = `http://localhost/testHackthon-main/Backend/calculate.php?secteur=${encodeURIComponent(secteur)}&metier=${encodeURIComponent(metier)}&niveau=${encodeURIComponent(niveau)}&salaire=${encodeURIComponent(salaire)}`;

    // Appel au backend
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) {
      resultDiv.innerHTML = `<p style="color:red;"> ${data.error}</p>`;
      return;
    }

    // Affichage des résultats salariaux
        resultDiv.innerHTML = `
        <div class="result-card">
        <h3> Résultats pour ${data.metier} (${data.niveau})</h3>
        <p><strong>Femmes :</strong> ${data.salaireFemme} €</p>
        <p><strong>Hommes :</strong> ${data.salaireHomme} €</p>
        <p><strong>Moyenne du secteur :</strong> ${data.moyenneSecteur} €</p>
        <p><strong>Salaire utilisateur :</strong> ${data.salaireUtilisateur} €</p>
        <p>${data.message}</p>
      </div>
    `;

  } catch (error) {
    console.error("Erreur :", error);
    resultDiv.innerHTML = `<p style="color:red;"> Une erreur est survenue lors de la connexion au serveur.</p>`;
  }
});
