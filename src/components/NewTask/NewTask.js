import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useFetch from "../../hooks/use-fetch";

const NewTask = (props) => {
  const { error, isLoading, sendRequest } = useFetch();

  const addTasks = (taskText, tasksObj) => {
    const generatedId = tasksObj.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const enterTaskHandler = async (taskText) => {
    sendRequest(
      {
        url: "https://http-custom-hook-764c9-default-rtdb.firebaseio.com/tasks.json",
        method: "POST",
        body: { text: taskText },
        headers: {
          "Content-Type": "application/json",
        },
      },
      addTasks.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
