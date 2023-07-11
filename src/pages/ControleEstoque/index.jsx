import { alpha, Backdrop, Button, CircularProgress, Grid, IconButton, InputBase, makeStyles, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { MenuDrawer } from "../../components/ForMenu/Drawer"
import SnackbarsMessage from "../../components/AllPages/SnackbarMessage";
import CardsRestoque from "../../components/ForProducts/CardsRestoque";
import Pagination from "@material-ui/lab/Pagination/Pagination";
import { ProductRepository } from "../../Repositories/products";
import ModalRestoque from "./Modais/ModalRestoque";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
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
    backdrop: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        color: "#fff", // cor de fundo desejada
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}));

export const InventoryControl = () => {
    const classes = useStyles();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [SnackbarOpen, setSnackbarOpen] = useState();
    const [severity, setSeverity] = useState();
    const [allProducts, setAllProducts] = useState([]);
    const [openRestoque, setOpenRestoque] = useState(false);
    const [restoqueSelected, setRestoqueSelected] = useState([])
    const [quantity, setQuantity] = useState(0)
    const [price, setPrice] = useState(0)
    const [margin, setMargin] = useState(0)
    const [itensperpage, setItensperpage] = useState(12);
    const [page, setPage] = useState(1);
    const pages = Math.ceil(allProducts.length / itensperpage);
    const s = (page - 1) * itensperpage;
    const i = s + itensperpage;
    const ProductsPerPage = allProducts.slice(s, i);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleSelectedRestoque = (id,
        name,
        category,
        image,
        prices,
        quantity,
        warranty,
        margin,
        description
    ) => {
        setRestoqueSelected({
            id: id,
            name: name,
            category: category,
            image: image,
            prices: prices,
            quantity: quantity,
            warranty: warranty,
            margin: margin,
            description: description
        })
        setQuantity(quantity)
        setPrice(prices)
        setMargin(margin)
        setOpenRestoque(true)
    }

    const handleClickSaveRestoque = async () => {
        try {
            setLoading(true);
            let list = {
                id: restoqueSelected.id,
                name: restoqueSelected.name,
                category: restoqueSelected.category,
                price: Number(parseFloat(price).toFixed(2)),
                image: restoqueSelected.image,
                quantity: quantity,
                warranty: restoqueSelected.warranty,
                margin: Number(parseFloat(margin).toFixed(2)),
                description: restoqueSelected.description
            };
            await ProductRepository.put(list);
            getAllProductsRestoque()
            setOpenRestoque(false);
            setMessage("O produto foi restocado com sucesso no sistema");
            setSeverity("success");
            setSnackbarOpen(true);
        } catch (error) {
            setMessage("Ocorreu um erro no sistema!");
            setSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setLoading(false)
        }
    }

    const getAllProductsRestoque = async () => {
        try {
            setLoading(true);
            const response = await ProductRepository.getAllRestoque();
            setAllProducts(response.data.data.sort((a, b) => a.quantity - b.quantity));
        } catch (error) {
            setMessage("Ocorreu um erro no sistema!");
            setSeverity("error");
            setSnackbarOpen(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getAllProductsRestoque();
    }, [])

    return (
        <div className={classes.root}>
            <MenuDrawer />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <main className={classes.content}>
                <SnackbarsMessage
                    {...{ message, SnackbarOpen, setSnackbarOpen, severity }}
                />
                <div className={classes.appBarSpacer} />
                <ModalRestoque {...{ setOpenRestoque, openRestoque, restoqueSelected, quantity, margin, price, setQuantity, setPrice, setMargin, handleClickSaveRestoque, loading }} />
                <Grid container item xs={12} justify="left" alignItems="center">
                    {allProducts ? (
                        <CardsRestoque
                            {...{
                                ProductsPerPage,
                                setOpenRestoque,
                                openRestoque,
                                handleSelectedRestoque
                            }}
                        />
                    ) : null}
                </Grid>
                <Grid
                    style={{
                        textAlign: "center",
                        alignItems: "center",
                        float: "center",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <Grid>
                        <Pagination
                            count={pages}
                            onChange={handleChangePage}
                            shape="rounded"
                        />
                    </Grid>
                </Grid>
            </main>
        </div>
    )
}