import React from "react";
import "./style.css";
import { Grid } from "@material-ui/core";

const orderList = [
    {
        id: "0001",
        customer: "João silveira",
        orderName: "Reparação de tela",
        orderDate: "Maio 15, 2023",
        orderImg: "https://th.bing.com/th/id/R.10d6c5747abc26381c57209d411b23e6?rik=eo1giitprefHMg&pid=ImgRaw&r=0",
    },
    {
        id: "0002",
        customer: "Manuel Gomes",
        orderName: "Mudança de tela",
        orderDate: "Maio 16, 2023",
        orderImg: "https://www.aranzulla.it/wp-content/contenuti/2013/06/iphone-rotto.jpg",
    },
    {
        id: "0003",
        customer: "Rodrigo luís fernandes",
        orderName: "Reparação de tela e bateria",
        orderDate: "Maio 12, 2023",
        orderImg: "https://th.bing.com/th/id/R.956fe942cc3fde790867095a82191067?rik=v2J2MN8hR7mHdw&riu=http%3a%2f%2fwww.rockandpop.cl%2fwp-content%2fuploads%2f2017%2f06%2fpantalla-trizada-960.jpg&ehk=DO84M%2bmU6wEvEePbJgCU8283kRqnWxoy9FeLbVUGaEM%3d&risl=&pid=ImgRaw&r=0",
    },
];

const OrderList = () => {
    return (
        <div style={{
            padding: "10px", backgroundColor: '#fff',
            borderRadius: 10,
            border: '1px solid #ddd',
        }}>
            <h2 className="title">Pedidos de consertos</h2>
            {orderList.map((order) => (
                <>
                    <div className="order" key={order.id}>
                        <div className="order-avatar">
                            <img src={order.orderImg} alt="Order avatar" />
                            
                        </div>
                        <div className="order-info">
                            <h3>{order.orderName}</h3>
                            <h8>
                                <strong>Cliente:</strong> {order.customer}
                            </h8>
                            <p>
                                <strong>Número do pedido:</strong> {order.id}
                            </p>
                            <h9>{order.orderDate}</h9>
                        </div>

                    </div>
                    <Grid style={{textAlign: "center", width: "auto"}}>
                        <hr style={{
                            height: "1px",
                            border: "none",
                            backgroundColor: "#ddd",
                            margin: "10px 0",
                            width: "100%"
                        }}></hr>
                    </Grid>
                </>
            ))
            }
        </div >
    );
};

export default OrderList;
