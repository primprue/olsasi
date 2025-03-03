import React, { useState, lazy } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import { useNavigate } from "react-router-dom";
import styles from "../../Styles/BotonMenu.module.css";
const Presupuesto = lazy(() => import("../../pages/Presupuesto/index.jsx"));
const PresupMuestra = lazy(() =>
    import("../../pages/Presupuesto/LayoutPresupuesto/PresupMuestra/index.jsx")
);
const MenuPresup = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    // Función para manejar la navegación
    const handleNavigate = (path) => {
        navigate(path);
        handleClose();
    };

    return (
        <>
            {/* <div className={styles["portfolio-experiment"]}> */}
            <button className={styles.button} onClick={handleClick}>
                {/* <span className={styles.text}>☰</span> */}
                <span className={styles.text}>Presupuesto</span>
                <span className={`${styles.line} ${styles["-top"]}`}></span>
                <span className={`${styles.line} ${styles["-right"]}`}></span>
                <span className={`${styles.line} ${styles["-bottom"]}`}></span>
                <span className={`${styles.line} ${styles["-left"]}`}></span>
            </button>

            <Menu
                id="grouped-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    "aria-labelledby": "basic-button",
                }}
            >
                <ListSubheader>Presupuesto</ListSubheader>
                <MenuItem onClick={() => handleNavigate("/Presupuesto")}>Presupuesto</MenuItem>

                <ListSubheader>Category 2</ListSubheader>
                <MenuItem onClick={handleClose}>Option 3</MenuItem>
                <MenuItem onClick={handleClose}>Option 4</MenuItem>
            </Menu>
            {/* </div> */}
        </>
    );
};

export default MenuPresup;
