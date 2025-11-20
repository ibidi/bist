/**
 * Logo utility functions
 */

// Türk şirketlerinin domain mapping'i
const COMPANY_DOMAINS: Record<string, string> = {
  // Bankalar
  'GARAN': 'garantibbva.com.tr',
  'AKBNK': 'akbank.com',
  'ISCTR': 'isbank.com.tr',
  'HALKB': 'halkbank.com.tr',
  'VAKBN': 'vakifbank.com.tr',
  'YKBNK': 'yapikredi.com.tr',
  'QNBFB': 'qnb.com.tr',
  'ALBRK': 'albaraka.com.tr',
  'SKBNK': 'sekerbankasi.com.tr',
  
  // Holding
  'SAHOL': 'sabanci.com',
  'KCHOL': 'koc.com.tr',
  'DOHOL': 'dogusholding.com.tr',
  'AGHOL': 'anadolugrubu.com.tr',
  
  // Havacılık & Ulaşım
  'THYAO': 'turkishairlines.com',
  'PGSUS': 'flypgs.com',
  'TAVHL': 'tav.aero',
  
  // Teknoloji & Telekomünikasyon
  'TCELL': 'turkcell.com.tr',
  'TTKOM': 'turktelekom.com.tr',
  'ASELS': 'aselsan.com.tr',
  'LOGO': 'logo.com.tr',
  'NETAS': 'netas.com.tr',
  
  // Perakende & Gıda
  'BIMAS': 'bim.com.tr',
  'MGROS': 'migros.com.tr',
  'SOKM': 'sokmarket.com.tr',
  'ULKER': 'ulker.com.tr',
  'AEFES': 'anadoluefes.com',
  'CCOLA': 'coca-colaturkiye.com',
  'KNFRT': 'konfrut.com.tr',
  
  // Enerji & Petrol
  'TUPRS': 'tupras.com.tr',
  'PETKM': 'petkim.com.tr',
  'AKSEN': 'akenerji.com.tr',
  'AKENR': 'akenerji.com.tr',
  'ZOREN': 'zorluenerji.com.tr',
  
  // Otomotiv
  'TOASO': 'tofas.com.tr',
  'FROTO': 'ford.com.tr',
  'OTKAR': 'otokar.com.tr',
  'TTRAK': 'tmrtrk.com',
  
  // Demir-Çelik & İnşaat
  'EREGL': 'erdemir.com.tr',
  'KRDMD': 'kardemir.com',
  'ENKAI': 'enka.com',
  'ANACM': 'anadolucam.com.tr',
  'OYAKC': 'oyakcement.com.tr',
  
  // Beyaz Eşya & Elektronik
  'ARCLK': 'arcelik.com',
  'VESTL': 'vestel.com.tr',
  'BSHB': 'bsh-group.com',
  
  // Cam & Kimya
  'SISE': 'sisecam.com.tr',
  'SODA': 'sisecam.com.tr',
  'BRSAN': 'borusan.com',
  
  // Gayrimenkul
  'EKGYO': 'emlakkonut.com.tr',
  'ISGYO': 'isgyo.com.tr',
  'TRGYO': 'torunlargyo.com.tr',
  
  // Diğer
  'KOZAL': 'koza.com.tr',
  'KOZAA': 'koza.com.tr',
  'IPEKE': 'ipek.com.tr',
  'DOAS': 'doas.com.tr',
};

/**
 * Get company logo URL
 */
export function getCompanyLogo(symbol: string, size: number = 64): string {
  const domain = COMPANY_DOMAINS[symbol.toUpperCase()];
  
  if (domain) {
    // Clearbit Logo API - ücretsiz ve güvenilir
    return `https://logo.clearbit.com/${domain}?size=${size}`;
  }
  
  // Fallback: Logo.dev API
  return `https://img.logo.dev/${symbol.toLowerCase()}.is?token=pk_X-LvP8JTQqmBwgVKQBJvqQ&size=${size}`;
}

/**
 * Get fallback logo (placeholder)
 */
export function getFallbackLogo(symbol: string): string {
  // UI Avatars - text-based placeholder
  const colors = ['3B82F6', '8B5CF6', 'EC4899', 'F59E0B', '10B981', 'EF4444'];
  const colorIndex = symbol.charCodeAt(0) % colors.length;
  const color = colors[colorIndex];
  
  return `https://ui-avatars.com/api/?name=${symbol}&background=${color}&color=fff&size=128&bold=true`;
}

/**
 * Get logo with fallback
 */
export function getLogoWithFallback(symbol: string, size: number = 64): {
  primary: string;
  fallback: string;
} {
  return {
    primary: getCompanyLogo(symbol, size),
    fallback: getFallbackLogo(symbol),
  };
}
