/* tslint:disable */
/** Generated in 2018-06-08T22:41:38+00:00 */

export type Json = any;

export type DateTime = any;

export interface Query {
  deviceDiscoveryLog?: DeviceDiscoveryLog | null /** Get one DeviceDiscoveryLog */;
  deviceDiscoveryLogs?:
    | DeviceDiscoveryLog[]
    | null /** List DeviceDiscoveryLogs with scope arguments */;
  farm?: Farm | null /** Get the details of the current farm */;
  farmZones?:
    | FarmZone[]
    | null /** Get the list of zones for the current farm */;
}

export interface DeviceDiscoveryLog {
  data?: Json | null;
  dataAddress: string;
  deviceClass: string;
  deviceName: string;
  id: string;
  imageUrl: string;
  lastSeen: DateTime;
  proposedConfiguration: ProposedDeviceConfiguration;
}

export interface ProposedDeviceConfiguration {
  config: Json;
  controllers: DeviceController[];
  publishers: DevicePublisher[];
}

export interface DeviceController {
  controlStrategyHumanName: string;
  field: string;
  humanName: string;
  icon: string;
}

export interface DevicePublisher {
  comprehensionHumanName: string;
  comprehensionUnit?: string | null;
  field: string;
  humanName: string;
  icon: string;
}

export interface Farm {}

export interface FarmZone {
  id: string;
  name: string;
}

export interface Mutation {}
export interface DeviceDiscoveryLogQueryArgs {
  id: string;
}
export interface DeviceDiscoveryLogsQueryArgs {
  dismissed?: boolean | null;
}
export namespace Enlist {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";
    deviceDiscoveryLog?: DeviceDiscoveryLog | null;
    farmZones?: FarmZones[] | null;
  };

  export type DeviceDiscoveryLog = {
    __typename?: "DeviceDiscoveryLog";
    id: string;
    imageUrl: string;
    dataAddress: string;
    deviceName: string;
    lastSeen: DateTime;
    proposedConfiguration: ProposedConfiguration;
  };

  export type ProposedConfiguration = {
    __typename?: "ProposedDeviceConfiguration";
    publishers: Publishers[];
    controllers: Controllers[];
  };

  export type Publishers = {
    __typename?: "DevicePublisher";
    humanName: string;
    comprehensionHumanName: string;
    comprehensionUnit?: string | null;
    icon: string;
  };

  export type Controllers = {
    __typename?: "DeviceController";
    humanName: string;
    controlStrategyHumanName: string;
    icon: string;
  };

  export type FarmZones = {
    __typename?: "FarmZone";
    id: string;
    name: string;
  };
}
export namespace GetDeviceDiscoveryLogs {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    deviceDiscoveryLogs?: DeviceDiscoveryLogs[] | null;
  };

  export type DeviceDiscoveryLogs = {
    __typename?: "DeviceDiscoveryLog";
    id: string;
    imageUrl: string;
    dataAddress: string;
    deviceName: string;
    lastSeen: DateTime;
    data?: Json | null;
  };
}
