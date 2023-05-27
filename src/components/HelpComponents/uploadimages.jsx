import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import { Grid, Typography } from "@material-ui/core";
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
  imgGrid: {
    width: "auto",
    padding: "10px",
    textAlign: "center",
    "&& img": {
      width: "200px"
    }
  },
  gridSelectImg: {
    width: "auto",
    padding: "10px",
    "&& div": {
      padding: "40px",
      width: "auto",
      textAlign: "center",
      borderColor: "#acacac",
      borderStyle: "dashed",
      borderWidth: "thin"
    }
  }
}));

export default function UploadButton(props) {
  const classes = useStyles();

  const upload = (arquivo) => {
    const imagemUpload = arquivo.target.files;
    if (imagemUpload.lenght <= 0) return;
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      props.setImage(fileReader.result);
    };
    fileReader.readAsDataURL(imagemUpload[0]);
  };

  return (
    <div className={classes.root}>
      <input
        accept="image/*"
        className={classes.input}
        id="contained-button-file"
        multiple
        type="file"
        onChange={upload}
      />
      <label htmlFor="contained-button-file">
        {props.image ? <Grid className={classes.imgGrid}><img src={props.image}></img></Grid> :
          <Grid className={classes.gridSelectImg}>
            <Grid>
              <AddPhotoAlternateIcon />
              <Typography>{props.label}</Typography>
            </Grid>
          </Grid>
        }
      </label>
      <input
        accept="image/*"
        className={classes.input}
        id="icon-button-file"
        type="file"
      />
    </div>
  );
}
