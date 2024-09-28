import { Card } from "@twilio-paste/card";
import { Checkbox } from "@twilio-paste/core/checkbox";
import { Flex } from "@twilio-paste/flex";
import { Label } from "@twilio-paste/label";
import { useDispatch, useSelector } from "react-redux";
import { SelectHuman } from "./SelectHuman";
import { toggleTask } from "../store/tasksSlice";
import { useId } from "react";

export const Task = ({ taskId }) => {
  const dispatch = useDispatch();

  const task = useSelector(state =>
    state.tasks.find(task => task.id === taskId)
  );

  const id = useId();

  return (
    <Card>
      <Flex marginBottom="space40">
        <Checkbox
          id={id}
          checked={task.completed}
          // For some reason onChange even is not working
          onClick={event => dispatch(toggleTask(taskId, event.target.checked))}
        />
        <Label htmlFor={id}>{task.title}</Label>
      </Flex>
      <Flex>
        <SelectHuman task={task} />
      </Flex>
    </Card>
  );
};
