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

        // 1. Remover o serviço antigo ID 2 de 'services' e atualizar o slug do ID 11
        if (isset($data['services']) && is_array($data['services'])) {
            $cleanedServices = [];
            foreach ($data['services'] as $service) {
                if (intval($service['id']) === 2) {
                    echo "<p>[MIGRAÇÃO] Removido o serviço antigo ID 2 (Sistemas de Alarme e Intrusão) do JSON.</p>";
                    $modified = true;
                    continue;
                }
                if (intval($service['id']) === 11) {
                    $service['slug'] = 'alarme-intrusao';
                    $service['display_order'] = 2;
                    echo "<p>[MIGRAÇÃO] Atualizado o serviço ID 11 (Intrusões / Sistemas de Alarme) para usar o slug 'alarme-intrusao' e display_order = 2.</p>";
                    $modified = true;
                }
                $cleanedServices[] = $service;
            }
            $data['services'] = $cleanedServices;
        }

        // 2. Remover a página de detalhe antiga ID 2 de 'service_pages' e atualizar o serviço ID 11
        if (isset($data['service_pages']) && is_array($data['service_pages'])) {
            $cleanedPages = [];
            foreach ($data['service_pages'] as $page) {
                if (intval($page['service_id']) === 2) {
                    echo "<p>[MIGRAÇÃO] Removida a página antiga do serviço ID 2 do JSON.</p>";
                    $modified = true;
                    continue;
                }
                if (intval($page['service_id']) === 11) {
                    // Substituir AJ-FIREPROTECTPLUS-B por AJ-HUB2-B nos produtos relacionados
                    if (isset($page['related_products'])) {
                        if (is_array($page['related_products'])) {
                            foreach ($page['related_products'] as &$prod) {
                                if ($prod === 'AJ-FIREPROTECTPLUS-B') {
                                    $prod = 'AJ-HUB2-B';
                                    echo "<p>[MIGRAÇÃO] Produto relacionado 'AJ-FIREPROTECTPLUS-B' alterado para 'AJ-HUB2-B' na página do serviço ID 11.</p>";
                                    $modified = true;
                                }
                            }
                        } else if (is_string($page['related_products'])) {
                            $prodsArray = json_decode($page['related_products'], true);
                            if (is_array($prodsArray)) {
                                $prodModified = false;
                                foreach ($prodsArray as &$prod) {
                                    if ($prod === 'AJ-FIREPROTECTPLUS-B') {
                                        $prod = 'AJ-HUB2-B';
                                        $prodModified = true;
                                    }
                                }
                                if ($prodModified) {
                                    $page['related_products'] = json_encode($prodsArray);
                                    echo "<p>[MIGRAÇÃO] Produto relacionado 'AJ-FIREPROTECTPLUS-B' alterado para 'AJ-HUB2-B' (formato string) na página do serviço ID 11.</p>";
                                    $modified = true;
                                }
                            }
                        }
                    }
                }
                $cleanedPages[] = $page;
            }
            $data['service_pages'] = $cleanedPages;
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
