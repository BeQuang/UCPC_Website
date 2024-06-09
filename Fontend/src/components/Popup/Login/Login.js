import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function Login() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    
      <Button variant="primary" onClick={handleShow} className='login'>
        Đăng nhập
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Đăng nhập</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Tên Đăng Nhập, Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="nguyenvanminh"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Mật Khẩu</Form.Label>
              <Form.Control
                type="text"
                placeholder="Mật Khẩu"
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='primary' onClick={handleClose}>
            Đăng kí 
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Đăng Nhập
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          {/* <Button variant="secondary" onClick={handleClose}>
            Quên Mặt Khẩu
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;