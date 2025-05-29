<?php
// Gebruik het juiste pad naar het JSON-bestand
$file = '../messages/berichten.json'; // pas aan als nodig

// Controleer of bestand bestaat
if (file_exists($file)) {
    $json = file_get_contents($file);
    $data = json_decode($json, true);

    echo "<h3>Inhoud van berichten.json:</h3>";
    echo "<pre>";
    print_r($data);
    echo "</pre>";
} else {
    echo "Bestand niet gevonden: " . $file;
}
?>
