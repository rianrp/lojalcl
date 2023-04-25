import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Avatar, Grid } from '@material-ui/core';
import { Navigate, useNavigate } from 'react-router-dom';

export default function SimpleMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate()

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClickPerfil = () => {
        navigate('/Perfil')
    }

    const handleClickConfig = () => {
        navigate('/Configuracoes')
    }

    const leftSistem = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>
            <Avatar src={props.user?.usuario?.image} onClick={handleClick}>
            </Avatar>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <p style={{ marginLeft: "3px", fontSize: "10px" }}>
                        <p style={{ fontWeight: "600", lineHeight: "1.57143", fontSize: "0.875rem", fontFamily: "sans-serif" }}>{props.user?.usuario?.name}</p><br></br><p style={{
                            lineHeight: "1.57143",
                            fontSize: "0.875rem",
                            fontFamily: "sans-serif",
                            fontWeight: "400",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            color: "rgb(99, 115, 129)"
                        }}>{props.user?.usuario?.email}</p>
                    </p>
                </MenuItem>
                <hr></hr>
                <MenuItem onClick={handleClickPerfil}>Perfil</MenuItem>
                <MenuItem onClick={handleClickConfig}>Configurações</MenuItem>
                <hr></hr>
                <MenuItem onClick={leftSistem}>Sair</MenuItem>
            </Menu>
        </div>
    );
}
