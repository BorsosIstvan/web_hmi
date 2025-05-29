<?php
// Pad naar JSON-bestand
$file = '../messages/berichten.json'; // Pas aan als jouw map anders is

// Een testbericht maken
$nieuwBericht = [
    'gebruiker' => 'TestUser',
    'bericht' => 'Testbericht van testwrite.php',
    'tijd' => date('Y-m-d H:i:s')
];

// Bestaat het bestand al?
if (file_exists($file)) {
    $bestaandeData = json_decode(file_get_contents($file), true);
    if (!is_array($bestaandeData)) {
        $bestaandeData = [];
    }
} else {
    $bestaandeData = [];
}

// Voeg het nieuwe bericht toe
$bestaandeData[] = $nieuwBericht;

// Opslaan
if (file_put_contents($file, json_encode($bestaandeData, JSON_PRETTY_PRINT))) {
    echo "✅ Bericht succesvol opgeslagen!";
} else {
    echo "❌ Opslaan mislukt!";
}
?>
