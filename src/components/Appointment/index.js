import React from "react";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty";
import Status from "components/Appointment/Status";
import "components/Appointment/styles.scss";
import useVisualMode from "hooks/useVisualMode"
import Form from "components/Appointment/Form";
import Confirm from "components/Appointment/Confirm";

// import { getInterviewersForDay } from "../../helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

export default function Appointment(props) {  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    return interview;
    
  }
  console.log("index", props.student)
  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
    <Show
      student={props.interview.student}
      interviewer={props.interview.interviewer}
      onDelete= {() => transition(CONFIRM)}
      onEdit={() => transition(EDIT)}

    />
    )}
    {mode === CONFIRM && (
      <Confirm
      onCancel={() => transition(SHOW)}
      onConfirm={() => {
        transition(DELETING, true)
      props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      }
    }
    message="Are you sure you would like to delete?"

    />
    )}
    {mode === DELETING && <Status message="DELETING" />}



    {mode === EDIT && (
      <Form
      interviewer={props.interview.interviewer.id}
      name={props.interview && props.interview.student}
      interviewers = {props.interviewersDay}
      onSave={(name, interviewer) => {
        transition(SAVING);
        props.bookInterview(props.id,save(name, interviewer))
        .then(() => transition(SHOW))
      }}
      onCancel={() => back()}
    />)}
    


    {mode === CREATE && ( <Form
    interviewers = {props.interviewersDay}
    
    onSave={(name, interviewer) => {
      transition(SAVING);
      props.bookInterview(props.id,save(name, interviewer))
      .then(() => transition(SHOW))
    }}
    onCancel={() => back()}
    />)}
    {mode === SAVING && <Status message="Saving" />}
    </article>
  )
}




