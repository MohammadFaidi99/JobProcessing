import Applicant from "./applicant.js";
import { v4 as uuidv4 } from "uuid";
import React from "react";

function ApplicationsSection(props) {
  const applicants = props.applicants;

  const interviewhandler = (id) => {
    props.getId(id);
  };

  const deletehandler = (id) => {
    props.deleteid(id);
  };

  if (applicants.length === 0) {
    return null;
  } else {
    return (
      <div className="ui main">
        {applicants.map((applicant) => {
          return (
            <Applicant
              name={applicant.name}
              title={applicant.title}
              description={applicant.description}
              id={applicant.id}
              key={uuidv4()}
              toInterview={interviewhandler}
              deletehandler={deletehandler}
              status={applicant.status}
            />
          );
        })}
      </div>
    );
  }
}

export default ApplicationsSection;
