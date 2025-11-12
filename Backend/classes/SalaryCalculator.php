<?php
require_once __DIR__ . '/SalaryData.php';

class SalaryCalculator {
    private $salaryData;

    public function __construct(SalaryData $salaryData) {
        $this->salaryData = $salaryData;
    }

    public function calculate($sector, $job, $userSalary, $niveau = "Medior") {
        // On récupère les données du métier
        $jobData = $this->salaryData->getJobData($sector, $job);
        if (!$jobData) {
            return ["error" => "Secteur ou métier introuvable."];
        }

        // On garde les vraies valeurs du JSON
        $baseSalary = $jobData['base'];
        $femaleSalary = $jobData['femme'];
        $maleSalary = $jobData['homme'];

        //  Ajustement automatique selon le niveau choisi
        switch ($niveau) {
            case "Junior":
                $baseSalary *= 0.9;    // -10%
                $femaleSalary *= 0.9;
                $maleSalary *= 0.9;
                break;
            case "Senior":
                $baseSalary *= 1.15;   // +15%
                $femaleSalary *= 1.15;
                $maleSalary *= 1.15;
                break;
            default:
                // Medior = valeurs de base (aucun changement)
                break;
        }

        // Calcul des écarts
        $ecartHF = $this->salaryData->getEcartHF($sector);
        $ecartPersonnel = $userSalary - $baseSalary;

        // Message explicatif selon l'écart personnel
        if ($ecartPersonnel < -100) {
            $message = " Ton salaire est en dessous de la moyenne du secteur.";
        } elseif ($ecartPersonnel > 100) {
            $message = " Ton salaire est au-dessus de la moyenne du secteur.";
        } else {
            $message = " Ton salaire est proche de la moyenne.";
        }

        // Résultat renvoyé au front-end
        return [
            "secteur" => $sector,
            "metier" => $job,
            "niveau" => $niveau,
            "salaireUtilisateur" => round($userSalary),
            "moyenneSecteur" => round($baseSalary),
            "salaireFemme" => round($femaleSalary),
            "salaireHomme" => round($maleSalary),
            "ecartPersonnel" => round($ecartPersonnel),
            "ecartHF" => $ecartHF,
            "message" => $message
        ];
    }
}
