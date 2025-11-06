<?php
// --- 1️⃣ Importer les données ---
$data = require 'data.php';

// --- 2️⃣ Traitement du formulaire ---
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $sector = $_POST['sector'] ?? null;
    $level = $_POST['level'] ?? null;
    $salary = isset($_POST['salary']) ? (float)$_POST['salary'] : 0;
    $gender = $_POST['gender'] ?? null;

    if ($sector && $level && $gender && $salary > 0) {
        // Moyenne pour ce profil
        $average = $data[$sector][$level][$gender];

        // Calcul de la différence personnelle
        $diff = round((($average - $salary) / $average) * 100, 1);

        // Écart moyen hommes/femmes dans ce secteur et ce niveau
        $sectorGap = round(
            (($data[$sector][$level]['men'] - $data[$sector][$level]['women'])
            / $data[$sector][$level]['men']) * 100, 1
        );

        // Conseils personnalisés
        if ($diff >= 20) {
            $advice = "⚠️ Très gros écart. Il faut agir !";
        } elseif ($diff >= 10) {
            $advice = "💬 Tu peux négocier ton salaire : prépare des arguments solides.";
        } elseif ($diff >= 5) {
            $advice = "🕵️‍♀️ Tu es un peu en dessous de la moyenne, continue à suivre ton évolution.";
        } else {
            $advice = "🎉 Bravo ! Ton salaire est proche de la moyenne du marché.";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>PayGap – Comparateur salarial</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>💼 PayGap – Compare ton salaire</h1>

  <form method="post">
    <label>Secteur :</label>
    <select name="sector">
      <option>IT</option>
      <option>Design</option>
      <option>Marketing</option>
    </select>

    <label>Niveau d'expérience :</label>
    <select name="level">
      <option>junior</option>
      <option>senior</option>
    </select>

    <label>Salaire (net/mois) :</label>
    <input type="number" name="salary" required>

    <label>Genre :</label>
    <select name="gender">
      <option value="women">Femme</option>
      <option value="men">Homme</option>
    </select>

    <button type="submit">Calculer</button>
  </form>

  <?php if (isset($diff)): ?>
    <div class="result">
      <p>Tu gagnes <b><?= abs($diff) ?>%</b> <?= $diff>0?'en dessous':'au-dessus' ?> de la moyenne du secteur.</p>
      <p>Écart moyen hommes/femmes dans ce secteur : <b><?= $sectorGap ?>%</b></p>
      <div class="bar">
        <div style="width: <?= min(max(abs($diff),0),100) ?>%"></div>
      </div>
      <p><i>Conseil :</i> <?= $advice ?></p>
    </div>
  <?php endif; ?>
</body>
</html>

