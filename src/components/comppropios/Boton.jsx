import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListSubheader from "@mui/material/ListSubheader";
import styles from "../../Styles/BotonMenu.module.css";

const Boton = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles["portfolio-experiment"]}>
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
                <MenuItem onClick={handleClose}>Genera</MenuItem>
                <MenuItem onClick={handleClose}>Muestra</MenuItem>
                <ListSubheader>Category 2</ListSubheader>
                <MenuItem onClick={handleClose}>Option 3</MenuItem>
                <MenuItem onClick={handleClose}>Option 4</MenuItem>
            </Menu>
        </div>
    );
};

export default Boton;
