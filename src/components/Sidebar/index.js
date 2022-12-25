import { useTheme, useMediaQuery } from "@mui/material";
import { useLayoutState } from "../../context/LayoutContext";
import { useState } from "react";
import "../../assets/style/sidebar.css";
import { useTranslation } from "react-i18next";
import {
  Home as HomeIcon,
  ContactPage as ContactPageIcon,
  ManageAccounts as ManageAccountsIcon
} from "@mui/icons-material";
import LargeDrawer from "./LargeDrawer";
import SidebarLink from "./SidebarLink";
import MiniDrawer from "./MiniDrawer";

const Sidebar = () => {
  const [isOpenChild, setIsOpenChild] = useState(false);
  const theme = useTheme();

  // global
  const {
    t,
    i18n: { dir, language },
  } = useTranslation();
  const { isSidebarOpened, setIsSidebarOpened } = useLayoutState();

  // local
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const anchor = dir(language) == "rtl" ? "right" : "left";
  const structure = [
    {
      id: 0,
      label: t("sidebar.dashboard"),
      link: `/app/dashboard`,
      icon: <HomeIcon />,
    },
    {
      id: 2,
      label: t("sidebar.food"),
      link: `/app/food`,
      icon: <ContactPageIcon />,
    },
  ];
  const ListItems = () => {
    return (
      <>
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            open={isSidebarOpened}
            isOpenChild={isOpenChild}
            setIsOpenChild={setIsOpenChild}
            {...link}
          />
        ))}
      </>
    );
  };
  return (
    <>
      {isSmall ? (
        <MiniDrawer open={isSidebarOpened} setOpen={setIsSidebarOpened} anchor={anchor}>
          <ListItems />
        </MiniDrawer>
      ) : (
        <LargeDrawer open={isSidebarOpened} anchor={anchor}>
          <ListItems />
        </LargeDrawer>
      )}
    </>
  );
};

export default Sidebar;
