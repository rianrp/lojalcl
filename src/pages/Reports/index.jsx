import 'date-fns';
import React, { useEffect, useState } from "react"
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { AppBar, Avatar, Button, ButtonGroup, Checkbox, Container, FormControlLabel, Grid, IconButton, TextField, Toolbar, Typography, alpha, makeStyles, useMediaQuery, useTheme, withStyles } from "@material-ui/core"
import { MenuDrawer } from "../../components/ForMenu/Drawer"
import SearchIcon from '@material-ui/icons/Search';
import DataTableSallers from "../../components/Tabels/sallers";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import UDatePicker from '../../components/UDatePicker';
import GetAppIcon from '@material-ui/icons/GetApp';
import ExportExcel from '../../components/Excel';
import { SellingRepository } from '../../Repositories/selling';
import { Enums } from '../../enums';

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        backgroundColor: "#FFFFFF"
    }, text: {
        padding: theme.spacing(2, 2, 0),
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
    },
    fixedHeight: {
        height: 240,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: "#fff",
    }, search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export const ReportsPage = () => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [dataFim, setDataFim] = useState(new Date())
    const [dataInicio, setDataInicio] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState();
    const [rowsExcel, setRowsExcel] = useState();
    const [colunasExcel, setColunasExcel] = useState();
    const [periodo, setPeriodo] = useState(4);
    const [produto, setProduto] = useState("");
    const [data, setData] = useState([]);

    const getDetailsData = async () => {
        try {
            let dto = {
                product: produto,
                datai: dataInicio ? dataInicio.toISOString() : new Date().toISOString(),
                dataif: dataFim ? dataFim.toISOString() : new Date().toISOString()
            }
            const response = await SellingRepository.getDetails(dto);
            setData(response.data); // Supondo que a resposta da API esteja em response.data
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        getDetailsData()
    }, [])

    function category(category) {
        switch (category) {
          case Enums.category.pelicula:
            category = "Película";
            break;
          case Enums.category.capinha:
            category = "Capinha";
            break;
          case Enums.category.carregador:
            category = "Carregador";
            break;
          case Enums.category.cabo:
            category = "Cabo";
            break;
          case Enums.category.fonte:
            category = "Fonte";
            break;
          case Enums.category.caixadesom:
            category = "Caixa de som";
            break;
          case Enums.category.fonedeouvido:
            category = "Fone de ouvido";
            break;
          case Enums.category.suporteparacelular:
            category = "Suporte para celular";
            break;
          case Enums.category.mouse:
            category = "Mouse";
            break;
          case Enums.category.teclado:
            category = "Teclado";
            break;
          case Enums.category.relogio:
            category = "Relógio";
            break;
          case Enums.category.adaptador:
            category = "Adaptador";
            break;
          case Enums.category.outros:
            category = "Outros";
            break;
      
          default:
            break;
        }
        return category;
      }
      
      function payment(category) {
        switch (category) {
          case Enums.paymentMethod.pix:
            category = "Pix";
            break;
          case Enums.paymentMethod.dinheiro:
            category = "Dinheiro";
            break;
          case Enums.paymentMethod.cheque:
            category = "Cheque";
            break;
          case Enums.paymentMethod.cartaodedebito:
            category = "Cartão de débito";
            break;
          case Enums.paymentMethod.cartaodecredito:
            category = "Cartão de crédito";
            break;
          case Enums.paymentMethod.boletobancario:
            category = "Boleto";
            break;
          default:
            break;
        }
        return category;
      }

    const array = [
        { nome: 'João' },
        { nome: 'Maria' },
        { nome: 'Pedro' },
        { nome: 'Ana' },
    ];

    // Código completo
    useEffect(() => {
        setColunasExcel(['ID', 'Nome do produto', 'Método de pagamento', 'Total', 'Quantidade', 'Data de venda']);

        const datas = data?.data?.map((item) => {
          return [
            item.id,
            item.itens,
            payment(item.payment),
            "R$ " + parseFloat(item.total).toFixed(2),
            item.quantityItem,
            new Date(item.data).toLocaleDateString("pt-BR"),
          ];
        });
      
        setRowsExcel(datas);
    }, [data]);

    useEffect(() => {
        if (periodo) {
            let inicio = new Date();
            let fim = new Date();

            switch (periodo) {
                case 1:
                    inicio.setDate(inicio.getDate() - 7);
                    break;
                case 2:
                    inicio = new Date(inicio.getFullYear(), inicio.getMonth(), 1);
                    break;
                case 3:
                    inicio = new Date(inicio.getFullYear(), 0, 1);
                    break;
            }

            setDataInicio(inicio);
            setDataFim(fim);
        }
    }, [periodo]);

    return (
        <div className={classes.root}>
            <MenuDrawer />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <Grid item xs={12} className={classes.groupButton} style={{ textAlign: "center", marginBottom: "20px", width: "-webkit-fill-available" }}>
                        <ButtonGroup
                        orientation={fullScreen?"vertical":"horizontal"}
                        fullWidth={fullScreen?true:false}
                        >
                            <Button
                                style={{
                                    background: periodo === 1 ? '#4054b4' : 'transparent',
                                    color: periodo === 1 ? 'white' : '#4054b4',
                                    border: '1px solid #4054b4',
                                    '&:hover': {
                                        background: '#4054b4',
                                        color: 'white'
                                    }
                                }}
                                onClick={() => setPeriodo(1)}
                            >
                                <Typography style={{ fontSize: 11 }}>Semanal</Typography>
                            </Button>
                            <Button
                                style={{
                                    background: periodo === 2 ? '#4054b4' : 'transparent',
                                    color: periodo === 2 ? 'white' : '#4054b4',
                                    border: '1px solid #4054b4',
                                    '&:hover': {
                                        background: '#4054b4',
                                        color: 'white'
                                    }
                                }}
                                onClick={() => setPeriodo(2)}
                            >
                                <Typography style={{ fontSize: 11 }}>Mensal</Typography>
                            </Button>
                            <Button
                                style={{
                                    background: periodo === 3 ? '#4054b4' : 'transparent',
                                    color: periodo === 3 ? 'white' : '#4054b4',
                                    border: '1px solid #4054b4',
                                    '&:hover': {
                                        background: '#4054b4',
                                        color: 'white'
                                    }
                                }}
                                onClick={() => setPeriodo(3)}
                            >
                                <Typography style={{ fontSize: 11 }}>Anual</Typography>
                            </Button>
                            <Button
                                style={{
                                    background: periodo === 4 ? '#4054b4' : 'transparent',
                                    color: periodo === 4 ? 'white' : '#4054b4',
                                    border: '1px solid #4054b4',
                                    '&:hover': {
                                        background: '#4054b4',
                                        color: 'white'
                                    }
                                }}
                                onClick={() => setPeriodo(4)}
                            >
                                <Typography style={{ fontSize: 11 }}>Personalizado</Typography>
                            </Button>
                        </ButtonGroup>
                    </Grid>
                    <Grid container style={{ backgroundColor: "#FFFFFF", borderRadius: "6px", margin: "2px" }}>
                        <Grid item xs={fullScreen?12:4} style={{ padding: "6px" }}>
                            <TextField
                                id="outlined-size-small"
                                label="Nome do produto"
                                variant="outlined"
                                value={produto}
                                fullWidth={true}
                                onChange={(e) => setProduto(e.target.value)}
                                size="small" />
                        </Grid>
                        <Grid item xs={fullScreen?12:2} style={{ paddingLeft: "5px",  paddingRight: "5px"}}>
                            <UDatePicker date={dataInicio} setDate={setDataInicio} label="Data Início" />
                        </Grid>
                        <Grid item xs={fullScreen?12:2} style={{ paddingLeft: "3px", paddingRight: "3px" }}>
                            <UDatePicker date={dataFim} setDate={setDataFim} label="Data Fim" />
                        </Grid>
                        <Grid item xs={fullScreen?12:2} style={{ padding: "9px", textAlign: "right" }}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                startIcon={<SearchIcon />}
                                fullWidth={true}
                                onClick={() => getDetailsData()}
                            >
                                Pesquisar
                            </Button>
                        </Grid>
                        <Grid item xs={fullScreen?12:2} style={{ padding: "4px", textAlign: "right" }}>
                            <ExportExcel name="Relatório de Compras Consolidadas" columns={colunasExcel} data={rowsExcel} element={
                                <>
                                    <Button variant="contained"
                                        color="primary" className={classes.button}>
                                        <GetAppIcon />
                                        Exportar
                                    </Button>
                                </>
                            } />
                        </Grid>
                    </Grid>
                    {data.length == 0 ? (
                        null
                    ) : (
                        <DataTableSallers {...{ data }} />
                    )}
                </Container>
            </main>
        </div>
    )
}