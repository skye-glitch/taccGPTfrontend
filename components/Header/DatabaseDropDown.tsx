import { useState } from "react";
import type { MotionProps, Variants } from "framer-motion";
import { Menu, MenuItem } from "./menu";
import style from "./DropDown.module.css";
import { useRouter } from "next/navigation";

const menu = {
  closed: {
    scale: 0,
    transition: {
      delay: 0.15,
    },
  },
  open: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 0.4,
      delayChildren: 0.2,
      staggerChildren: 0.05,
    },
  },
} satisfies Variants;

const item = {
  variants: {
    closed: { x: -16, opacity: 0 },
    open: { x: 0, opacity: 1 },
  },
  transition: { opacity: { duration: 0.2 } },
} satisfies MotionProps;

function DropDown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <Menu
      label="Databases"
      open={open}
      setOpen={setOpen}
      animate={open ? "open" : "closed"}
      initial="closed"
      exit="closed"
      variants={menu}
      image="/images/database-icon.svg"
    >
      <MenuItem {...item} 
      onClick={()=>{router.push("/show_database_qa_pairs")}}
      >
        QA Pairs
      </MenuItem>
      <MenuItem {...item} 
      onClick={()=>{router.push("/show_database_rankings")}}
      >
        Rankings
      </MenuItem>
    </Menu>
  );
}

export default DropDown;