<?php
/**
 * Cotton Dome LDA - Database Fix & Sync Script
 */

require_once __DIR__ . '/config.php';

try {
    echo "<h3>A inicializar correcao da Base de Dados...</h3>";

    // 1. Update site_settings email to suporte@domme.pt
    $stmt1 = $pdo->prepare("UPDATE site_settings SET email = 'suporte@domme.pt' WHERE id = 1 OR email LIKE '%[Inserir%'");
    $stmt1->execute();
    echo "<p>[OK] E-mail atualizado na tabela site_settings.</p>";

    // Update main service images and descriptions in DB to professional assets
    // CCTV
    $pdo->query("UPDATE services SET 
        image = 'images/cctv-hero.png',
        slogan = 'Vigilância inteligente 24/7 com câmeras de alta definição e IA para proteger o que mais importa.',
        short_description = 'Câmeras IP e analógicas HD com inteligência artificial, gravação contínua e monitorização remota em tempo real via app.'
    WHERE id = 1 OR slug = 'cctv-videovigilancia'");
    
    // Alarmes (Serviço Original)
    $pdo->query("UPDATE services SET 
        slug = 'alarme-intrusao',
        title = 'Sistemas de Alarme e Intrusão',
        image = 'images/alarme-hero.png',
        slogan = 'Proteção inteligente contra invasões com alertas instantâneos e resposta imediata no seu telemóvel.',
        short_description = 'Centrais de alarme conectadas, sensores PIR avançados, sirenes de alto impacto e proteção perimetral 24/7.'
    WHERE id = 2");

    // Novo Serviço: Intrusões / Sistemas de Alarme (ID 11)
    $check11 = $pdo->query("SELECT id FROM services WHERE id = 11");
    if (!$check11->fetch()) {
        $pdo->query("INSERT INTO services (id, title, slug, short_description, icon, image, is_active, display_order) VALUES
        (11, 'Intrusões / Sistemas de Alarme', 'intrusao-sistemas-alarme', 'Proteção inteligente contra acessos não autorizados, tentativas de invasão e situações de risco.', 'ShieldAlert', 'images/alarme-intrusao-1.png', 1, 11)");
        echo "<p>[OK] Novo serviço ID 11 adicionado à tabela services.</p>";
    } else {
        $pdo->query("UPDATE services SET 
            slug = 'intrusao-sistemas-alarme',
            title = 'Intrusões / Sistemas de Alarme',
            image = 'images/alarme-intrusao-1.png'
        WHERE id = 11");
    }

    // Insert service_pages for ID 11 if it does not exist
    $checkPage11 = $pdo->query("SELECT id FROM service_pages WHERE service_id = 11");
    if (!$checkPage11->fetch()) {
        $pdo->query("INSERT INTO service_pages (service_id, page_title, impact_phrase, full_description, applications, related_products, benefits, work_process, gallery_images, final_cta_title, final_cta_text, seo_title, seo_description, seo_keywords) VALUES
        (11, 'Intrusões / Sistemas de Alarme', 'Proteção inteligente contra acessos não autorizados, tentativas de invasão e situações de risco.', 'A Cotton Dome LDA desenvolve soluções completas de intrusão e alarme para residências, condomínios, empresas, espaços comerciais e ambientes industriais, utilizando equipamentos modernos, tecnologia sem fios e sistemas de deteção profissional.', 
        '[\"Residências\", \"Condomínios\", \"Empresas\", \"Lojas\", \"Escritórios\", \"Armazéns\", \"Indústrias\", \"Espaços comerciais\"]', 
        '[\"AJ-COMBIPROTECT-S-W\", \"AJ-CURTAINOUTDOOR-W\", \"AJ-FIREPROTECTPLUS-B\", \"AJ-MOTIONCAMOUTDOOR-W\"]', 
        '[\"Proteção contra acessos não autorizados\", \"Deteção rápida de movimentos suspeitos\", \"Alerta imediato em situações de risco\", \"Segurança para ambientes internos e externos\", \"Integração com CCTV e acessos\", \"Equipamentos modernos e discretos\"]', 
        '[\"Análise do espaço\", \"Escolha da solução\", \"Instalação profissional\", \"Configuração e acompanhamento\"]', 
        '[\"images/alarme-intrusao-1.png\", \"images/alarme-intrusao-2.png\", \"images/alarme-intrusao-3.png\"]', 
        'Precisa proteger o seu espaço contra intrusões?', 
        'A Cotton Dome LDA desenvolve soluções de alarme e intrusão à medida, combinando tecnologia, segurança e profissionalismo para proteger pessoas, património e operações.', 
        'Intrusões e Sistemas de Alarme | Cotton Dome LDA', 
        'Soluções profissionais de intrusão e sistemas de alarme para residências, empresas e condomínios. Sensores, detetores, proteção perimetral e segurança eletrónica.', 
        'sistemas de alarme, intrusão, detetores de movimento, segurança eletrónica, alarmes residenciais')");
        echo "<p>[OK] Página de serviço ID 11 adicionada à tabela service_pages.</p>";
    }
    
    // Controlo de Acesso
    $pdo->query("UPDATE services SET 
        image = 'images/controlo-acessos-hero.png',
        slogan = 'Segurança máxima em cada entrada: apenas pessoas autorizadas acedem ao seu espaço.',
        short_description = 'Biometria, reconhecimento facial, RFID e fechaduras eletrónicas para controlo total de acessos em empresas e condomínios.'
    WHERE id = 3 OR slug = 'controlo-de-acessos'");
    
    echo "<p>[OK] Imagens e textos dos serviços principais CCTV, Alarmes e Controlo de Acessos atualizados na BD.</p>";

    // 2. Check if gallery_images column exists in service_pages, if not add it
    $q = $pdo->query("SHOW COLUMNS FROM service_pages LIKE 'gallery_images'");
    $columnExists = $q->fetch();

    if (!$columnExists) {
        $pdo->query("ALTER TABLE service_pages ADD COLUMN gallery_images TEXT DEFAULT NULL");
        echo "<p>[OK] Coluna 'gallery_images' adicionada a tabela service_pages.</p>";
    } else {
        echo "<p>[INFO] A coluna 'gallery_images' ja existe na tabela service_pages.</p>";
    }

    // 3. Seed/Update default gallery images for all services
    $defaultImages = [
        1 => '["images/cctv-1.png","images/cctv-2.png","images/cctv-3.png"]',
        2 => '["images/alarme-intrusao-1.png","images/alarme-intrusao-2.png","images/alarme-intrusao-3.png","images/alarme-intrusao-4.png"]',
        3 => '["images/controlo-acessos-1.png","images/controlo-acessos-2.png","images/controlo-acessos-3.png"]',
        4 => '["images/deteccao-incendio-1.png","images/deteccao-incendio-2.png","images/deteccao-incendio-3.png"]',
        5 => '["images/automatismos-1.png","images/automatismos-2.png","images/automatismos-3.png"]',
        6 => '["images/portas-portoes-1.png","images/portas-portoes-2.png","images/portas-portoes-3.png"]',
        7 => '["images/ups-1.png","images/ups-2.png","images/ups-3.png"]',
        8 => '["images/serralharia-1.png","images/serralharia-2.png","images/serralharia-3.png"]',
        9 => '["images/telecomunicacoes-1.png","images/telecomunicacoes-2.png","images/telecomunicacoes-3.png"]',
        10 => '["https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=600&q=80","https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=600&q=80","https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80"]'
    ];

    foreach ($defaultImages as $serviceId => $imagesJson) {
        // Check if page details exist for service
        $check = $pdo->prepare("SELECT id FROM service_pages WHERE service_id = :service_id LIMIT 1");
        $check->execute(['service_id' => $serviceId]);
        $row = $check->fetch();

        if ($row) {
            // Force synchronize/update all gallery images to ensure correct paths
            $up = $pdo->prepare("UPDATE service_pages SET gallery_images = :images WHERE id = :id");
            $up->execute(['images' => $imagesJson, 'id' => $row['id']]);
            echo "<p>[OK] Imagens da galeria sincronizadas para o servico ID {$serviceId}.</p>";
        }
    }

    echo "<h3>[SUCESSO] Base de dados reparada com sucesso!</h3>";
    echo "<p>Por favor, recarregue a pagina do seu site agora.</p>";

} catch (Exception $e) {
    echo "<h3>[ERRO] Ocorreu uma falha ao reparar a base de dados:</h3>";
    echo "<pre>" . htmlspecialchars($e->getMessage()) . "</pre>";
}
