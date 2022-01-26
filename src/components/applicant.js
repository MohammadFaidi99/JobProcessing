import React from "react";
import { Card } from "semantic-ui-react";
function Applicant(props) {
  //changing the first button text depending on the status of the application
  let text;
  if (props.status === "submission") text = "To Interview";
  else if (props.status === "interview") text = "To Accept";
  else {
    text = "ACCEPTED";
  }

  //applications displayed as the following card structure
  return (
    <div className="ui main container">
      <Card.Group>
        <Card>
          <Card.Content>
            <Card.Header>{props.name}</Card.Header>
            <Card.Meta>{props.title}</Card.Meta>
            <Card.Description>{props.description}</Card.Description>
          </Card.Content>
          <div className="buttons two ui">
            <button
              className="ui blue button small"
              onClick={() => props.toInterview(props.id)}
            >
              {text}
            </button>
            <button
              className="ui red button small"
              onClick={() => props.deletehandler(props.id)}
            >
              Remove
            </button>
          </div>
        </Card>
      </Card.Group>
    </div>
  );
}

export default Applicant;
