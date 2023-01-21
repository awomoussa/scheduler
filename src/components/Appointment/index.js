import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  //save  

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }
  // confirm message 
  function confirm() {
    transition(CONFIRM);
  }

  //Delete appointment

  function cancel(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    transition(DELETING, true);

    props
      .cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true));

  }


  return (
    <article data-testid="appointment" className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}

        />
      )}
      {mode === SAVING && <Status message={"...SAVING"} />}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={back} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Are you sure you want to delete?"}
          onCancel={back}
          onConfirm={cancel}
        />
      )}
      {mode === DELETING && <Status message={"...DELETING"} />}

      {mode === EDIT && (
        <Form
          student={props.interview.student}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          onSave={save} 
          onCancel={back}        />
      )}

      {mode === ERROR_DELETE && (
        <Error message='Error, could not delete appointment'
          onClose={back} />
      )}
      {mode === ERROR_SAVE && (
        <Error message='Error, could not save appointment'
          onClose={back}/>
      )}

    </article>
  )
}

