document.addEventListener("DOMContentLoaded", async () => {
    document.getElementById("salaryForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const secteur = document.getElementById("secteur").value.trim();
        const metier = document.getElementById("metier").value.trim();
        const niveau = document.getElementById("niveau").value;
        const salaire = document.getElementById("salaire").value.trim();

        const resultDiv = document.getElementById("result");

        // Vérification des champs obligatoires
        if (!secteur || !metier || !niveau || !salaire) {
            resultDiv.innerHTML = '<p style="color:red;">Merci de remplir tous les champs.</p>';
            return;
        }

        try {
            // URL CORRECTE de ton backend PHP local
            const url = `http://localhost/PayGapHackathon/Backend/calculate.php?secteur=${encodeURIComponent(secteur)}&metier=${encodeURIComponent(metier)}&niveau=${encodeURIComponent(niveau)}&salaire=${encodeURIComponent(salaire)}`;

            // Appel au backend
            const res = await fetch(url);
            const data = await res.json();

            // Gestion des erreurs renvoyées par le backend
            if (data.error) {
                resultDiv.innerHTML = `<p style="color:red;">${data.error}</p>`;
                return;
            }

            // Affichage du résultat
            resultDiv.innerHTML = `
                <p style="color:green;">
                    ${data.message}
                </p>
            `;

        } catch (error) {
            resultDiv.innerHTML = `<p style="color:red;">Erreur de connexion au serveur.</p>`;
            console.error("Erreur :", error);
        }
    });
});

