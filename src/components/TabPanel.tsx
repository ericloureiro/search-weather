import { Box } from "@material-ui/core";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index } = props;

  return <div>{value === index && <Box>{children}</Box>}</div>;
};

export default TabPanel;
