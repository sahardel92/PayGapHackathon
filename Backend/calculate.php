<?php
// Autoriser les requêtes depuis un autre port (CORS)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header('Content-Type: application/json');

// Gérer la requête préliminaire OPTIONS (prévol CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once __DIR__ . '/classes/SalaryCalculator.php';

try {
    $sector = $_GET['secteur'] ?? null;
    $job = $_GET['metier'] ?? null;
    $niveau = $_GET['niveau'] ?? "Medior"; // par défaut "Medior"
    $userSalary = $_GET['salaire'] ?? null;

    if (!$sector || !$job || !$userSalary) {
        echo json_encode(["error" => "Paramètres manquants."]);
        exit;
    }

    $salaryData = new SalaryData(__DIR__ . '/data/salaries.json');
    $calculator = new SalaryCalculator($salaryData);
    $result = $calculator->calculate($sector, $job, $userSalary, $niveau);

    echo json_encode($result, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    echo json_encode(["error" => $e->getMessage()]);
}