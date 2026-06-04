import { GetTemplateByCodeResponse } from "./contractTemplate";

export interface CreateContractPayload {
  contractCode: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  value: number;
  vendorId: string;
  strHtmlContent: string
}

export interface CreateContractResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: any | null;
}

export interface ContractState {
  templateByCodeLoading: boolean;
  templateByCodeData: GetTemplateByCodeResponse | null;
  templateByCodeError: boolean;
  templateByCodeErrorMessage: string;
  templateHtmlContentData: any | string;

  // create contract
  createContractLoading: boolean;
  createContractData: CreateContractResponse | null;
  createContractError: boolean;
  createContractErrorMessage: string;
}