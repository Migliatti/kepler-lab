// Manchas procedurais são opt-in: um corpo só as recebe quando entrega seus
// próprios `continents`. Não existe conjunto padrão — herdar os continentes da
// Terra punha manchas verdes em Mercúrio, Vênus, Saturno e Urano, que não têm
// relevo desenhado nenhum.

export function resolveContinents(continents) {
  return continents ?? []
}
