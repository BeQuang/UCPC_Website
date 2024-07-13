import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import './Login.scss';
import { ModalTitle } from 'react-bootstrap';

function Login() {
  const [name,setName] = useState("")

  const changeName = event => {
    setName(event.target.value)
  }

  const [pass,setPass] = useState("")

  const changePass = event => {
    setPass(event.target.value)
  }

  const handleLogin  = (e) =>{
    const infor = {name, pass};

    console.log(infor);
  }
  return (
    <>
      <div className='popup-login'>
        <Modal.Header >
          {/* <Button variant='primary' onClick={handleClose}></Button> */}
          <Modal.Title className='pp1'>CHÀO MỪNG</Modal.Title>
          <Modal.Title className='pp2'>BẠN ĐẾN VỚI</Modal.Title>
          <Modal.Title className='pp3'>UCPC</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className='form-login'>
            <Form.Group className="name" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Tên Đăng Nhập"
                autoFocus
                onChange = {changeName}
                value = {name}
              />
            </Form.Group>
            <Form.Group className="pass" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="text"
                placeholder="Mật Khẩu"
                autoFocus
                onChange = {changePass}
                value = {pass}
        
              />
            </Form.Group>
            
            <Button variant="primary" className='btn-login' onClick={handleLogin}>
              Đăng Nhập
            </Button>
            
            
            
          </Form>
        </Modal.Body>
        <Modal.Footer>
          
          <div className='footer__remember'>
              <input type="checkbox" className='footer__remember__checkbox' id='checkbox-remember'/>
          <label for="checkbox-remember" className='footer__remember__label'>Nhớ tài khoản</label>
          </div>
          <div className='footer__new'>
          <a href='https://www.facebook.com/' className='linkst' >Bạn chưa có tài khoản</a>
          </div>
        </Modal.Footer>
      </div>
    </>
  );
}

export default Login;