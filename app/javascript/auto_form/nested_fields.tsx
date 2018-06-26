import * as React from "react";
import * as _ from "lodash";
import { AutoFormStateContainer } from "./auto_form_state_container";

export type AutoFormNestedFields<QueryData> = React.ComponentType<INestedFieldsProps<QueryData>>;

export interface IAutoFormNestedFieldsInstance<QueryData> extends React.Component<INestedFieldsProps<QueryData>, INestedFieldState> {
  addChild(initialValues: any): void;
}

export interface INestedFieldsProps<QueryData> {
  name: string;
  children: (fields: React.Component<INestedFieldsProps<QueryData>, {}>, data: any, index?: number) => React.ReactNode;
}

// This state is a bit of a sneaky one. The NestedFields component knows how to loop over a list of children
// and render a sub form for that child, but, the user has to be able to add and remove children. The state of these
// new children is a weird one: it's not really seed state that came back from the server query, and it's not state
// that belongs in the mutation variables because it's not structured as those variables yet. The state from the
// inputs *in* those nested children belongs in the currentState to be sent off as mutation variables.
// So, we keep this list of nested children in a different state all together that we can mutate, seed the iterator
// from, and not send to the server.
export interface INestedFieldState {
  childList: any[];
}

export const NestedFieldsFactory = <QueryData extends any>(form: AutoFormStateContainer<any, any>) => {
  return class NestedFields extends React.Component<INestedFieldsProps<QueryData>, INestedFieldState> {
    public constructor(props: INestedFieldsProps<QueryData>) {
      super(props);
      this.state = {
        childList: form.getSeedValue(this.props.name) || [],
      };

      form.registerNestedFields(this);
    }

    public addChild(initialValues: any) {
      this.setState((prevState) => {
        const childList = prevState.childList.slice(0);
        childList.push(initialValues);
        return {childList};
      });
    }

    public render(): React.ReactNode {
      const fieldValue = this.state.childList;

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
