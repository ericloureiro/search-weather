import { Box, createStyles, makeStyles, Theme } from "@material-ui/core";

interface IconImageOptions {
  icon: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    img: {
      width: 64,
    },
  })
);

const IconImage = (props: IconImageOptions) => {
  const classes = useStyles();

  return (
    <Box>
      <img
        className={classes.img}
        src={`/icons/${props.icon}.png`}
        alt="Weather Icon"
      />
    </Box>
  );
};

export default IconImage;
