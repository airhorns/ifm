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
    public render(): React.ReactNode {
      const fieldValue = form.getSeedValue(this.props.name);
      if (_.isUndefined(fieldValue)) {
        return null;
      } else if (_.isArray(fieldValue)) {
        return <React.Fragment>
          {fieldValue.map((valueElement, index) => <React.Fragment key={`nested-field-${index}`}>
            {this.props.children(this, valueElement, index)}
            <form.SendQueryField name={`${this.props.name}[${index}].id`} />
          </React.Fragment>)}
        </React.Fragment>;
      } else {
        return <React.Fragment>
          {this.props.children(this, fieldValue)}
          <form.SendQueryField name={`${this.props.name}.id`} />
        </React.Fragment>;
      }
    }
  };
};
