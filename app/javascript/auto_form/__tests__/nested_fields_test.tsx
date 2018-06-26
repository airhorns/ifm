import * as React from "react";
import { mount } from "enzyme";

import { AutoFormStateContainer } from "../auto_form_state_container";

describe("AutoFormStateContainer form.NestedFields", () => {
  it("should render without throwing an error", () => {
    const seedData = {
      someObject: {
        someChildren: [
          {id: 1, name: "foo"},
          {id: 2, name: "bar"},
        ],
      },
    };

    mount(<AutoFormStateContainer
      seedData={seedData}
      rootFieldName="foobar"
      loading={false}
      success={false}
      onSubmit={(_: any) => {return; }}
    >
      {(form, _) => {
        return <form.NestedFields name="someObject.someChildren">{(__, ___, index) => {
          return <form.Input name={`someObject.someChildren[${index}].name`} />;
        }}</form.NestedFields>;
      }}
    </AutoFormStateContainer>);
  });

  it("should add child-child input elements to the form data", () => {
    const seedData = {
      someObject: {
        someChildren: [
          {id: 1, name: "foo"},
          {id: 2, name: "bar"},
        ],
      },
    };
    let variables: any;

    const stateContainer = mount(<AutoFormStateContainer
      seedData={seedData}
      rootFieldName="someObject"
      loading={false}
      success={false}
      onSubmit={(submittedVariables: any) => { variables = submittedVariables; }}
    >
      {(form, _) => {
        return <form.NestedFields name="someObject.someChildren">{(__, ___, index) => {
          return <form.Input name={`someObject.someChildren[${index}].name`} />;
        }}</form.NestedFields>;
      }}
    </AutoFormStateContainer>);

    (stateContainer.instance() as any).submit();
    expect(variables).toEqual(seedData);
  });
});
