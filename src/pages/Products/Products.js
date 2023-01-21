import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { ProductRepository } from "../../Repositories/products";
import Cards from "../../components/Cards";
import PrimarySearchAppBar from "../../components/SearchByItems";
import ModalAddProducts from "./ModalAddProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import SnackbarsMessage from "../../components/SnackbarMessage";
import ModalEditProducts from "./ModalEditProduct";
import { Backdrop, CircularProgress, TablePagination } from "@material-ui/core";
import ModalBuyProducts from "./ModalBuyProducts";
import { SellingRepository } from "../../Repositories/selling";
import { MenuDrawer } from "../../components/Drawer";
import PaginationRounded from "../../components/Pagination";
import Pagination from "@material-ui/lab/Pagination";

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
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Products() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openBuy, setOpenBuy] = useState(false);
  const [message, setMessage] = useState("");
  const [SnackbarOpen, setSnackbarOpen] = useState();
  const [severity, setSeverity] = useState();
  const [id, setId] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [allProducts, setAllProducts] = useState(
    searchValue == "" ? "" : { searchValue }
  );
  const [categoryProducts, setCategoryProducts] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [priceEdit, setPriceEdit] = useState();
  const [priceBuy, setPriceBuy] = useState();
  const [quantity, setQuantity] = useState();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [itensperpage, setItensperpage] = useState(12);
  const pages = Math.ceil(allProducts.length / itensperpage);
  const s = (page - 1) * itensperpage;
  const i = s + itensperpage;
  const ProductsPerPage = allProducts.slice(s, i);

  const handleOpenCreate = async () => {
    setOpenModal(true);
    setName("");
    setCategoryProducts(6);
    setImage("");
    setPrice("0");
    setQuantity(0);
  };

  const handleClickSave = async () => {
    try {
      let list = {
        name: name,
        category: categoryProducts,
        price: Number(parseFloat(price).toFixed(2)),
        image: image,
        quantity: quantity,
      };
      await ProductRepository.post(list);
      setLoading(true);
      GetProducts();
      setOpenModal(false);
      setMessage("Produto cadastrado com sucesso!");
      setSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await ProductRepository.delete(id);
      setLoading(true);
      GetProducts();
    } catch (error) {
    } finally {
      setOpenDelete(false);
      setLoading(false);
    }
  };

  const handleOpenDelete = (id) => {
    setOpenDelete(true);
    setId(id);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenEdit = async (
    id,
    name,
    category,
    image,
    prices,
    quantity
  ) => {
    setId(id);
    setName(name);
    setCategoryProducts(category);
    setImage(image);
    setPriceEdit(prices);
    setQuantity(quantity);
    setOpenEdit(true);
  };

  const handleClickSaveEdit = async () => {
    try {
      let list = {
        id: id,
        name: name,
        category: categoryProducts,
        price: Number(parseFloat(priceEdit).toFixed(2)),
        image: image,
        quantity: quantity,
      };
      await ProductRepository.put(list);
      setLoading(true);
      GetProducts();
      setOpenEdit(false);
      setMessage("Produto editado com sucesso!");
      setSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
    } finally {
      setLoading(false);
      setPriceEdit("");
    }
  };

  const handleSearch = async () => {
    try {
      if (searchValue) {
        const response = await ProductRepository.getByName(searchValue);
        setAllProducts(response.data.data);
      } else {
        GetProducts();
      }
    } catch (error) {}
  };

  const GetProducts = async () => {
    try {
      const response = await ProductRepository.getAll();
      setAllProducts(response.data.data);
    } catch (error) {}
  };

  const handleBuyProduct = async (id, name, quantity, price) => {
    setOpenBuy(true);
    setName(name);
    setId(id);
    setQuantity(quantity);
    setPriceBuy(price);
  };

  const handleClickSaveBuy = async (price, quantity) => {
    try {
      let list = {
        idproduct: id,
        product: name,
        quantity: quantity,
        description: "string",
        total: parseFloat(price),
        data: new Date(),
      };
      await SellingRepository.post(list);
      setLoading(true);
      GetProducts();
      setOpenEdit(false);
      setMessage("Venda realizada com sucesso!");
      setSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <div className={classes.root}>
      <MenuDrawer />
      <main className={classes.content}>
        <SnackbarsMessage
          {...{ message, SnackbarOpen, setSnackbarOpen, severity }}
        />
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className={classes.appBarSpacer} />
        <ModalAddProducts
          {...{
            openModal,
            setOpenModal,
            name,
            setName,
            categoryProducts,
            setCategoryProducts,
            price,
            setPrice,
            image,
            setImage,
            quantity,
            setQuantity,
            handleClickSave,
            loading,
          }}
        />
        <ModalDeleteProduct
          {...{ openDelete, handleCloseDelete, handleDelete, loading }}
        />
        <ModalEditProducts
          {...{
            handleOpenEdit,
            name,
            setName,
            categoryProducts,
            setCategoryProducts,
            priceEdit,
            setPriceEdit,
            image,
            setImage,
            quantity,
            setQuantity,
            openEdit,
            setOpenEdit,
            handleClickSaveEdit,
            loading,
          }}
        />
        <ModalBuyProducts
          {...{
            openBuy,
            setOpenBuy,
            name,
            id,
            quantity,
            priceBuy,
            setPriceBuy,
            setQuantity,
            handleClickSaveBuy,
          }}
        />
        <PrimarySearchAppBar
          {...{
            openModal,
            handleOpenCreate,
            searchValue,
            setSearchValue,
            handleSearch,
          }}
        />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={1}>
            {allProducts ? (
              <Cards
                {...{
                  ProductsPerPage,
                  handleOpenDelete,
                  handleOpenEdit,
                  handleBuyProduct,
                }}
              />
            ) : null}
          </Grid>
        </Container>
        <Grid
          style={{ textAlign: "center", alignItems: "center", float: "center", display: "flex", justifyContent: "center" }}
        >
          <Grid>
            <Pagination
              count={pages}
              onChange={(e, page) => setPage(page)}
              shape="rounded"
            />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
