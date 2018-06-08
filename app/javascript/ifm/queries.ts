import gql from "graphql-tag";
import { Query } from "react-apollo";
import { GetAllDeviceDiscoveryLogs, GetDeviceDiscoveryLog } from "./types";

// This file is fucked up. It is a list of the queries in the application, but it references an autogenerated file, `types.ts`, beside it.
// That file is generated by looking at all the `g ql` tags in this file. You have to write code that won't compile, then run the generator,
// then see if it compiles. A terrible idea I know. Yeesh.
export class GetAllDeviceDiscoveryLogsQuery extends Query<GetAllDeviceDiscoveryLogs.Query, GetAllDeviceDiscoveryLogs.Variables> {
  public static query = gql`
    query getAllDeviceDiscoveryLogs {
      allDeviceDiscoveryLogs {
        id
        dataAddress
        deviceName
        lastSeen
        data
      }
    }
  `;
}

export class GetDeviceDiscoveryLogQuery extends Query<GetDeviceDiscoveryLog.Query, GetDeviceDiscoveryLog.Variables> {
  public static query = gql`
    query getDeviceDiscoveryLog($id: ID!) {
      deviceDiscoveryLog(id: $id) {
        id
        dataAddress
        deviceName
        lastSeen
        data
      }
    }
  `;
}