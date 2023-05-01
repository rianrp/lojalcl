import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Chart from '../../components/ForDashboard/Chart';
import Deposits from '../../components/ForDashboard/Deposits';
import Orders from '../../components/ForDashboard/Orders';
import { SellingRepository } from '../../Repositories/selling';
import { MenuDrawer } from '../../components/ForMenu/Drawer';
import PaymentForm from '../../components/Cards';
import { ProductRepository } from '../../Repositories/products';
import { LinearProgress, Typography } from '@material-ui/core';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [sallers, setSallers] = useState();
  const [relatorio, setRelatorios] = useState();
  const [loading, setLoading] = useState(false);


  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const GetSallers = async () => {
    try {
      setLoading(true)
      const response = await SellingRepository.getDados();
      const response2 = await SellingRepository.getAll();
      const response3 = await SellingRepository.getDetails();
      setSallers(response3.data.data)
      setRelatorios(response.data.data)
      console.log(response3)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    GetSallers();
  }, [])

  return (
    <div className={classes.root}>
      <MenuDrawer />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={1} lg={4}>
              <Paper className={fixedHeightPaper}>
                {loading ? (
                  <LinearProgress />
                ) : (
                  <Deposits {...{ sallers, setSallers }} />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper style={{ padding: "20px", width: "auto" }}>
                <Typography style={{ fontWeight: "bold", color: "#949494" }}>Investido</Typography>
                <Grid>
                  {relatorio ? (
                    <Typography style={{ fontWeight: "bold", color: "#949494" }}>
                      R$ {relatorio[3].toFixed(2)}
                    </Typography>
                  ) : (
                    <LinearProgress />
                  )}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper style={{ padding: "20px", width: "auto", backgroundColor: "#dbf4e3" }}>
                <Typography style={{ fontWeight: "bold", color: "#44cb67" }}>Ganhos</Typography>
                <Grid>
                  {relatorio ? (
                    <Typography style={{ fontWeight: "bold", color: "#44cb67" }}>
                      R$ {relatorio[2].toFixed(2)}
                    </Typography>
                  ) : (
                    <LinearProgress />
                  )}
                </Grid>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper style={{ padding: "20px", width: "auto", backgroundColor: "#fcdce3" }}>
                <Typography style={{ fontWeight: "bold", color: "#fc4467" }}>Perdas</Typography>
                <Grid>
                  {relatorio ? (
                    <Typography style={{ fontWeight: "bold", color: "#fc4467" }}>
                      R$ {relatorio[0].toFixed(2)}
                    </Typography>
                  ) : (
                    <LinearProgress />
                  )}
                </Grid>
              </Paper>
            </Grid>
            {/* Recent Orders */}
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {loading ? (
                  <LinearProgress />
                ) : (
                  <Orders {...{ sallers }} />
                )}
              </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart {...{ sallers }} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}