<?php
// Bestand: load_messages.php

$file = '/messages/berichten.json';

if (file_exists($file)) {
    echo file_get_contents($file);
} else {
    echo "[]";
}
?>
