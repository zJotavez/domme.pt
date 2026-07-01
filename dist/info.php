<?php
/**
 * Diagnostic Page
 */
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "<h1>Cotton Dome Diagnósticos</h1>";
echo "<p>PHP Version: " . phpversion() . "</p>";

echo "<h2>Verificação de Ficheiros e Pastas</h2>";
$paths = [
    'Config' => __DIR__ . '/api/config.php',
    'Data Dir' => __DIR__ . '/api/data/',
    'Uploads Dir' => __DIR__ . '/uploads/'
];

foreach ($paths as $name => $path) {
    echo "<p><strong>{$name} ({$path}):</strong> ";
    if (file_exists($path)) {
        echo "Existe. ";
        echo is_writable($path) ? "Escritível." : "NÃO escritível.";
    } else {
        echo "Não existe. Tentando criar... ";
        if ($name === 'Data Dir' || $name === 'Uploads Dir') {
            if (@mkdir($path, 0755, true)) {
                echo "Criado com sucesso!";
            } else {
                echo "Falhou ao criar (Erro de permissão).";
            }
        } else {
            echo "N/A";
        }
    }
    echo "</p>";
}

echo "<h2>Carregar Configuração</h2>";
try {
    if (file_exists(__DIR__ . '/api/config.php')) {
        include_once __DIR__ . '/api/config.php';
        echo "<p style='color: green;'>✓ api/config.php incluído com sucesso!</p>";
        $data = readData();
        echo "<p style='color: green;'>✓ Dados lidos com sucesso! Nome da empresa: " . ($data['settings']['company_name'] ?? 'N/A') . "</p>";
    } else {
        echo "<p style='color: red;'>Ficheiro api/config.php não encontrado.</p>";
    }
} catch (Throwable $e) {
    echo "<p style='color: red;'>Erro ao carregar: " . $e->getMessage() . " em " . $e->getFile() . " na linha " . $e->getLine() . "</p>";
}
