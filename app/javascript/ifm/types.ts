/* tslint:disable */
/** Generated in 2018-06-11T20:10:27+00:00 */

export type Json = any;

export type DateTime = any;

export interface Query {
  deviceConfiguration?: DeviceConfiguration | null /** Get the details of one DeviceConfiguration object */;
  deviceConfigurations?:
    | DeviceConfiguration[]
    | null /** Get all the configured devices as DeviceConfiguration objects */;
  deviceDiscoveryLog?: DeviceDiscoveryLog | null /** Get one DeviceDiscoveryLog */;
  deviceDiscoveryLogs?:
    | DeviceDiscoveryLog[]
    | null /** List DeviceDiscoveryLogs with scope arguments */;
  farm?: Farm | null /** Get the details of the current farm */;
  farmZones?:
    | FarmZone[]
    | null /** Get the list of zones for the current farm */;
}

export interface DeviceConfiguration {
  data?: Json | null;
  dataAddress: string;
  deviceClass: string;
  deviceDiscoveryLog?: DeviceDiscoveryLog | null;
  deviceName: string;
  farmZone: FarmZone;
  humanName: string;
  id: string;
  imageUrl: string;
  lastSeen: DateTime;
}

export interface DeviceDiscoveryLog {
  data?: Json | null;
  dataAddress: string;
  deviceClass: string;
  deviceName: string;
  enlistedConfiguration?: DeviceConfiguration | null;
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

export interface FarmZone {
  deviceConfigurations: DeviceConfiguration[];
  id: string;
  name: string;
}

export interface Farm {}

export interface Mutation {
  enlistDevice?: EnlistDevicePayload | null;
}
/** Autogenerated return type of EnlistDevice */
export interface EnlistDevicePayload {
  deviceConfiguration?: DeviceConfiguration | null;
  errors: string[];
}

export interface EnlistControl {
  field: string;
  controlNickname: string;
  enabled: boolean;
}
export interface DeviceConfigurationQueryArgs {
  id: string;
}
export interface DeviceDiscoveryLogQueryArgs {
  id: string;
}
export interface DeviceDiscoveryLogsQueryArgs {
  filter?: DiscoveryStateFilter | null;
}
export interface EnlistDeviceMutationArgs {
  deviceDiscoveryLogId: string;
  deviceNickname: string;
  farmZoneId: string;
  enlistControls: EnlistControl[];
}

export enum DiscoveryStateFilter {
  DISMISSED = "DISMISSED",
  ENLISTED = "ENLISTED",
  PENDING = "PENDING"
}
export namespace GetEnlist {
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
    enlistedConfiguration?: EnlistedConfiguration | null;
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
    field: string;
    humanName: string;
    controlStrategyHumanName: string;
    icon: string;
  };

  export type EnlistedConfiguration = {
    __typename?: "DeviceConfiguration";
    id: string;
    humanName: string;
    deviceName: string;
  };

  export type FarmZones = {
    __typename?: "FarmZone";
    id: string;
    name: string;
  };
}
export namespace SendEnlist {
  export type Variables = {
    deviceDiscoveryLogId: string;
    deviceNickname: string;
    farmZoneId: string;
    enlistControls: EnlistControl[];
  };

  export type Mutation = {
    __typename?: "Mutation";
    enlistDevice?: EnlistDevice | null;
  };

  export type EnlistDevice = {
    __typename?: "EnlistDevicePayload";
    deviceConfiguration?: DeviceConfiguration | null;
    errors: string[];
  };

  export type DeviceConfiguration = {
    __typename?: "DeviceConfiguration";
    id: string;
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
    enlistedConfiguration?: EnlistedConfiguration | null;
  };

  export type EnlistedConfiguration = {
    __typename?: "DeviceConfiguration";
    id: string;
    humanName: string;
    deviceName: string;
  };
}
export namespace GetDeviceConfigurations {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    farmZones?: FarmZones[] | null;
  };

  export type FarmZones = {
    __typename?: "FarmZone";
    name: string;
    id: string;
    deviceConfigurations: DeviceConfigurations[];
  };

  export type DeviceConfigurations = {
    __typename?: "DeviceConfiguration";
    id: string;
    imageUrl: string;
    humanName: string;
    deviceName: string;
    lastSeen: DateTime;
    farmZone: FarmZone;
  };

  export type FarmZone = {
    __typename?: "FarmZone";
    name: string;
  };
}
export namespace GetDeviceConfiguration {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";
    deviceConfiguration?: DeviceConfiguration | null;
  };

  export type DeviceConfiguration = {
    __typename?: "DeviceConfiguration";
    id: string;
    imageUrl: string;
    humanName: string;
    deviceName: string;
    lastSeen: DateTime;
    farmZone: FarmZone;
  };

  export type FarmZone = {
    __typename?: "FarmZone";
    name: string;
  };
}
