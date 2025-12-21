export enum ConsortiumType {
  PROPERTY = 'Imóvel',
  VEHICLE = 'Automóvel',
  SERVICE = 'Serviços'
}

export interface SimulationState {
  type: ConsortiumType;
  amount: number;
  name: string;
  phone: string;
}

export const WHATSAPP_NUMBER = "5548991455194";
export const INSTAGRAM_HANDLE = "@volpi.consultor";
export const INSTAGRAM_URL = "https://instagram.com/volpi.consultor";
export const ADDRESS = "R. Dr. Heitor Blum, 309 - Estreito, Florianópolis - SC, 88075-110";