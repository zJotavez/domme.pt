<?php
/**
 * Cotton Dome LDA - JSON Database Migration & Fix Script
 * Executável via URL para corrigir a base de dados JSON no servidor de produção.
 */

require_once __DIR__ . '/config.php';

header('Content-Type: text/html; charset=utf-8');

try {
    echo "<h3>A inicializar correção da Base de Dados JSON...</h3>";

    $credFile = DATA_DIR . 'credentials.json';
    $dataFile = DATA_FILE;

    // Garantir que a pasta de dados existe
    if (!is_dir(DATA_DIR)) {
        mkdir(DATA_DIR, 0755, true);
        echo "<p>[INFO] Pasta de dados criada.</p>";
    }

    // Se o site_data.json já existir no servidor, vamos migrar os slugs e adicionar o novo serviço 11
    if (file_exists($dataFile)) {
        $raw = file_get_contents($dataFile);
        $data = json_decode($raw, true) ?: [];
        echo "<p>[OK] Ficheiro site_data.json carregado com sucesso.</p>";

        $modified = false;

        // 1. Corrigir slug de ID 2 e adicionar ID 11 em services
        if (isset($data['services']) && is_array($data['services'])) {
            $hasId11 = false;
            foreach ($data['services'] as &$service) {
                if (intval($service['id']) === 2 && $service['slug'] === 'intrusao-sistemas-alarme') {
                    $service['slug'] = 'alarme-intrusao';
                    echo "<p>[MIGRAÇÃO] Slug do serviço ID 2 alterado de 'intrusao-sistemas-alarme' para 'alarme-intrusao'.</p>";
                    $modified = true;
                }
                if (intval($service['id']) === 11) {
                    $hasId11 = true;
                }
            }

            if (!$hasId11) {
                // Adiciona o ID 11
                $defaultData = getDefaultData();
                $newService = null;
                foreach ($defaultData['services'] as $ds) {
                    if (intval($ds['id']) === 11) {
                        $newService = $ds;
                        break;
                    }
                }
                if ($newService) {
                    $data['services'][] = $newService;
                    echo "<p>[MIGRAÇÃO] Serviço ID 11 (Intrusões / Sistemas de Alarme - Versão Nova) adicionado ao JSON.</p>";
                    $modified = true;
                }
            }
        }

        // 2. Adicionar service_page para ID 11 em service_pages
        if (isset($data['service_pages']) && is_array($data['service_pages'])) {
            $hasPage11 = false;
            foreach ($data['service_pages'] as $page) {
                if (intval($page['service_id']) === 11) {
                    $hasPage11 = true;
                    break;
                }
            }

            if (!$hasPage11) {
                $defaultData = getDefaultData();
                $newPage = null;
                foreach ($defaultData['service_pages'] as $dp) {
                    if (intval($dp['service_id']) === 11) {
                        $newPage = $dp;
                        break;
                    }
                }
                if ($newPage) {
                    $data['service_pages'][] = $newPage;
                    echo "<p>[MIGRAÇÃO] Página de detalhe para serviço ID 11 adicionada ao JSON.</p>";
                    $modified = true;
                }
            }
        }

        // Se modificamos alguma coisa, salvar o arquivo JSON
        if ($modified) {
            if (writeData($data)) {
                echo "<p style='color:green;'><b>[OK] Ficheiro site_data.json atualizado e salvo com sucesso!</b></p>";
            } else {
                echo "<p style='color:red;'><b>[ERRO] Falha ao gravar no ficheiro site_data.json. Verifique as permissões de gravação da pasta.</b></p>";
            }
        } else {
            echo "<p>[INFO] Não foram necessárias alterações no site_data.json (os dados já estavam atualizados).</p>";
        }

    } else {
        // Se o ficheiro não existe, ele será gerado automaticamente com getDefaultData() no primeiro acesso
        echo "<p>[INFO] O ficheiro site_data.json não existe fisicamente. Será inicializado automaticamente com os valores corretos predefinidos no código.</p>";
        
        // Criar o arquivo de forma preventiva
        $defaultData = getDefaultData();
        if (writeData($defaultData)) {
            echo "<p style='color:green;'><b>[OK] Ficheiro site_data.json predefinido criado com sucesso!</b></p>";
        } else {
            echo "<p style='color:red;'><b>[ERRO] Falha ao criar o ficheiro de dados predefinido. Verifique as permissões de pasta.</b></p>";
        }
    }

    echo "<h4 style='color:blue;'>Migração concluída com sucesso. Pode fechar esta página.</h4>";

} catch (Exception $e) {
    echo "<p style='color:red;'><b>[ERRO CRÍTICO] Falha na migração: " . $e->getMessage() . "</b></p>";
}
