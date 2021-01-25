import React, { useEffect } from "react";
import "components/Appointment/styles.scss";

import useVisualMode from "hooks/useVisualMode"
import { getInterviewersForDay } from "helpers/selectors"
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Form from "components/Appointment/Form";
import Status from "components/Appointment/Status";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function Appointment(props) {
  console.log('Appointment props:', props)
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  useEffect(() => {
    if (props.interview && mode === EMPTY) {
      transition(SHOW);
    }
    if (props.interview === null && mode === SHOW) {
      transition(EMPTY);
    }
  }, [transition, mode, props.interview]);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));
  }



  function remove(event) {
    transition(DELETE, true);
    props
      .onDelete(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));
  }

  

  //TODO: Show the proper name instead of number.
  //Currently crashes when uploading a new post.

  const interviewer = props.interview ? props.interviewers[props.interview.interviewer].name : null;

  return (
    <article className="appointment">
      <Header time={props.time} id={props.id} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && props.interview && (
        <Show
          student={props.interview.student}
          interviewer={interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form onSave={save}
        interviewers={props.dayInterviewers}
        onCancel={back}
        />
      )}

      {mode === SAVING && <Status message={"Saving"} />}

      {mode === CONFIRM && (
        <Confirm
          onCancel={back}
          onConfirm={remove}
          message={"Are you sure?"}
        />
      )}

      {mode === DELETE && <Status message={"Deleting"} />}

      {mode === EDIT && (
        <Form
          interviewers={ props.dayInterviewers }
          onSave={save}
          onCancel={() => transition(SHOW)}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error message={"Can't Save Appointment"} onClose={back} />
      )}

      {mode === ERROR_DELETE && (
        <Error message={"Can't Delete Appointment"} onClose={back} />
      )}
    </article>
  );
}