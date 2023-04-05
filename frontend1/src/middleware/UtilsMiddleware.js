

export const abreviaChavePublica = (chavePublica) => {
    if (!chavePublica || chavePublica.length < 8) {
      // retorna a chave sem abreviação se ela for vazia ou muito curta
      return chavePublica;
    }
    
    const primeiraParte = chavePublica.slice(0, 4);
    const ultimaParte = chavePublica.slice(-4);
    
    return `${primeiraParte}...${ultimaParte}`;
  }
  