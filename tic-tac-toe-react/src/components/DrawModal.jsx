import {Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const DrawModalComp = ({handleNewGame, drawModal, setDrawModal}) => {
    const toggle = () => setDrawModal(!drawModal);
    return(
        <Modal backdrop="static" isOpen={drawModal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Tie Game</ModalHeader>
            <ModalBody>
                It's a draw...
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{toggle() + handleNewGame()}} className="modalButton">Play again!</Button>
            </ModalFooter>
        </Modal>
    );
};

export default DrawModalComp