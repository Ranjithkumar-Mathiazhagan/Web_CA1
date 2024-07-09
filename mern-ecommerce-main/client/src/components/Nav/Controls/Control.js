import "./Control.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import Cart from "../../Card/Cart/Cart";
import { useContext, useState } from "react";
import { WishItemsContext } from "../../../Context/WishItemsContext";

const Control = () => {
  const wishItems = useContext(WishItemsContext);
  const [logoutDrawer, setLogoutDrawer] = useState(false);

  const userName = localStorage.getItem("userName");

  return (
    <div className="control__bar__container">
      <div className="controls__container">
        <div className={userName ? "control-name" : "control"}>
          {userName ? (
            <div style={{position: 'relative'}}>
              <div>{userName}</div>
            </div>
          ) : (
            <Link to="/account/login">
              <PersonOutlineIcon
                color="black"
                size="large"
                sx={{ width: "35px" }}
              />
            </Link>
          )}
        </div>
        {
            userName && 
            <div className="control-name" onClick={() => {
                localStorage.clear();
                window.location.reload();
            }}>
            <div> Logout</div>
          </div>
        }
        <div className="control">
          <Link to="/wishlist">
            <Badge badgeContent={wishItems.items.length} color="error">
              <FavoriteBorderIcon color="black" sx={{ width: "35px" }} />
            </Badge>
          </Link>
        </div>
        <div className="control">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Control;
