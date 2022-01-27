import React, { useState, useEffect } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import "./App.css";
import ApplicationsSection from "./components/applicationsSection";
import { v4 as uuidv4 } from "uuid";

function App() {
  //local storage keys to store the applications and where they stand
  const LOCAL_KEY_APPLICANTS = "applications";
  const LOCAL_KEY_INTERVIEWS = "interviews";
  const LOCAL_KEY_ACCEPTED = "accepted";

  //dummy applicants

  const applicants = [
    {
      id: 1,
      name: "someone1",
      title: "Aenean",
      description:
        "Mauris sollicitudin fermentum libero. Phasellus viverra nulla ut metus varius laoreet.",
      status: "submission",
    },
    {
      id: 2,
      name: "someone2",
      title: "Donec posuere",
      description: "Aenean vulputate eleifend tellus. Nulla facilisi.",
      status: "submission",
    },
    {
      id: 3,
      name: "someone3",
      title: "Maecenas",
      description:
        "Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.",
      status: "submission",
    },

    {
      id: 4,
      name: "someone4",
      title: "Aenean",
      description:
        "Mauris sollicitudin fermentum libero. Phasellus viverra nulla ut metus varius laoreet.",
      status: "submission",
    },
  ];

  //states to save the applications depending on their status
  const [Applicants, setApplicants] = useState([...applicants]);
  const [interviewers, setinterviewers] = useState([]);
  const [accepted, setaccepted] = useState([]);

  //storing and retrieving the applications locally using the useEffect hook

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_APPLICANTS, JSON.stringify(Applicants));
  }, [Applicants]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_INTERVIEWS, JSON.stringify(interviewers));
  }, [interviewers]);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY_ACCEPTED, JSON.stringify(accepted));
  }, [accepted]);

  useEffect(() => {
    const retrieved = JSON.parse(localStorage.getItem(LOCAL_KEY_APPLICANTS));
    if (retrieved) setApplicants(retrieved);
  }, []);

  useEffect(() => {
    const retrieved = JSON.parse(localStorage.getItem(LOCAL_KEY_ACCEPTED));
    if (retrieved) setaccepted(retrieved);
  }, []);

  useEffect(() => {
    const retrieved = JSON.parse(localStorage.getItem(LOCAL_KEY_INTERVIEWS));
    if (retrieved) setinterviewers(retrieved);
  }, []);

  //the button handler to change the status of the applications
  const next = (id) => {
    const selectedapplicant = Applicants.find(
      (applicant) => applicant.id === id
    );
    const selectedinterviewer = interviewers.find(
      (interviewer) => interviewer.id === id
    );

    if (selectedapplicant !== undefined) {
      selectedapplicant.status = "interview";
      const index = Applicants.indexOf(selectedapplicant);
      Applicants.splice(index, 1);
      setinterviewers([...interviewers, selectedapplicant]);
    } else if (selectedinterviewer !== undefined) {
      selectedinterviewer.status = "acceptance";
      const idx = interviewers.indexOf(selectedinterviewer);
      interviewers.splice(idx, 1);
      setaccepted([...accepted, selectedinterviewer]);
    }
  };

  //remove button handler to delete the application from all the lists
  const deletehandler = (id) => {
    const newapplicants = Applicants.filter((applicant) => {
      return applicant.id !== id;
    });
    const newinterviewers = interviewers.filter((applicant) => {
      return applicant.id !== id;
    });
    const newaccepted = accepted.filter((applicant) => {
      return applicant.id !== id;
    });

    setApplicants(newapplicants);
    setinterviewers(newinterviewers);
    setaccepted(newaccepted);
  };

  //structure of the application page
  return (
    <div className="App">
      <div className="container ui left">
        <Grid columns={3} relaxed="very">
          <Grid.Column>
            <h2>Applications</h2>
            <ApplicationsSection
              applicants={Applicants}
              getId={next}
              deleteid={deletehandler}
              key={uuidv4()}
            />
          </Grid.Column>
          <Grid.Column>
            <h2>Interviews</h2>
            <ApplicationsSection
              applicants={interviewers}
              getId={next}
              deleteid={deletehandler}
              key={uuidv4()}
            />
          </Grid.Column>
          <GridColumn>
            <h2>Accepted Applicants</h2>
            <ApplicationsSection
              applicants={accepted}
              getId={next}
              deleteid={deletehandler}
              key={uuidv4()}
            />
          </GridColumn>
        </Grid>
      </div>
    </div>
  );
}

export default App;
