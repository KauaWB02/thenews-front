export interface DecodeTokenInterface{
  id: number;
  email: string;
  permissionsKeys: Array<string>;
  status: string;
  exp: number;
}
