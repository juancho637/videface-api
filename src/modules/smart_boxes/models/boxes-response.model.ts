export class SmartBoxesResponseModel {
  bins: number;
  id: number;
  powerSource: string;
  ethernet: boolean;
  location: {
    id: number;
    name: string;
  };
  manual: boolean;
  stateOfCharge: number;
  signalStrength: number;
  expansion: boolean;
  generation: number;
  name: string;
  wifi: boolean;
  releasable: boolean;
  lastStatusUpdate: string;
  label: string;
  model: string;
  serialNumber: string;
}
