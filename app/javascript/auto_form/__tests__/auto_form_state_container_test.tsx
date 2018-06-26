import * as React from "react";
import { mount } from "enzyme";

import { AutoFormStateContainer } from "../auto_form_state_container";

describe("AutoFormStateContainer", () => {
  it("should render without throwing an error", () => {
    const seedData = {seed: true};
    const stateContainer = mount(<AutoFormStateContainer
      seedData={seedData}
      rootFieldName="foobar"
      loading={false}
      success={false}
      onSubmit={() => {return; }}
    >
      {(form, data) => {
        expect(form).toBeInstanceOf(AutoFormStateContainer);
        expect(data).toEqual(seedData);
        return <div className="child"/>;
      }}
    </AutoFormStateContainer>);

    expect(stateContainer.find(".child").length).toBe(1);
  });

  it("should add child input elements to the form data", () => {
    const seedData = {someObject: {this: true, that: false}};
    let variables: any;

    const stateContainer = mount(<AutoFormStateContainer
      seedData={seedData}
      rootFieldName="someObject"
      loading={false}
      success={false}
      onSubmit={(submittedVariables: any) => { variables = submittedVariables; }}
    >
      {(form) => {
        return <React.Fragment>
          <form.Checkbox name="someObject.this"/>
          <form.Checkbox name="someObject.that"/>
        </React.Fragment>;
      }}
    </AutoFormStateContainer>);

    expect(variables).toBeUndefined();
    (stateContainer.instance() as any).submit();
    expect(variables).toEqual({someObject: {this: true, that: false}});

    stateContainer.find('input[name="someObject.this"]').simulate("click");
    (stateContainer.instance() as any).submit();
    expect(variables).toEqual({someObject: {this: false, that: false}});

    stateContainer.find('input[name="someObject.that"]').simulate("click");
    (stateContainer.instance() as any).submit();
    expect(variables).toEqual({someObject: {this: false, that: true}});
  });
});
