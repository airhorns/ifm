import * as React from "react";
import * as datefns from "date-fns";
import { Label } from "semantic-ui-react";

interface ILastSeenLabelProps {
  date: string;
}

interface ILastSeenLabelState {
  dateObject: Date;
  agoString: string;
}

export class LastSeenLabel extends React.Component<ILastSeenLabelProps, ILastSeenLabelState> {
  private countdown?: number;

  public constructor(props: ILastSeenLabelProps) {
    super(props);
    this.state = {
      dateObject: new Date(Date.parse(this.props.date)),
      agoString: "",
    };
  }

  public componentDidMount() {
    this.countdown = window.setInterval(this.timer, 5000);
    this.timer();
  }

  public componentWillUnmount() {
    window.clearInterval(this.countdown);
  }

  public timer = () => {
    this.setState({agoString: datefns.formatDistance(new Date(), this.state.dateObject, {includeSeconds: true})});
  }

  public render() {
    return <Label>last seen {this.state.agoString} ago</Label>;
  }
}
