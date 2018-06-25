import * as React from "react";
import * as _ from "lodash";
import { Form } from "semantic-ui-react";
import { AutoFormStateContainer } from "../../auto_form";

interface IRecurrenceEditorProps {
  form: AutoFormStateContainer<any, any>;
  rootKey: string;
}

const everyOptions = [
  {text: "Day", value: "day"},
  {text: "Week", value: "week"},
  {text: "Month", value: "month"},
  {text: "Year", value: "year"},
];

const hourOptions = _.range(0, 23).map((hour) => ({text: _.padStart("" + hour, 2, "0"), value: hour}));
const minuteOptions = _.range(0, 59).map((minute) => ({text: _.padStart("" + minute, 2, "0"), value: minute}));
const secondOptions = _.range(0, 59, 10).map((second) => ({text: _.padStart("" + second, 2, "0"), value: second}));

export class RecurrenceEditor extends React.Component<IRecurrenceEditorProps, {}> {
  public render() {
    return <React.Fragment>
      <this.props.form.Dropdown
        selection
        label="Repeat every"
        width={4}
        name={`${this.props.rootKey}.every`}
        options={everyOptions} />
      {this.props.form.getCurrentValue(`${this.props.rootKey}.every`) === "day" && <Form.Group>
        <Form.Field>
          <label>At</label>
        </Form.Field>
        <this.props.form.Dropdown
          selection
          compact
          label="HH"
          name={`${this.props.rootKey}.at[0]`}
          options={hourOptions} />
        :
        <this.props.form.Dropdown
          selection
          compact
          label="MM"
          name={`${this.props.rootKey}.at[1]`}
          options={minuteOptions} />
        :
        <this.props.form.Dropdown
          selection
          compact
          label="SS"
          name={`${this.props.rootKey}.at[2]`}
          options={secondOptions} />
        <Form.Field>
          <label>Timezone</label>
          <p className="input disabled">EST</p>
        </Form.Field>
      </Form.Group>
      }

    </React.Fragment>;
  }
}
