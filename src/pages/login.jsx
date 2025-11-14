import React from "react";
import styles from "./login.module.css";

export default function Login({ url }) {
  return (
    
      <iframe src={url} className={styles.loginFrame}/>
  );
}
