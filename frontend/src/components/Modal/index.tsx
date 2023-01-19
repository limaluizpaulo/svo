import { Modal } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

export default function MyModal(props: any) {
    const { setShow, button1, button2 } = props
    const navigate = useNavigate();



    const sim = () => {
        navigate('/ocorrencias')
    }

    const nao = () => {
        setShow(false)
    }


    return (
        <>
            <Modal show={true} onHide={nao}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{props.children}</Modal.Body>
                <Modal.Footer>
                    {button1()}
                    {button2()}
                </Modal.Footer>
            </Modal>
        </>
    );
}
