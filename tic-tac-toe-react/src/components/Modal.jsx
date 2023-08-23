import {Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const WinModal = ({handleNewGame, winner, modal, setModal}) => {
    const toggle = () => setModal(!modal);
    return(
        <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Modal title</ModalHeader>
            <ModalBody>
                {winner} has won!
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={()=>{toggle() + handleNewGame()}} className="modalButton">Play again!</Button>
            </ModalFooter>
        </Modal>
    );
};

export default WinModal