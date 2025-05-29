<?php
// Bestand: save_message.php

$data = json_decode(file_get_contents('php://input'), true);
if (!$data) exit;

$file = 'berichten.json';

// Laad bestaande berichten
if (file_exists($file)) {
    $messages = json_decode(file_get_contents($file), true);
} else {
    $messages = [];
}

// Voeg nieuw bericht toe
$messages[] = [
    "name" => htmlspecialchars($data['name']),
    "message" => htmlspecialchars($data['message']),
    "time" => date("Y-m-d H:i:s")
];

// Sla op
file_put_contents($file, json_encode($messages, JSON_PRETTY_PRINT));
echo "OK";
?>
