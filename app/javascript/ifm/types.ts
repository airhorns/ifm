/* tslint:disable */
/** Generated in 2018-06-16T22:57:34+00:00 */

export type Json = any;

export type DateTime = any;

export interface Query {
  deviceConfiguration: DeviceConfiguration /** Get the details of one DeviceConfiguration object */;
  deviceConfigurations: DeviceConfiguration[] /** Get all the configured devices as DeviceConfiguration objects */;
  deviceDiscoveryLog: DeviceDiscoveryLog /** Get one DeviceDiscoveryLog */;
  deviceDiscoveryLogs: DeviceDiscoveryLog[] /** List DeviceDiscoveryLogs with scope arguments */;
  farm: Farm /** Get the details of the current farm */;
  farmZones: FarmZone[] /** Get the list of zones for the current farm */;
}

export interface DeviceConfiguration {
  controllers: DeviceController[];
  data?: Json | null;
  dataAddress: string;
  deviceClass: string;
  deviceControllerConfigurations: DeviceControllerConfiguration[];
  deviceDiscoveryLog?: DeviceDiscoveryLog | null;
  deviceName: string;
  farmZone: FarmZone;
  humanName: string;
  humanNameWithZone: string;
  id: string;
  imageUrl: string;
  lastSeen: DateTime;
  publishers: DevicePublisher[];
}

export interface DeviceController {
  controlStrategyHumanName: string;
  field: string;
  humanName: string;
  humanState: string;
  icon: string;
  nickname: string;
}

export interface DeviceControllerConfiguration {
  controller: DeviceController;
  enabled: boolean;
  field: string;
  id: string;
  nickname: string;
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

export interface DevicePublisher {
  comprehensionHumanName: string;
  comprehensionUnit?: string | null;
  field: string;
  humanName: string;
  humanValue: string;
  icon: string;
}

export interface FarmZone {
  deviceConfigurations: DeviceConfiguration[];
  id: string;
  name: string;
}

export interface Farm {
  dashboardHost: string;
  farmZones: FarmZone[];
  name: string;
}

export interface Mutation {
  enlistDevice?: EnlistDevicePayload | null;
  updateDeviceConfiguration?: UpdateDeviceConfigurationPayload | null;
  updateFarm?: UpdateFarmPayload | null;
}
/** Autogenerated return type of EnlistDevice */
export interface EnlistDevicePayload {
  deviceConfiguration?: DeviceConfiguration | null;
  errors: string[];
}
/** Autogenerated return type of UpdateDeviceConfiguration */
export interface UpdateDeviceConfigurationPayload {
  deviceConfiguration?: DeviceConfiguration | null;
  errors: string[];
}
/** Autogenerated return type of UpdateFarm */
export interface UpdateFarmPayload {
  errors: string[];
  farm?: Farm | null;
}

export interface EnlistControlInput {
  field: string;
  controlNickname: string;
  enabled?: boolean | null;
}

export interface UpdateDeviceConfigurationInput {
  id: string;
  humanName?: string | null;
  farmZoneId?: string | null;
  deviceControllerConfigurations?: DeviceControllerConfigurationInput[] | null;
}

export interface DeviceControllerConfigurationInput {
  id: string;
  field: string;
  nickname: string;
  enabled?: boolean | null;
}

export interface UpdateFarmInput {
  name?: string | null;
  createFarmZones?: CreateFarmZoneInput[] | null;
  farmZones?: UpdateFarmZoneInput[] | null;
  deleteFarmZones?: DeleteFarmZoneInput[] | null;
}

export interface CreateFarmZoneInput {
  name: string;
}

export interface UpdateFarmZoneInput {
  id: string;
  name?: string | null;
}

export interface DeleteFarmZoneInput {
  id: string;
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
  enlistControls?: EnlistControlInput[] | null;
}
export interface UpdateDeviceConfigurationMutationArgs {
  input: UpdateDeviceConfigurationInput;
}
export interface UpdateFarmMutationArgs {
  input: UpdateFarmInput;
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
    deviceDiscoveryLog: DeviceDiscoveryLog;
    farmZones: FarmZones[];
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
    humanNameWithZone: string;
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
    enlistControls: EnlistControlInput[];
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
    deviceDiscoveryLogs: DeviceDiscoveryLogs[];
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
export namespace GetDeviceConfiguration {
  export type Variables = {
    id: string;
  };

