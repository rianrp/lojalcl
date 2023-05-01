import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { ProductRepository } from "../../Repositories/products";
import Cards from "../../components/ForProducts/Cards";
import PrimarySearchAppBar from "../../components/ForProducts/SearchByItems";
import ModalAddProducts from "./ModalAddProduct";
import ModalDeleteProduct from "./ModalDeleteProduct";
import SnackbarsMessage from "../../components/AllPages/SnackbarMessage";
import ModalEditProducts from "./ModalEditProduct";
import { Backdrop, CircularProgress, TablePagination } from "@material-ui/core";
import ModalBuyProducts from "./ModalBuyProducts";
import { SellingRepository } from "../../Repositories/selling";
import { MenuDrawer } from "../../components/ForMenu/Drawer";
import PaginationRounded from "../../components/ForMenu/Pagination";
import Pagination from "@material-ui/lab/Pagination";
import ModalSellProducts from "./ModalSellProduct";
import { Notification } from "../../components/Notification";

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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Products() {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openCart, setOpenCart] = useState(false)
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
  const [marginEdit, setMarginEdit] = useState();
  const [priceBuy, setPriceBuy] = useState();
  const [quantity, setQuantity] = useState();
  const [warranty, setWarranty] = useState();
  const [margin, setMargin] = useState();
  const [loading, setLoading] = useState(false);
  const [cartItem, setCartItems] = useState([]);
  const [descont, setDescont] = useState()
  const [description, setDescription] = useState("");
  const [payment, setPayment] = useState(1);
  let date = new Date();
  const [data, setDate] = useState(date);
  const [page, setPage] = useState(1);
  const [itensperpage, setItensperpage] = useState(12);
  const [values, setValues] = useState({
    subtotal: 0,
    descont: 0,
    tax: 0,
    total: 0
  })
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
      setLoading(true);
      let list = {
        name: name,
        category: categoryProducts,
        price: Number(parseFloat(price).toFixed(2)),
        image: image,
        quantity: quantity,
        warranty: warranty,
        margin: Number(parseFloat(margin).toFixed(2))
      };
      await ProductRepository.post(list);
      GetProducts();
      setOpenModal(false);
      setMessage("Produto cadastrado com sucesso!");
      setSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setMessage("Ocorreu um erro no sistema!");
      setSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await ProductRepository.delete(id);
      GetProducts();
    } catch (error) {
      setMessage("Ocorreu um erro no sistema!");
      setSeverity("error");
      setSnackbarOpen(true);
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

  const clear = () => {
    setPayment(1)
    setDescription("");
  }

  const handleOpenEdit = async (
    id,
    name,
    category,
    image,
    prices,
    quantity,
    warranty,
    margin
  ) => {
    setId(id);
    setName(name);
    setCategoryProducts(category);
    setImage(image);
    setPriceEdit(prices);
    setQuantity(quantity);
    setOpenEdit(true);
    setMarginEdit(margin)
    setWarranty(warranty)
  };

  const handleClickSaveEdit = async () => {
    try {
      setLoading(true);
      let list = {
        id: id,
        name: name,
        category: categoryProducts,
        price: Number(parseFloat(priceEdit).toFixed(2)),
        image: image,
        quantity: quantity,
        warranty: warranty,
        margin: Number(parseFloat(marginEdit).toFixed(2))
      };
      await ProductRepository.put(list);
      GetProducts();
      setOpenEdit(false);
      setMessage("Produto editado com sucesso!");
      setSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setMessage("Ocorreu um erro no sistema!");
      setSeverity("error");
      setSnackbarOpen(true);
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
    } catch (error) {
      setMessage("Ocorreu um erro no sistema!");
      setSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const GetProducts = async () => {
    try {
      setLoading(true);
      const response = await ProductRepository.getAll();
      setAllProducts(response.data.data);
    } catch (error) {
      setMessage("Ocorreu um erro no sistema!");
      setSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyProduct = async (id, name, quantity, price, img, warranty) => {
    setOpenBuy(true);
    setName(name);
    setId(id);
    setQuantity(quantity);
    setPriceBuy(price);
    setImage(img);
    setWarranty(warranty);
  };

  const handleAddCar = async (item) => {
    if (item.quantity <= 0) {
      setMessage("Adicionado uma quantidade ao produto");
      setSeverity("warning");
      setSnackbarOpen(true);
      return
    }
    const productIndex = cartItem.findIndex((p) => p.id === item.id);
    if (productIndex !== -1) {
      cartItem[productIndex].quantity = item.quantity;
      cartItem[productIndex].price = item.price;
      setMessage("Adicionado ao carrinho");
      setSeverity("warning");
      setSnackbarOpen(true);
    } else {
      setMessage("Adicionado ao carrinho");
      setSeverity("success");
      setSnackbarOpen(true);
      setCartItems([...cartItem, item]);
    }
    setOpenBuy(false)
  };

  const handleClickSaveBuy = async () => {
    if (description == null || description == "") {
      setMessage("Adicione uma descrição");
      setSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    try {
      setLoading(true);

      let listProducts = [];

      for (let i = 0; i < cartItem.length; i++) {
        const element = cartItem[i];
        const item = {
          idproduct: element.id,
          product: element.name,
          quantity: element.quantity,
        };
        listProducts.push(item);
      }

      let dto = {
        venda: {
          discount: descont == undefined ? 0 : descont,
          description: description,
          total: Number(parseFloat(values.total).toFixed(2)),
          data: data,
          payment: payment,
          status: 1
        },
        itens: listProducts
      };

      await SellingRepository.post(dto);

      setMessage("Produto reservado no caixa!");
      setSeverity("success");
      setSnackbarOpen(true);
    } catch (error) {
      setMessage("Ocorreu um erro no sistema!");
      setSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setLoading(false);
      GetProducts();
      setCartItems([])
      setOpenCart(false);
      clear()
    }
  };

  const handleOpenCart = () => {
    setOpenCart(true)
  }

  useEffect(() => {
    GetProducts();
  }, []);

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
            warranty,
            setWarranty,
            margin,
            setMargin,
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
            setQuantity,
            warranty,
            setWarranty,
            marginEdit,
            setMarginEdit,
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
            image,
            warranty,
            setPriceBuy,
            setQuantity,
            handleAddCar,
            setOpenCart,
            openCart
          }}
        />
        <ModalSellProducts
          {...{ cartItem, setCartItems, openCart, setOpenCart, handleClickSaveBuy, descont, setDescont, description, setDescription, payment, setPayment, values, setValues }}
        />
        <PrimarySearchAppBar
          {...{
            openModal,
            handleOpenCreate,
            searchValue,
            setSearchValue,
            handleSearch,
            handleOpenCart,
            cartItem
          }}
        />
        <Grid container item xs={12} justify="left" alignItems="center">
          {allProducts ? (
            <Cards
              {...{
                ProductsPerPage,
                handleOpenDelete,
                handleOpenEdit,
                handleBuyProduct,
                searchValue
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
              onChange={(e, page) => setPage(page)}
              shape="rounded"
            />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}
