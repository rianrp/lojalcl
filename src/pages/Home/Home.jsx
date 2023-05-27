import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { SellingRepository } from '../../Repositories/selling';
import { MenuDrawer } from '../../components/ForMenu/Drawer';
import { LinearProgress, Typography, useMediaQuery } from '@material-ui/core';
import ProductCard from './ProductCard';
import SoldItem from './ProductList';
import OrderList from './Pedidos';



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: "100vh"
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
    height: '100%',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  }, card: {
    position: 'relative',
    width: 'auto',
    maxWidth: 320,
    height: 200,
    backgroundColor: '#303030',
    borderRadius: 10,
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    padding: 20,
    fontSize: 16,
    color: '#fff',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 2px 7px rgba(0, 0, 0, 0.5)',
    },
  },
  card__logo: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 50,
    height: 30,
    backgroundImage: 'url(card-logo.png)',
    backgroundSize: 'cover',
  },
  card__number: {
    fontSize: 23,
    marginBottom: 20,
    '&:hover': {
      opacity: 1,
    },
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
  },
  card__info: {
    display: 'flex',
    justifyContent: 'space-between',
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
    marginBottom: "20px",
    boxSizing: "border-box",
    paddingLeft: "10px",
    paddingRight: "10px"
  },
  card__name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    '&:hover': {
      opacity: 1,
    },
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
    alignSelf: 'flex-end', // adicionado
  },
  card__expiry: {
    fontSize: 14,
    fontStyle: 'italic',
    '&:hover': {
      opacity: 1,
    },
    opacity: 0.7,
    transition: 'opacity 0.3s ease',
    alignSelf: 'flex-end', // adicionado
  },
  card__balance: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
  footer: {
    backgroundColor: theme.palette.primary.main,
    color: '#fff',
    padding: theme.spacing(4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
    width: '100%',
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [sallers, setSallers] = useState();
  const [relatorio, setRelatorios] = useState();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const GetSallers = async () => {
    try {
      setLoading(true)
      const response = await SellingRepository.getDados();
      const response3 = await SellingRepository.getDetails();
      setSallers(response3.data.data)
      setRelatorios(response.data.data[0])
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
          <Grid container>
            <Grid container item xs={fullScreen ? 12 : 4} >
              <Grid item xs={12}>
                <div className={classes.card}>
                  <div className={classes.card__logo}>
                    <img src="https://th.bing.com/th/id/R.18bf4ee0dd2e2d4ddc937cdd10a62b6b?rik=N5MGkpzgQ%2fkyDw&pid=ImgRaw&r=0" width={50}></img>
                  </div>
                  <div className={classes.card__number}>{"***** ***** 7374"}</div>
                  <div className={classes.card__balance}>Saldo R${relatorio?.saldoliquido}</div>
                  <div className={classes.card__info}>
                    <div className={classes.card__name}>{"Cartão principal"}</div>
                    <div className={classes.card__expiry}>{"12/21"}</div>
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={fullScreen ? 12 : 4}>
              <ProductCard {...{ relatorio }} />
            </Grid>
            <Grid item xs={fullScreen ? 12 : 4}>
              <OrderList />
            </Grid>
          </Grid>
        </Container>
        <Grid>
          <div className={classes.footer}>
            <Typography variant="body1" style={{ width: "auto" }}>
              © 2023 LCLcelulares. Todos os direitos reservados.
            </Typography>
          </div>
        </Grid>
      </main>
    </div>
  );
}