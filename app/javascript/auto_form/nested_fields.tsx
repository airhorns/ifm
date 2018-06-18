import * as React from "react";
import * as _ from "lodash";
import { AutoFormStateContainer } from "./auto_form_state_container";

export type AutoFormNestedFields<QueryData> = React.ComponentType<INestedFieldsProps<QueryData>>;

export interface INestedFieldsProps<QueryData> {
  name: string;
  children: (fields: React.Component<INestedFieldsProps<QueryData>, {}>, data: any, index?: number) => React.ReactNode;
}

export const NestedFieldsFactory = <QueryData extends any>(form: AutoFormStateContainer<any, any>) => {
  return class NestedFields extends React.Component<INestedFieldsProps<QueryData>, {}> {

    constructor(props: INestedFieldsProps<QueryData>) {
      super(props);
      const fieldValue = form.getSeedValue(this.props.name);

      // Populate the mutation variables with the IDs of the child/children, if it/they exist
      if (!_.isUndefined(fieldValue)) {
        if (_.isArray(fieldValue)) {
          fieldValue.forEach((valueElement, index) => {
            if (!_.isUndefined(valueElement.id)) {
              form.setValue(`${this.props.name}[${index}].id`, valueElement.id);
            }
          });
        } else {
          if (!_.isUndefined(fieldValue.id)) {
            form.setValue(`${this.props.name}.id`, fieldValue.id);
          }
        }
      }
    }

    public render(): React.ReactNode {
      const fieldValue = form.getCurrentValue(this.props.name);

      if (_.isUndefined(fieldValue)) {
        return null;
      } else if (_.isArray(fieldValue)) {
        return <React.Fragment>{fieldValue.map((valueElement, index) => this.props.children(this, valueElement, index))}</React.Fragment>;
      } else {
        return this.props.children(this, fieldValue);
      }
    }
  };
};
