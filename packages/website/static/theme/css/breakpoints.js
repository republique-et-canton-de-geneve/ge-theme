export const BREAKPOINTS = {
    xs: '0px',
    sm: '768px', 
    md: '1024px',
    lg: '1440px',
    xl: '1920px',
  };
  
 
  // isMobile : correspond à 'sm' et en dessous (xs) -> down('sm')
  export const isMobile = () => {
    const maxWidth = BREAKPOINTS.sm;
    return {
      matches: window.matchMedia(`(max-width: ${maxWidth})`).matches,
      media: `(max-width: ${maxWidth})`
    };
  };
  
  // isNotMobile : correspond à 'sm' et au-dessus -> up('sm')
  export const isNotMobile = () => {
    const minWidth = BREAKPOINTS.sm;
    return {
      matches: window.matchMedia(`(min-width: ${minWidth})`).matches,
      media: `(min-width: ${minWidth})`
    };
  };
  
  // isTablet : correspond à 'sm' inclus à 'md' exclu -> between('sm','md')
  export const isTablet = () => {
    const query = `(min-width: ${BREAKPOINTS.sm}) and (max-width: ${BREAKPOINTS.md})`;
    return {
      matches: window.matchMedia(query).matches,
      media: query
    };
    const mdNum = parseFloat(BREAKPOINTS.md);
    const maxPx = mdNum - 0.02; // Approximation pour exclure md
    const queryCorrected = `(min-width: ${BREAKPOINTS.sm}) and (max-width: ${maxPx}px)`;
    return {
      matches: window.matchMedia(queryCorrected).matches,
      media: queryCorrected
    };
  };
  
  
  // isDesktop : correspond à 'md' et au-dessus -> up('md')
  export const isDesktop = () => {
    const minWidth = BREAKPOINTS.md;
    return {
      matches: window.matchMedia(`(min-width: ${minWidth})`).matches,
      media: `(min-width: ${minWidth})`
    };
  };
  
  // isDesktopSmall : correspond à 'md' inclus à 'lg' exclu -> between('md','lg')
  export const isDesktopSmall = () => {
    const mdNum = parseFloat(BREAKPOINTS.md);
    const lgNum = parseFloat(BREAKPOINTS.lg);
    const maxPx = lgNum - 0.02; // Approximation pour exclure lg
    const query = `(min-width: ${BREAKPOINTS.md}) and (max-width: ${maxPx}px)`;
    return {
      matches: window.matchMedia(query).matches,
      media: query
    };
  };
  
  // isDesktopMedium : correspond à 'lg' inclus à 'xl' exclu -> between('lg','xl')
  export const isDesktopMedium = () => {
    const lgNum = parseFloat(BREAKPOINTS.lg);
    const xlNum = parseFloat(BREAKPOINTS.xl);
    const maxPx = xlNum - 0.02; // Approximation pour exclure xl
    const query = `(min-width: ${BREAKPOINTS.lg}) and (max-width: ${maxPx}px)`;
    return {
      matches: window.matchMedia(query).matches,
      media: query
    };
  };
  
  // isDesktopLarge : correspond à 'xl' et au-dessus -> up('xl')
  export const isDesktopLarge = () => {
    const minWidth = BREAKPOINTS.xl;
    return {
      matches: window.matchMedia(`(min-width: ${minWidth})`).matches,
      media: `(min-width: ${minWidth})`
    };
  };
  
  
  // Optionnel : exporter les fonctions utilitaires existantes
  export const up = (size) => `(min-width: ${BREAKPOINTS[size]})`;
  export const down = (size) => `(max-width: ${BREAKPOINTS[size]})`;
  export const between = (sizeMin, sizeMax) => {
    const maxNum = parseFloat(BREAKPOINTS[sizeMax]);
    const maxPx = maxNum - 0.02; // Approximation pour exclure sizeMax
    return `(min-width: ${BREAKPOINTS[sizeMin]}) and (max-width: ${maxPx}px)`;
  };
