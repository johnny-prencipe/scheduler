import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  console.log('Form.js Props:', props);
  console.log('Form.js props.interviewers:', props.interviewers);
  const [ name, setName ] = useState(props.name || "");
  const [ interviewer, setInterviewer ] = useState(props.interviewer || null);

  const [ errorMessage, setErrorMessage ] = useState("")

  const reset = () => {
    setName("");
    setInterviewer(null);
  };

  const cancel = () => {
    reset();
    props.onCancel();
  };

  const save = () => {
    if (name && interviewer) {
      props.onSave(name, interviewer);
    } else {
      setErrorMessage('Invalid params: Name or interviewer cannot be blank.')
    }
  };

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            onChange={event => setName(event.target.value)}
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
            /*
              This must be a controlled component
            */
          />
        </form>
        <p className="appointment__validation">{errorMessage}</p>
        <InterviewerList
          interviewers={props.interviewers}
          interviewer={interviewer}
          setInterviewer={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>
            Cancel
          </Button>
          <Button confirm onClick={save}>
            Save
          </Button>
        </section>
      </section>
    </main>
  );
}