  export type Query = {
    __typename?: "Query";
    deviceConfiguration: DeviceConfiguration;
  };

  export type DeviceConfiguration = {
    __typename?: "DeviceConfiguration";
    id: string;
    imageUrl: string;
    humanName: string;
    deviceName: string;
    lastSeen: DateTime;
    publishers: Publishers[];
    deviceControllerConfigurations: DeviceControllerConfigurations[];
    farmZone: FarmZone;
  };

  export type Publishers = {
    __typename?: "DevicePublisher";
    humanName: string;
    humanValue: string;
    comprehensionHumanName: string;
    comprehensionUnit?: string | null;
    icon: string;
  };

  export type DeviceControllerConfigurations = {
    __typename?: "DeviceControllerConfiguration";
    id: string;
    field: string;
    nickname: string;
    controller: Controller;
  };

  export type Controller = {
    __typename?: "DeviceController";
    humanName: string;
    humanState: string;
    controlStrategyHumanName: string;
    icon: string;
  };

  export type FarmZone = {
    __typename?: "FarmZone";
    name: string;
  };
}
export namespace UpdateDeviceConfiguration {
  export type Variables = {
    input: UpdateDeviceConfigurationInput;
  };

  export type Mutation = {
    __typename?: "Mutation";
    updateDeviceConfiguration?: UpdateDeviceConfiguration | null;
  };

  export type UpdateDeviceConfiguration = {
    __typename?: "UpdateDeviceConfigurationPayload";
    deviceConfiguration?: DeviceConfiguration | null;
  };

  export type DeviceConfiguration = {
    __typename?: "DeviceConfiguration";
    id: string;
    imageUrl: string;
    humanName: string;
    deviceName: string;
    lastSeen: DateTime;
    publishers: Publishers[];
    deviceControllerConfigurations: DeviceControllerConfigurations[];
    farmZone: FarmZone;
  };

  export type Publishers = {
    __typename?: "DevicePublisher";
    humanName: string;
    humanValue: string;
    comprehensionHumanName: string;
    comprehensionUnit?: string | null;
    icon: string;
  };

  export type DeviceControllerConfigurations = {
    __typename?: "DeviceControllerConfiguration";
    id: string;
    field: string;
    nickname: string;
    controller: Controller;
  };

  export type Controller = {
    __typename?: "DeviceController";
    humanName: string;
    humanState: string;
    controlStrategyHumanName: string;
    icon: string;
  };

  export type FarmZone = {
    __typename?: "FarmZone";
    name: string;
  };
}
export namespace GetDeviceConfigurations {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    farmZones: FarmZones[];
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
    publishers: Publishers[];
    controllers: Controllers[];
    farmZone: FarmZone;
  };

  export type Publishers = {
    __typename?: "DevicePublisher";
    humanName: string;
    humanValue: string;
    comprehensionHumanName: string;
    comprehensionUnit?: string | null;
    icon: string;
  };

  export type Controllers = {
    __typename?: "DeviceController";
    field: string;
    nickname: string;
    humanName: string;
    humanState: string;
    controlStrategyHumanName: string;
    icon: string;
  };

  export type FarmZone = {
    __typename?: "FarmZone";
    name: string;
  };
}
export namespace GetFarm {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    farm: Farm;
  };

  export type Farm = {
    __typename?: "Farm";
    name: string;
    dashboardHost: string;
    farmZones: FarmZones[];
  };

  export type FarmZones = {
    __typename?: "FarmZone";
    name: string;
  };
}
export namespace GetFarmSettings {
  export type Variables = {};

  export type Query = {
    __typename?: "Query";
    farm: Farm;
  };

  export type Farm = {
    __typename?: "Farm";
    name: string;
    farmZones: FarmZones[];
  };

  export type FarmZones = {
    __typename?: "FarmZone";
    id: string;
    name: string;
  };
}
export namespace UpdateFarm {
  export type Variables = {
    input: UpdateFarmInput;
  };

  export type Mutation = {
    __typename?: "Mutation";
    updateFarm?: UpdateFarm | null;
  };

  export type UpdateFarm = {
    __typename?: "UpdateFarmPayload";
    farm?: Farm | null;
    errors: string[];
  };

  export type Farm = {
    __typename?: "Farm";
    name: string;
    farmZones: FarmZones[];
  };

  export type FarmZones = {
    __typename?: "FarmZone";
    id: string;
    name: string;
  };
}
