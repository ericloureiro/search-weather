import { Grid } from "@material-ui/core";
import { Week } from "../store/types";
import DayCard from "./DayCard";

interface WeekGridOptions {
  week: Week;
}

const WeekGrid = (props: WeekGridOptions) => {
  const { week } = props;

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      {week.map((day, index) => (
        <Grid item key={index}>
          <DayCard day={day} />
        </Grid>
      ))}
    </Grid>
  );
};

export default WeekGrid;
