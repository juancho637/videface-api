export class BinResponseModel {
  box: {
    bins: number;
    id: number;
    manual: boolean;
    expansion: boolean;
    generation: number;
    name: string;
    wifi: boolean;
    releasable: boolean;
    lastStatusUpdate: string;
    label: string;
    model: string;
    serialNumber: string;
  };
  id: number;
  binNumber: number;
  fobs: boolean;
  status: string;
  key: {
    id: number;
    organization: {
      id: number;
    };
    name: string;
  };
}
