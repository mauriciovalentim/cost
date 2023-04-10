import { useState, useEffect } from "react";
import styles from "./Message.module.css";

function Message({ msg, type}) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      useState(false);
      return ;
    }
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, [msg]);

  return (
    <>
      {visible && <p className={`${styles.message} ${styles[type]}`}>{msg}</p>}
    </>
  );
}

export default Message;
