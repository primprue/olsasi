import React from "react";
import { Button } from "@material-ui/core";

export default function ComboBCC(props: any) {
  const {
    confirmText,
    cancelText,
    confirmAction,
    cancelAction,
  } = props.actions;
  return (
    <>
      <Button
        onClick={confirmAction}
        style={{ margin: ".5rem" }}
        variant="contained"
        color="primary"
      >
        {confirmText}
      </Button>
      <Button
        onClick={cancelAction}
        style={{ margin: ".5rem" }}
        variant="contained"
        color="secondary"
      >
        {cancelText}
      </Button>
    </>
  );
}
