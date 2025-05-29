<?php
$file = 'tekst.json';
$data = array("test" => "schrijven lukt");
file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
echo "Schrijven voltooid";
?>
