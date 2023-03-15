import { useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Portal } from 'react-portal';
import {useLocation} from "react-router-dom"

type TaskDialogProps = {
  // show: boolean;
  // taskId: string;
  // handleClose: () => void;
};
export const TaskDialog = (props: TaskDialogProps) => {
  const location = useLocation();
  const {show} = location.state;


  return (
    <Portal node={document && document.getElementById('layout-portal')}>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Portal>
  );
};
