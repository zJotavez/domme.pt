<?php
header('Content-Type: text/html; charset=utf-8');

echo "<h2>Atualizador de Imagens dos Alarmes - Cotton Dome</h2>";

$images = [
    "aj-combiprotect-s-w.jpg",
    "aj-curtainoutdoor-w.jpg",
    "aj-hub2-b.jpg",
    "aj-motioncamoutdoor-w.jpg",
    "aj-motioncamoutdoor-w.png"
];

$githubBaseUrl = "https://raw.githubusercontent.com/zJotavez/COTTON-DOME/main/images/";

// Try to find the root directory
$possiblePaths = [
    "../images/",
    "../../images/",
    "./images/",
    $_SERVER['DOCUMENT_ROOT'] . "/images/"
];

$targetDir = "";
foreach ($possiblePaths as $p) {
    if (is_dir($p)) {
        $targetDir = $p;
        break;
    }
}

if (!$targetDir) {
    // If not found, create it in ../images relative to this api script
    $targetDir = "../images/";
    if (!is_dir($targetDir)) {
        mkdir($targetDir, 0755, true);
    }
}

echo "<p>Diretório de destino identificado: <strong>" . htmlspecialchars($targetDir) . "</strong></p>";

foreach ($images as $img) {
    $sourceUrl = $githubBaseUrl . $img;
    $destPath = $targetDir . $img;
    
    echo "Baixando <strong>$img</strong> de: <a href='$sourceUrl' target='_blank'>GitHub</a>... ";
    
    // Fetch from GitHub
    $ctx = stream_context_create([
        "http" => [
            "header" => "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)\r\n",
            "timeout" => 15
        ]
    ]);
    
    $content = @file_get_contents($sourceUrl, false, $ctx);
    
    if ($content === false) {
        echo "<span style='color:red;'>FALHOU (Erro ao ler do GitHub)</span><br>";
        continue;
    }
    
    $size = strlen($content);
    if ($size < 100) {
        echo "<span style='color:red;'>FALHOU (Ficheiro muito pequeno ou erro: $size bytes)</span><br>";
        continue;
    }
    
    // Save to destination
    $written = @file_put_contents($destPath, $content);
    if ($written !== false) {
        echo "<span style='color:green;'>SUCESSO (Tamanho: $size bytes gravado em $destPath)</span><br>";
    } else {
        echo "<span style='color:red;'>FALHOU (Erro ao gravar no servidor, verifique permissões de escrita)</span><br>";
    }
}

echo "<br><p><strong>Atualização concluída!</strong> Se todos deram SUCESSO, as fotos já estão atualizadas na pasta física do servidor.</p>";
