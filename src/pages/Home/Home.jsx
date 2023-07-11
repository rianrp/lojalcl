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
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import PeopleIcon from '@material-ui/icons/People';

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
  const [relatorio, setRelatorios] = useState();
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const GetSallers = async () => {
    try {
      setLoading(true)
      const response = await SellingRepository.getDados();
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
              <Grid container style={{ backgroundColor: "white", padding: "20px", borderRadius: "20px", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", display: "flex", alignItems: "center", maxWidth: "fit-content", width: "100%", height: "150px", margin: "10px" }}>
                <Grid>
                  <Typography style={{ margin: "0px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.5px", lineHeight: 2.5, textTransform: "uppercase", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'", color: "rgb(108, 115, 127)" }}>orçamento</Typography>
                  <Typography style={{ margin: "0px", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "2rem", lineHeight: 1.2 }}>R$ {parseFloat(relatorio?.orcamento).toFixed(2)}</Typography>
                </Grid>
                <Grid style={{ marginLeft: "auto", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'", lineHeight: 1, borderRadius: "50%", overflow: "hidden", userSelect: "none", color: "rgb(255, 255, 255)", fontSize: "14px", fontWeight: 600, letterSpacing: "0px", backgroundColor: "rgb(240, 68, 56)", height: "56px", width: "56px", textAlign: "center" }}>
                  <MonetizationOnIcon style={{ borderRadius: "50%", backgroundColor: "#f4443c", color: "white" }} />
                </Grid>
                <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "16px" }}>
                  <Typography style={{ margin: "0px", fontSize: "0.75rem", fontWeight: 500, lineHeight: 1.66, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'", color: "rgb(108, 115, 127)" }}>Orçamento em produtos</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={fullScreen ? 12 : 4}>
              <Grid container style={{ backgroundColor: "white", padding: "20px", borderRadius: "20px", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", display: "flex", alignItems: "center", maxWidth: "fit-content", width: "100%", height: "150px", margin: "10px" }}>
                <Grid>
                  <Typography style={{ margin: "0px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.5px", lineHeight: 2.5, textTransform: "uppercase", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'", color: "rgb(108, 115, 127)" }}>lucro total</Typography>
                  <Typography style={{ margin: "0px", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "2rem", lineHeight: 1.2, wordBreak: "break-word" }}>R$ {parseFloat(relatorio?.saldoliquido).toFixed(2)}</Typography>
                </Grid>
                <Grid style={{ marginLeft: "auto", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'", lineHeight: 1, borderRadius: "50%", overflow: "hidden", userSelect: "none", color: "rgb(255, 255, 255)", fontSize: "14px", fontWeight: 600, letterSpacing: "0px", backgroundColor: "#6366f1", height: "56px", width: "56px", textAlign: "center" }}>
                  <MonetizationOnIcon style={{ borderRadius: "50%", backgroundColor: "#6366f1", color: "white" }} />
                </Grid>
                <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "16px" }}>
                  <Typography style={{ margin: "0px", fontSize: "0.75rem", fontWeight: 500, lineHeight: 1.66, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'", color: "rgb(108, 115, 127)" }}>Desde o começo do mês</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container item xs={fullScreen ? 12 : 4} >
              <Grid container style={{ backgroundColor: "white", padding: "20px", borderRadius: "20px", boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.1)", display: "flex", alignItems: "center", maxWidth: "fit-content", width: "100%", height: "150px", margin: "10px" }}>
                <Grid>
                  <Typography style={{ margin: "0px", fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.5px", lineHeight: 2.5, textTransform: "uppercase", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'", color: "rgb(108, 115, 127)" }}>total de vendas</Typography>
                  <Typography style={{ margin: "0px", fontFamily: "Plus Jakarta Sans, sans-serif", fontWeight: 700, fontSize: "2rem", lineHeight: 1.2 }}>{relatorio?.totalvendas} Vendas</Typography>
                </Grid>
                <Grid style={{ marginLeft: "auto", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'", lineHeight: 1, borderRadius: "50%", overflow: "hidden", userSelect: "none", color: "rgb(255, 255, 255)", fontSize: "14px", fontWeight: 600, letterSpacing: "0px", backgroundColor: "#10b981", height: "56px", width: "56px", textAlign: "center" }}>
                  <MonetizationOnIcon style={{ borderRadius: "50%", backgroundColor: "#10b981", color: "white" }} />
                </Grid>
                <Grid style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "16px" }}>
                  <Typography style={{ margin: "0px", fontSize: "0.75rem", fontWeight: 500, lineHeight: 1.66, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'", color: "rgb(108, 115, 127)" }}>Desde o começo do mês</Typography>
                </Grid>
              </Grid>
            </Grid>
            {/* <Grid item xs={fullScreen ? 12 : 4}>
              <ProductCard {...{ relatorio }} />
            </Grid> */}
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