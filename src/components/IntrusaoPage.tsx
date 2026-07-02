import React, { useEffect } from "react";
import { motion } from "motion/react";
import { 
  ShieldAlert, CheckCircle2, ArrowLeft, Phone, ShieldCheck, 
  Home, Building, Building2, ShoppingBag, FileText, Box, 
  Factory, Store, HelpCircle, Check, ArrowRight 
} from "lucide-react";
import { CONTACT_INFO } from "../data";

interface IntrusaoPageProps {
  onNavigate: (path: string) => void;
  lang?: "pt" | "en" | "fr";
  dbPageDetails?: any;
  dbSettings?: any;
}

// Translations dictionary for Intrusões/Sistemas de Alarme Page
const CONTENT = {
  pt: {
    hero: {
      title: "Intrusões e Sistemas de Alarme",
      subtitle: "Proteção inteligente contra acessos não autorizados, tentativas de invasão e situações de risco.",
      desc: "A Cotton Dome LDA desenvolve soluções completas de intrusão e alarme para residências, condomínios, empresas, espaços comerciais e ambientes industriais, utilizando equipamentos modernos, tecnologia sem fios e sistemas de deteção profissional.",
      btnQuote: "Solicitar Orçamento",
      btnWhatsapp: "Falar pelo WhatsApp"
    },
    explanatory: {
      title: "Soluções de alarme para proteger o que é importante",
      text: "Os sistemas de intrusão permitem detetar movimentos, acessos indevidos, abertura de portas e janelas, quebra de vidro, presença em áreas protegidas e outros eventos de risco. Com uma solução bem projetada, é possível aumentar a segurança do espaço, reduzir vulnerabilidades e garantir mais tranquilidade para pessoas, empresas e património."
    },
    applications: {
      title: "Onde aplicar sistemas de intrusão?",
      items: [
        { name: "Residências", desc: "Segurança completa para o conforto do seu lar.", icon: Home },
        { name: "Condomínios", desc: "Controlo seguro de acessos comuns e perímetros.", icon: Building },
        { name: "Empresas", desc: "Proteção inteligente de ativos e colaboradores.", icon: Building2 },
        { name: "Lojas", desc: "Dissuasão de furtos e segurança para o comércio.", icon: ShoppingBag },
        { name: "Escritórios", desc: "Acessos autorizados e controlo em áreas de trabalho.", icon: FileText },
        { name: "Armazéns", desc: "Proteção de mercadorias e deteção em grandes áreas.", icon: Box },
        { name: "Indústrias", desc: "Sistemas de alta durabilidade para ambientes complexos.", icon: Factory },
        { name: "Espaços comerciais", desc: "Segurança integrada para clientes e negócios.", icon: Store }
      ]
    },
    products: {
      title: "Produtos e soluções para intrusão",
      subtitle: "Equipamentos profissionais para deteção, alerta e proteção de ambientes internos e externos.",
      btnQuote: "Solicitar Orçamento",
      btnInterest: "Tenho interesse",
      benefitLabel: "Benefício",
      items: [
        {
          id: "AJ-COMBIPROTECT-S-W",
          model: "AJ-COMBIPROTECT-S-W",
          category: "Detector PIR e quebra de vidro",
          desc: "Detector combinado para proteção contra movimento e quebra de vidro, ideal para ambientes internos que exigem segurança reforçada.",
          features: [
            "Detector PIR e vidro certificado NFA2P Grau 2",
            "Tecnologia Ajax Superior",
            "Suporte com parafuso de fixação",
            "Sem fios 868 MHz Jeweller",
            "Imune à presença de animais domésticos",
            "Sensibilidade ajustável",
            "Deteção PIR até 12 m",
            "Deteção de quebra de vidro até 9 m"
          ],
          image: "/images/aj-combiprotect-s-w.jpg",
          benefit: "Combina deteção de movimentos e quebra de vidros num só dispositivo inteligente."
        },
        {
          id: "AJ-CURTAINOUTDOOR-W",
          model: "AJ-CURTAINOUTDOOR-W",
          category: "Detector PIR tipo cortina para exterior",
          desc: "Detector tipo cortina para proteção perimetral em áreas externas, ideal para entradas, fachadas, janelas, corredores e perímetros sensíveis.",
          features: [
            "Detector PIR tipo cortina para exterior",
            "Sem fios 868 MHz Jeweller",
            "PIR duplo tipo cortina",
            "Micro-ondas 24 GHz",
            "Faixa de deteção de 8 a 12 m",
            "Ângulo aproximado de 8° horizontal e 85° vertical",
            "Antimasking",
            "Sensibilidade ajustável",
            "Uso exterior IP55"
          ],
          image: "/images/aj-curtainoutdoor-w.jpg",
          benefit: "Cria um escudo invisível vertical, protegendo acessos antes de haver intrusão física."
        },
        {
          id: "AJ-HUB2-B",
          model: "AJ-HUB2-B",
          category: "Central de alarme inteligente",
          desc: "Painel de controlo inteligente que monitoriza todos os dispositivos sem fios da rede, gere os alarmes e envia notificações instantâneas.",
          features: [
            "Central de alarme inteligente Grau 2",
            "Suporta foto-verificação de alarmes",
            "Canais de comunicação: Ethernet e Dual SIM",
            "Notificações push, SMS e chamadas de voz",
            "Até 100 dispositivos conectados",
            "Bateria de backup integrada (até 16h)",
            "Protocolo Jeweller de alta segurança"
          ],
          image: "/images/aj-hub2-b.jpg",
          benefit: "O cérebro do sistema de segurança, garantindo comunicação rápida e redundante em qualquer situação."
        },
        {
          id: "AJ-MOTIONCAMOUTDOOR-W",
          model: "AJ-MOTIONCAMOUTDOOR-W",
          category: "Fotodetector PIR exterior com imagem",
          desc: "Fotodetector exterior com deteção PIR e envio de imagens, indicado para monitorização avançada de áreas externas.",
          features: [
            "Fotodetector PIR exterior Grau 2",
            "Sem fios 868 MHz Jeweller",
            "Deteção ajustável de 3 a 15 m",
            "Envio de imagens em VGA 640x480",
            "Antimasking",
            "Imune a animais de estimação",
            "Uso exterior IP55"
          ],
          image: "/images/aj-motioncamoutdoor-w.jpg",
          benefit: "Evita falsos alarmes com verificação fotográfica instantânea de ocorrências no exterior."
        }
      ]
    },
    benefits: {
      title: "Benefícios dos sistemas de intrusão",
      items: [
        "Proteção contra acessos não autorizados",
        "Deteção rápida de movimentos suspeitos",
        "Alerta imediato em situações de risco",
        "Segurança para ambientes internos e externos",
        "Integração com CCTV e controlo de acessos",
        "Equipamentos modernos e discretos",
        "Mais tranquilidade para residências e empresas",
        "Soluções adaptadas à necessidade de cada espaço"
      ]
    },
    process: {
      title: "Como a Cotton Dome trabalha",
      items: [
        { num: "01", title: "Análise do espaço", desc: "Identificamos os pontos de risco, entradas, perímetros e áreas que precisam de proteção." },
        { num: "02", title: "Escolha da solução", desc: "Selecionamos sensores, centrais e equipamentos adequados para cada ambiente." },
        { num: "03", title: "Instalação profissional", desc: "Realizamos a instalação de forma organizada, técnica e segura." },
        { num: "04", title: "Configuração e acompanhamento", desc: "Configuramos o sistema, testamos os dispositivos e orientamos o cliente sobre o funcionamento." }
      ]
    },
    cta: {
      title: "Precisa proteger o seu espaço contra intrusões?",
      text: "A Cotton Dome LDA desenvolve soluções de alarme e intrusão à medida, combinando tecnologia, segurança e profissionalismo para proteger pessoas, património e operações.",
      btnQuote: "Solicitar Orçamento",
      btnWhatsapp: "Falar pelo WhatsApp"
    }
  },
  en: {
    hero: {
      title: "Intrusions and Alarm Systems",
      subtitle: "Smart protection against unauthorized access, intrusion attempts, and risk situations.",
      desc: "Cotton Dome LDA develops complete intrusion and alarm solutions for homes, residential areas, companies, commercial spaces, and industrial environments, using modern equipment, wireless technology, and professional detection systems.",
      btnQuote: "Request a Quote",
      btnWhatsapp: "Talk on WhatsApp"
    },
    explanatory: {
      title: "Alarm solutions to protect what matters",
      text: "Intrusion systems allow detecting motion, unauthorized access, opening of doors and windows, glass break, presence in protected areas, and other risk events. With a well-designed solution, it is possible to increase security, reduce vulnerabilities, and ensure more peace of mind for people, businesses, and property."
    },
    applications: {
      title: "Where to apply intrusion systems?",
      items: [
        { name: "Residences", desc: "Complete security for the comfort of your home.", icon: Home },
        { name: "Condominiums", desc: "Secure control of common access and perimeters.", icon: Building },
        { name: "Companies", desc: "Smart protection of assets and employees.", icon: Building2 },
        { name: "Shops", desc: "Theft deterrence and security for retail.", icon: ShoppingBag },
        { name: "Offices", desc: "Authorized access and control in workspaces.", icon: FileText },
        { name: "Warehouses", desc: "Merchandise protection and detection in large areas.", icon: Box },
        { name: "Industries", desc: "High-durability systems for complex environments.", icon: Factory },
        { name: "Commercial spaces", desc: "Integrated security for customers and businesses.", icon: Store }
      ]
    },
    products: {
      title: "Intrusion products and solutions",
      subtitle: "Professional equipment for detection, alert, and protection of indoor and outdoor environments.",
      btnQuote: "Request a Quote",
      btnInterest: "I'm interested",
      benefitLabel: "Benefit",
      items: [
        {
          id: "AJ-COMBIPROTECT-S-W",
          model: "AJ-COMBIPROTECT-S-W",
          category: "PIR and glass break detector",
          desc: "Combined detector for motion and glass break protection, ideal for indoor environments requiring enhanced security.",
          features: [
            "PIR detector and certified glass NFA2P Grade 2",
            "Ajax Superior Technology",
            "Bracket with fixing screw",
            "Wireless 868 MHz Jeweller",
            "Immune to the presence of pets",
            "Adjustable sensitivity",
            "PIR detection up to 12 m",
            "Glass break detection up to 9 m"
          ],
          image: "/images/aj-combiprotect-s-w.jpg",
          benefit: "Combines motion detection and glass breakage in a single smart device."
        },
        {
          id: "AJ-CURTAINOUTDOOR-W",
          model: "AJ-CURTAINOUTDOOR-W",
          category: "Outdoor curtain PIR detector",
          desc: "Curtain-type detector for perimeter protection in outdoor areas, ideal for entrances, facades, windows, corridors, and sensitive perimeters.",
          features: [
            "Outdoor curtain-type PIR detector",
            "Wireless 868 MHz Jeweller",
            "Dual curtain PIR",
            "24 GHz microwave",
            "Detection range of 8 to 12 m",
            "Approx angle of 8° horizontal and 85° vertical",
            "Antimasking",
            "Adjustable sensitivity",
            "IP55 outdoor use"
          ],
          image: "/images/aj-curtainoutdoor-w.jpg",
          benefit: "Creates a vertical invisible shield, protecting entries before physical intrusion occurs."
        },
        {
          id: "AJ-HUB2-B",
          model: "AJ-HUB2-B",
          category: "Smart alarm control panel",
          desc: "Smart control panel that monitors all wireless network devices, manages alarms, and sends instant notifications.",
          features: [
            "Smart alarm control panel Grade 2",
            "Supports photo-verification of alarms",
            "Communication channels: Ethernet and Dual SIM",
            "Push notifications, SMS, and voice calls",
            "Up to 100 connected devices",
            "Built-in backup battery (up to 16h)",
            "High-security Jeweller protocol"
          ],
          image: "/images/aj-hub2-b.jpg",
          benefit: "The brain of the security system, ensuring fast and redundant communication in any situation."
        },
        {
          id: "AJ-MOTIONCAMOUTDOOR-W",
          model: "AJ-MOTIONCAMOUTDOOR-W",
          category: "Outdoor PIR photodetector with image",
          desc: "Outdoor photodetector with PIR detection and image transmission, designed for advanced monitoring of outdoor areas.",
          features: [
            "Outdoor PIR photodetector Grade 2",
            "Wireless 868 MHz Jeweller",
            "Adjustable detection from 3 to 15 m",
            "VGA 640x480 image transmission",
            "Antimasking",
            "Pet immune",
            "IP55 outdoor use"
          ],
          image: "/images/aj-motioncamoutdoor-w.jpg",
          benefit: "Prevents false alarms with instant photo verification of outdoor events on your phone."
        }
      ]
    },
    benefits: {
      title: "Benefits of intrusion systems",
      items: [
        "Protection against unauthorized access",
        "Fast detection of suspicious movements",
        "Immediate alert in risk situations",
        "Security for indoor and outdoor environments",
        "Integration with CCTV and access control",
        "Modern and discrete equipment",
        "More peace of mind for homes and businesses",
        "Solutions adapted to the needs of each space"
      ]
    },
    process: {
      title: "How Cotton Dome works",
      items: [
        { num: "01", title: "Space analysis", desc: "We identify risk points, entrances, perimeters, and areas in need of protection." },
        { num: "02", title: "Solution selection", desc: "We select appropriate sensors, control panels, and equipment for each environment." },
        { num: "03", title: "Professional installation", desc: "We perform the installation in an organized, technical, and secure manner." },
        { num: "04", title: "Configuration & monitoring", desc: "We configure the system, test all devices, and guide the client on operations." }
      ]
    },
    cta: {
      title: "Need to protect your space against intrusions?",
      text: "Cotton Dome LDA develops tailored alarm and intrusion solutions, combining technology, security, and professionalism to protect people, assets, and operations.",
      btnQuote: "Request a Quote",
      btnWhatsapp: "Talk on WhatsApp"
    }
  },
  fr: {
    hero: {
      title: "Intrusions et Systèmes d'Alarme",
      subtitle: "Protection intelligente contre les accès non autorisés, les tentatives d'intrusion et les situations de risque.",
      desc: "Cotton Dome LDA développe des solutions complètes d'intrusion et d'alarme pour les maisons, les résidences, les entreprises, les espaces commerciaux et les environnements industriels, en utilisant des équipements modernes, la technologie sans fil et des systèmes de détection professionnels.",
      btnQuote: "Demander un devis",
      btnWhatsapp: "Parler sur WhatsApp"
    },
    explanatory: {
      title: "Des solutions d'alarme pour proteger ce qui est important",
      text: "Les systèmes d'intrusion permettent de détecter les mouvements, les accès non autorisés, l'ouverture des portes et fenêtres, le bris de verre, la présence dans les zones protégées et d'autres événements à risque. Avec une solution bien conçue, il est possible d'augmenter la sécurité de l'espace, de réduire les vulnérabilités et de garantir plus de tranquillité pour les personnes, les entreprises et le patrimoine."
    },
    applications: {
      title: "Où appliquer les systèmes d'intrusion?",
      items: [
        { name: "Résidences", desc: "Sécurité complète pour le confort de votre maison.", icon: Home },
        { name: "Copropriétés", desc: "Contrôle sécurisé des accès communs et des périmètres.", icon: Building },
        { name: "Entreprises", desc: "Protection intelligente des actifs et des collaborateurs.", icon: Building2 },
        { name: "Boutiques", desc: "Dissuasion des vols et sécurité pour le commerce.", icon: ShoppingBag },
        { name: "Bureaux", desc: "Accès autorisés et contrôle dans les espaces de travail.", icon: FileText },
        { name: "Entrepôts", desc: "Protection des marchandises et détection dans les grandes zones.", icon: Box },
        { name: "Industries", desc: "Systèmes de haute durabilité pour environnements complexes.", icon: Factory },
        { name: "Espaces commerciaux", desc: "Sécurité intégrée pour les clients et les commerces.", icon: Store }
      ]
    },
    products: {
      title: "Produits et solutions d'intrusion",
      subtitle: "Équipement professionnel pour la détection, l'alerte et la protection des environnements intérieurs et extérieurs.",
      btnQuote: "Demander un devis",
      btnInterest: "Je suis intéressé",
      benefitLabel: "Avantage",
      items: [
        {
          id: "AJ-COMBIPROTECT-S-W",
          model: "AJ-COMBIPROTECT-S-W",
          category: "Détecteur PIR et bris de verre",
          desc: "Détecteur combiné pour la protection contre les mouvements et le bris de verre, idéal pour les environnements intérieurs exigeant une sécurité renforcée.",
          features: [
            "Détecteur PIR et verre certifié NFA2P Grade 2",
            "Technologie Ajax Superior",
            "Support avec vis de fixation",
            "Sans fil 868 MHz Jeweller",
            "Immunisé contre les animaux domestiques",
            "Sensibilité réglable",
            "Détection PIR jusqu'à 12 m",
            "Détection de bris de verre jusqu'à 9 m"
          ],
          image: "/images/aj-combiprotect-s-w.jpg",
          benefit: "Combine détection de mouvements et bris de glace en un seul appareil intelligent."
        },
        {
          id: "AJ-CURTAINOUTDOOR-W",
          model: "AJ-CURTAINOUTDOOR-W",
          category: "Détecteur PIR de type rideau pour extérieur",
          desc: "Détecteur de type rideau pour la protection périmétrique des zones extérieures, idéal pour les entrées, façades, fenêtres, couloirs et périmètres sensibles.",
          features: [
            "Détecteur PIR de type rideau pour extérieur",
            "Sans fil 868 MHz Jeweller",
            "Double PIR de type rideau",
            "Micro-ondes 24 GHz",
            "Plage de détection de 8 à 12 m",
            "Angle approximatif de 8° horizontal et 85° vertical",
            "Anti-masquage",
            "Sensibilité réglable",
            "Usage extérieur IP55"
          ],
          image: "/images/aj-curtainoutdoor-w.jpg",
          benefit: "Crée un bouclier invisible vertical, protégeant les accès avant l'intrusion physique."
        },
        {
          id: "AJ-HUB2-B",
          model: "AJ-HUB2-B",
          category: "Centrale d'alarme inteligente",
          desc: "Panneau de contrôle intelligent qui surveille tous les appareils réseau sans fil, gère les alarmes et envoie des notifications instantanées.",
          features: [
            "Centrale d'alarme intelligente Grade 2",
            "Prend en charge la photo-vérification des alarmes",
            "Canaux de communication : Ethernet et Dual SIM",
            "Notifications push, SMS et appels vocaux",
            "Jusqu'à 100 appareils connectés",
            "Batterie de secours intégrée (jusqu'à 16h)",
            "Protocole Jeweller haute sécurité"
          ],
          image: "/images/aj-hub2-b.jpg",
          benefit: "Le cerveau du système de sécurité, assurant une communication rapide et redondante en toutes circonstances."
        },
        {
          id: "AJ-MOTIONCAMOUTDOOR-W",
          model: "AJ-MOTIONCAMOUTDOOR-W",
          category: "Photodétecteur PIR extérieur avec image",
          desc: "Photodétecteur extérieur avec détection PIR et envoi d'images, indiqué pour la surveillance avancée des zones extérieures.",
          features: [
            "Photodétecteur PIR extérieur Grade 2",
            "Sans fil 868 MHz Jeweller",
            "Détection réglable de 3 à 15 m",
            "Envoi d'images en VGA 640x480",
            "Anti-masquage",
            "Immunisé contre les animaux de compagnie",
            "Usage extérieur IP55"
          ],
          image: "/images/aj-motioncamoutdoor-w.jpg",
          benefit: "Évite les fausses alertes avec vérification photo instantanée des événements extérieurs sur votre mobile."
        }
      ]
    },
    benefits: {
      title: "Avantages des systèmes d'intrusion",
      items: [
        "Protection contre les accès non autorisés",
        "Détection rapide des mouvements suspects",
        "Alerte immédiate en cas de situation de risque",
        "Sécurité pour les environnements intérieurs et extérieurs",
        "Intégration avec la vidéosurveillance et le contrôle d'accès",
        "Équipements modernes et discrets",
        "Plus de tranquillité pour les maisons et les entreprises",
        "Solutions adaptées aux besoins de chaque espace"
      ]
    },
    process: {
      title: "Comment fonctionne Cotton Dome",
      items: [
        { num: "01", title: "Analyse de l'espace", desc: "Nous identifions les points de risque, les entrées, les périmètres et les zones nécessitant une protection." },
        { num: "02", title: "Choix de la solution", desc: "Nous sélectionnons les capteurs, les centrales et les équipements appropriés pour chaque environnement." },
        { num: "03", title: "Installation professionnelle", desc: "Nous réalisons l'installation de manière organisée, technique et sécurisée." },
        { num: "04", title: "Configuration et suivi", desc: "Nous configurons le système, testons les appareils et guidons le client sur le fonctionnement." }
      ]
    },
    cta: {
      title: "Besoin de protéger votre espace contre les intrusions?",
      text: "Cotton Dome LDA développe des solutions d'alarme et d'intrusion sur mesure, alliant technologie, sécurité et professionnalisme pour protéger les personnes, les biens et les opérations.",
      btnQuote: "Demander un devis",
      btnWhatsapp: "Parler sur WhatsApp"
    }
  }
};

