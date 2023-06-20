"use client";

import { AppContext } from "@/contexts/app";
import styles from "./page.module.css";

export default function Home() {
  const actor = AppContext.useActorRef();
  const stateValue = AppContext.useSelector((state) => state.value);

  return (
    <main className={styles.main}>
      <button
        className={`${styles.button} ${
          stateValue === "state2" ? styles.selected : ""
        }`}
        onClick={() => {
          actor.send({ type: "GO_TO_STATE_2" });
        }}
      >
        STATE 2
      </button>
      <button
        className={`${styles.button} ${
          stateValue === "state1" ? styles.selected : ""
        }`}
        onClick={() => {
          actor.send({ type: "GO_TO_STATE_1" });
        }}
      >
        STATE 1
      </button>
    </main>
  );
}
