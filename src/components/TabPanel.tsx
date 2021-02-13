import { Grid } from "@material-ui/core";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return (
    <div>
      {value === index && (
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>{children}</Grid>
        </Grid>
      )}
    </div>
  );
};

export default TabPanel;