export function IntrusaoPage({ onNavigate, lang = "pt", dbPageDetails, dbSettings }: IntrusaoPageProps) {
  const t = CONTENT[lang] || CONTENT.pt;

  // Safe parsing helper
  const parseJsonArray = (val: any, defaultVal: any[]) => {
    if (!val) return defaultVal;
    if (Array.isArray(val)) return val;
    try {
      const parsed = JSON.parse(val);
      return Array.isArray(parsed) ? parsed : defaultVal;
    } catch (e) {
      return defaultVal;
    }
  };

  // SEO updates
  useEffect(() => {
    const pageTitle = dbPageDetails?.seo_title || (lang === "pt" ? "Intrusões e Sistemas de Alarme | Cotton Dome LDA" : lang === "en" ? "Intrusions and Alarm Systems | Cotton Dome LDA" : "Intrusions et Systèmes d'Alarme | Cotton Dome LDA");
    const pageDesc = dbPageDetails?.seo_description || (lang === "pt" ? "Soluções profissionais de intrusão e sistemas de alarme para residências, empresas e condomínios. Sensores, detetores, proteção perimetral e segurança eletrónica." : lang === "en" ? "Professional intrusion and alarm system solutions for homes, companies, and condominiums. Sensors, detectors, perimeter protection, and electronic security." : "Solutions professionnelles d'intrusion et de systèmes d'alarme pour résidences, entreprises et copropriétés. Capteurs, détecteurs, protection périmétrique et sécurité électronique.");
    
    document.title = pageTitle;
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", pageDesc);
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "instant" as any });
  }, [lang, dbPageDetails]);

  // Construct Dynamic Data (overriding with database values if set via Admin Panel)
  const displayTitle = dbPageDetails?.page_title || t.hero.title;
  const displaySubtitle = dbPageDetails?.impact_phrase || t.hero.subtitle;
  const displayDesc = dbPageDetails?.full_description || t.hero.desc;
  
  // Custom applications items mapping
  const dbAppsRaw = parseJsonArray(dbPageDetails?.applications, null);
  const displayApplications = dbAppsRaw ? dbAppsRaw.map((app: any, idx: number) => {
    const defaultItem = t.applications.items[idx] || t.applications.items[0];
    return {
      name: typeof app === "string" ? app : (app.name || defaultItem.name),
      desc: app.desc || defaultItem.desc,
      icon: defaultItem.icon
    };
  }) : t.applications.items;

  // Custom benefits mapping
  const displayBenefits = dbPageDetails?.benefits ? parseJsonArray(dbPageDetails.benefits, t.benefits.items) : t.benefits.items;

  // Custom process timeline mapping
  const dbProcessRaw = parseJsonArray(dbPageDetails?.work_process, null);
  const displayProcess = dbProcessRaw ? dbProcessRaw.map((step: any, idx: number) => {
    const defaultStep = t.process.items[idx] || t.process.items[0];
    return {
      num: defaultStep.num,
      title: typeof step === "string" ? step : (step.title || defaultStep.title),
      desc: step.desc || defaultStep.desc
    };
  }) : t.process.items;

  const displayCtaTitle = dbPageDetails?.final_cta_title || t.cta.title;
  const displayCtaText = dbPageDetails?.final_cta_text || t.cta.text;

  // Products resolving: if dbProducts is set, we can filter or reorder our custom items.
  const dbProductsList = parseJsonArray(dbPageDetails?.related_products, null);
  const displayProducts = dbProductsList ? t.products.items.filter(item => 
    dbProductsList.some((dbP: string) => dbP.toLowerCase().trim() === item.model.toLowerCase().trim())
  ) : t.products.items;

  // If filter left no products, fall back to default premium ones
  const activeProducts = displayProducts.length > 0 ? displayProducts : t.products.items;

  // Resolve Whatsapp Link
  const whatsappVal = dbSettings?.whatsapp || CONTACT_INFO.whatsapp;
  const isWhatsappPlaceholder = whatsappVal.includes("[");
  const cleanWhatsappNumber = isWhatsappPlaceholder ? "351918880788" : whatsappVal.replace(/[^\d]/g, "");
  
  const getWhatsappUrl = (text: string) => {
    return `https://api.whatsapp.com/send?phone=${cleanWhatsappNumber}&text=${encodeURIComponent(text)}`;
  };

  const mainWhatsappUrl = getWhatsappUrl(lang === "pt" ? "Olá Cotton Dome, gostaria de obter mais informações sobre Sistemas de Alarme." : lang === "en" ? "Hello Cotton Dome, I would like to get more information about Alarm Systems." : "Bonjour Cotton Dome, je souhaiterais obtenir plus d'informations sur les systèmes d'alarme.");

  const handleQuoteClick = () => {
    onNavigate("/#contacto");
    setTimeout(() => {
      const element = document.getElementById("contacto");
      if (element) element.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <main className="bg-[#050505] text-[#CFCFCF] min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden border-b border-[#1a1a1a]">
        {/* Background Image */}
        <img
          src="/images/alarme-hero.png"
          alt={displayTitle}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.22] contrast-[1.1] pointer-events-none"
        />

        {/* Gradient Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-[#050505]/85 pointer-events-none"></div>
        <div className="absolute inset-0 tech-grid pointer-events-none opacity-40"></div>

        {/* Golden ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#E2AF55]/3 blur-[140px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-14 h-14 rounded-xl bg-[#111111]/95 border border-[#E2AF55]/45 flex items-center justify-center text-[#E2AF55] mx-auto mb-8 shadow-lg shadow-[#E2AF55]/10"
          >
            <ShieldAlert className="w-7 h-7" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-extrabold text-white tracking-tight uppercase mb-6 leading-tight max-w-4xl mx-auto text-3d-gold"
          >
            {displayTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl font-display font-bold text-[#E2AF55] tracking-wide mb-6 max-w-3xl mx-auto"
          >
            {displaySubtitle}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed max-w-3xl mx-auto mb-10"
          >
            {displayDesc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <button
              onClick={handleQuoteClick}
              className="px-8 py-4 btn-gold-premium text-black font-bold uppercase tracking-widest text-xs rounded transition-all w-full sm:w-auto cursor-pointer"
            >
              {t.hero.btnQuote}
            </button>
            <a
              href={mainWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 btn-gold-outline text-xs rounded font-bold uppercase tracking-widest flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              <span>{t.hero.btnWhatsapp}</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. BLOCO EXPLICATIVO */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-1/3 left-0 w-80 h-80 rounded-full bg-[#E2AF55]/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mb-6 uppercase">
            {t.explanatory.title}
          </h2>
          <p className="text-sm sm:text-base text-[#D9D9D9] font-sans leading-relaxed max-w-3xl mx-auto">
            {t.explanatory.text}
          </p>
        </div>
      </section>

      {/* 3. APLICAÇÕES */}
      <section className="py-24 bg-[#050505] relative overflow-hidden border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase mb-4">
              {t.applications.title}
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {displayApplications.map((app: any, idx: number) => {
              const Icon = app.icon || ShieldCheck;
              return (
                <div 
                  key={idx}
                  className="card-luxury p-5 sm:p-6 rounded-xl group relative overflow-hidden border border-[#222] hover:border-[#E2AF55]/30 transition-all duration-300 flex flex-col justify-start"
                >
                  <div className="w-10 h-10 rounded bg-[#1A1A1A] border border-[#E2AF55]/15 flex items-center justify-center text-[#E2AF55] group-hover:border-[#E2AF55]/40 transition-colors mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-bold text-sm sm:text-base text-white tracking-wide mb-2 group-hover:text-[#E2AF55] transition-colors leading-tight">
                    {app.name}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#D9D9D9] font-sans leading-normal">
                    {app.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRODUTOS RELACIONADOS */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-[#1a1a1a]">
        <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-[#E2AF55]/5 blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase mb-4">
              {t.products.title}
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 font-sans leading-relaxed">
              {t.products.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
            {activeProducts.map((prod: any, idx: number) => {
              const prodWhatsappUrl = getWhatsappUrl(
                lang === "pt" 
                  ? `Olá Cotton Dome, tenho interesse no produto ${prod.model} (${prod.category}).`
                  : lang === "en"
                  ? `Hello Cotton Dome, I'm interested in the product ${prod.model} (${prod.category}).`
                  : `Bonjour Cotton Dome, je suis intéressé par le produit ${prod.model} (${prod.category}).`
              );

              return (
                <div
                  key={prod.id}
                  className="card-luxury rounded-xl border border-[#222] hover:border-[#E2AF55]/40 hover:shadow-lg hover:shadow-[#E2AF55]/5 transition-all duration-300 flex flex-col justify-between overflow-hidden group min-h-[500px]"
                >
                  {/* Image Wrap */}
                  <div className="h-[180px] bg-black/40 flex items-center justify-center p-6 relative overflow-hidden border-b border-[#1a1a1a]">
                    <img
                      src={prod.image}
                      alt={prod.model}
                      className="max-h-full max-w-full object-contain filter brightness-[0.95] group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Content Wrap */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#E2AF55] font-bold block mb-1">
                        {prod.category}
                      </span>
                      <h3 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#E2AF55] transition-colors leading-tight mb-2">
                        {prod.model}
                      </h3>
                      <p className="text-[11px] text-[#CFCFCF] font-sans leading-normal mb-4">
                        {prod.desc}
                      </p>

                      {/* Technical features */}
                      <div className="border-t border-[#222] pt-4 mb-4">
                        <ul className="space-y-1.5">
                          {prod.features.map((feat: string, featIdx: number) => (
                            <li key={featIdx} className="flex items-start gap-2">
                              <Check className="w-3.5 h-3.5 text-[#E2AF55] mt-0.5 flex-shrink-0" />
                              <span className="text-[10px] text-gray-300 font-sans leading-tight">
                                {feat}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Benefit block */}
                    <div className="border-t border-[#222] pt-3 text-[10px] text-gray-400 font-mono">
                      <strong className="text-[#E2AF55] font-semibold uppercase text-[9px] block mb-0.5">
                        {t.products.benefitLabel}:
                      </strong>
                      {prod.benefit}
                    </div>
                  </div>

                  {/* Actions buttons */}
                  <div className="p-5 pt-0 grid grid-cols-1 gap-2 border-t border-[#1a1a1a] pt-4">
                    <button
                      onClick={handleQuoteClick}
                      className="px-4 py-2.5 bg-[#E2AF55] hover:bg-[#C28D35] text-black text-[10px] font-bold uppercase tracking-wider rounded font-display transition-colors text-center cursor-pointer"
                    >
                      {t.products.btnQuote}
                    </button>
                    <a
                      href={prodWhatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 border border-white/10 hover:border-[#E2AF55]/40 text-white text-[10px] font-bold uppercase tracking-wider rounded font-display transition-colors text-center block"
                    >
                      {t.products.btnInterest}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. BENEFÍCIOS DA SOLUÇÃO */}
      <section className="py-24 bg-[#050505] relative overflow-hidden border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase mb-4">
              {t.benefits.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayBenefits.map((benefit: string, idx: number) => (
              <div 
                key={idx}
                className="card-luxury p-6 rounded-xl flex items-start gap-4 border border-[#222]"
              >
                <CheckCircle2 className="w-5 h-5 text-[#E2AF55] mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm text-[#D9D9D9] font-sans leading-relaxed">
                  {benefit}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. COMO A COTTON DOME TRABALHA */}
      <section className="py-24 bg-[#0a0a0a] relative overflow-hidden border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight uppercase mb-4">
              {t.process.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayProcess.map((step: any, idx: number) => (
              <div
                key={idx}
                className="card-luxury p-6 rounded-xl flex flex-col justify-between relative group border border-[#222]"
              >
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display text-3xl font-extrabold text-[#E2AF55]/20 group-hover:text-[#E2AF55]/45 transition-colors">
                    {step.num}
                  </span>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E2AF55]"></div>
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm uppercase text-white tracking-wider mb-2 group-hover:text-[#E2AF55] transition-colors leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#D9D9D9] font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CHAMADA FINAL */}
      <section className="py-28 bg-[#050505] relative overflow-hidden border-t border-[#1a1a1a]">
        {/* Background image related to safety */}
        <img
          src="/images/alarme-intrusao-1.png"
          alt="Alarme Intrusão"
          className="absolute inset-0 w-full h-full object-cover opacity-15 filter brightness-50 contrast-[1.1] pointer-events-none"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black pointer-events-none"></div>
        <div className="absolute inset-0 tech-grid pointer-events-none opacity-20"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight mb-6 uppercase text-3d-gold">
            {displayCtaTitle}
          </h2>
          
          <p className="text-sm sm:text-base text-gray-300 font-sans leading-relaxed max-w-2xl mx-auto mb-10 font-semibold">
            {displayCtaText}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={handleQuoteClick}
              className="px-8 py-4 btn-gold-premium text-black font-bold uppercase tracking-widest text-xs rounded transition-all w-full sm:w-auto cursor-pointer"
            >
              {t.cta.btnQuote}
            </button>
            <a
              href={mainWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 btn-gold-outline text-xs rounded font-bold uppercase tracking-widest flex items-center justify-center gap-2 w-full sm:w-auto"
            >
              <Phone className="w-4 h-4" />
              <span>{t.cta.btnWhatsapp}</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
