export interface GetTemplateByCodePayload {
  templateCode: string;
}

export interface GetTemplateByCodeResponse {
  success: boolean;
  message: string;
  data: any | null;
}


