<?php
class SalaryData {
    private $data;

    public function __construct($filePath) {
        if (!file_exists($filePath)) {
            throw new Exception("Fichier JSON introuvable : $filePath");
        }
        $json = file_get_contents($filePath);
        $this->data = json_decode($json, true);
    }

    public function getSectorData($sector) {
        return $this->data[$sector] ?? null;
    }

    public function getJobData($sector, $job) {
        return $this->data[$sector]['metiers'][$job] ?? null;
    }

    public function getEcartHF($sector) {
        return $this->data[$sector]['ecartHF'] ?? null;
    }
}
