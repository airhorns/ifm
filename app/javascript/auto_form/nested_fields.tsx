import * as React from "react";
import * as _ from "lodash";
import { AutoFormStateContainer } from "./auto_form_state_container";

export type AutoFormNestedFields<QueryData> = React.ComponentType<INestedFieldsProps<QueryData>>;

export interface INestedFieldsProps<QueryData> {
  name: string;
  children: (fields: React.Component<INestedFieldsProps<QueryData>, {}>, data: any, index?: number) => React.ReactNode;
}

export const NestedFieldsFactory = <QueryData extends any>(form: AutoFormStateContainer<any, any, any>) => {
  return class NestedFields extends React.Component<INestedFieldsProps<QueryData>, {}> {

    constructor(props: INestedFieldsProps<QueryData>) {
      super(props);
    }

    public render(): React.ReactNode {
      const value = form.getValue(this.props.name);
      if (_.isUndefined(value)) {
        return null;
      } else if (_.isArray(value)) {
        return <React.Fragment>{value.map((valueElement, index) => this.props.children(this, valueElement, index))}</React.Fragment>;
      } else {
        return this.props.children(this, value);
      }
    }
  };
};
