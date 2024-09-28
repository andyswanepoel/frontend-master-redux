import { Box } from "@twilio-paste/box";
import { Stack } from "@twilio-paste/stack";

import { useSelector, useDispatch } from "react-redux";
import { DogFactForm } from "./DogFactForm";
import { Fact } from "./Fact";
import { fetchDogFactsFromAPI } from "../store/dogFacts/dogFactsSlices";

export const App = () => {
  const facts = useSelector(state => state.dogFacts.facts);
  const dispatch = useDispatch();

  const handleSubmit = number => {
    dispatch(fetchDogFactsFromAPI(number));
  };

  return (
    <Box>
      <DogFactForm onSubmit={handleSubmit} />
      <Stack orientation="vertical" spacing="space60">
        {facts.map((fact, index) => (
          <Fact key={index} fact={fact.fact} />
        ))}
      </Stack>
    </Box>
  );
};
