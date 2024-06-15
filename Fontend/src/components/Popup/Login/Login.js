import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import './Login.scss';
import { ModalTitle } from 'react-bootstrap';

function Login() {
  const [show, setShow] = useState(false);
  const nameLogin = ''
  const handleLogin = () => {setShow(true)}
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const Params = ({
    interval = '-1',
    startDate = '0000-00-00',
    endDate = '0000-00-00',
    onSetParams = f => f,
    }) =>
    {
    let _interval = interval,
    _startDate = startDate,
    _endDate = endDate
    
    const submit = e => {
    e.preventDefault()
  }}

  return (
    <>
    
      <Button variant="primary" onClick={handleShow} className='login-button'>
        Đăng nhập
      </Button>

      <Modal show={show} onHide={handleClose} className='popup-login'>
        <Modal.Header closeButton>
          <Modal.Title className='pp1'>CHÀO MỪNG</Modal.Title>
          <Modal.Title className='pp2'>BẠN ĐẾN VỚI</Modal.Title>
          <Modal.Title className='pp3'>UCPC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='form-login'>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Tên Đăng Nhập"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Mật Khẩu"
                autoFocus
              />
            </Form.Group>
            <Button variant="primary" onClick={handleLogin}>
            Đăng Nhập
          </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <>
          <label>
              <input type="checkbox" className='checkbox' />
              Quên Mật Khẩu
          </label>
          <label>
          <a href='https://www.facebook.com/' className='linkst' >Bạn chưa có tài khoản</a>
          </label>
          </>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Login;